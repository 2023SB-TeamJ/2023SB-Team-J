import React from 'react';
import styled from 'styled-components';
import Logo from './Logo';
import Name from './Name';
import SignBtn from './SignBtn';

function HeaderMain() {
  return (
    <div>
      <Container>
        <LogoWrap>
          <Logo />
          <Name />
        </LogoWrap>
        <BtnWrap>
          <LoginBtn>로그인</LoginBtn>
          <SignBtn className="signUp">회원가입</SignBtn>
        </BtnWrap>
      </Container>
    </div>
  );
}

export default HeaderMain;
const Container = styled.div`
  display: flex;
  margin-top: 3rem;
  align-items: center;
  justify-content: space-between;
`;

const LogoWrap = styled.div`
  display: flex;
  align-items: center;
`;

const BtnWrap = styled.div`
  display: flex;
`;

const LoginBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 90px;
  height: 35px;
  flex-shrink: 0;
  border-radius: 30px;
  background: #fff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  border: none;
  margin-right: 14px;

  color: #000;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  cursor: pointer;

  &:hover {
    background-color: #000;
    color: #fff;
    transition: all 0.4s;
  }
`;
