/* eslint-disable no-plusplus */
/* eslint-disable consistent-return */
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import html2canvas from 'html2canvas';
import LeftAIShift from '../LeftAIShift';
import RightAIShift from '../RightAIShift';
import Black from '../../assets/images/BlackImg.png';
import Brown from '../../assets/images/Brown.png';
import Green from '../../assets/images/Green.png';
import Gray from '../../assets/images/Solid_gray.png';
import addphoto from '../../assets/images/addphoto.png';
// import logoText from '../../assets/images/logoText.png';

const MAX_IMAGES = 4;

function CustomCarousel({ setColImg, sendData, frameType }) {
  // // base64 이미지를 담는 배열로 state를 초기화합니다.
  // const [base64Images, setBase64Images] = useState([]);

  const [base64Images, setBase64Images] = useState(
    Array.from({ length: MAX_IMAGES }, () => null),
  );

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
  // useEffect(() => {
  //   convertToBase64(sendData.url1, 0);
  //   convertToBase64(sendData.url2, 1);
  //   convertToBase64(sendData.url3, 2);
  //   convertToBase64(sendData.url4, 3);
  // }, [sendData]);

  useEffect(() => {
    for (let i = 0; i < MAX_IMAGES; i++) {
      convertToBase64(sendData[`url${i + 1}`], i);
    }
  }, [sendData]);

  // FramePage에서 구조 분해 할당으로 setColImg 받아옴
  const [activeIndex, setActiveIndex] = useState(0);

  // 이전 버튼 클릭 시 activeIndex 값 업데이트
  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? MAX_IMAGES - 1 : prevIndex - 1,
    );
  };

  // 다음 버튼 클릭 시 activeIndex 값 업데이트
  const handleNext = () => {
    setActiveIndex((nextIndex) =>
      nextIndex === MAX_IMAGES - 1 ? 0 : nextIndex + 1,
    );
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
    <Container>
      <CustomContainer>
        <ButtonWrap onClick={handlePrev}>
          <LeftAIShift
            className="carousel-control-prev-icon"
            aria-hidden="true"
          />
        </ButtonWrap>
        {frameType === '1X4' ? (
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
            <FrameImageWrap frameType={frameType}>
              <FirstImage src={base64Images.image0} />
              <SecondImage src={base64Images.image1} />
              <ThirdImage src={base64Images.image2} />
              <FourthImage src={base64Images.image3} />
            </FrameImageWrap>
          </ImageWrap>
        ) : (
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
            <FrameImageWrap frameType={frameType}>
              <TopLeftImage src={base64Images.image0} />
              <TopRightImage src={base64Images.image1} />
              <BottomLeftImage src={base64Images.image2} />
              <BottomRightImage src={base64Images.image3} />
            </FrameImageWrap>
          </ImageWrap>
        )}
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
      </CustomContainer>
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

const CustomContainer = styled.div``;
// 전체 이미지 스타일
const ImageWrap = styled.div`
  ${({ frameType }) => {
    if (frameType === '1X4') {
      return `
        width: 12rem;
        aspect-ratio: 4 / 1;
      `;
    }
    if (frameType === '2X2') {
      return `
        width: 30rem;
        aspect-ratio: 3 / 2;
      `;
    }
  }}
  margin: 2rem;
`;

// 각각의 이미지 스타일
const CarouselImage = styled.div`
  width: 100%;
  height: 100%;
`;

const Images = styled.img`
  width: 100%;
  height: 100%;
`;

// 4개 이미지를 감싸는 wrap인데, 삼항연산자를 쓰기위해 만들었다.
const FrameImageWrap = styled.div`
  width: 100%;
  height: 100%;
  z-index: 1;
  ${({ frameType }) => {
    if (frameType === '1X4') {
      return `
        padding: 20px 20px 20px 20px;
      `;
    }
    if (frameType === '2X2') {
      return `
        padding: 20px 20px 20px 20px;
      `;
    }
    return `
      padding: 20px;
    `;
  }};
`;

const FirstImage = styled.img`
  width: 100%;
  aspect-ratio: 1 / 1;
`;

const SecondImage = styled.img`
  width: 100%;
  aspect-ratio: 1 / 1;
`;

const ThirdImage = styled.img`
  width: 100%;
  aspect-ratio: 1 / 1;
`;

const FourthImage = styled.img`
  width: 100%;
  aspect-ratio: 1 / 1;
`;

// const UpperLogoText = styled.img`
//   width: 60%;
//   height: 15%;
//   position: absolute;
//   bottom: 35.3rem;
//   left: 6rem;
// `;

const TopLeftImage = styled.img`
  width: 50%;
  padding: 5px 7px 2px 0;
`;

const TopRightImage = styled.img`
  width: 50%;
  padding: 5px 0 2px 7px;
`;

const BottomLeftImage = styled.img`
  width: 50%;
  padding: 0 7px 8px 0;
`;

const BottomRightImage = styled.img`
  width: 50%;
  padding: 0 0 8px 7px;
`;

// const BottomLogoText = styled.img`
//   width: 80%;
//   height: 10%;
//   position: absolute;
//   bottom: 1rem;
//   left: 2rem;
// `;

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
