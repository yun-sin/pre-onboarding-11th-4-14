import React, { useState } from 'react';
import { getSick } from '../apis/SickAxios';

export function useSickAxios() {
  const [searchResult, setSearchResult] = useState<string[]>(['검색어 없음']);
  const [timerId, setTimerId] = useState<number>();

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
      setSearchResult(['검색어 없음']);
    }
  };

  return { searchResult, onInputChange };
}
