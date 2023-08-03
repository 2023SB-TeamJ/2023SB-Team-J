import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logo from './Logo';
import Name from './Name';
import SignBtn from './SignBtn';
import { useAuth } from '../contexts/AuthContext';

const apiUrl = process.env.REACT_APP_API_URL;

function HeaderAlbum() {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth();
  const nickname = localStorage.getItem('nickname');
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
        localStorage.removeItem('nickname');
        setIsLoggedIn(false);
        alert('로그아웃 성공!');
        navigate('/');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <LogoWrap onClick={() => navigate('/')}>
        <Logo />
        <Name />
      </LogoWrap>
      <BtnWrap>
        <AlbumUserName>
          <span
            style={{
              color: '#dc2045',
              fontFamily: 'SUITE-Regular',
              fontWeight: '800',
              marginRight: '0.2rem',
            }}
          >
            {nickname}
          </span>
          님의 앨범
        </AlbumUserName>
        <SignBtn onClick={handleLogout}>로그아웃</SignBtn>
      </BtnWrap>
    </Container>
  );
}

export default HeaderAlbum;

const Container = styled.div`
  display: flex;
  padding-top: 2rem; // 이 크기만큼 MainPage MainWrap 높이 설정해야함
  padding-left: 2rem;
  padding-right: 2rem;
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

const BtnWrap = styled.div`
  display: flex;
  align-items: center;
`;

const AlbumUserName = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 2rem;
  color: ${(props) => props.theme.deepGrayColor};
  font-size: 1.25rem;
  font-family: 'SUITE-Regular';
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  @media screen and (max-width: 500px) {
    display: none;
  }
`;
