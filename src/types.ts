import {
    AbstractParseTreeVisitor,
    CharStream,
    CommonTokenStream,
    Lexer as LexerType,
    ParseTree,
    Parser as ParserType,
    TokenStream,
} from 'antlr4ng';
import * as c3 from 'antlr4-c3';

import {TokenPosition} from './lib/cursor';
import {TableQueryPosition, TokenDictionary} from './lib/tables';

export interface ParserSyntaxError extends TokenPosition {
    message: string;
}

export interface KeywordSuggestion {
    value: string;
}

export interface ColumnSuggestion {
    tables?: {name: string; alias?: string}[];
}

export enum TableOrViewSuggestion {
    ALL = 'ALL',
    TABLES = 'TABLES',
    VIEWS = 'VIEWS',
}

export interface EngineSuggestion {
    engines: string[];
    functionalEngines: string[];
}

export interface AutocompleteParseResult {
    errors: ParserSyntaxError[];
    suggestKeywords?: KeywordSuggestion[];
    suggestViewsOrTables?: TableOrViewSuggestion;
    suggestTemplates?: boolean;
    suggestAggregateFunctions?: boolean;
    suggestFunctions?: boolean;
    suggestColumns?: ColumnSuggestion;
    suggestEngines?: EngineSuggestion;
}

export type LexerConstructor<T> = new (input: CharStream) => T;

export type ParserConstructor<T> = new (input: CommonTokenStream) => T;

export type SymbolTableVisitorConstructor<T> = new () => T;

export interface ISymbolTableVisitor {
    symbolTable: c3.SymbolTable;
    scope: c3.ScopedSymbol;
}

export type GetParseTree<P> = (parser: P, type?: TableQueryPosition['type']) => ParseTree;

export type GenerateSuggestionsFromRules = (
    rules: c3.CandidatesCollection['rules'],
    cursorTokenIndex: number,
    tokenStream: TokenStream,
) => Partial<AutocompleteParseResult> & {suggestColumns?: boolean};

export interface AutocompleteData<
    L extends LexerType,
    P extends ParserType,
    S extends ISymbolTableVisitor & AbstractParseTreeVisitor<{}>,
> {
    Lexer: LexerConstructor<L>;
    Parser: ParserConstructor<P>;
    SymbolTableVisitor: SymbolTableVisitorConstructor<S>;
    getParseTree: GetParseTree<P>;
    tokenDictionary: TokenDictionary;
    generateSuggestionsFromRules: GenerateSuggestionsFromRules;
    ignoredTokens: Set<number>;
    preferredRules: Set<number>;
    explicitlyParseJoin: boolean;
}