/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import React, { useState } from 'react';
import { styled } from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import HeaderMain from '../components/HeaderMain';

function TestPage() {
  const { isLoggedIn } = useAuth();

  return (
    <div>
      <Container>
        <MainWrap>{isLoggedIn ? <Header /> : <HeaderMain />}</MainWrap>
      </Container>
    </div>
  );
}

export default TestPage;

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${(props) => props.theme.backgroundColor};
`;

const MainWrap = styled.div`
  max-width: 1440px;
  width: 76vw;
  height: 100vh;
  margin: 0 auto;
  flex-shrink: 0;
  border: 3px solid black;
`;
