import {ParseTree, TokenStream} from 'antlr4ng';
import * as c3 from 'antlr4-c3';

import {TableSymbol} from '../../lib/symbolTable.js';
import {
    AutocompleteData,
    AutocompleteParseResult,
    ISymbolTableVisitor,
    TableOrViewSuggestion,
} from '../../types.js';
import {MySqlLexer} from './generated/MySqlLexer.js';
import {AtomTableItemContext, MySqlParser, TableNameContext} from './generated/MySqlParser.js';
import {MySqlParserVisitor} from './generated/MySqlParserVisitor.js';
import {TableQueryPosition, TokenDictionary, hasPreviousToken} from '../../lib/tables.js';

const tokenDictionary: TokenDictionary = {
    SPACE: MySqlParser.SPACE,
    FROM: MySqlParser.FROM,
    OPENING_BRACKET: MySqlParser.LR_BRACKET,
    CLOSING_BRACKET: MySqlParser.RR_BRACKET,
    ALTER: MySqlParser.ALTER,
    INSERT: MySqlParser.INSERT,
    UPDATE: MySqlParser.UPDATE,
    JOIN: MySqlParser.JOIN,
    SEMICOLON: MySqlParser.SEMI,
};

// These are keywords that we do not want to show in autocomplete
function getIgnoredTokens(): number[] {
    const tokens = [];

    const firstOperatorIndex = MySqlParser.VAR_ASSIGN;
    const lastOperatorIndex = MySqlParser.ERROR_RECONGNIGION;
    for (let i = firstOperatorIndex; i <= lastOperatorIndex; i++) {
        // We actually want Star to appear in autocomplete
        if (i !== MySqlParser.STAR) {
            tokens.push(i);
        }
    }

    const firstCharsetIndex = MySqlParser.ARMSCII8;
    const lastCharsetIndex = MySqlParser.UTF8MB4;
    for (let i = firstCharsetIndex; i <= lastCharsetIndex; i++) {
        tokens.push(i);
    }

    // Ignoring functions for now, need custom logic for them later
    const firstFunctionIndex = MySqlParser.AVG;
    const lastFunctionIndex = MySqlParser.UTC_TIMESTAMP;
    for (let i = firstFunctionIndex; i <= lastFunctionIndex; i++) {
        tokens.push(i);
    }

    const firstCommonFunctionIndex = MySqlParser.ABS;
    const lastCommonFunctionIndex = MySqlParser.X_FUNCTION;
    for (let i = firstCommonFunctionIndex; i <= lastCommonFunctionIndex; i++) {
        tokens.push(i);
    }

    tokens.push(MySqlParser.EOF);

    return tokens;
}

const ignoredTokens = new Set(getIgnoredTokens());

const preferredRules = new Set([
    // We don't need to go inside of it, we already know that this is a column
    MySqlParser.RULE_fullColumnName,
    // We don't need to go inside of it, we already know that this is a table name
    MySqlParser.RULE_tableName,
    // We don't need to go inside of it, we already know that this is a username and it can be anything
    MySqlParser.RULE_simpleUserName,
    // TODO: merge with uid???
    // We don't need to go inside of next rules, we already know that this is identifier of sorts.
    // There are multiple ids, because different rules use different ids, and we want to stop propagation at each of them, otherwise lots of tokens are getting suggested
    MySqlParser.RULE_fullId,
    MySqlParser.RULE_simpleId,
    MySqlParser.RULE_uid,
    // We don't need to go inside of those rules, we already know that this is a function call
    MySqlParser.RULE_aggregateWindowedFunction,
    MySqlParser.RULE_scalarFunctionName, // Maybe also add nonAggregateWindowedFunction?
    // These functions are very specific, we don't want to suggest them
    MySqlParser.RULE_specificFunction,
    MySqlParser.RULE_passwordFunctionClause,
]);

class MySqlSymbolTableVisitor extends MySqlParserVisitor<{}> implements ISymbolTableVisitor {
    symbolTable: c3.SymbolTable;
    scope: c3.ScopedSymbol;

    constructor() {
        super();
        this.symbolTable = new c3.SymbolTable('', {});
        this.scope = this.symbolTable.addNewSymbolOfType(c3.ScopedSymbol, undefined);
    }

    visitTableName = (context: TableNameContext): {} => {
        try {
            this.symbolTable.addNewSymbolOfType(TableSymbol, this.scope, context.getText());
        } catch (error) {
            if (!(error instanceof c3.DuplicateSymbolError)) {
                throw error;
            }
        }

        return this.visitChildren(context) as {};
    };

    visitAtomTableItem = (context: AtomTableItemContext): {} => {
        try {
            const rawAlias = context.uid()?.getText();
            // For some reason LEFT | RIGHT keyword gets confused with alias
            const isAliasPartOfJoinStatement =
                rawAlias?.toLowerCase() === 'left' || rawAlias?.toLowerCase() === 'right';

            this.symbolTable.addNewSymbolOfType(
                TableSymbol,
                this.scope,
                context.tableName().getText(),
                isAliasPartOfJoinStatement ? undefined : rawAlias,
            );
        } catch (error) {
            if (!(error instanceof c3.DuplicateSymbolError)) {
                throw error;
            }
        }

        return this.visitChildren(context) as {};
    };
}

function generateSuggestionsFromRules(
    rules: c3.CandidatesCollection['rules'],
    cursorTokenIndex: number,
    tokenStream: TokenStream,
): Partial<AutocompleteParseResult> & {suggestColumns?: boolean} {
    let suggestViewsOrTables: AutocompleteParseResult['suggestViewsOrTables'];
    let suggestAggregateFunctions = false;
    let suggestFunctions = false;
    let suggestColumns = false;

    for (const [ruleId, ruleData] of rules) {
        switch (ruleId) {
            case MySqlParser.RULE_tableName: {
                if (
                    cursorTokenIndex === ruleData.startTokenIndex &&
                    !ruleData.ruleList.includes(MySqlParser.RULE_createTable)
                ) {
                    if (
                        hasPreviousToken(
                            tokenStream,
                            tokenDictionary,
                            cursorTokenIndex,
                            MySqlParser.VIEW,
                        )
                    ) {
                        suggestViewsOrTables = TableOrViewSuggestion.VIEWS;
                    } else if (
                        hasPreviousToken(
                            tokenStream,
                            tokenDictionary,
                            cursorTokenIndex,
                            MySqlParser.TABLE,
                        )
                    ) {
                        suggestViewsOrTables = TableOrViewSuggestion.TABLES;
                    } else {
                        suggestViewsOrTables = TableOrViewSuggestion.ALL;
                    }
                }
                break;
            }
            case MySqlParser.RULE_fullId: {
                if (
                    cursorTokenIndex === ruleData.startTokenIndex &&
                    hasPreviousToken(
                        tokenStream,
                        tokenDictionary,
                        cursorTokenIndex,
                        MySqlParser.VIEW,
                    ) &&
                    (ruleData.ruleList.includes(MySqlParser.RULE_alterView) ||
                        ruleData.ruleList.includes(MySqlParser.RULE_dropView))
                ) {
                    suggestViewsOrTables = TableOrViewSuggestion.VIEWS;
                }
                break;
            }
            case MySqlParser.RULE_aggregateWindowedFunction: {
                suggestAggregateFunctions = true;
                break;
            }
            case MySqlParser.RULE_scalarFunctionName: {
                suggestFunctions = true;
                break;
            }
            case MySqlParser.RULE_fullColumnName:
            case MySqlParser.RULE_indexColumnName: {
                if (cursorTokenIndex === ruleData.startTokenIndex) {
                    suggestColumns = true;
                }
                break;
            }
            case MySqlParser.RULE_uid: {
                if (
                    cursorTokenIndex === ruleData.startTokenIndex &&
                    ((ruleData.ruleList.includes(MySqlParser.RULE_alterSpecification) &&
                        !hasPreviousToken(
                            tokenStream,
                            tokenDictionary,
                            cursorTokenIndex,
                            MySqlParser.ADD,
                        )) ||
                        ruleData.ruleList.includes(MySqlParser.RULE_indexColumnName))
                ) {
                    suggestColumns = true;
                }
                break;
            }
        }
    }

    return {suggestViewsOrTables, suggestAggregateFunctions, suggestFunctions, suggestColumns};
}

function getParseTree(parser: MySqlParser, type?: TableQueryPosition['type']): ParseTree {
    if (!type) {
        return parser.root();
    }

    switch (type) {
        case 'from':
            return parser.fromClause();
        case 'alter':
            return parser.alterTable();
        case 'insert':
            return parser.insertStatement();
        case 'update':
            return parser.multipleUpdateStatement();
    }
}

export const mySqlAutocompleteData: AutocompleteData<
    MySqlLexer,
    MySqlParser,
    MySqlSymbolTableVisitor
> = {
    Lexer: MySqlLexer,
    Parser: MySqlParser,
    SymbolTableVisitor: MySqlSymbolTableVisitor,
    tokenDictionary,
    ignoredTokens,
    preferredRules,
    explicitlyParseJoin: false,
    getParseTree,
    generateSuggestionsFromRules,
};