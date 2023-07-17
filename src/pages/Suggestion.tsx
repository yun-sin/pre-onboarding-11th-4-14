import React, { memo } from 'react';
import { SuggestionContainer } from '../styles/Suggestion.styled';

const Suggestion = memo(
  ({ searchResult, recentSearch }: { searchResult: string[]; recentSearch: string[] }) => {
    return (
      <SuggestionContainer>
        <div className='recommendTitle'>
          {searchResult.length > 0 ? '추천 검색어' : '최근 검색어'}
        </div>

        <ul>
          {searchResult.length > 0 &&
            searchResult.map((v, i) => (
              <li className='recommendText' key={i}>
                💡 {v}
              </li>
            ))}

          {searchResult.length < 1 &&
            recentSearch.length > 0 &&
            recentSearch.map((v, i) => (
              <li key={i} data-text={v} className='recommendText'>
                🔍 {v}
              </li>
            ))}
        </ul>
      </SuggestionContainer>
    );
  },
);

export default Suggestion;
