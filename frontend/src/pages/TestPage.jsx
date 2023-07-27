/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react/button-has-type */
import React from 'react';
// import { Image } from 'react-konva';
import { styled } from 'styled-components';

function TestPage() {
  const url = 'https://konvajs.github.io/assets/yoda.jpg';

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = url;
    link.download = 'image.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <Container>
        <MainWrap>
          <img src={url} alt="Image" />
          <button onClick={handleDownload}>이미지 다운로드</button>
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
