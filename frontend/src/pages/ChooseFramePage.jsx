/* eslint-disable no-unused-vars */
import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import oneFourImage from '../assets/images/imageSample2.jpg';
import twoTwoImage from '../assets/images/imageSample1.jpg';

function ChooseFramePage() {
  const navigate = useNavigate();

  const handleImageClick1 = () => {
    // upload 경로로 이동하면서 state 값을 함께 전달한다.
    navigate('/upload', { state: '1X4' });
  };

  const handleImageClick2 = () => {
    navigate('/upload', { state: '2X2' });
  };

  return (
    <div>
      <Container>
        <Header />
        <MainWrap>
          <ProgressBar />
          <FrameWrap>
            <ImgWrap
              // 1X4 배열 형태의 컴포넌트로 이루어진 페이지로 이동한다.
              onClick={() => {
                handleImageClick1();
              }}
            >
              <motion.img
                className="oneFour"
                src={oneFourImage}
                alt="1x4이미지"
                whileHover={{ scale: 1.1 }}
              />
            </ImgWrap>

            <ImgWrap
              // 2X2 배열 형태의 컴포넌트로 이루어진 페이지로 이동한다.
              onClick={() => {
                handleImageClick2();
              }}
            >
              <motion.img
                className="twoTwo"
                src={twoTwoImage}
                alt="2x2이미지"
                whileHover={{ scale: 1.1 }}
              />
            </ImgWrap>
          </FrameWrap>
        </MainWrap>
      </Container>
    </div>
  );
}

export default ChooseFramePage;

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #f6f6f6;
`;
const MainWrap = styled.div`
  max-width: 1440px;
  height: 100%;
  margin: 0 auto;
  flex-shrink: 0;
  align-items: center;
`;
const TitleWrap = styled.div`
  margin-top: 3rem;
  display: flex;
  justify-content: center;
`;
const ProgressBar = styled.div`
  display: flex;
  justify-content: center;
  margin: 3rem;
`;

const FrameWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImgWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  .oneFour {
    width: 11rem;
    margin: 0 5rem;
    margin-top: 3rem;

    &:hover {
      cursor: pointer;
    }
  }

  .twoTwo {
    width: 22rem;
    margin: 0 5rem;
    margin-top: 3rem;

    &:hover {
      cursor: pointer;
    }
  }
`;

// const Img1X4 = styled(motion.img)`
// whileHover={{ scale: 1.1 }}
// `;

// const Img2X2 = styled(motion.img)`
//   whileHover={{ scale: 1.1 }}
//
