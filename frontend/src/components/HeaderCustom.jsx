/* eslint-disable no-plusplus */
import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logo from './Logo';
import Name from './Name';
import SignBtn from './SignBtn';
import { useAuth } from '../contexts/AuthContext';

const apiUrl = process.env.REACT_APP_API_URL;

function HeaderCustom() {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth();

  // 로그아웃 API 요청
  const handleLogout = async () => {
    try {
      const refresh = localStorage.getItem('refresh');
      const access = localStorage.getItem('access');

      const response = await axios.post(
        `${apiUrl}logout/`,
        { refresh },
        { headers: { Authorization: `Bearer ${access}` } },
      );

      if (response.status === 200) {
        localStorage.removeItem('refresh');
        localStorage.removeItem('access');
        setIsLoggedIn(false);
        alert('로그아웃 성공!');
        navigate('/');
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <Container>
        <LogoWrap
          onClick={() => {
            navigate('/');
            window.location.reload();
          }}
        >
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

export default HeaderCustom;
const Container = styled.div`
  display: flex;
  padding-top: 1rem;
  padding-left: 2rem;
  padding-right: 2rem;
  padding-bottom: 1rem;
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
