/* eslint no-useless-escape: "off" */
/* eslint filenames/match-regex: "off" */
/* eslint no-irregular-whitespace: "off" */
import {parseClickHouseQueryWithoutCursor} from '../../index';

test('[REPLACE] should pass without errors: 1', () => {
    const query = `REPLACE DICTIONARY 01913_db.test_dictionary (
id UInt64,
value_1 String
)
PRIMARY KEY id
LAYOUT(HASHED())
SOURCE(CLICKHOUSE(DB '01913_db' TABLE 'test_source_table_2'))
LIFETIME(0);`;

    const autocompleteResult = parseClickHouseQueryWithoutCursor(query);
    expect(autocompleteResult.errors).toHaveLength(0);
});

test('[REPLACE] should pass without errors: 2', () => {
    const query = `replace table t1 (n UInt64, s String) engine=MergeTree order by n; -- { serverError UNKNOWN_TABLE } show tables;`;

    const autocompleteResult = parseClickHouseQueryWithoutCursor(query);
    expect(autocompleteResult.errors).toHaveLength(0);
});

test('[REPLACE] should pass without errors: 3', () => {
    const query = `replace table t1 (n UInt64) engine=MergeTree order by n;`;

    const autocompleteResult = parseClickHouseQueryWithoutCursor(query);
    expect(autocompleteResult.errors).toHaveLength(0);
});

test('[REPLACE] should pass without errors: 4', () => {
    const query = `replace table buf (n int) engine=Distributed(test_shard_localhost, currentDatabase(), dist);`;

    const autocompleteResult = parseClickHouseQueryWithoutCursor(query);
    expect(autocompleteResult.errors).toHaveLength(0);
});

test('[REPLACE] should pass without errors: 5', () => {
    const query = `replace table dist (n int) engine=Buffer(currentDatabase(), t, 1, 10, 100, 10, 100, 1000, 1000);`;

    const autocompleteResult = parseClickHouseQueryWithoutCursor(query);
    expect(autocompleteResult.errors).toHaveLength(0);
});

test('[REPLACE] should pass without errors: 6', () => {
    const query = `replace table buf (n int) engine=Buffer(currentDatabase(), dist, 1, 10, 100, 10, 100, 1000, 1000);`;

    const autocompleteResult = parseClickHouseQueryWithoutCursor(query);
    expect(autocompleteResult.errors).toHaveLength(0);
});

test('[REPLACE] should pass without errors: 7', () => {
    const query = `replace table dist (n int) engine=Distributed(test_shard_localhost, currentDatabase(), t);`;

    const autocompleteResult = parseClickHouseQueryWithoutCursor(query);
    expect(autocompleteResult.errors).toHaveLength(0);
});

test('[REPLACE] should pass without errors: 8', () => {
    const query = `replace table buf (n int) engine=Null;`;

    const autocompleteResult = parseClickHouseQueryWithoutCursor(query);
    expect(autocompleteResult.errors).toHaveLength(0);
});

test('[REPLACE] should pass without errors: 9', () => {
    const query = `replace table dist (n int) engine=Null;`;

    const autocompleteResult = parseClickHouseQueryWithoutCursor(query);
    expect(autocompleteResult.errors).toHaveLength(0);
});

test('[REPLACE] should pass without errors: 10', () => {
    const query = `replace table join engine=Join(ANY, INNER, n) as select * from t where throwIf(n); -- { serverError FUNCTION_THROW_IF_VALUE_IS_NON_ZERO } select * from numbers(10) as t any join join on t.number=join.n order by n;`;

    const autocompleteResult = parseClickHouseQueryWithoutCursor(query);
    expect(autocompleteResult.errors).toHaveLength(0);
});

test('[REPLACE] should pass without errors: 11', () => {
    const query = `replace table join engine=Join(ANY, INNER, n) as select * from t;`;

    const autocompleteResult = parseClickHouseQueryWithoutCursor(query);
    expect(autocompleteResult.errors).toHaveLength(0);
});
