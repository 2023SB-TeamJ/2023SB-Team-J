/* eslint-disable consistent-return */
import axios from 'axios';

const getCsrfToken = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/v1/login/');
    const { csrfToken } = response.data;

    // Token을 쿠키에 저장
    document.cookie = `csrfToken=${csrfToken}; path=/`;

    return csrfToken;
  } catch (error) {
    console.log(error);
  }
};

export default getCsrfToken;
