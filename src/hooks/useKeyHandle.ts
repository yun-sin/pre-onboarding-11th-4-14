import { useState, useCallback, useEffect } from 'react';

export function useKeyHandle({ searchResult }: { searchResult: string[] }) {
  const [selectedId, setSelectedId] = useState(0);

  const onKeyHandle = useCallback(
    (e: any) => {
      if (searchResult.length > 0) {
        const lastIndex = searchResult.length - 1;
        let nextIndex = selectedId;

        if (e.key === 'ArrowUp') {
          nextIndex = selectedId === 0 ? lastIndex : nextIndex - 1;
        } else if (e.key === 'ArrowDown') {
          nextIndex = selectedId === lastIndex ? 0 : nextIndex + 1;
        } else if (e.key === 'Enter') {
          alert(searchResult[selectedId]);
        }
        setSelectedId(nextIndex);
      }
    },
    [searchResult, selectedId],
  );

  useEffect(() => {
    setSelectedId(0);
  }, [searchResult]);

  return { selectedId, onKeyHandle };
}
