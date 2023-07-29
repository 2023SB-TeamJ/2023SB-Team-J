import React from 'react';
import styled from 'styled-components';

function LoadingPage() {
  return (
    <div>
      <Container />
    </div>
  );
}

export default LoadingPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
  background: ${(props) => props.theme.backgroundColor};
`;
