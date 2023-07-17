import axios from 'axios';
import { setCookie, getCookie } from '../utils/Cookie';

export async function getSick(word: string) {
  try {
    if (getCookie(word)) {
      console.info('using cookie');

      const data = getCookie(word)?.split(',');
      console.log(data);
      return data;
    }

    const response = await axios.get(`http://localhost:4000/sick?q=${word}`);
    console.info('calling api');

    const arr: string[] = [];
    response.data.forEach((v: any, i: number) => {
      arr.push(v.sickNm);
    });

    setCookie(word, arr);

    return arr;
  } catch (e) {
    console.error(e);
  }
}
