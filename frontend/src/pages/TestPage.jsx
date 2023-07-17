import React from 'react';
import { styled } from 'styled-components';
import UploadImage from '../components/UploadImage';

function TestPage() {
  return (
    <div>
      <Container>
        <MainWrap>
          <div>테스트 페이지 입니다</div>
          <UploadImage />
          <UploadImage />
          <UploadImage />
          <UploadImage />
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
