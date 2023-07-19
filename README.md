# pre-onboarding-11th-4-14

원티드 프리온보딩 4주차 개인 과제

## About

<div align='center'>
   <p><a href="https://clinicaltrialskorea.com/">한국임상정보</a>의 검색 영역을 클론하여 <br/>
검색창, 검색어 추천 기능, 캐싱 기능을 구현하는 개인 과제입니다. </p>
<!--   <a href="http://wanted-11th-3-14-test.s3-website.ap-northeast-2.amazonaws.com/"><strong>배포 링크</strong></a> -->
</div>

<div align='right'> 2023.07.16 ~ 2023.07.19 </div>



## 기술 스택

- Development

  ![React](https://img.shields.io/badge/Create--React--App-5.0.1-20232A?logo=react)
  ![react-router-dom](https://img.shields.io/badge/react--router-6.14.1-CA4245?logo=reactRouter)
  ![typescript](https://img.shields.io/badge/typescript-4.9.5-007ACC?logo=typescript)
  ![styled-components](https://img.shields.io/badge/styled--components%2Fcss-6.0.3-28A745?logo=styled-components)
  ![axios](https://img.shields.io/badge/axios-1.4.0-%23671DDF?logo=axios&logoColor=%23671DDF)

<br/>

## 폴더 구조

```
📦src
 ┣ 📂api
 ┣ 📂hooks
 ┣ 📂pages
 ┣ 📂styles
 ┣ 📂utils
 ┣ 📜App.tsx
 ┣ 📜index.tsx
 ┗ 📜react-app-env.d.ts
```


## 요구 사항

### API 호출별로 로컬 캐싱 구현
   - 브라우저의 Cookie를 사용
   - API 호출시 해당 검색어에 저장되어 있는 Cookie 확인
     - 쿠키에 있을 경우 -> 쿠키 데이터 출력
     - 쿠키에 없을 경우 -> API 호출하여 데이터 출력 -> 쿠키에 데이터 저장 `expire time 10분`
    

```js
// Cookie.ts

// 쿠키를 설정하는 함수
export function setCookie(key: string, value: string[]) {
  const expireDate = new Date().getTime() + 6000 * 10; // 1분의 expire time
  document.cookie = `${key}=${value}; path=/; expires=${new Date(expireDate).toUTCString()}`;
}

// 쿠키를 가져오는 함수
export function getCookie(key: string) {
  const cookieKey = `${key}=`;
  const cookies = document.cookie.split(';');

  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(cookieKey) === 0) {
      return decodeURIComponent(cookie.substring(cookieKey.length));
    }
  }

  return null;
}
```

```ts
// SickAxios.ts

import axios from 'axios';
import { setCookie, getCookie } from '../utils/Cookie';

export async function getSick(word: string) {
  try {
    // API 호출 전 쿠키 확인
    if (getCookie(word)) {
      console.info('using cookie');
      const data = getCookie(word)?.split(',');
      return data;
    }

    const response = await axios.get(`http://localhost:4000/sick?q=${word}`);
    console.info('calling api');
    const arr: string[] = [];
    response.data.forEach((v: any, i: number) => {
      arr.push(v.sickNm);
    });

    if (arr.length < 1) {
      arr.push('검색결과 없음');
    }

    // 쿠키에 데이터 저장
    setCookie(word, arr);

    return arr;
  } catch (e) {
    console.error(e);
  }
}

```

<br/>

### 입력마다 API 호출하지 않도록 API 호출 횟수를 줄이는 전략 수립 및 실행
   - setTimeout을 사용, input의 값이 바뀌면  0.5초후 API 호출
   - 대기중 값이 또 바뀌면 그전의 타이머를 clearTimeout으로 삭제

```ts
//useSickAxios.ts

// input값이 바뀔경우 지연시간 이후 api를 호출하는 custom hook
.
.
.
  const [timerId, setTimerId] = useState<number>();
.
.
.
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
    }
.
.
.
```

<br/>

### 키보드만으로 추천 검색어들로 이동 가능하도록 구현
- input에 onKeyDown에 이벤트 삽입 (위,아래 방향키, 엔터)
- useState를 활용하여 검색 결과 목록에서 selectedId에 해당하는 인덱스에 클래스 삽입 후 css 강조
- 선택 후 엔터 입력시 alert창 출력

```ts
// useKeyHandle.ts

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

```
