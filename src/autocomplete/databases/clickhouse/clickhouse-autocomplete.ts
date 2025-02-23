import {ParseTree, TokenStream} from 'antlr4ng';
import * as c3 from 'antlr4-c3';

import {ColumnAliasSymbol, TableSymbol} from '../../shared/symbol-table.js';
import {
    AutocompleteData,
    AutocompleteResultBase,
    CursorPosition,
    ISymbolTableVisitor,
    ProcessVisitedRulesResult,
    TableOrViewSuggestion,
} from '../../shared/autocomplete-types.js';
import {ClickHouseLexer} from './generated/ClickHouseLexer.js';
import {
    ClickHouseParser,
    ColumnExpressionAliasContext,
    TableExpressionAliasContext,
    TableIdentifierContext,
} from './generated/ClickHouseParser.js';
import {ClickHouseParserVisitor} from './generated/ClickHouseParserVisitor.js';
import {
    TableQueryPosition,
    TokenDictionary,
    getContextSuggestions,
    getPreviousToken,
} from '../../shared/tables.js';
import {isStartingToWriteRule} from '../../shared/cursor';
import {shouldSuggestTemplates} from '../../shared/query.js';
import {ClickHouseAutocompleteResult} from './index';

const engines = ['Null', 'Set', 'Log', 'Memory', 'TinyLog', 'StripeLog'];

const functionalEngines = [
    'MergeTree()',
    'Merge()',
    'ReplacingMergeTree()',
    'CollapsingMergeTree()',
    'AggregatingMergeTree()',
    'Buffer()',
    'Dictionary()',
    'Distributed()',
    'File()',
    'GraphiteMergeTree()',
    'Join()',
    'Kafka()',
    'MySQL()',
    'URL()',
    'ReplicatedAggregatingMergeTree()',
    'ReplicatedCollapsingMergeTree()',
    'ReplicatedGraphiteMergeTree()',
    'ReplicatedMergeTree()',
    'ReplicatedReplacingMergeTree()',
    'ReplicatedSummingMergeTree()',
    'ReplicatedVersionedCollapsingMergeTree()',
    'SummingMergeTree()',
    'VersionedCollapsingMergeTree()',
    'PostgreSQL()',
];

const tokenDictionary: TokenDictionary = {
    SPACE: ClickHouseParser.WHITESPACE,
    FROM: ClickHouseParser.FROM,
    OPENING_BRACKET: ClickHouseParser.LPAREN,
    CLOSING_BRACKET: ClickHouseParser.RPAREN,
    ALTER: ClickHouseParser.ALTER,
    INSERT: ClickHouseParser.INSERT,
    UPDATE: ClickHouseParser.UPDATE,
    JOIN: ClickHouseParser.JOIN,
    SEMICOLON: ClickHouseParser.SEMICOLON,
    SELECT: ClickHouseParser.SELECT,
};

// These are keywords that we do not want to show in autocomplete
function getIgnoredTokens(): number[] {
    const tokens = [];

    const firstOperatorIndex = ClickHouseParser.JSON_FALSE;
    const lastOperatorIndex = ClickHouseParser.WHITESPACE;
    for (let i = firstOperatorIndex; i <= lastOperatorIndex; i++) {
        // We actually want Star to appear in autocomplete
        if (i !== ClickHouseParser.ASTERISK) {
            tokens.push(i);
        }
    }

    tokens.push(ClickHouseParser.EOF);
    tokens.push(ClickHouseParser.QUESTIONMARK);

    return tokens;
}

const ignoredTokens = new Set(getIgnoredTokens());

const rulesToVisit = new Set([
    ClickHouseParser.RULE_databaseIdentifier,
    ClickHouseParser.RULE_tableIdentifier,
    ClickHouseParser.RULE_identifier,
    ClickHouseParser.RULE_columnIdentifier,
    ClickHouseParser.RULE_identifierOrNull,
    ClickHouseParser.RULE_literal,
    ClickHouseParser.RULE_anyValue,
]);

class ClickHouseSymbolTableVisitor
    extends ClickHouseParserVisitor<{}>
    implements ISymbolTableVisitor
{
    symbolTable: c3.SymbolTable;
    scope: c3.ScopedSymbol;

    constructor() {
        super();
        this.symbolTable = new c3.SymbolTable('', {allowDuplicateSymbols: true});
        this.scope = this.symbolTable.addNewSymbolOfType(c3.ScopedSymbol, undefined);
    }

    visitTableIdentifier = (context: TableIdentifierContext): {} => {
        try {
            this.symbolTable.addNewSymbolOfType(TableSymbol, this.scope, context.getText());
        } catch (error) {
            if (!(error instanceof c3.DuplicateSymbolError)) {
                throw error;
            }
        }

        return this.visitChildren(context) as {};
    };

    visitTableExpressionAlias = (context: TableExpressionAliasContext): {} => {
        try {
            this.symbolTable.addNewSymbolOfType(
                TableSymbol,
                this.scope,
                context.tableExpression()?.getText(),
                context.alias()?.getText() || context.identifier()?.getText() || undefined,
            );
        } catch (error) {
            if (!(error instanceof c3.DuplicateSymbolError)) {
                throw error;
            }
        }

        return this.visitChildren(context) as {};
    };

    visitColumnExpressionAlias = (context: ColumnExpressionAliasContext): {} => {
        try {
            const alias = context.alias()?.getText() || context.identifier()?.getText();

            if (alias) {
                this.symbolTable.addNewSymbolOfType(ColumnAliasSymbol, this.scope, alias);
            }
        } catch (error) {
            if (!(error instanceof c3.DuplicateSymbolError)) {
                throw error;
            }
        }

        return this.visitChildren(context) as {};
    };
}

function processVisitedRules(
    rules: c3.CandidatesCollection['rules'],
    cursorTokenIndex: number,
    tokenStream: TokenStream,
): ProcessVisitedRulesResult<ClickHouseAutocompleteResult> {
    let suggestViewsOrTables: ClickHouseAutocompleteResult['suggestViewsOrTables'];
    let suggestAggregateFunctions = false;
    let suggestFunctions = false;
    let suggestDatabases = false;
    let shouldSuggestColumns = false;
    let shouldSuggestColumnAliases = false;
    let suggestEngines;

    for (const [ruleId, rule] of rules) {
        if (!isStartingToWriteRule(cursorTokenIndex, rule)) {
            continue;
        }

        switch (ruleId) {
            case ClickHouseParser.RULE_tableIdentifier: {
                if (
                    rule.ruleList.includes(ClickHouseParser.RULE_createStatement) ||
                    rule.ruleList.includes(ClickHouseParser.RULE_columnsExpression)
                ) {
                    break;
                }

                if (
                    getPreviousToken(
                        tokenStream,
                        tokenDictionary,
                        cursorTokenIndex,
                        ClickHouseParser.VIEW,
                    )
                ) {
                    suggestViewsOrTables = TableOrViewSuggestion.VIEWS;
                } else if (
                    getPreviousToken(
                        tokenStream,
                        tokenDictionary,
                        cursorTokenIndex,
                        ClickHouseParser.TABLE,
                    )
                ) {
                    suggestViewsOrTables = TableOrViewSuggestion.TABLES;
                } else {
                    suggestViewsOrTables = TableOrViewSuggestion.ALL;
                }
                break;
            }
            case ClickHouseParser.RULE_identifier: {
                if (rule.ruleList.includes(ClickHouseParser.RULE_columnExpression)) {
                    suggestFunctions = true;
                    // TODO Not sure yet how to specifically find aggregate functions
                    suggestAggregateFunctions = true;
                }
                if (rule.ruleList.includes(ClickHouseParser.RULE_alterTableClause)) {
                    shouldSuggestColumns = true;
                }
                break;
            }
            case ClickHouseParser.RULE_columnIdentifier: {
                shouldSuggestColumns = true;
                if (
                    rule.ruleList.includes(ClickHouseParser.RULE_orderExpression) ||
                    rule.ruleList.includes(ClickHouseParser.RULE_groupByClause)
                ) {
                    shouldSuggestColumnAliases = true;
                }
                break;
            }
            case ClickHouseParser.RULE_identifierOrNull: {
                if (rule.ruleList.includes(ClickHouseParser.RULE_engineClause)) {
                    suggestEngines = {engines, functionalEngines};
                }
                break;
            }
            case ClickHouseParser.RULE_databaseIdentifier: {
                suggestDatabases = true;
                break;
            }
        }
    }

    return {
        suggestViewsOrTables,
        suggestAggregateFunctions,
        suggestFunctions,
        suggestEngines,
        suggestDatabases,
        shouldSuggestColumns,
        shouldSuggestColumnAliases,
    };
}

function getParseTree(
    parser: ClickHouseParser,
    type?: TableQueryPosition['type'] | 'select',
): ParseTree {
    // ClickHouse does not have UPDATE statement
    if (!type || type === 'update') {
        return parser.root();
    }

    switch (type) {
        case 'from':
            return parser.fromClause();
        case 'alter':
            return parser.alterStatement();
        case 'insert':
            // INSERT doesn't work for now: for some reason any INSERT statement throws error
            return parser.insertStatement();
        case 'select':
            return parser.selectStatement();
    }
}

function enrichAutocompleteResult(
    baseResult: AutocompleteResultBase,
    rules: c3.CandidatesCollection['rules'],
    tokenStream: TokenStream,
    cursorTokenIndex: number,
    cursor: CursorPosition,
    query: string,
): ClickHouseAutocompleteResult {
    const {shouldSuggestColumns, shouldSuggestColumnAliases, ...suggestionsFromRules} =
        processVisitedRules(rules, cursorTokenIndex, tokenStream);
    const suggestTemplates = shouldSuggestTemplates(query, cursor);
    const result: ClickHouseAutocompleteResult = {
        ...baseResult,
        ...suggestionsFromRules,
        suggestTemplates,
    };
    const contextSuggestionsNeeded = shouldSuggestColumns || shouldSuggestColumnAliases;

    if (contextSuggestionsNeeded) {
        const visitor = new ClickHouseSymbolTableVisitor();
        const {tableContextSuggestion, suggestColumnAliases} = getContextSuggestions(
            ClickHouseLexer,
            ClickHouseParser,
            visitor,
            tokenDictionary,
            getParseTree,
            tokenStream,
            cursor,
            query,
        );

        if (shouldSuggestColumns && tableContextSuggestion) {
            result.suggestColumns = tableContextSuggestion;
        }
        if (shouldSuggestColumnAliases && suggestColumnAliases) {
            result.suggestColumnAliases = suggestColumnAliases;
        }
    }

    return result;
}

export const clickHouseAutocompleteData: AutocompleteData<
    ClickHouseAutocompleteResult,
    ClickHouseLexer,
    ClickHouseParser
> = {
    Lexer: ClickHouseLexer,
    Parser: ClickHouseParser,
    tokenDictionary,
    ignoredTokens,
    rulesToVisit,
    getParseTree,
    enrichAutocompleteResult,
};
