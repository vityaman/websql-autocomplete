import {parseClickHouseQueryWithoutCursor} from '../..';

test('should not report errors with newlines \n', () => {
    const parseResult = parseClickHouseQueryWithoutCursor('SELECT *\n\n\nFROM test_table');

    expect(parseResult.errors).toHaveLength(0);
});

test('should not report errors with newlines \r\n', () => {
    const parseResult = parseClickHouseQueryWithoutCursor('SELECT *\r\n\r\n\r\nFROM test_table');

    expect(parseResult.errors).toHaveLength(0);
});