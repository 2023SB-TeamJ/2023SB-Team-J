/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import oneFourImage from '../assets/images/imageSample2.jpg';
import twoTwoImage from '../assets/images/imageSample1.jpg';
import ProgressBar from '../components/ProgressBar';

function ChooseFramePage() {
  const navigate = useNavigate();

  const handleImageClick1 = () => {
    // upload 경로로 이동하면서 state 값을 함께 전달한다.
    navigate('/upload', { state: '1X4' });
  };

  const handleImageClick2 = () => {
    navigate('/upload', { state: '2X2' });
  };

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // 0부터 50까지 프로그레스 증가 애니메이션
    let currentProgress = 0;
    const targetProgress = 1;
    const increment = 1;

    const animateProgress = () => {
      if (currentProgress <= targetProgress) {
        setProgress(currentProgress);
        currentProgress += increment;
        requestAnimationFrame(animateProgress);
      }
    };

    animateProgress();

    // 페이지 1 작업이 완료될 때까지 50%로 설정
    setTimeout(() => {
      setProgress(1);
    }, 2000); // 2초로 변경
  }, []);

  return (
    <div>
      <Container>
        <Header />
        <MainWrap>
          <FrameContainer>
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
          </FrameContainer>
          <ProgressWrap>
            <ProgressBar progress={progress} number={`${progress}%`} />
          </ProgressWrap>
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

const FrameContainer = styled.div`
  display: flex;
  max-width: 100rem;
  height: 370px;
  margin-top: 7rem;
  margin-bottom: 7rem;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
`;

const ImgWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  .oneFour {
    width: 11rem;
    margin-top: 3rem;

    &:hover {
      cursor: pointer;
    }
  }

  .twoTwo {
    width: 22rem;
    margin-top: 3rem;

    &:hover {
      cursor: pointer;
    }
  }

  @media screen and (max-width: 500px) {
    .oneFour {
      width: 6rem;
    }

    .twoTwo {
      width: 12rem;
    }
  }
`;

const ProgressWrap = styled.div`
  margin-top: 5rem;
  margin-left: 10rem;
  margin-right: 10rem;
  padding-bottom: 2rem;
`;
