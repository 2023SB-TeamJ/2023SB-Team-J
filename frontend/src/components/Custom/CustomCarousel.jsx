/* eslint-disable no-plusplus */
/* eslint-disable consistent-return */
import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import styled from 'styled-components';
import LeftAIShift from '../LeftAIShift';
import RightAIShift from '../RightAIShift';
import Black from '../../assets/images/frameImg/BlackImg.png';
import aframe1 from '../../assets/images/frameImg/aframe_1.png';
// import aframe2 from '../../assets/images/frameImg/aframe_2.png';
import aframe3 from '../../assets/images/frameImg/aframe_3.png';
// import aframe4 from '../../assets/images/frameImg/aframe_4.png';
import aframe5 from '../../assets/images/frameImg/aframe_5.png';
// import aframe6 from '../../assets/images/frameImg/aframe_6.png';
import aframe7 from '../../assets/images/frameImg/aframe_7.png';
// import aframe8 from '../../assets/images/frameImg/aframe_8.png';
// import aframe10 from '../../assets/images/frameImg/aframe_10.png';
import aframe11 from '../../assets/images/frameImg/aframe_11.png';
import aframe12 from '../../assets/images/frameImg/aframe_12.png';
import aframe14 from '../../assets/images/frameImg/aframe_14.png';
/// ///////////////////////////////////////////////////////////////
// import bframe1 from '../../assets/images/frameImg/bframe_1.png';
// import bframe2 from '../../assets/images/frameImg/bframe_2.png';
// import bframe3 from '../../assets/images/frameImg/bframe_3.png';
// import bframe4 from '../../assets/images/frameImg/bframe_4.png';
import bframe5 from '../../assets/images/frameImg/bframe_5.png';
import bframe6 from '../../assets/images/frameImg/bframe_6.png';
import bframe7 from '../../assets/images/frameImg/bframe_7.png';
import bframe8 from '../../assets/images/frameImg/bframe_8.png';
// import bframe9 from '../../assets/images/frameImg/bframe_9.png';
// import bframe10 from '../../assets/images/frameImg/bframe_10.png';
// import bframe11 from '../../assets/images/frameImg/bframe_11.png';
import bframe12 from '../../assets/images/frameImg/bframe_12.png';
import bframe14 from '../../assets/images/frameImg/bframe_14.jpg';
import bframe16 from '../../assets/images/frameImg/bframe_16.jpg';
// 4~6개 할까 생각중
const MAX_IMAGES = 8;

function CustomCarousel({ sendData, frameType }) {
  const IMAGES_1 = [
    Black,
    aframe1,
    aframe3,
    aframe5,
    aframe7,
    aframe11,
    aframe12,
    aframe14,
  ];
  const IMAGES_2 = [
    Black,
    bframe5,
    bframe6,
    bframe7,
    bframe8,
    bframe12,
    bframe14,
    bframe16,
  ];

  const [imgIdx, setImgIdx] = useState(0);
  const controls = useAnimation();

  // 이미지 변경 시 페이드 효과를 주기 위해 `fadeInOut` 애니메이션을 정의합니다.
  const fadeInOut = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

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

  // 이미지가 변경될 때 애니메이션을 트리거합니다.
  useEffect(() => {
    controls.start({ opacity: 0 });
    // 애니메이션이 끝난 후 이미지를 변경하고 다시 페이드 인합니다.
    setTimeout(() => {
      controls.start({ opacity: 1 });
    }, 100); // 페이드 인 애니메이션 시간 (0.5초)
  }, [imgIdx, controls]);

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
            initial="hidden" // 처음에는 투명도 0으로 시작
            animate={controls} // controls를 animate에 전달합니다.
            variants={fadeInOut} // fadeInOut 애니메이션 적용
            transition={{ duration: 0.2 }} // 페이드 효과 시간 설정 (0.5초)
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
            initial="hidden" // 처음에는 투명도 0으로 시작
            animate={controls} // controls를 animate에 전달합니다.
            variants={fadeInOut} // fadeInOut 애니메이션 적용
            transition={{ duration: 0.2 }} // 페이드 효과 시간 설정 (0.5초)
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
const ImageWrap = styled(motion.div)`
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
