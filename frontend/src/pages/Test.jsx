import React from 'react';
import { styled } from 'styled-components';
import AlbumDetailModal from '../components/AlbumDetailModal';

function Test() {
  return (
    <div>
      <Container>
        <h1>테스트 페이지 입니다</h1>
        <AlbumDetailModal />
      </Container>
    </div>
  );
}

export default Test;

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${(props) => props.theme.backgroundColor};
`;
