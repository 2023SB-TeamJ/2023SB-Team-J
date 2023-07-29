/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/button-has-type */
/* eslint-disable no-unused-vars */
/* eslint-disable no-const-assign */
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
// import { Image } from 'react-konva';
// import useImage from 'use-image';
// import { useNavigate } from 'react-router-dom';
// import domtoimage from 'dom-to-image';
import html2canvas from 'html2canvas';
import LeftAIShift from '../LeftAIShift';
import RightAIShift from '../RightAIShift';
import Black from '../../assets/images/BlackImg.png';
import Brown from '../../assets/images/Brown.png';
import Green from '../../assets/images/Green.png';
import Gray from '../../assets/images/Solid_gray.png';
import image1 from '../../assets/images/image1.png';
// import image2 from '../../assets/images/image2.png';
// import image3 from '../../assets/images/image3.png';
// import image4 from '../../assets/images/image4.png';
import addphoto from '../../assets/images/addphoto.png';
import logoText from '../../assets/images/logoText.png';

function CustomCarousel({ setColImg, sendData, frameType }) {
  // // base64 이미지를 담는 배열로 state를 초기화합니다.
  // const [base64Images, setBase64Images] = useState([]);

  const [base64Images, setBase64Images] = useState({
    image0: null,
    image1: null,
    image2: null,
    image3: null,
  });

  // 이미지를 Base64로 변환하는 함수
  const convertToBase64 = (url, index) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';

    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      const dataURL = canvas.toDataURL('image/png'); // 형식을 변경하려면 'image/png' 대신 다른 형식 사용 가능

      // 새로운 이미지를 base64Images 배열에 추가합니다.
      // setBase64Images((prevImages) => [...prevImages, dataURL]);
      setBase64Images((prevImages) => ({
        ...prevImages,
        [`image${index}`]: dataURL,
      }));
    };

    img.src = url;
  };

  // // 4개 url 변환
  // convertToBase64(sendData.url1);
  // convertToBase64(sendData.url2);
  // convertToBase64(sendData.url3);
  // convertToBase64(sendData.url4);

  useEffect(() => {
    convertToBase64(sendData.url1, 0);
    convertToBase64(sendData.url2, 1);
    convertToBase64(sendData.url3, 2);
    convertToBase64(sendData.url4, 3);
  }, [sendData]);

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

  const captureArea = () => {
    const captureDiv = document.getElementById('captureArea');

    html2canvas(captureDiv).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      console.log(imgData);
      setColImg(imgData);
    });
  };
  return (
    <Container id="carouselExampleIndicators">
      <ButtonWrap onClick={handlePrev}>
        <LeftAIShift
          className="carousel-control-prev-icon"
          aria-hidden="true"
        />
      </ButtonWrap>
      <ImageWrap id="captureArea" frameType={frameType}>
        <CarouselImage>
          {activeIndex === 0 && <Images src={Black} alt="..." />}
        </CarouselImage>
        <CarouselImage>
          {activeIndex === 1 && <Images src={Green} alt="..." />}
        </CarouselImage>
        <CarouselImage>
          {activeIndex === 2 && <Images src={Gray} alt="..." />}
        </CarouselImage>
        <CarouselImage>
          {activeIndex === 3 && <Images src={Brown} alt="..." />}
        </CarouselImage>
        {frameType === '1X4' ? (
          <FrameImageWrap>
            <TopImage src={base64Images.image0} />
            <SecondImage src={base64Images.image1} />
            <ThirdImage src={base64Images.image} />
            <FourthImage src={base64Images.image3} />
            <BottomLogoText src={logoText} alt="logoText" />
          </FrameImageWrap>
        ) : (
          <FrameImageWrap>
            <UpperLogoText src={logoText} alt="logoText" />
            <TopLeftImage src={base64Images.image0} />
            <TopRightImage src={base64Images.image1} />
            <BottomLeftImage src={base64Images.image2} />
            <BottomRightImage src={base64Images.image3} />
          </FrameImageWrap>
        )}
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
  ${({ frameType }) => {
    if (frameType === '1X4') {
      return `
        width: 17rem;
        height: 50rem;
        
      `;
    }
    if (frameType === '2X2') {
      return `
        width: 30rem;
        height: 40rem;
      `;
    }
    return `
      width: 17rem;
      height: 50rem;
    `;
  }}
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

const Images = styled.img`
  width: 100%;
  height: 100%;
`;

const UpperLogoText = styled.img`
  width: 60%;
  height: 15%;
  position: absolute;
  bottom: 35.3rem;
  left: 6rem;
`;
// top, left, right, bottom : 가장자리부터 얼마 떨어지는
const TopLeftImage = styled.img`
  position: absolute;
  top: 58px;
  left: 20px;
  width: 43%;
  height: 43%;
  object-fit: fill;
`;

const TopRightImage = styled.img`
  position: absolute;
  top: 58px;
  right: 20px;
  width: 43%;
  height: 43%;
  object-fit: fill;
`;

const BottomLeftImage = styled.img`
  position: absolute;
  bottom: 12px;
  left: 20px;
  width: 43%;
  height: 43%;
  object-fit: fill;
`;

const BottomRightImage = styled.img`
  position: absolute;
  bottom: 12px;
  right: 20px;
  width: 43%;
  height: 43%;
  object-fit: fill;
`;

const TopImage = styled.img`
  position: absolute;
  top: 1rem;
  left: 1rem;
`;

const SecondImage = styled.img`
  position: absolute;
  top: 12rem;
  left: 1rem;
`;

const ThirdImage = styled.img`
  position: absolute;
  top: 23rem;
  left: 1rem;
`;

const FourthImage = styled.img`
  position: absolute;
  top: 34rem;
  left: 1rem;
`;

const BottomLogoText = styled.img`
  width: 80%;
  height: 10%;
  position: absolute;
  bottom: 1rem;
  left: 2rem;
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

// 4개 이미지를 감싸는 wrap인데, 삼항연산자를 쓰기위해 만들었다.
const FrameImageWrap = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0%;
  left: 0%;
`;
