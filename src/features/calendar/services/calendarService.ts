import axios from 'axios';

export const getDiaries = async () => {
  const res = await axios.get('/diaries');
  return res.data;
};
