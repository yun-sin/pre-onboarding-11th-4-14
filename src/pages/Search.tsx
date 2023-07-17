import React, { memo, useState } from 'react';
import Suggestion from './Suggestion';
import { SearchContainer } from '../styles/Search.styled';
import { useSickAxios } from '../hooks/useSickAxios';
import { useRecentLocal } from '../hooks/useRecentLocal';
import { useKeyHandle } from '../hooks/useKeyHandle';

const Search = memo(() => {
  const [sugOn, setSugOn] = useState(false);
  const { searchResult, recentSearch, onInputChange } = useSickAxios();
  const { inputRef, onSearchSubmit } = useRecentLocal();
  const { selectedId, onKeyHandle } = useKeyHandle({ searchResult });

  return (
    <>
      <SearchContainer>
        <h1>
          국내 모든 임상시험 검색하고
          <br />
          온라인으로 참여하기
        </h1>
        <div className='searchInputContainer'>
          <form onSubmit={onSearchSubmit}>
            <input
              ref={inputRef}
              id='searchInput'
              className='searchInput'
              type='text'
              onFocus={() => setSugOn(true)}
              onBlur={() => setSugOn(false)}
              onChange={onInputChange}
              onKeyDown={onKeyHandle}></input>
            <button className='searchBtn' type='submit'>
              🔍
            </button>
          </form>
        </div>
      </SearchContainer>
      {sugOn && (
        <Suggestion
          searchResult={searchResult}
          recentSearch={recentSearch}
          selectedId={selectedId}
        />
      )}
    </>
  );
});

export default Search;
