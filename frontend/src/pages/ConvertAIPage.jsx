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
  const [activeIndices, setActiveIndices] = useState([0, 0, 0, 0]);
  const navigate = useNavigate();

  const handlePageShift = async () => {
    const selectedData = aiResponse.map((data, i) => {
      const activeIndex = activeIndices[i];
      let selectedId;

      switch (activeIndex) {
        case 0:
          selectedId = data.origin_img_id;
          break;
        case 1:
          selectedId = data.model1_id;
          break;
        case 2:
          selectedId = data.model2_id;
          break;
        case 3:
          selectedId = data.model3_id;
          break;
        default:
          selectedId = data.origin_img_id;
      }

      return { id: selectedId, select: activeIndex === 0 ? 1 : 0 };
    });

    const requestData = {
      select_id: selectedData.map((data) => data.id),
      select: selectedData.map((data) => data.select),
    };

    console.log(requestData);

    try {
      await axios.post(
        'http://localhost:8000/api/v1/frame/ai/select/',
        requestData,
      );

      navigate('/custom', { state: { frameType } });
    } catch (error) {
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
              setActiveIndex={(index) =>
                setActiveIndices((prevIndices) =>
                  prevIndices.map((prevIndex, i) =>
                    i === 0 ? index : prevIndex,
                  ),
                )
              }
              activeIndex={activeIndices[0]}
            />
            <Carousel2
              aiData={aiResponse[1]}
              setActiveIndex={(index) =>
                setActiveIndices((prevIndices) =>
                  prevIndices.map((prevIndex, i) =>
                    i === 1 ? index : prevIndex,
                  ),
                )
              }
              activeIndex={activeIndices[1]}
            />
            <Carousel3
              aiData={aiResponse[2]}
              setActiveIndex={(index) =>
                setActiveIndices((prevIndices) =>
                  prevIndices.map((prevIndex, i) =>
                    i === 2 ? index : prevIndex,
                  ),
                )
              }
              activeIndex={activeIndices[2]}
            />
            <Carousel4
              aiData={aiResponse[3]}
              setActiveIndex={(index) =>
                setActiveIndices((prevIndices) =>
                  prevIndices.map((prevIndex, i) =>
                    i === 3 ? index : prevIndex,
                  ),
                )
              }
              activeIndex={activeIndices[3]}
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
