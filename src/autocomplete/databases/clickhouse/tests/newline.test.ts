import {parseClickHouseQueryWithoutCursor} from '../index';

test('should not report errors with newlines \n', () => {
    const autocompleteResult = parseClickHouseQueryWithoutCursor('SELECT *\n\n\nFROM test_table');

    expect(autocompleteResult.errors).toHaveLength(0);
});

test('should not report errors with newlines \r\n', () => {
    const autocompleteResult = parseClickHouseQueryWithoutCursor(
        'SELECT *\r\n\r\n\r\nFROM test_table',
    );

    expect(autocompleteResult.errors).toHaveLength(0);
});
