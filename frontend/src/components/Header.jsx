import React from 'react';
import styled from 'styled-components';
import Logo from './Logo';
import Name from './Name';
import SignBtn from './SignBtn';

function ChooseFramePage() {
  return (
    <div>
      <Container>
        <LogoWrap>
          <Logo />
          <Name />
        </LogoWrap>
        <BtnWrap>
          <SignBtn>로그아웃</SignBtn>
        </BtnWrap>
      </Container>
    </div>
  );
}

export default ChooseFramePage;
const Container = styled.div`
  display: flex;
  margin-top: 3rem;
  align-items: center;
  justify-content: space-between;
`;

const LogoWrap = styled.div`
  display: flex;
`;

const BtnWrap = styled.div``;
