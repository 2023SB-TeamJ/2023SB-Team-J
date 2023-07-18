import React from 'react';
import { styled } from 'styled-components';
import HeaderMain from '../components/HeaderMain';

function TestPage() {
  return (
    <div>
      <Container>
        <MainWrap>
          <HeaderMain />
        </MainWrap>
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
