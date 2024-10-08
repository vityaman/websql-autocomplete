import {ColumnSuggestion} from '../../../../shared/autocomplete-types';
import {parseClickHouseQueryWithCursor, parseClickHouseQueryWithoutCursor} from '../../index';

test('should suggest table name after MODIFY COLUMN', () => {
    const autocompleteResult = parseClickHouseQueryWithCursor(
        'ALTER TABLE test_table MODIFY COLUMN |',
    );
    const columnSuggestion: ColumnSuggestion = {tables: [{name: 'test_table'}]};

    expect(autocompleteResult.suggestColumns).toEqual(columnSuggestion);
});

test('should suggest table name after MODIFY COLUMN between statements', () => {
    const autocompleteResult = parseClickHouseQueryWithCursor(
        'ALTER TABLE before_table DROP COLUMN id; ALTER TABLE test_table MODIFY COLUMN | ; ALTER TABLE after_table DROP COLUMN id;',
    );
    const columnSuggestion: ColumnSuggestion = {tables: [{name: 'test_table'}]};

    expect(autocompleteResult.suggestColumns).toEqual(columnSuggestion);
});

test('should not report errors', () => {
    const autocompleteResult = parseClickHouseQueryWithoutCursor(
        'ALTER TABLE test_table MODIFY COLUMN id INT;',
    );

    expect(autocompleteResult.errors).toHaveLength(0);
});
