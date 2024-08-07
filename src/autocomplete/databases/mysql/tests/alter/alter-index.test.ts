import {parseMySqlQueryWithCursor, parseMySqlQueryWithoutCursor} from '../../index';
import {KeywordSuggestion} from '../../../../shared/autocomplete-types';

test('should suggest table name after ALTER INDEX', () => {
    const autocompleteResult = parseMySqlQueryWithCursor('ALTER TABLE test_table ALTER INDEX |');

    const keywordSuggestion: KeywordSuggestion[] = [];
    expect(autocompleteResult.suggestKeywords).toEqual(keywordSuggestion);

    expect(autocompleteResult.suggestIndexes).toEqual(true);
});

test('should not report errors on a full statement', () => {
    const autocompleteResult = parseMySqlQueryWithoutCursor(
        'ALTER TABLE test_table ALTER INDEX test_index VISIBLE;',
    );
    expect(autocompleteResult.errors).toHaveLength(0);
});
