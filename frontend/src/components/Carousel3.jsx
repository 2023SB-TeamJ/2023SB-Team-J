/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import LeftAIShift from './LeftAIShift';
import RightAIShift from './RightAIShift';

function Carousel3({ aiData, setSelectedData }) {
  console.log(aiData);
  const [activeIndex, setActiveIndex] = useState(0);
  const data = aiData || {};

  // Carousel이 넘어갈 때마다 선택된 데이터를 부모 컴포넌트에게 전달
  useEffect(() => {
    setSelectedData({ id: data.id, select: activeIndex === 0 ? 1 : 0 });
  }, [activeIndex]);

  // 이전 버튼 클릭 시 activeIndex 값 업데이트
  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? 3 : prevIndex - 1));
  };

  // 다음 버튼 클릭 시 activeIndex 값 업데이트
  const handleNext = () => {
    setActiveIndex((nextIndex) => (nextIndex === 3 ? 0 : nextIndex + 1));
  };

  return (
    <CarouselWrap id="carouselExampleIndicators">
      {/* <CarouselIndicators>
        <IndicatorButton
          type="button"
          active={activeIndex === 0}
          aria-label="Slide 1"
        />
        <IndicatorButton
          type="button"
          active={activeIndex === 1}
          aria-label="Slide 2"
        />
        <IndicatorButton
          type="button"
          active={activeIndex === 2}
          aria-label="Slide 3"
        />
      </CarouselIndicators> */}

      <ButtonWrap onClick={handlePrev}>
        <LeftAIShift
          className="carousel-control-prev-icon"
          aria-hidden="true"
        />
      </ButtonWrap>

      <ImageWrap>
        <CarouselImage active={activeIndex === 0}>
          {activeIndex === 0 && (
            <img
              src={data.origin_img_url}
              style={{ width: '240px', height: '160px', objectFit: 'cover' }}
            />
          )}
        </CarouselImage>
        <CarouselImage active={activeIndex === 1}>
          {activeIndex === 1 && <img src={data.model1_url} />}
        </CarouselImage>
        <CarouselImage active={activeIndex === 2}>
          {activeIndex === 2 && <img src={data.model2_url} />}
        </CarouselImage>
        <CarouselImage active={activeIndex === 3}>
          {activeIndex === 3 && <img src={data.model3_url} />}
        </CarouselImage>
      </ImageWrap>
      <ButtonWrap onClick={handleNext}>
        <RightAIShift // 밑의 두 줄 코드 있어야만 Carousel 동작함
          className="carousel-control-next-icon"
          aria-hidden="true"
        />
      </ButtonWrap>
    </CarouselWrap>
  );
}

export default Carousel3;

// Carousel 컨테이너 스타일
const CarouselWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

// Indicator 버튼 컨테이너 스타일
// const CarouselIndicators = styled.div``;

// // Indicator 버튼 스타일
// // 슬라이드 표시

// const IndicatorButton = styled.button``;

// 전체 이미지 스타일
const ImageWrap = styled.div`
  margin: 3rem;
`;

// 각각의 이미지 스타일
const CarouselImage = styled.div``;

const ButtonWrap = styled.div``;
