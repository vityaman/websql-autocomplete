import {KeywordSuggestion, TableOrViewSuggestion} from '../../../../shared/autocomplete-types';
import {parseMySqlQueryWithCursor} from '../../index';

test('should suggest keywords after ALTER', () => {
    const autocompleteResult = parseMySqlQueryWithCursor('ALTER |');
    const keywords: KeywordSuggestion[] = [
        {value: 'USER'},
        {value: 'VIEW'},
        {value: 'SQL'},
        {value: 'DEFINER'},
        {value: 'ALGORITHM'},
        {value: 'TABLESPACE'},
        {value: 'TABLE'},
        {value: 'IGNORE'},
        {value: 'OFFLINE'},
        {value: 'ONLINE'},
        {value: 'SERVER'},
        {value: 'PROCEDURE'},
        {value: 'LOGFILE'},
        {value: 'INSTANCE'},
        {value: 'FUNCTION'},
        {value: 'EVENT'},
        {value: 'DATABASE'},
        {value: 'SCHEMA'},
    ];

    expect(autocompleteResult.suggestKeywords).toEqual(keywords);
});

test('should suggest keywords after TABLE', () => {
    const autocompleteResult = parseMySqlQueryWithCursor('ALTER TABLE |');

    const keywords: KeywordSuggestion[] = [];
    expect(autocompleteResult.suggestKeywords).toEqual(keywords);
    expect(autocompleteResult.suggestViewsOrTables).toEqual(TableOrViewSuggestion.TABLES);
});

test('should suggest tables after ALTER TABLE between statements', () => {
    const autocompleteResult = parseMySqlQueryWithCursor(
        'DROP VIEW before_view; ALTER TABLE | ; DROP VIEW after_view;',
    );

    expect(autocompleteResult.suggestViewsOrTables).toEqual(TableOrViewSuggestion.TABLES);
});

test('should suggest keywords after TABLE', () => {
    const autocompleteResult = parseMySqlQueryWithCursor('ALTER TABLE test_table |');

    const keywords: KeywordSuggestion[] = [
        {value: 'PARTITION'},
        {value: 'ENGINE'},
        {value: 'AUTOEXTEND_SIZE'},
        {value: 'AUTO_INCREMENT'},
        {value: 'AVG_ROW_LENGTH'},
        {value: 'DEFAULT'},
        {value: 'CHARACTER'},
        {value: 'CHAR'},
        {value: 'CHECKSUM'},
        {value: 'PAGE_CHECKSUM'},
        {value: 'COLLATE'},
        {value: 'COMMENT'},
        {value: 'COMPRESSION'},
        {value: 'CONNECTION'},
        {value: 'INDEX'},
        {value: 'DATA'},
        {value: 'DELAY_KEY_WRITE'},
        {value: 'ENCRYPTION'},
        {value: 'PAGE_COMPRESSED'},
        {value: 'PAGE_COMPRESSION_LEVEL'},
        {value: 'ENCRYPTION_KEY_ID'},
        {value: 'INSERT_METHOD'},
        {value: 'KEY_BLOCK_SIZE'},
        {value: 'MAX_ROWS'},
        {value: 'MIN_ROWS'},
        {value: 'PACK_KEYS'},
        {value: 'PASSWORD'},
        {value: 'ROW_FORMAT'},
        {value: 'START'},
        {value: 'STATS_AUTO_RECALC'},
        {value: 'STATS_PERSISTENT'},
        {value: 'STATS_SAMPLE_PAGES'},
        {value: 'TABLESPACE'},
        {value: 'TABLE_TYPE'},
        {value: 'STORAGE'},
        {value: 'TRANSACTIONAL'},
        {value: 'UNION'},
        {value: 'ADD'},
        {value: 'ALTER'},
        {value: 'ALGORITHM'},
        {value: 'CHANGE'},
        {value: 'RENAME'},
        {value: 'LOCK'},
        {value: 'MODIFY'},
        {value: 'DROP'},
        {value: 'DISABLE'},
        {value: 'ENABLE'},
        {value: 'ORDER'},
        {value: 'CONVERT'},
        {value: 'DISCARD'},
        {value: 'IMPORT'},
        {value: 'FORCE'},
        {value: 'WITH'},
        {value: 'WITHOUT'},
        {value: 'TRUNCATE'},
        {value: 'COALESCE'},
        {value: 'REORGANIZE'},
        {value: 'EXCHANGE'},
        {value: 'ANALYZE'},
        {value: 'CHECK'},
        {value: 'OPTIMIZE'},
        {value: 'REBUILD'},
        {value: 'REPAIR'},
        {value: 'REMOVE'},
        {value: 'UPGRADE'},
        {value: 'WAIT'},
        {value: 'NOWAIT'},
    ];
    expect(autocompleteResult.suggestKeywords).toEqual(keywords);
});

test('should suggest tables after ALTER VIEW', () => {
    const autocompleteResult = parseMySqlQueryWithCursor('ALTER VIEW |');

    const keywords: KeywordSuggestion[] = [];
    expect(autocompleteResult.suggestKeywords).toEqual(keywords);
    expect(autocompleteResult.suggestViewsOrTables).toEqual(TableOrViewSuggestion.VIEWS);
});

test('should suggest tables after ALTER VIEW between statements', () => {
    const autocompleteResult = parseMySqlQueryWithCursor(
        'ALTER TABLE before_table DROP COLUMN id; ALTER VIEW | ; ALTER TABLE after_table DROP COLUMN id;',
    );

    expect(autocompleteResult.suggestViewsOrTables).toEqual(TableOrViewSuggestion.VIEWS);
});
