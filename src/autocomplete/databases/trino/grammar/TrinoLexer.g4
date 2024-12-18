// $antlr-format alignTrailingComments true, columnLimit 150, maxEmptyLinesToKeep 1, reflowComments false, useTab false
// $antlr-format allowShortRulesOnASingleLine true, allowShortBlocksOnASingleLine true, minEmptyLines 0, alignSemicolons ownLine
// $antlr-format alignColons trailing, singleLineOverrulesHangingColon true, alignLexerCommands true, alignLabels true, alignTrailers true

lexer grammar TrinoLexer;

options {
    caseInsensitive = true;
}

ABSENT_            : 'ABSENT';
ADD_               : 'ADD';
ADMIN_             : 'ADMIN';
AFTER_             : 'AFTER';
ALL_               : 'ALL';
ALTER_             : 'ALTER';
ANALYZE_           : 'ANALYZE';
AND_               : 'AND';
ANY_               : 'ANY';
ARRAY_             : 'ARRAY';
AS_                : 'AS';
ASC_               : 'ASC';
AT_                : 'AT';
AUTHORIZATION_     : 'AUTHORIZATION';
BEGIN_             : 'BEGIN';
BERNOULLI_         : 'BERNOULLI';
BETWEEN_           : 'BETWEEN';
BOTH_              : 'BOTH';
BY_                : 'BY';
CALL_              : 'CALL';
CALLED_            : 'CALLED';
CASCADE_           : 'CASCADE';
CASE_              : 'CASE';
CAST_              : 'CAST';
CATALOG_           : 'CATALOG';
CATALOGS_          : 'CATALOGS';
COLUMN_            : 'COLUMN';
COLUMNS_           : 'COLUMNS';
COMMENT_           : 'COMMENT';
COMMIT_            : 'COMMIT';
COMMITTED_         : 'COMMITTED';
CONDITIONAL_       : 'CONDITIONAL';
CONSTRAINT_        : 'CONSTRAINT';
COUNT_             : 'COUNT';
COPARTITION_       : 'COPARTITION';
CREATE_            : 'CREATE';
CROSS_             : 'CROSS';
CUBE_              : 'CUBE';
CURRENT_           : 'CURRENT';
CURRENT_CATALOG_   : 'CURRENT_CATALOG';
CURRENT_DATE_      : 'CURRENT_DATE';
CURRENT_PATH_      : 'CURRENT_PATH';
CURRENT_ROLE_      : 'CURRENT_ROLE';
CURRENT_SCHEMA_    : 'CURRENT_SCHEMA';
CURRENT_TIME_      : 'CURRENT_TIME';
CURRENT_TIMESTAMP_ : 'CURRENT_TIMESTAMP';
CURRENT_USER_      : 'CURRENT_USER';
DATA_              : 'DATA';
DATE_              : 'DATE';
DAY_               : 'DAY';
DEALLOCATE_        : 'DEALLOCATE';
DECLARE_           : 'DECLARE';
DEFAULT_           : 'DEFAULT';
DEFINE_            : 'DEFINE';
DEFINER_           : 'DEFINER';
DELETE_            : 'DELETE';
DENY_              : 'DENY';
DESC_              : 'DESC';
DESCRIBE_          : 'DESCRIBE';
DESCRIPTOR_        : 'DESCRIPTOR';
DETERMINISTIC_     : 'DETERMINISTIC';
DISTINCT_          : 'DISTINCT';
DISTRIBUTED_       : 'DISTRIBUTED';
DO_                : 'DO';
DOUBLE_            : 'DOUBLE';
DROP_              : 'DROP';
ELSE_              : 'ELSE';
EMPTY_             : 'EMPTY';
ELSEIF_            : 'ELSEIF';
ENCODING_          : 'ENCODING';
END_               : 'END';
ERROR_             : 'ERROR';
ESCAPE_            : 'ESCAPE';
EXCEPT_            : 'EXCEPT';
EXCLUDING_         : 'EXCLUDING';
EXECUTE_           : 'EXECUTE';
EXISTS_            : 'EXISTS';
EXPLAIN_           : 'EXPLAIN';
EXTRACT_           : 'EXTRACT';
FALSE_             : 'FALSE';
FETCH_             : 'FETCH';
FILTER_            : 'FILTER';
FINAL_             : 'FINAL';
FIRST_             : 'FIRST';
FOLLOWING_         : 'FOLLOWING';
FOR_               : 'FOR';
FORMAT_            : 'FORMAT';
FROM_              : 'FROM';
FULL_              : 'FULL';
FUNCTION_          : 'FUNCTION';
FUNCTIONS_         : 'FUNCTIONS';
GRACE_             : 'GRACE';
GRANT_             : 'GRANT';
GRANTED_           : 'GRANTED';
GRANTS_            : 'GRANTS';
GRAPHVIZ_          : 'GRAPHVIZ';
GROUP_             : 'GROUP';
GROUPING_          : 'GROUPING';
GROUPS_            : 'GROUPS';
HAVING_            : 'HAVING';
HOUR_              : 'HOUR';
IF_                : 'IF';
IGNORE_            : 'IGNORE';
IMMEDIATE_         : 'IMMEDIATE';
IN_                : 'IN';
INCLUDING_         : 'INCLUDING';
INITIAL_           : 'INITIAL';
INNER_             : 'INNER';
INPUT_             : 'INPUT';
INSERT_            : 'INSERT';
INTERSECT_         : 'INTERSECT';
INTERVAL_          : 'INTERVAL';
INTO_              : 'INTO';
INVOKER_           : 'INVOKER';
IO_                : 'IO';
IS_                : 'IS';
ISOLATION_         : 'ISOLATION';
ITERATE_           : 'ITERATE';
JOIN_              : 'JOIN';
JSON_              : 'JSON';
JSON_ARRAY_        : 'JSON_ARRAY';
JSON_EXISTS_       : 'JSON_EXISTS';
JSON_OBJECT_       : 'JSON_OBJECT';
JSON_QUERY_        : 'JSON_QUERY';
JSON_TABLE_        : 'JSON_TABLE';
JSON_VALUE_        : 'JSON_VALUE';
KEEP_              : 'KEEP';
KEY_               : 'KEY';
KEYS_              : 'KEYS';
LANGUAGE_          : 'LANGUAGE';
LAST_              : 'LAST';
LATERAL_           : 'LATERAL';
LEADING_           : 'LEADING';
LEAVE_             : 'LEAVE';
LEFT_              : 'LEFT';
LEVEL_             : 'LEVEL';
LIKE_              : 'LIKE';
LIMIT_             : 'LIMIT';
LISTAGG_           : 'LISTAGG';
LOCAL_             : 'LOCAL';
LOCALTIME_         : 'LOCALTIME';
LOCALTIMESTAMP_    : 'LOCALTIMESTAMP';
LOGICAL_           : 'LOGICAL';
LOOP_              : 'LOOP';
MAP_               : 'MAP';
MATCH_             : 'MATCH';
MATCHED_           : 'MATCHED';
MATCHES_           : 'MATCHES';
MATCH_RECOGNIZE_   : 'MATCH_RECOGNIZE';
MATERIALIZED_      : 'MATERIALIZED';
MEASURES_          : 'MEASURES';
MERGE_             : 'MERGE';
MINUTE_            : 'MINUTE';
MONTH_             : 'MONTH';
NATURAL_           : 'NATURAL';
NESTED_            : 'NESTED';
NEXT_              : 'NEXT';
NFC_               : 'NFC';
NFD_               : 'NFD';
NFKC_              : 'NFKC';
NFKD_              : 'NFKD';
NO_                : 'NO';
NONE_              : 'NONE';
NORMALIZE_         : 'NORMALIZE';
NOT_               : 'NOT';
NULL_              : 'NULL';
NULLIF_            : 'NULLIF';
NULLS_             : 'NULLS';
OBJECT_            : 'OBJECT';
OF_                : 'OF';
OFFSET_            : 'OFFSET';
OMIT_              : 'OMIT';
ON_                : 'ON';
ONE_               : 'ONE';
ONLY_              : 'ONLY';
OPTION_            : 'OPTION';
OR_                : 'OR';
ORDER_             : 'ORDER';
ORDINALITY_        : 'ORDINALITY';
OUTER_             : 'OUTER';
OUTPUT_            : 'OUTPUT';
OVER_              : 'OVER';
OVERFLOW_          : 'OVERFLOW';
PARTITION_         : 'PARTITION';
PARTITIONS_        : 'PARTITIONS';
PASSING_           : 'PASSING';
PAST_              : 'PAST';
PATH_              : 'PATH';
PATTERN_           : 'PATTERN';
PER_               : 'PER';
PERIOD_            : 'PERIOD';
PERMUTE_           : 'PERMUTE';
PLAN_              : 'PLAN';
POSITION_          : 'POSITION';
PRECEDING_         : 'PRECEDING';
PRECISION_         : 'PRECISION';
PREPARE_           : 'PREPARE';
PRIVILEGES_        : 'PRIVILEGES';
PROPERTIES_        : 'PROPERTIES';
PRUNE_             : 'PRUNE';
QUOTES_            : 'QUOTES';
RANGE_             : 'RANGE';
READ_              : 'READ';
RECURSIVE_         : 'RECURSIVE';
REFRESH_           : 'REFRESH';
RENAME_            : 'RENAME';
REPEAT_            : 'REPEAT';
REPEATABLE_        : 'REPEATABLE';
REPLACE_           : 'REPLACE';
RESET_             : 'RESET';
RESPECT_           : 'RESPECT';
RESTRICT_          : 'RESTRICT';
RETURN_            : 'RETURN';
RETURNING_         : 'RETURNING';
RETURNS_           : 'RETURNS';
REVOKE_            : 'REVOKE';
RIGHT_             : 'RIGHT';
ROLE_              : 'ROLE';
ROLES_             : 'ROLES';
ROLLBACK_          : 'ROLLBACK';
ROLLUP_            : 'ROLLUP';
ROW_               : 'ROW';
ROWS_              : 'ROWS';
RUNNING_           : 'RUNNING';
SCALAR_            : 'SCALAR';
SCHEMA_            : 'SCHEMA';
SCHEMAS_           : 'SCHEMAS';
SECOND_            : 'SECOND';
SECURITY_          : 'SECURITY';
SEEK_              : 'SEEK';
SELECT_            : 'SELECT';
SERIALIZABLE_      : 'SERIALIZABLE';
SESSION_           : 'SESSION';
SET_               : 'SET';
SETS_              : 'SETS';
SHOW_              : 'SHOW';
// Missing SKIP in official g4
SKIP_          : 'SKIP';
SOME_          : 'SOME';
START_         : 'START';
STATS_         : 'STATS';
SUBSET_        : 'SUBSET';
SUBSTRING_     : 'SUBSTRING';
SYSTEM_        : 'SYSTEM';
TABLE_         : 'TABLE';
TABLES_        : 'TABLES';
TABLESAMPLE_   : 'TABLESAMPLE';
TEXT_          : 'TEXT';
TEXT_STRING_   : 'STRING';
THEN_          : 'THEN';
TIES_          : 'TIES';
TIME_          : 'TIME';
TIMESTAMP_     : 'TIMESTAMP';
TO_            : 'TO';
TRAILING_      : 'TRAILING';
TRANSACTION_   : 'TRANSACTION';
TRIM_          : 'TRIM';
TRUE_          : 'TRUE';
TRUNCATE_      : 'TRUNCATE';
TRY_CAST_      : 'TRY_CAST';
TYPE_          : 'TYPE';
UESCAPE_       : 'UESCAPE';
UNBOUNDED_     : 'UNBOUNDED';
UNCOMMITTED_   : 'UNCOMMITTED';
UNCONDITIONAL_ : 'UNCONDITIONAL';
UNION_         : 'UNION';
UNIQUE_        : 'UNIQUE';
UNKNOWN_       : 'UNKNOWN';
UNMATCHED_     : 'UNMATCHED';
UNNEST_        : 'UNNEST';
UNTIL_         : 'UNTIL';
UPDATE_        : 'UPDATE';
USE_           : 'USE';
USER_          : 'USER';
USING_         : 'USING';
UTF16_         : 'UTF16';
UTF32_         : 'UTF32';
UTF8_          : 'UTF8';
VALIDATE_      : 'VALIDATE';
VALUE_         : 'VALUE';
VALUES_        : 'VALUES';
VERBOSE_       : 'VERBOSE';
VERSION_       : 'VERSION';
VIEW_          : 'VIEW';
WHEN_          : 'WHEN';
WHERE_         : 'WHERE';
WHILE_         : 'WHILE';
WINDOW_        : 'WINDOW';
WITH_          : 'WITH';
WITHIN_        : 'WITHIN';
WITHOUT_       : 'WITHOUT';
WORK_          : 'WORK';
WRAPPER_       : 'WRAPPER';
WRITE_         : 'WRITE';
YEAR_          : 'YEAR';
ZONE_          : 'ZONE';

EQ_  : '=';
NEQ_ : '<>' | '!=';
LT_  : '<';
LTE_ : '<=';
GT_  : '>';
GTE_ : '>=';

PLUS_          : '+';
MINUS_         : '-';
ASTERISK_      : '*';
SLASH_         : '/';
PERCENT_       : '%';
CONCAT_        : '||';
QUESTION_MARK_ : '?';
SEMICOLON_     : ';';

// Punctuations not provided by official g4 file
DOT_   : '.';
COLON_ : '_:';
COMMA_ : ',';

LPAREN_       : '(';
RPAREN_       : ')';
LSQUARE_      : '[';
RSQUARE_      : ']';
LCURLY_       : '{';
RCURLY_       : '}';
LCURLYHYPHEN_ : '{-';
RCURLYHYPHEN_ : '-}';

LARROW_       : '<-';
RARROW_       : '->';
RDOUBLEARROW_ : '=>';

VBAR_   : '|';
DOLLAR_ : '$';
CARET_  : '^';

STRING_: '\'' ( ~'\'' | '\'\'')* '\'';

UNICODE_STRING_: 'U&\'' ( ~'\'' | '\'\'')* '\'';

// Note_: we allow any character inside the binary literal and validate
// its a correct literal when the AST is being constructed. This
// allows us to provide more meaningful error messages to the user
BINARY_LITERAL_: 'X\'' ~'\''* '\'';

INTEGER_VALUE_: DIGIT_+;

DECIMAL_VALUE_: DIGIT_+ '.' DIGIT_* | '.' DIGIT_+;

DOUBLE_VALUE_: DIGIT_+ ('.' DIGIT_*)? EXPONENT_ | '.' DIGIT_+ EXPONENT_;

IDENTIFIER_: (LETTER_ | '_') (LETTER_ | DIGIT_ | '_')*;

DIGIT_IDENTIFIER_: DIGIT_ (LETTER_ | DIGIT_ | '_')+;

QUOTED_IDENTIFIER_: '"' ( ~'"' | '""')* '"';

BACKQUOTED_IDENTIFIER_: '`' ( ~'`' | '``')* '`';

fragment EXPONENT_: 'E' [+-]? DIGIT_+;

fragment DIGIT_: [0-9];

fragment LETTER_: [A-Z];

SIMPLE_COMMENT_: '--' ~[\r\n]* '\r'? '\n'? -> skip;

BRACKETED_COMMENT_: '/*' .*? '*/' -> skip;

WS_: [ \r\n\t]+ -> channel(HIDDEN);

// Catch-all for anything we can't recognize.
// We use this to be able to ignore and recover all the text
// when splitting statements with DelimiterLexer
UNRECOGNIZED_: .;