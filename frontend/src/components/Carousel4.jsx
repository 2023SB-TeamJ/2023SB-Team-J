/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import LeftAIShift from './LeftAIShift';
import RightAIShift from './RightAIShift';

function Carousel4({ aiData, setSelectedData }) {
  // console.log(aiData);
  const [activeIndex, setActiveIndex] = useState(0);
  const data = aiData || {};

  // Carousel이 넘어갈 때마다 선택된 데이터를 부모 컴포넌트에게 전달
  useEffect(() => {
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

    setSelectedData({ id: selectedId, select: activeIndex === 0 ? 1 : 0 });
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
    <ColWrap>
      <CarouselWrap id="carouselExampleIndicators">
        <ButtonWrap
          onClick={handlePrev}
          whileHover={{ scale: 1.2 }}
          whileTap={{ borderRadius: '50%' }}
        >
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
                style={{
                  width: '11.25rem',
                  height: '11.25rem',
                  objectfit: 'cover',
                }}
              />
            )}
          </CarouselImage>
          <CarouselImage active={activeIndex === 1}>
            {activeIndex === 1 && (
              <img
                src={data.model1_url}
                style={{ width: '11.25rem', height: '11.25rem' }}
              />
            )}
          </CarouselImage>
          <CarouselImage active={activeIndex === 2}>
            {activeIndex === 2 && (
              <img
                src={data.model2_url}
                style={{ width: '11.25rem', height: '11.25rem' }}
              />
            )}
          </CarouselImage>
          <CarouselImage active={activeIndex === 3}>
            {activeIndex === 3 && (
              <img
                src={data.model3_url}
                style={{ width: '11.25rem', height: '11.25rem' }}
              />
            )}
          </CarouselImage>
        </ImageWrap>
        <ButtonWrap
          onClick={handleNext}
          whileHover={{ scale: 1.2 }}
          whileTap={{ borderRadius: '50%' }}
        >
          <RightAIShift // 밑의 두 줄 코드 있어야만 Carousel 동작함
            className="carousel-control-next-icon"
            aria-hidden="true"
          />
        </ButtonWrap>
      </CarouselWrap>
      {/* <ImageText>네번째 이미지</ImageText> */}
    </ColWrap>
  );
}

export default Carousel4;

const ColWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

// Carousel 컨테이너 스타일
const CarouselWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

// 전체 이미지 스타일
const ImageWrap = styled.div`
  margin: 1rem;
`;

// 각각의 이미지 스타일
const CarouselImage = styled.div``;

const ButtonWrap = styled(motion.div)``;

// const ImageText = styled.p`
//   font-size: 1.2rem;
//   text-align: center;
//   font-family: 'Pretendar-Regular';
// `;
