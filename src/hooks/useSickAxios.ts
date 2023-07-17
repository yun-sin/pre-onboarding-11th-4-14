// input값이 바뀔경우 지연시간 이후 api를 호출하는 custom hook
// input 값이 없을 경우 localstorage에서 최근 검색어 출력

import React, { useState, useEffect } from 'react';
import { getSick } from '../apis/SickAxios';

export function useSickAxios() {
  const [searchResult, setSearchResult] = useState<string[]>([]);
  const [recentSearch, setRecentSearch] = useState<string[]>([]);
  const [timerId, setTimerId] = useState<number>();

  useEffect(() => {
    const recent = localStorage.getItem('recent');
    if (recent) setRecentSearch(JSON.parse(recent));
    setSearchResult([]);
  }, []);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timerId); // 이전의 타이머를 취소

    const inputText = e.target.value.trim();

    if (inputText !== '') {
      setSearchResult(['검색중...']);
      const id = setTimeout(async () => {
        const data = await getSick(inputText); // 500ms 지연 후 API 호출
        if (data) setSearchResult(data);
      }, 500);
      setTimerId(Number(id));
    } else {
      const recent = localStorage.getItem('recent');
      if (recent) setRecentSearch(JSON.parse(recent));
      setSearchResult([]);
    }
  };

  return { searchResult, recentSearch, onInputChange };
}
