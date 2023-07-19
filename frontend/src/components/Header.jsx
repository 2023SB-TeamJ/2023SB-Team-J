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

  const handleLogout = async () => {
    try {
      const csrfToken = document.cookie // 쿠키에서 CSRF 토큰 추출
        .split('; ')
        .find((row) => row.startsWith('csrfToken='))
        .split('=')[1];

      console.log('Extracted CSRF Token:', csrfToken);

      const response = await axios.post(
        'http://localhost:8000/api/v1/logout/',
        {},
        {
          headers: {
            'X-XSRF-TOKEN': csrfToken, // 쿠키에서 추출한 CSRF 토큰을 요청 헤더에 포함
          },
        },
      );

      // 로그아웃 성공 시 로그인 상태를 false로 설정하고 알림 표시
      if (response.status === 200) {
        setIsLoggedIn(false);
        navigate('/test');
        alert('로그아웃 성공!');
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
