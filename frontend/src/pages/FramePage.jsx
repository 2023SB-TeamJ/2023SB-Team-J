/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { styled } from 'styled-components';
import Header from '../components/Header';
import Title from '../components/Title';
import PageShiftBtn from '../components/PageShiftBtn';
import CustomCarousel from '../components/Custom/CustomCarousel';

function FramePage() {
  const [colImg, setColImg] = useState('');
  const location = useLocation();
  console.log(location.state);
  // const { frameType, aiResponse } = location.state;
  const frameType3 = location.state.frameType2;
  const sendData2 = location.state.sendData;
  console.log(frameType3);
  console.log(sendData2);

  return (
    <div>
      <Container>
        <MainWrap>
          <Header />
          <CarouselWrap>
            <CustomCarousel
              setColImg={setColImg}
              sendData={sendData2}
              frameType={frameType3}
            />
          </CarouselWrap>
          <PageShiftWrap>
            <PageShiftBtn path="/custom" state={{ colImg, frameType3 }} />
          </PageShiftWrap>
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
  height: 100vh;
  margin: 0 auto;
  flex-shrink: 0;
  align-items: center;
`;

const CarouselWrap = styled.div`
  position: relative;
  margin-top: 4rem;
`;

const PageShiftWrap = styled.div`
  position: absolute;
  top: 50%; /* 세로 가운데 정렬을 위해 50% */
  right: 4rem; /* 가로 오른쪽 정렬을 위해 right: 0 */
  transform: translateY(-50%); /* 세로 가운데 정렬을 위한 추가적인 변형 */
`;
