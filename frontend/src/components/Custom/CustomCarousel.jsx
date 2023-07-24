/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/button-has-type */
/* eslint-disable no-unused-vars */
/* eslint-disable no-const-assign */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
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
import addphoto from '../../assets/images/addphoto.png';

function CustomCarousel({ setColImg }) {
  // FramePage에서 구조 분해 할당으로 setColImg 받아옴
  const [activeIndex, setActiveIndex] = useState(0);

  // 이전 버튼 클릭 시 activeIndex 값 업데이트
  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? 3 : prevIndex - 1));
  };

  // 다음 버튼 클릭 시 activeIndex 값 업데이트
  const handleNext = () => {
    setActiveIndex((nextIndex) => (nextIndex === 3 ? 0 : nextIndex + 1));
  };

  const navigate = useNavigate();

  const captureArea = () => {
    const captureDiv = document.getElementById('captureArea');

    html2canvas(captureDiv).then((canvas) => {
      // 캡처된 canvas 객체를 사용할 수 있습니다.
      // 예를 들어, 이미지로 저장하거나 다른 작업을 수행할 수 있습니다.
      // 아래는 이미지로 저장하는 예제입니다.
      const imgData = canvas.toDataURL('image/png');
      setColImg(imgData); // 이미 값이 있는 매개변수에 값을 할당 시 에러 발생 setColImg = imgData-> 앞의 코드처럼 작성
      console.log(imgData);
    });
    // .then(() => {
    //   navigate('/custom');
    // });
  };

  return (
    <Container id="carouselExampleIndicators">
      <ButtonWrap onClick={handlePrev}>
        <LeftAIShift
          className="carousel-control-prev-icon"
          aria-hidden="true"
        />
      </ButtonWrap>
      <ImageWrap id="captureArea">
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
      <AddPhotoBtn
        onClick={captureArea}
        whileHover={{ scale: 1.2 }}
        whileTap={{ borderRadius: '50%' }}
      />
    </Container>
  );
}

export default CustomCarousel;

// Carousel 컨테이너 스타일
const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

// 전체 이미지 스타일
const ImageWrap = styled.div`
  width: 29rem;
  height: 35rem;
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
`;

// const TopLeftWrap = styled.div`
//   object-fit: cover;
// `;
// const TopRightWrap = styled.div``;
// const BottomLeftWrap = styled.div``;
// const BottomRightWrap = styled.div``;

// object-fit: cover; 이미지 크기가 유지되도록 설정
// top, left, right, bottom : 가장자리부터 얼마 떨어지는
const TopLeftImage = styled.img`
  position: absolute;
  top: 15px;
  left: 15px;
  width: 45%;
  height: 45%;
  object-fit: fill;
`;

const TopRightImage = styled.img`
  position: absolute;
  top: 15px;
  right: 15px;
  width: 45%;
  height: 45%;
  object-fit: fill;
`;

const BottomLeftImage = styled.img`
  position: absolute;
  bottom: 15px;
  left: 15px;
  width: 45%;
  height: 45%;
  object-fit: fill;
`;

const BottomRightImage = styled.img`
  position: absolute;
  bottom: 15px;
  right: 15px;
  width: 45%;
  height: 45%;
  object-fit: fill;
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AddPhotoBtn = styled(motion.div)`
  margin-left: 30px;
  width: 79.5px;
  height: 66px;
  flex-shrink: 0;
  background: url(${addphoto}) lightgray 50% / cover no-repeat;
  background-color: ${(props) => props.theme.backgroundColor};
  cursor: pointer;
`;
