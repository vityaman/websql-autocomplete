////////////////////////////////////////////////////////
// THIS FILE IS AUTOGENERATED, DON'T EDIT IT MANUALLY //
////////////////////////////////////////////////////////

// We don't really want to check types in generated code
// @ts-nocheck



// Generated from src/autocomplete/databases/redis/grammar/RedisParser.g4 by ANTLR 4.13.1

import * as antlr from "antlr4ng";
import { Token } from "antlr4ng";

import { RedisParserVisitor } from "./RedisParserVisitor.js";

// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;


export class RedisParser extends antlr.Parser {
    public static readonly SPACE = 1;
    public static readonly NEWLINE = 2;
    public static readonly SET = 3;
    public static readonly GET = 4;
    public static readonly INCR = 5;
    public static readonly DECR = 6;
    public static readonly NX = 7;
    public static readonly XX = 8;
    public static readonly EX = 9;
    public static readonly PX = 10;
    public static readonly EXAT = 11;
    public static readonly PXAT = 12;
    public static readonly KEEPTTL = 13;
    public static readonly SINGLE_QUOTE = 14;
    public static readonly DOUBLE_QUOTE = 15;
    public static readonly DECIMAL_LITERAL = 16;
    public static readonly IDENTIFIER = 17;
    public static readonly RULE_root = 0;
    public static readonly RULE_commands = 1;
    public static readonly RULE_command = 2;
    public static readonly RULE_setCommand = 3;
    public static readonly RULE_keyExistenceClause = 4;
    public static readonly RULE_expirationClause = 5;
    public static readonly RULE_getCommand = 6;
    public static readonly RULE_incrementCommand = 7;
    public static readonly RULE_decrementCommand = 8;
    public static readonly RULE_identifier = 9;
    public static readonly RULE_keyName = 10;

    public static readonly literalNames = [
        null, null, null, "'SET'", "'GET'", "'INCR'", "'DECR'", "'NX'", 
        "'XX'", "'EX'", "'PX'", "'EXAT'", "'PXAT'", "'KEEPTTL'", "'''", 
        "'\"'"
    ];

    public static readonly symbolicNames = [
        null, "SPACE", "NEWLINE", "SET", "GET", "INCR", "DECR", "NX", "XX", 
        "EX", "PX", "EXAT", "PXAT", "KEEPTTL", "SINGLE_QUOTE", "DOUBLE_QUOTE", 
        "DECIMAL_LITERAL", "IDENTIFIER"
    ];
    public static readonly ruleNames = [
        "root", "commands", "command", "setCommand", "keyExistenceClause", 
        "expirationClause", "getCommand", "incrementCommand", "decrementCommand", 
        "identifier", "keyName",
    ];

    public get grammarFileName(): string { return "RedisParser.g4"; }
    public get literalNames(): (string | null)[] { return RedisParser.literalNames; }
    public get symbolicNames(): (string | null)[] { return RedisParser.symbolicNames; }
    public get ruleNames(): string[] { return RedisParser.ruleNames; }
    public get serializedATN(): number[] { return RedisParser._serializedATN; }

    protected createFailedPredicateException(predicate?: string, message?: string): antlr.FailedPredicateException {
        return new antlr.FailedPredicateException(this, predicate, message);
    }

    public constructor(input: antlr.TokenStream) {
        super(input);
        this.interpreter = new antlr.ParserATNSimulator(this, RedisParser._ATN, RedisParser.decisionsToDFA, new antlr.PredictionContextCache());
    }
    public root(): RootContext {
        let localContext = new RootContext(this.context, this.state);
        this.enterRule(localContext, 0, RedisParser.RULE_root);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 23;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 120) !== 0)) {
                {
                this.state = 22;
                this.commands();
                }
            }

            this.state = 25;
            this.match(RedisParser.EOF);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public commands(): CommandsContext {
        let localContext = new CommandsContext(this.context, this.state);
        this.enterRule(localContext, 2, RedisParser.RULE_commands);
        let _la: number;
        try {
            this.state = 42;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 3, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 27;
                this.command();
                this.state = 31;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 2) {
                    {
                    {
                    this.state = 28;
                    this.match(RedisParser.NEWLINE);
                    }
                    }
                    this.state = 33;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 34;
                this.command();
                this.state = 36;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                do {
                    {
                    {
                    this.state = 35;
                    this.match(RedisParser.NEWLINE);
                    }
                    }
                    this.state = 38;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                } while (_la === 2);
                this.state = 40;
                this.commands();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public command(): CommandContext {
        let localContext = new CommandContext(this.context, this.state);
        this.enterRule(localContext, 4, RedisParser.RULE_command);
        try {
            this.state = 48;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case RedisParser.SET:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 44;
                this.setCommand();
                }
                break;
            case RedisParser.GET:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 45;
                this.getCommand();
                }
                break;
            case RedisParser.INCR:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 46;
                this.incrementCommand();
                }
                break;
            case RedisParser.DECR:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 47;
                this.decrementCommand();
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public setCommand(): SetCommandContext {
        let localContext = new SetCommandContext(this.context, this.state);
        this.enterRule(localContext, 6, RedisParser.RULE_setCommand);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 50;
            this.match(RedisParser.SET);
            this.state = 51;
            this.keyName();
            this.state = 52;
            this.identifier();
            this.state = 54;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 7 || _la === 8) {
                {
                this.state = 53;
                this.keyExistenceClause();
                }
            }

            this.state = 57;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 4) {
                {
                this.state = 56;
                this.match(RedisParser.GET);
                }
            }

            this.state = 60;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 15872) !== 0)) {
                {
                this.state = 59;
                this.expirationClause();
                }
            }

            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public keyExistenceClause(): KeyExistenceClauseContext {
        let localContext = new KeyExistenceClauseContext(this.context, this.state);
        this.enterRule(localContext, 8, RedisParser.RULE_keyExistenceClause);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 62;
            _la = this.tokenStream.LA(1);
            if(!(_la === 7 || _la === 8)) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public expirationClause(): ExpirationClauseContext {
        let localContext = new ExpirationClauseContext(this.context, this.state);
        this.enterRule(localContext, 10, RedisParser.RULE_expirationClause);
        try {
            this.state = 73;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case RedisParser.EX:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 64;
                this.match(RedisParser.EX);
                this.state = 65;
                this.match(RedisParser.DECIMAL_LITERAL);
                }
                break;
            case RedisParser.PX:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 66;
                this.match(RedisParser.PX);
                this.state = 67;
                this.match(RedisParser.DECIMAL_LITERAL);
                }
                break;
            case RedisParser.EXAT:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 68;
                this.match(RedisParser.EXAT);
                this.state = 69;
                this.match(RedisParser.DECIMAL_LITERAL);
                }
                break;
            case RedisParser.PXAT:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 70;
                this.match(RedisParser.PXAT);
                this.state = 71;
                this.match(RedisParser.DECIMAL_LITERAL);
                }
                break;
            case RedisParser.KEEPTTL:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 72;
                this.match(RedisParser.KEEPTTL);
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public getCommand(): GetCommandContext {
        let localContext = new GetCommandContext(this.context, this.state);
        this.enterRule(localContext, 12, RedisParser.RULE_getCommand);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 75;
            this.match(RedisParser.GET);
            this.state = 76;
            this.keyName();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public incrementCommand(): IncrementCommandContext {
        let localContext = new IncrementCommandContext(this.context, this.state);
        this.enterRule(localContext, 14, RedisParser.RULE_incrementCommand);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 78;
            this.match(RedisParser.INCR);
            this.state = 79;
            this.keyName();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public decrementCommand(): DecrementCommandContext {
        let localContext = new DecrementCommandContext(this.context, this.state);
        this.enterRule(localContext, 16, RedisParser.RULE_decrementCommand);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 81;
            this.match(RedisParser.DECR);
            this.state = 82;
            this.keyName();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public identifier(): IdentifierContext {
        let localContext = new IdentifierContext(this.context, this.state);
        this.enterRule(localContext, 18, RedisParser.RULE_identifier);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 84;
            _la = this.tokenStream.LA(1);
            if(!(_la === 16 || _la === 17)) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public keyName(): KeyNameContext {
        let localContext = new KeyNameContext(this.context, this.state);
        this.enterRule(localContext, 20, RedisParser.RULE_keyName);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 86;
            this.identifier();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }

    public static readonly _serializedATN: number[] = [
        4,1,17,89,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,
        6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,1,0,3,0,24,8,0,1,0,1,0,1,1,1,
        1,5,1,30,8,1,10,1,12,1,33,9,1,1,1,1,1,4,1,37,8,1,11,1,12,1,38,1,
        1,1,1,3,1,43,8,1,1,2,1,2,1,2,1,2,3,2,49,8,2,1,3,1,3,1,3,1,3,3,3,
        55,8,3,1,3,3,3,58,8,3,1,3,3,3,61,8,3,1,4,1,4,1,5,1,5,1,5,1,5,1,5,
        1,5,1,5,1,5,1,5,3,5,74,8,5,1,6,1,6,1,6,1,7,1,7,1,7,1,8,1,8,1,8,1,
        9,1,9,1,10,1,10,1,10,0,0,11,0,2,4,6,8,10,12,14,16,18,20,0,2,1,0,
        7,8,1,0,16,17,91,0,23,1,0,0,0,2,42,1,0,0,0,4,48,1,0,0,0,6,50,1,0,
        0,0,8,62,1,0,0,0,10,73,1,0,0,0,12,75,1,0,0,0,14,78,1,0,0,0,16,81,
        1,0,0,0,18,84,1,0,0,0,20,86,1,0,0,0,22,24,3,2,1,0,23,22,1,0,0,0,
        23,24,1,0,0,0,24,25,1,0,0,0,25,26,5,0,0,1,26,1,1,0,0,0,27,31,3,4,
        2,0,28,30,5,2,0,0,29,28,1,0,0,0,30,33,1,0,0,0,31,29,1,0,0,0,31,32,
        1,0,0,0,32,43,1,0,0,0,33,31,1,0,0,0,34,36,3,4,2,0,35,37,5,2,0,0,
        36,35,1,0,0,0,37,38,1,0,0,0,38,36,1,0,0,0,38,39,1,0,0,0,39,40,1,
        0,0,0,40,41,3,2,1,0,41,43,1,0,0,0,42,27,1,0,0,0,42,34,1,0,0,0,43,
        3,1,0,0,0,44,49,3,6,3,0,45,49,3,12,6,0,46,49,3,14,7,0,47,49,3,16,
        8,0,48,44,1,0,0,0,48,45,1,0,0,0,48,46,1,0,0,0,48,47,1,0,0,0,49,5,
        1,0,0,0,50,51,5,3,0,0,51,52,3,20,10,0,52,54,3,18,9,0,53,55,3,8,4,
        0,54,53,1,0,0,0,54,55,1,0,0,0,55,57,1,0,0,0,56,58,5,4,0,0,57,56,
        1,0,0,0,57,58,1,0,0,0,58,60,1,0,0,0,59,61,3,10,5,0,60,59,1,0,0,0,
        60,61,1,0,0,0,61,7,1,0,0,0,62,63,7,0,0,0,63,9,1,0,0,0,64,65,5,9,
        0,0,65,74,5,16,0,0,66,67,5,10,0,0,67,74,5,16,0,0,68,69,5,11,0,0,
        69,74,5,16,0,0,70,71,5,12,0,0,71,74,5,16,0,0,72,74,5,13,0,0,73,64,
        1,0,0,0,73,66,1,0,0,0,73,68,1,0,0,0,73,70,1,0,0,0,73,72,1,0,0,0,
        74,11,1,0,0,0,75,76,5,4,0,0,76,77,3,20,10,0,77,13,1,0,0,0,78,79,
        5,5,0,0,79,80,3,20,10,0,80,15,1,0,0,0,81,82,5,6,0,0,82,83,3,20,10,
        0,83,17,1,0,0,0,84,85,7,1,0,0,85,19,1,0,0,0,86,87,3,18,9,0,87,21,
        1,0,0,0,9,23,31,38,42,48,54,57,60,73
    ];

    private static __ATN: antlr.ATN;
    public static get _ATN(): antlr.ATN {
        if (!RedisParser.__ATN) {
            RedisParser.__ATN = new antlr.ATNDeserializer().deserialize(RedisParser._serializedATN);
        }

        return RedisParser.__ATN;
    }


    private static readonly vocabulary = new antlr.Vocabulary(RedisParser.literalNames, RedisParser.symbolicNames, []);

    public override get vocabulary(): antlr.Vocabulary {
        return RedisParser.vocabulary;
    }

    private static readonly decisionsToDFA = RedisParser._ATN.decisionToState.map( (ds: antlr.DecisionState, index: number) => new antlr.DFA(ds, index) );
}

export class RootContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public EOF(): antlr.TerminalNode {
        return this.getToken(RedisParser.EOF, 0)!;
    }
    public commands(): CommandsContext | null {
        return this.getRuleContext(0, CommandsContext);
    }
    public override get ruleIndex(): number {
        return RedisParser.RULE_root;
    }
    public override accept<Result>(visitor: RedisParserVisitor<Result>): Result | null {
        if (visitor.visitRoot) {
            return visitor.visitRoot(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class CommandsContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public command(): CommandContext {
        return this.getRuleContext(0, CommandContext)!;
    }
    public NEWLINE(): antlr.TerminalNode[];
    public NEWLINE(i: number): antlr.TerminalNode | null;
    public NEWLINE(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(RedisParser.NEWLINE);
    	} else {
    		return this.getToken(RedisParser.NEWLINE, i);
    	}
    }
    public commands(): CommandsContext | null {
        return this.getRuleContext(0, CommandsContext);
    }
    public override get ruleIndex(): number {
        return RedisParser.RULE_commands;
    }
    public override accept<Result>(visitor: RedisParserVisitor<Result>): Result | null {
        if (visitor.visitCommands) {
            return visitor.visitCommands(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class CommandContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public setCommand(): SetCommandContext | null {
        return this.getRuleContext(0, SetCommandContext);
    }
    public getCommand(): GetCommandContext | null {
        return this.getRuleContext(0, GetCommandContext);
    }
    public incrementCommand(): IncrementCommandContext | null {
        return this.getRuleContext(0, IncrementCommandContext);
    }
    public decrementCommand(): DecrementCommandContext | null {
        return this.getRuleContext(0, DecrementCommandContext);
    }
    public override get ruleIndex(): number {
        return RedisParser.RULE_command;
    }
    public override accept<Result>(visitor: RedisParserVisitor<Result>): Result | null {
        if (visitor.visitCommand) {
            return visitor.visitCommand(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class SetCommandContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public SET(): antlr.TerminalNode {
        return this.getToken(RedisParser.SET, 0)!;
    }
    public keyName(): KeyNameContext {
        return this.getRuleContext(0, KeyNameContext)!;
    }
    public identifier(): IdentifierContext {
        return this.getRuleContext(0, IdentifierContext)!;
    }
    public keyExistenceClause(): KeyExistenceClauseContext | null {
        return this.getRuleContext(0, KeyExistenceClauseContext);
    }
    public GET(): antlr.TerminalNode | null {
        return this.getToken(RedisParser.GET, 0);
    }
    public expirationClause(): ExpirationClauseContext | null {
        return this.getRuleContext(0, ExpirationClauseContext);
    }
    public override get ruleIndex(): number {
        return RedisParser.RULE_setCommand;
    }
    public override accept<Result>(visitor: RedisParserVisitor<Result>): Result | null {
        if (visitor.visitSetCommand) {
            return visitor.visitSetCommand(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class KeyExistenceClauseContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public NX(): antlr.TerminalNode | null {
        return this.getToken(RedisParser.NX, 0);
    }
    public XX(): antlr.TerminalNode | null {
        return this.getToken(RedisParser.XX, 0);
    }
    public override get ruleIndex(): number {
        return RedisParser.RULE_keyExistenceClause;
    }
    public override accept<Result>(visitor: RedisParserVisitor<Result>): Result | null {
        if (visitor.visitKeyExistenceClause) {
            return visitor.visitKeyExistenceClause(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ExpirationClauseContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public EX(): antlr.TerminalNode | null {
        return this.getToken(RedisParser.EX, 0);
    }
    public DECIMAL_LITERAL(): antlr.TerminalNode | null {
        return this.getToken(RedisParser.DECIMAL_LITERAL, 0);
    }
    public PX(): antlr.TerminalNode | null {
        return this.getToken(RedisParser.PX, 0);
    }
    public EXAT(): antlr.TerminalNode | null {
        return this.getToken(RedisParser.EXAT, 0);
    }
    public PXAT(): antlr.TerminalNode | null {
        return this.getToken(RedisParser.PXAT, 0);
    }
    public KEEPTTL(): antlr.TerminalNode | null {
        return this.getToken(RedisParser.KEEPTTL, 0);
    }
    public override get ruleIndex(): number {
        return RedisParser.RULE_expirationClause;
    }
    public override accept<Result>(visitor: RedisParserVisitor<Result>): Result | null {
        if (visitor.visitExpirationClause) {
            return visitor.visitExpirationClause(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class GetCommandContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public GET(): antlr.TerminalNode {
        return this.getToken(RedisParser.GET, 0)!;
    }
    public keyName(): KeyNameContext {
        return this.getRuleContext(0, KeyNameContext)!;
    }
    public override get ruleIndex(): number {
        return RedisParser.RULE_getCommand;
    }
    public override accept<Result>(visitor: RedisParserVisitor<Result>): Result | null {
        if (visitor.visitGetCommand) {
            return visitor.visitGetCommand(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class IncrementCommandContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public INCR(): antlr.TerminalNode {
        return this.getToken(RedisParser.INCR, 0)!;
    }
    public keyName(): KeyNameContext {
        return this.getRuleContext(0, KeyNameContext)!;
    }
    public override get ruleIndex(): number {
        return RedisParser.RULE_incrementCommand;
    }
    public override accept<Result>(visitor: RedisParserVisitor<Result>): Result | null {
        if (visitor.visitIncrementCommand) {
            return visitor.visitIncrementCommand(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class DecrementCommandContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public DECR(): antlr.TerminalNode {
        return this.getToken(RedisParser.DECR, 0)!;
    }
    public keyName(): KeyNameContext {
        return this.getRuleContext(0, KeyNameContext)!;
    }
    public override get ruleIndex(): number {
        return RedisParser.RULE_decrementCommand;
    }
    public override accept<Result>(visitor: RedisParserVisitor<Result>): Result | null {
        if (visitor.visitDecrementCommand) {
            return visitor.visitDecrementCommand(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class IdentifierContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public IDENTIFIER(): antlr.TerminalNode | null {
        return this.getToken(RedisParser.IDENTIFIER, 0);
    }
    public DECIMAL_LITERAL(): antlr.TerminalNode | null {
        return this.getToken(RedisParser.DECIMAL_LITERAL, 0);
    }
    public override get ruleIndex(): number {
        return RedisParser.RULE_identifier;
    }
    public override accept<Result>(visitor: RedisParserVisitor<Result>): Result | null {
        if (visitor.visitIdentifier) {
            return visitor.visitIdentifier(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class KeyNameContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public identifier(): IdentifierContext {
        return this.getRuleContext(0, IdentifierContext)!;
    }
    public override get ruleIndex(): number {
        return RedisParser.RULE_keyName;
    }
    public override accept<Result>(visitor: RedisParserVisitor<Result>): Result | null {
        if (visitor.visitKeyName) {
            return visitor.visitKeyName(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}