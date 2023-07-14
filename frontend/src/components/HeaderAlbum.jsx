import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo';
import Name from './Name';
import SignBtn from './SignBtn';

function HeaderAlbum() {
  const navigate = useNavigate();

  return (
    <HeaderWrapper>
      <Container>
        <LogoWrap onClick={() => navigate('/')}>
          <Logo />
          <Name />
        </LogoWrap>
        <BtnWrap>
          <AlbumUserName>Andrew Park님의 앨범</AlbumUserName>
          <SignBtn>로그아웃</SignBtn>
        </BtnWrap>
      </Container>
    </HeaderWrapper>
  );
}

export default HeaderAlbum;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  display: flex;
  width: 76vw;
  margin: 0 auto;
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

const AlbumUserName = styled.div`
  display: flex;
  width: 280px;
  height: 29px;
  margin-right: 5px;
  color: ${(props) => props.theme.deepGrayColor};
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  @media screen and (max-width: 1000px) {
    display: none;
  }
`;
