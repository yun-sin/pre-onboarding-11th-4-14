// 최근 검색어 구현
// input이 submit 될 경우 해당 값을 localstorage에 저장하는 custom hook
// 최근 검색어는 5개까지 저장되며 최근일수록 먼저 출력
import { useRef } from 'react';

export function useRecentLocal() {
  const inputRef = useRef<HTMLInputElement>(null);

  const onSearchSubmit = (e: any) => {
    e.preventDefault();

    if (inputRef.current) {
      const word = inputRef.current.value.trim();

      if (word) {
        const localData = JSON.parse(localStorage.getItem('recent') || '[]');

        if (localData.includes(word)) {
          localData.splice(localData.indexOf(word), 1);
        }

        if (localData.length >= 5) {
          localData.pop();
        }

        localData.unshift(word);
        localStorage.setItem('recent', JSON.stringify(localData));
      }
    }
  };

  return { inputRef, onSearchSubmit };
}
