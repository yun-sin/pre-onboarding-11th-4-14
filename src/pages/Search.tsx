import React, { memo, useState } from 'react';
import Suggestion from './Suggestion';
import { SearchContainer } from '../styles/Search.styled';
import { useSickAxios } from '../hooks/useSickAxios';

const Search = memo(() => {
  const [sugOn, setSugOn] = useState(false);
  const { searchResult, onInputChange } = useSickAxios();

  return (
    <>
      <SearchContainer>
        <h1>
          국내 모든 임상시험 검색하고
          <br />
          온라인으로 참여하기
        </h1>
        <div className='searchInputContainer'>
          <input
            id='searchInput'
            className='searchInput'
            type='text'
            onFocus={() => setSugOn(true)}
            onBlur={() => setSugOn(false)}
            onChange={onInputChange}></input>
          <button className='searchBtn' type='submit'>
            🔍
          </button>
        </div>
      </SearchContainer>
      {sugOn && <Suggestion searchResult={searchResult} />}
    </>
  );
});

export default Search;
