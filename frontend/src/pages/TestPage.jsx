/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react/button-has-type */
import React from 'react';
// import { Image } from 'react-konva';
import { styled } from 'styled-components';
// import ImageCropper from '../components/ImageCropper';
import ImageAspectRatioConverter from '../components/ImageAspectRatioConverter';

function TestPage() {
  const imageUrl =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2GKJzlQWwDbdHkkkfpqyJwDsqFPVdWQ_txQ&usqp=CAU';

  return (
    <div>
      <Container>
        <MainWrap>
          <Wrapper>
            <h1>Image Cropper</h1>
            {/* <ImageCropper imageUrl={imageUrl} /> */}
            <ImageAspectRatioConverter url={imageUrl} />
          </Wrapper>
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

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
