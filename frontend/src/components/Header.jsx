/* eslint-disable no-plusplus */
import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logo from './Logo';
import Name from './Name';
import SignBtn from './SignBtn';
import { useAuth } from '../contexts/AuthContext';

function Header() {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth();

  // 로그아웃 API 요청
  const handleLogout = async () => {
    try {
      const cookies = document.cookie.split(';'); // 모든 쿠키 가져오기
      let jwtToken = '';

      // 쿠키에서 JWT 토큰 찾기
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith('jwt=')) {
          jwtToken = cookie.substring(4); // 'jwt=' 제외한 토큰 값만 추출
          break;
        }
      }

      const response = await axios.post(
        'http://localhost:8000/api/v1/logout/',
        {
          token: jwtToken, // JWT 토큰을 요청 데이터에 포함하여 전송
        },
      );

      if (response.status === 200) {
        // 쿠키에서 JWT 토큰을 삭제
        document.cookie =
          'jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        setIsLoggedIn(false);
        alert('로그아웃 성공!');
        navigate('/test');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Container>
        <LogoWrap onClick={() => navigate('/')}>
          <Logo />
          <Name />
        </LogoWrap>
        <BtnWrap>
          <SignBtn onClick={handleLogout}>로그아웃</SignBtn>
        </BtnWrap>
      </Container>
    </div>
  );
}

export default Header;
const Container = styled.div`
  display: flex;
  margin-top: 3rem;
  align-items: center;
  justify-content: space-between;
`;

const LogoWrap = styled.div`
  display: flex;
  align-items: center;

  &:hover {
    cursor: pointer;
  }
`;

const BtnWrap = styled.div``;
