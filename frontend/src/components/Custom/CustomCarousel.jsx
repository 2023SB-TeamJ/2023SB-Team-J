/* eslint-disable no-plusplus */
/* eslint-disable consistent-return */
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import LeftAIShift from '../LeftAIShift';
import RightAIShift from '../RightAIShift';
// import aframe1 from '../../assets/images/aframe_1.png';
// import aframe2 from '../../assets/images/aframe_2.png';
// import aframe3 from '../../assets/images/aframe_3.png';
// import aframe4 from '../../assets/images/aframe_4.png';
// import aframe5 from '../../assets/images/aframe_5.png';
// import Black from '../../assets/images/BlackImg.png';
import aframe6 from '../../assets/images/aframe_6.png';
import aframe7 from '../../assets/images/aframe_7.png';
import aframe8 from '../../assets/images/aframe_8.png';
import aframe9 from '../../assets/images/aframe_9.png';
// import bframe1 from '../../assets/images/bframe_1.png';
// import bframe2 from '../../assets/images/bframe_2.png';
import bframe3 from '../../assets/images/bframe_3.png';
import bframe4 from '../../assets/images/bframe_4.png';
import bframe5 from '../../assets/images/bframe_5.png';
import bframe6 from '../../assets/images/bframe_6.png';
// 4~6개 할까 생각중
const MAX_IMAGES = 4;

function CustomCarousel({ sendData, frameType }) {
  const IMAGES_1 = [aframe8, aframe9, aframe6, aframe7];
  const IMAGES_2 = [bframe5, bframe3, bframe4, bframe6];

  const [imgIdx, setImgIdx] = useState(0);

  const leftBtn1 = () => {
    if (imgIdx === 0) return;
    setImgIdx((prev) => prev - 1);
  };

  const rightBtn1 = () => {
    if (imgIdx === IMAGES_1.length - 1) return;
    setImgIdx((prev) => prev + 1);
  };
  const leftBtn2 = () => {
    if (imgIdx === 0) return;
    setImgIdx((prev) => prev - 1);
  };

  const rightBtn2 = () => {
    if (imgIdx === IMAGES_2.length - 1) return;
    setImgIdx((prev) => prev + 1);
  };

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

  useEffect(() => {
    for (let i = 0; i < MAX_IMAGES; i++) {
      convertToBase64(sendData[`url${i + 1}`], i);
    }
  }, [sendData]);

  console.log(base64Images);

  return (
    <div>
      {frameType === '1X4' ? (
        <Container>
          <ButtonWrap
            onClick={leftBtn1}
            whileHover={{ scale: 1.2 }}
            whileTap={{ borderRadius: '50%' }}
          >
            <LeftAIShift
              className="carousel-control-prev-icon"
              aria-hidden="true"
            />
          </ButtonWrap>
          <ImageWrap
            id="captureArea"
            src={IMAGES_1[imgIdx]}
            frameType={frameType}
          >
            <FrameImageWrap frameType={frameType}>
              <TopImage src={base64Images.image0} />
              <SecondImage src={base64Images.image1} />
              <ThirdImage src={base64Images.image2} />
              <FourthImage src={base64Images.image3} />
            </FrameImageWrap>
          </ImageWrap>
          <ButtonWrap
            onClick={rightBtn1}
            whileHover={{ scale: 1.2 }}
            whileTap={{ borderRadius: '50%' }}
          >
            <RightAIShift // 밑의 두 줄 코드 있어야만 Carousel 동작함
              className="carousel-control-next-icon"
              aria-hidden="true"
            />
          </ButtonWrap>
        </Container>
      ) : (
        <Container>
          <ButtonWrap
            onClick={leftBtn2}
            whileHover={{ scale: 1.2 }}
            whileTap={{ borderRadius: '50%' }}
          >
            <LeftAIShift
              className="carousel-control-prev-icon"
              aria-hidden="true"
            />
          </ButtonWrap>
          <ImageWrap
            id="captureArea"
            src={IMAGES_2[imgIdx]}
            frameType={frameType}
          >
            <FrameImageWrap frameType={frameType}>
              <TopLeftImage src={base64Images.image0} />
              <TopRightImage src={base64Images.image1} />
              <BottomLeftImage src={base64Images.image2} />
              <BottomRightImage src={base64Images.image3} />
            </FrameImageWrap>
          </ImageWrap>
          <ButtonWrap
            onClick={rightBtn2}
            whileHover={{ scale: 1.2 }}
            whileTap={{ borderRadius: '50%' }}
          >
            <RightAIShift // 밑의 두 줄 코드 있어야만 Carousel 동작함
              className="carousel-control-next-icon"
              aria-hidden="true"
            />
          </ButtonWrap>
        </Container>
      )}
    </div>
  );
}

export default CustomCarousel;

// Carousel 컨테이너 스타일
const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ButtonWrap = styled(motion.div)`
  display: block;
`;

// 전체 이미지 스타일
const ImageWrap = styled.div`
  background-image: url(${(props) => props.src});
  width: 200px;
  ${({ frameType }) => {
    if (frameType === '1X4') {
      return `
        width: 180px;
        height: 550px;
        margin: 40px;
      `;
    }
    if (frameType === '2X2') {
      return `
        width: 580px;
        height: 440px;
        margin: 40px;
      `;
    }
  }}
`;

// 4개 이미지를 감싸는 wrap인데, 삼항연산자를 쓰기위해 만들었다.
const FrameImageWrap = styled.div`
  ${({ frameType }) => {
    if (frameType === '1X4') {
      return `
      display :flex;
      flex-direction: column;  
      align-items: center;
      width: 180px;
      height: 550px;
      padding: 10px;
      `;
    }
    if (frameType === '2X2') {
      return `
        width: 440px;
        height: 440px;
        padding: 15px;
      `;
    }
  }}
`;

const TopImage = styled.img`
  width: 150px;
  height: 120px;
  padding: 5px;
`;

const SecondImage = styled.img`
  width: 150px;
  height: 120px;
  padding: 5px;
`;

const ThirdImage = styled.img`
  width: 150px;
  height: 120px;
  padding: 5px;
`;

const FourthImage = styled.img`
  width: 150px;
  height: 120px;
  padding: 5px;
`;
//

const TopLeftImage = styled.img`
  aspect-ratio: 1 / 1;
  width: 50%;
  padding: 5px 5px 5px 5px;
`;

const TopRightImage = styled.img`
  aspect-ratio: 1 / 1;
  width: 50%;
  padding: 5px 5px 5px 5px;
`;

const BottomLeftImage = styled.img`
  aspect-ratio: 1 / 1;
  width: 50%;
  padding: 5px 5px 5px 5px;
`;

const BottomRightImage = styled.img`
  aspect-ratio: 1 / 1;
  width: 50%;
  padding: 5px 5px 5px 5px;
`;
