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
      const csrfToken = document.cookie
        .split('; ')
        .find((row) => row.startsWith('csrfToken='));
      if (!csrfToken) {
        console.error('CSRF Token not found in cookies.');
        return;
      }
      const csrfTokenValue = csrfToken.split('=')[1];
      const requestData = {};

      const response = await axios.post(
        'http://localhost:8000/api/v1/logout/',
        requestData,
        {
          withCredentials: true,
          headers: {
            'X-XSRF-TOKEN': csrfTokenValue,
          },
        },
      );

      console.log('Request Data:', requestData);
      console.log('Logout Response:', response.data);

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
