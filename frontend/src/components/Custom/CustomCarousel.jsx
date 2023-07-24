import React, { useState } from 'react';
import styled from 'styled-components';
import LeftAIShift from '../LeftAIShift';
import RightAIShift from '../RightAIShift';
import Black from '../../assets/images/BlackImg.png';
import Brown from '../../assets/images/Brown.png';
import Green from '../../assets/images/Green.png';
import Gray from '../../assets/images/Solid_gray.png';
import image1 from '../../assets/images/image1.png';
import image2 from '../../assets/images/image2.png';
import image3 from '../../assets/images/image3.png';
import image4 from '../../assets/images/image4.png';

function Carousel() {
  const [activeIndex, setActiveIndex] = useState(0);

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
      <ButtonWrap onClick={handlePrev}>
        <LeftAIShift
          className="carousel-control-prev-icon"
          aria-hidden="true"
        />
      </ButtonWrap>
      <ImageWrap>
        <CarouselImage>
          {activeIndex === 0 && <Image src={Black} alt="..." />}
        </CarouselImage>
        <CarouselImage>
          {activeIndex === 1 && <Image src={Green} alt="..." />}
        </CarouselImage>
        <CarouselImage>
          {activeIndex === 2 && <Image src={Gray} alt="..." />}
        </CarouselImage>
        <CarouselImage>
          {activeIndex === 3 && <Image src={Brown} alt="..." />}
        </CarouselImage>

        <TopLeftImage src={image1} />
        <TopRightImage src={image2} />
        <BottomLeftImage src={image3} />
        <BottomRightImage src={image4} />
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

export default Carousel;

// Carousel 컨테이너 스타일
const CarouselWrap = styled.div`
  border: solid 2px black
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

// 전체 이미지 스타일
const ImageWrap = styled.div`
  width: 800px;
  height: 600px;
  margin: 3rem;
  position: relative;
`;

// 각각의 이미지 스타일
const CarouselImage = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  postion: absolute;
`;

// const TopLeftWrap = styled.div`
//   object-fit: cover;
// `;
// const TopRightWrap = styled.div``;
// const BottomLeftWrap = styled.div``;
// const BottomRightWrap = styled.div``;

const TopLeftImage = styled.img`
  position: absolute;
  top: 20px;
  left: 25px;
  width: 45%;
  height: 45%;
`;

const TopRightImage = styled.img`
  position: absolute;
  top: 20px;
  right: 25px;
  width: 45%;
  height: 45%;
`;

const BottomLeftImage = styled.img`
  position: absolute;
  bottom: 20px;
  left: 25px;
  width: 45%;
  height: 45%;
`;

const BottomRightImage = styled.img`
  position: absolute;
  bottom: 20px;
  right: 25px;
  width: 45%;
  height: 45%;
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items; center;
`;
