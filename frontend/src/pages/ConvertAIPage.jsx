/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable no-const-assign */
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import Header from '../components/Header';
import PageShiftBtn from '../components/PageShiftBtn';
import Carousel1 from '../components/Carousel1';
import Carousel2 from '../components/Carousel2';
import Carousel3 from '../components/Carousel3';
import Carousel4 from '../components/Carousel4';
import Loading from '../components/Loading';

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

  const [isLoading, setIsLoading] = useState(false);

  const handlePageShift = async () => {
    setIsLoading(true);
    try {
      const access = localStorage.getItem('access');

      const requestData = {
        select_id: Object.values(selectedData).map((data) => data.id),
        select: Object.values(selectedData).map((data) => data.select),
      };

      console.log(requestData); // 보내는 데이터를 콘솔에 출력
      await axios
        .patch('http://localhost:8000/api/v1/frame/ai/', requestData, {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        })
        .then((response) => {
          console.log('Response:', response.data);
          const sendData = response.data;
          console.log('sendData:', sendData);
          // 응답이 성공적으로 완료되면 '/frame' 페이지로 이동

          setIsLoading(false);

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
          <ProgressBar />
          {isLoading ? (
            <LoadingWrap>
              <Loading />
            </LoadingWrap>
          ) : (
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
          )}
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
  align-items: center;
  border: 3px solid black;
`;

const ProgressBar = styled.div`
  display: flex;
  justify-content: center;
  margin: 3rem;
`;

const PageShiftWrap = styled.div`
  position: absolute;
  top: 50%; /* 수직 중앙에 위치하도록 설정 */
  right: 250px; /* 오른쪽으로 이동시키기 위한 값 */
  transform: translateY(-50%); /* 수직 중앙에 맞추기 위해 세로로 이동 */
`;

const CarouselWrap = styled.div`
  justify-content: center;
  align-items: center;
  ${({ frameType }) => {
    if (frameType === '1X4') {
      return `
        display: grid;
        grid-template-rows: repeat(2, 200px);
        grid-template-columns: repeat(2, 0.2fr);
        grid-gap: 6rem;
      `;
    }
    if (frameType === '2X2') {
      return `
        display: grid;
        grid-template-rows: repeat(2, 200px);
        grid-template-columns: repeat(2, 0.2fr);
        grid-gap: 6rem;
      `;
    }
  }}

  @media screen and (max-width: 600px) {
    display: grid;
    grid-template-rows: repeat(4, 100px); // row의 크기를 줄임
    grid-template-columns: 0.2fr;
    grid-gap: 3rem; // gap을 줄임
  }
`;

const LoadingWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.2);
`;
