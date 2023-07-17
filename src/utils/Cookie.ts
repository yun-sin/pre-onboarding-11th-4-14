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
