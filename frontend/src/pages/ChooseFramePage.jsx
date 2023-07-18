/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Title from '../components/Title';
import oneFourImage from '../assets/images/1x4sampleImage.png';
import twoTwoImage from '../assets/images/2x2sampleImage.jpg';

function ChooseFramePage() {
  const [frameType] = useState('');
  const navigate = useNavigate();

  const handleImageClick1 = () => {
    // upload 경로로 이동하면서 state 값을 함께 전달한다.
    navigate('/upload', { state: { frameType: '1X4' } });
  };

  const handleImageClick2 = () => {
    navigate('/upload', { state: { frameType: '2X2' } });
  };
  return (
    <div>
      <Container>
        <MainWrap>
          <Header />
          <TitleWrap>
            <Title>프레임 선택</Title>
          </TitleWrap>
          <ProgressBar>
            프로그레스 바/프로그레스 바/프로그레스 바/프로그레스 바/프로그레스
            바/프로그레스 바/프로그레스 바
          </ProgressBar>
          <FrameWrap>
            <ImgWrap
              // 1X4 배열 형태의 컴포넌트로 이루어진 페이지로 이동한다.
              onClick={() => {
                handleImageClick1();
              }}
            >
              <motion.img
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
  background: ${(props) => props.theme.backgroundColor};
`;

const MainWrap = styled.div`
  max-width: 1440px;
  height: 100vh;
  margin: 0 auto;
  flex-shrink: 0;
  border: 3px solid black;
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

// const PageShiftWrap = styled.div`
//   display: flex;
//   justify-content: center;
// `;

const FrameWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImgWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 60%;
    display: block;
    margin-bottom: 20px;
    margin-left: 60px;
  }
`;

// const Img1X4 = styled(motion.img)`
// whileHover={{ scale: 1.1 }}
// `;

// const Img2X2 = styled(motion.img)`
//   whileHover={{ scale: 1.1 }}
//
