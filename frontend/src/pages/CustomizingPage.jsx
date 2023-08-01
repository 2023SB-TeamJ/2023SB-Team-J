/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/button-has-type */
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import html2canvas from 'html2canvas';
import axios from 'axios';
import Header from '../components/Header';
import Title from '../components/Title';
import addphoto from '../assets/images/addphoto.png';
import addlocal from '../assets/images/save.png';
import CustomPhoto from '../components/Custom/CustomPhoto';
import CustomTextBox from '../components/Custom/CustomTextBox';
import CustomEmoji from '../components/Custom/CustomEmoji';
import ProgressBar from '../components/ProgressBar';

const apiUrl = process.env.REACT_APP_API_URL;

function CustomizingPage() {
  const navigate = useNavigate();

  const location = useLocation();
  // FramePage.jsx에서 받아온 colImg를 가져와 colImg에 저장
  // location.state가 객체이고 그 객체의 colImg 프로퍼티도 객체인 것을 가정하고 있습니다.
  // 그러나 실제로는 colImg가 문자열이어서 아래 코드처럼 작성
  const { colImg, frameType3 } = location.state;
  console.log(location.state);
  // const { frameType } = location.state;

  const captureArea = () => {
    const captureDiv = document.getElementById('captureArea');

    const [progress, setProgress] = useState(61);

    useEffect(() => {
      // 0부터 50까지 프로그레스 증가 애니메이션
      let currentProgress = 62;
      const targetProgress = 82;
      const increment = 1;

      const animateProgress = () => {
        if (currentProgress <= targetProgress) {
          setProgress(currentProgress);
          currentProgress += increment;
          requestAnimationFrame(animateProgress);
        }
      };

      animateProgress();

      // 페이지 1 작업이 완료될 때까지 50%로 설정
      setTimeout(() => {
        setProgress(82);
      }, 2000); // 2초로 변경
    }, []);

    function sendImageToServer(blob) {
      const userDummy = '1';
      const formData = new FormData();
      formData.append('result_image', blob, 'capture.png');
      const access = localStorage.getItem('access');
      // console.log(blob);
      // console.log(formData);
      fetch(`${apiUrl}frame/add/`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${access}` },
        body: formData, // 이미지 데이터를 FormData로 전송
      })
        .then((data) => {
          console.log('서버 응답:', data); // 서버로부터의 응답을 확인합니다.
          navigate('/album'); // 작업이 완료되면 원하는 페이지로 이동합니다.
        })
        .catch((error) => {
          console.error('에러 발생:', error); // 오류 처리
        });
    }

    html2canvas(captureDiv)
      .then((canvas) => {
        canvas.toBlob((blob) => {
          sendImageToServer(blob); // 이미지 데이터(Blob)를 서버로 전송하는 함수 호출
        }, 'image/png');
      })
      .catch((error) => {
        console.error('캡처 중 오류 발생:', error);
      });
  };

  const captureLocal = () => {
    const captureDiv = document.getElementById('captureArea');

    html2canvas(captureDiv).then((canvas) => {
      // 캡처된 canvas 객체를 사용할 수 있습니다.
      // 예를 들어, 이미지로 저장하거나 다른 작업을 수행할 수 있습니다.
      // 아래는 이미지로 저장하는 예제입니다.
      const imgData = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = imgData;
      link.download = 'capture.png';
      link.click();
    });
  };

  return (
    <div>
      <Container>
        <MainWrap>
          <Header />
          {/* <CustomWrap> */}
          {/* <MenuWrap>
              <CustomMenuBar />
            </MenuWrap> */}
          <CustomWrap>
            <MenuWrap>
              <div />
            </MenuWrap>
            <CaptureWrap>
              <DivArea
                id="captureArea"
                aiimage={colImg}
                frameType3={frameType3}
              >
                <CustomTextBox />
                <CustomPhoto />
                <CustomEmoji />
              </DivArea>
            </CaptureWrap>
            <BtnWrap>
              <AddPhotoBtn
                onClick={captureArea}
                whileHover={{ scale: 1.2 }}
                whileTap={{ borderRadius: '50%' }}
              />
              <AddLocalBtn
                onClick={captureLocal}
                whileHover={{ scale: 1.2 }}
                whileTap={{ borderRadius: '50%' }}
              />
            </BtnWrap>
          </CustomWrap>
          {/* </CustomWrap> */}
          <ProgressWrap>
            <ProgressBar progress={progress} number={`${progress}%`} />
          </ProgressWrap>
        </MainWrap>
      </Container>
    </div>
  );
}

export default CustomizingPage;

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #f6f6f6;
`;

const MainWrap = styled.div`
  max-width: 1440px;
  height: 100vh;
  margin: 0 auto;
  flex-shrink: 0;
  align-items: center;
`;

const CustomWrap = styled.div`
  display: flex;
`;

const MenuWrap = styled.div`
  flex: 1;
`;

const CaptureWrap = styled.div`
  display: flex;
  flex-direction: row;
  flex: 2;
  margin: 0 auto;
`;

const DivArea = styled.div`
  ${({ frameType3 }) => {
    if (frameType3 === '1X4') {
      return `
      width: 14rem;
      aspect-ratio: 1 / 3;
      `;
    }
    if (frameType3 === '2X2') {
      return `
      width: 25rem;
      aspect-ratio: auto 2 / 3;
      `;
    }
    return `
      width: 14rem;
      aspect-ratio: 1 / 3;
    `;
  }};
  margin: 0 auto;
  background: url(${(props) => props.aiimage}) lightgray 50% / cover no-repeat;
  background-size: cover;
`;

const BtnWrap = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-top: 30%;
  justify-content: center;
  align-items: center;
`;

const AddPhotoBtn = styled(motion.div)`
  margin-left: 30px;
  width: 80px;
  height: 80px;
  flex-shrink: 0;
  background: url(${addphoto}) lightgray 50% / cover no-repeat;
  background-color: ${(props) => props.theme.backgroundColor};
  cursor: pointer;
`;

const AddLocalBtn = styled(motion.div)`
  margin-left: 30px;
  width: 80px;
  height: 80px;
  flex-shrink: 0;
  background: url(${addlocal}) lightgray 50% / cover no-repeat;
  background-color: ${(props) => props.theme.backgroundColor};
  cursor: pointer;
`;

const ProgressWrap = styled.div`
  margin-top: 5rem;
  margin-left: 10rem;
  margin-right: 10rem;
  padding-bottom: 2rem;
`;
// ----------------------
// const StickerModal = styled.div`
//   display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
//   position: fixed;
//   z-index: 1;
//   left: 0;
//   top: 0;
//   width: 100%;
//   height: 100%;
//   overflow: auto;
//   background-color: rgba(0, 0, 0, 0.7);
// `;

// const StickerContent = styled.div`
//   background-color: white;
//   margin: 15% auto;
//   padding: 20px;
//   border: 1px solid #888;
//   max-width: 300px;
// `;

// const CloseButton = styled.span`
//   color: #aaa;
//   float: right;
//   font-size: 28px;
//   font-weight: bold;
//   cursor: pointer;

//   &:hover,
//   &:focus {
//     color: black;
//   }
// `;

// const Sticker = styled.div`
//   display: inline-block;
//   font-size: 24px;
//   margin: 5px;
//   cursor: pointer;
// `;

// const DropArea = styled.div`
//   width: 100%;
//   height: 100%;
// `;

// const DraggableSticker = styled.div`
//   display: inline-flex;
//   align-items: center;
//   justify-content: center;
//   font-size: ${({ fontSize }) => fontSize || 30}px; /* 디폴트 값 24 설정 */
//   cursor: move;
//   user-select: none;
//   position: relative;
//   z-index: 1;
// `;
