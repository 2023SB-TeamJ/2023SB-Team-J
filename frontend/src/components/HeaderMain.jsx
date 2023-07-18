import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo';
import Name from './Name';
import SignBtn from './SignBtn';
import SignUpModal from './SignUpModal';
import LoginModal from './LoginModal';

function HeaderMain() {
  const navigate = useNavigate();
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [signUpModalOpen, setSignUpModalOpen] = useState(false);
  const handleOpenLoginModal = () => {
    setLoginModalOpen(true);
  };
  const handleCloseLoginModal = () => {
    setLoginModalOpen(false);
  };
  const handleOpenSignUpModal = () => {
    setSignUpModalOpen(true);
  };
  const handleCloseSignUpModal = () => {
    setSignUpModalOpen(false);
  };
  return (
    <div>
      <Container>
        <LogoWrap onClick={() => navigate('/')}>
          <Logo />
          <Name />
        </LogoWrap>
        <BtnWrap>
          <LoginBtn onClick={handleOpenLoginModal}>로그인</LoginBtn>
          <SignBtn className="signUp" onClick={handleOpenSignUpModal}>
            회원가입
          </SignBtn>
        </BtnWrap>
        <SignUpModal
          isOpen={signUpModalOpen}
          onClose={handleCloseSignUpModal}
        />
        <LoginModal isOpen={loginModalOpen} onClose={handleCloseLoginModal} />
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

  &:hover {
    cursor: pointer;
  }
`;

const BtnWrap = styled.div`
  display: flex;

  @media screen and (max-width: 600px) {
    flex-direction: column;
    align-items: center;
  }
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

  @media screen and (max-width: 600px) {
    margin-right: 0;
    margin-bottom: 10px;
    width: 120px;
  }
`;
