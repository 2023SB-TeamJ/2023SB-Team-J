import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';
import Title from '../components/Title';
import PageShiftBtn from '../components/PageShiftBtn';
import Carousel1 from '../components/Carousel1';
import Carousel2 from '../components/Carousel2';
import Carousel3 from '../components/Carousel3';
import Carousel4 from '../components/Carousel4';

function ConvertAIPage() {
  const location = useLocation();
  const { frameType, aiResponse, index } = location.state;
  console.log(frameType);
  // const navigate = useNavigate();

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
            <Carousel1 aiData={aiResponse} index={index} />
            <Carousel2 aiData={aiResponse} index={index} />
            <Carousel3 aiData={aiResponse} index={index} />
            <Carousel4 aiData={aiResponse} index={index} />
          </CarouselWrap>
          <PageShiftWrap>
            <PageShiftBtn path="/custom" />
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
