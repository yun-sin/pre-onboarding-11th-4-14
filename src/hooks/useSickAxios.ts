import React, { useState } from 'react';
import { getSick } from '../apis/SickAxios';

export function useSickAxios() {
  const [searchResult, setSearchResult] = useState<string[]>(['검색어 없음']);

  const onInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputText = e.target.value.trim();

    if (inputText !== '') {
      setSearchResult(['검색중...']);

      const data = await getSick(inputText); // 500ms 지연 후 API 호출
      if (data) setSearchResult(data);
    } else {
      setSearchResult(['검색어 없음']);
    }
  };

  return { searchResult, onInputChange };
}
