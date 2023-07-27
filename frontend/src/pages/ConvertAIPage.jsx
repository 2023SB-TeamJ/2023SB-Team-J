/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable no-const-assign */
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import Header from '../components/Header';
import Title from '../components/Title';
import PageShiftBtn from '../components/PageShiftBtn';
import Carousel1 from '../components/Carousel1';
import Carousel2 from '../components/Carousel2';
import Carousel3 from '../components/Carousel3';
import Carousel4 from '../components/Carousel4';

function ConvertAIPage() {
  const location = useLocation();
  console.log(location.state);
  // const { frameType, aiResponse } = location.state;
  const frameType2 = location.state ? location.state.frameType : null;
  const aiResponse2 = location.state ? location.state.aiResponse : [];
  console.log(frameType2);
  console.log(aiResponse2);

  const [selectedData, setSelectedData] = useState({
    carousel1: {},
    carousel2: {},
    carousel3: {},
    carousel4: {},
  });
  const navigate = useNavigate();

  // console.log(aiResponse2);

  const handlePageShift = async () => {
    try {
      const requestData = {
        select_id: Object.values(selectedData).map((data) => data.id),
        select: Object.values(selectedData).map((data) => data.select),
      };

      console.log(requestData); // 보내는 데이터를 콘솔에 출력
      await axios
        .patch('http://localhost:8000/api/v1/frame/ai/', requestData)
        .then((response) => {
          console.log('Response:', response.data);
          const sendData = response.data;
          console.log('sendData:', sendData);
          // 응답이 성공적으로 완료되면 '/frame' 페이지로 이동
          navigate('/frame', { state: { frameType2, sendData } });
        });
    } catch (error) {
      // 요청이 실패하면 에러를 콘솔에 출력
      console.error(error);
    }
  };

  // const frameComponents = Array(4).fill(<Carousel />);
  return (
    <div>
      <Container>
        <MainWrap>
          <Header />
          <TitleWrap>
            <Title>AI 변환</Title>
          </TitleWrap>
          <ProgressBar>
            프로그레스 바/프로그레스 바/프로그레스 바/프로그레스 바/프로그레스
            바/프로그레스 바/프로그레스 바
          </ProgressBar>
          <CarouselWrap frameType={frameType2}>
            <Carousel1
              aiData={aiResponse2[0]}
              setSelectedData={(data) =>
                setSelectedData((prev) => ({ ...prev, carousel1: data }))
              }
            />
            <Carousel2
              aiData={aiResponse2[1]}
              setSelectedData={(data) =>
                setSelectedData((prev) => ({ ...prev, carousel2: data }))
              }
            />
            <Carousel3
              aiData={aiResponse2[2]}
              setSelectedData={(data) =>
                setSelectedData((prev) => ({ ...prev, carousel3: data }))
              }
            />
            <Carousel4
              aiData={aiResponse2[3]}
              setSelectedData={(data) =>
                setSelectedData((prev) => ({ ...prev, carousel4: data }))
              }
            />
          </CarouselWrap>
          <PageShiftWrap onClick={handlePageShift}>
            <PageShiftBtn />
          </PageShiftWrap>
        </MainWrap>
      </Container>
    </div>
  );
}

export default ConvertAIPage;

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

const PageShiftWrap = styled.div`
  display: flex;
  justify-content: center;
`;

const CarouselWrap = styled.div`
  justify-content: center;
  align-items: center;
  ${({ frameType }) => {
    if (frameType === '1X4') {
      return `
        flex-direction: column;
        gap: 30px;
      `;
    }
    if (frameType === '2X2') {
      return `
        display: grid;
        grid-template-rows: repeat(2, 200px);
        grid-template-columns: repeat(2, 0.2fr);
      `;
    }
  }}
`;
