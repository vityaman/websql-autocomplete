import {parseMySqlQueryWithCursor} from '../../../../shared/parse-query-with-cursor';
import {KeywordSuggestion} from '../../../../autocomplete-types';
import {parseMySqlQueryWithoutCursor} from '../../../../autocomplete';

test('should suggest table name after ALTER CONSTRAINT', () => {
    const autocompleteResult = parseMySqlQueryWithCursor(
        'ALTER TABLE test_table ALTER CONSTRAINT |',
    );

    const keywordSuggestion: KeywordSuggestion[] = [{value: 'CHECK'}];
    expect(autocompleteResult.suggestKeywords).toEqual(keywordSuggestion);

    expect(autocompleteResult.suggestConstraints).toEqual(true);
});

test('should not report errors on a full statement', () => {
    const autocompleteResult = parseMySqlQueryWithoutCursor(
        'ALTER TABLE test_table ALTER CONSTRAINT test_constraint CHECK (test_column > 1);',
    );
    expect(autocompleteResult.errors).toHaveLength(0);
});