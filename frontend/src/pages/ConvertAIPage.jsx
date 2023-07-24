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
  const { frameType, aiResponse } = location.state;
  console.log(frameType);
  const [selectedData, setSelectedData] = useState({
    carousel1: {},
    carousel2: {},
    carousel3: {},
    carousel4: {},
  });
  const navigate = useNavigate();

  const handlePageShift = async () => {
    try {
      const requestData = {
        select_id: Object.values(selectedData).map((data) => data.id),
        select: Object.values(selectedData).map((data) => data.select),
      };

      console.log(requestData); // 보내는 데이터를 콘솔에 출력

      await axios.patch('http://localhost:8000/api/v1/frame/ai/', requestData);

      // 응답이 성공적으로 완료되면 '/custom' 페이지로 이동
      navigate('/custom', { state: { frameType } });
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
          <CarouselWrap>
            <Carousel1
              aiData={aiResponse[0]}
              setSelectedData={(data) =>
                setSelectedData((prev) => ({ ...prev, carousel1: data }))
              }
            />
            <Carousel2
              aiData={aiResponse[1]}
              setSelectedData={(data) =>
                setSelectedData((prev) => ({ ...prev, carousel2: data }))
              }
            />
            <Carousel3
              aiData={aiResponse[2]}
              setSelectedData={(data) =>
                setSelectedData((prev) => ({ ...prev, carousel3: data }))
              }
            />
            <Carousel4
              aiData={aiResponse[3]}
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

const PageShiftWrap = styled.div`
  display: flex;
  justify-content: center;
`;

const CarouselWrap = styled.div``;
