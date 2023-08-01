/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable no-const-assign */
import React, { useState, useEffect } from 'react';
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
import ProgressBar from '../components/ProgressBar';

const apiUrl = process.env.REACT_APP_API_URL;

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
  const [progress, setProgress] = useState(40);

  useEffect(() => {
    // 0부터 50까지 프로그레스 증가 애니메이션
    let currentProgress = 40;
    const targetProgress = 60;
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
      setProgress(60);
    }, 2000); // 2초로 변경
  }, []);

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
        .patch(`${apiUrl}frame/ai/`, requestData, {
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
          <ProgressBar progress={progress} number={`${progress}%`} />
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
