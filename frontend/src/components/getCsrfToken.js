/* eslint-disable consistent-return */
import axios from 'axios';

// CSRF 토큰 받아오는 API
const getCsrfToken = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/v1/login/');
    const { csrftoken } = response.data;

    // Token을 쿠키에 저장
    document.cookie = `csrftoken=${csrftoken}; path=/`;
  } catch (error) {
    console.log(error);
  }
};

export default getCsrfToken;
