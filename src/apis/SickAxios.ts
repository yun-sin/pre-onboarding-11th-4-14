import axios from 'axios';

export async function getSick(word: string) {
  try {
    const response = await axios.get(`http://localhost:4000/sick?q=${word}`);
    console.info('calling api');

    const arr: string[] = [];
    response.data.forEach((v: any, i: number) => {
      arr.push(v.sickNm);
    });

    return arr;
  } catch (e) {
    console.error(e);
  }
}
