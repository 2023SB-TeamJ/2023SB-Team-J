/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { styled } from 'styled-components';
import html2canvas from 'html2canvas';
import Header from '../components/Header';
import Title from '../components/Title';
import PageShiftBtn from '../components/PageShiftBtn';
import CustomCarousel from '../components/Custom/CustomCarousel';
import ProgressBar from '../components/ProgressBar';

function FramePage() {
  // const [colImg, setColImg] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  console.log(location.state);
  // const { frameType, aiResponse } = location.state;
  const frameType3 = location.state.frameType2;
  const sendData2 = location.state.sendData;
  console.log(frameType3);
  console.log(sendData2);

  const [progress, setProgress] = useState(42);

  const captureHandler = () => {
    const captureDiv = document.getElementById('captureArea');

    html2canvas(captureDiv)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        return imgData;
      })
      .then((imgData) => {
        navigate('/custom', { state: { colImg: imgData, frameType3 } });
      });
  };

  useEffect(() => {
    // 0부터 50까지 프로그레스 증가 애니메이션
    let currentProgress = 42;
    const targetProgress = 62;
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
      setProgress(62);
    }, 2000); // 2초로 변경
  }, []);

  return (
    <div>
      <Container>
        <MainWrap>
          <Header />
          <CarouselContainer>
            <CustomCarousel sendData={sendData2} frameType={frameType3} />
          </CarouselContainer>
          <PageShiftWrap
            whileHover={{ scale: 1.2 }}
            whileTap={{ borderRadius: '50%' }}
          >
            <PageShiftBtn handler={captureHandler} />
          </PageShiftWrap>
          <ProgressWrap>
            <ProgressBar progress={progress} number={`${progress}%`} />
          </ProgressWrap>
        </MainWrap>
      </Container>
    </div>
  );
}

export default FramePage;

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

const CarouselContainer = styled.div`
  display: flex;
  max-width: 100rem;
  height: 370px;
  margin-top: 7rem;
  margin-bottom: 7rem;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
`;

// const CarouselWrap = styled.div`
//   position: relative;
//   margin-top: 4rem;
// `;

const PageShiftWrap = styled(motion.div)`
  position: absolute;
  width: 4rem;
  height: 4rem;
  top: 50%; /* 수직 중앙에 위치하도록 설정 */
  right: 3%; /* 오른쪽으로 이동시키기 위한 값 */
  transform: translateY(-50%); /* 수직 중앙에 맞추기 위해 세로로 이동 */

  @media screen and (max-width: 1260px) {
    position: absolute;
    top: 50%; /* 수직 중앙에 위치하도록 설정 */
    right: 3%; /* 오른쪽으로 이동시키기 위한 값 */
    transform: translateY(-50%); /* 수직 중앙에 맞추기 위해 세로로 이동 */
  }

  @media screen and (max-width: 700px) {
    top: auto;
    right: 45%; // 가로 중앙에 위치
    bottom: 5%;
  }
`;
const ProgressWrap = styled.div`
  margin-top: 5rem;
  margin-left: 10rem;
  margin-right: 10rem;
  padding-bottom: 2rem;
`;
