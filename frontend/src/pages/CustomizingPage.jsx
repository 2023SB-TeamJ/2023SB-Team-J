/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/button-has-type */
import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import html2canvas from 'html2canvas';
import axios from 'axios';
import Header from '../components/Header';
import Title from '../components/Title';
// import CustomMenuBar from '../components/Custom/CustomMenuBar';
import addphoto from '../assets/images/addphoto.png';
import CustomPhoto from '../components/Custom/CustomPhoto';
import CustomTextBox from '../components/Custom/CustomTextBox';
import cut4 from '../assets/images/4cut_test.png';
// import CustomSticker from '../components/Custom/CustomSticker';
import CustomMenuBar from '../components/Custom/CustomMenuBar';
// import smile from '../../assets/images/sticker_smile.png';
// import sunglass from '../../assets/images/sticker_sunglass.png';
// import heart from '../../assets/images/sticker_heart.png';
function CustomizingPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { frameType } = location.state;
  const captureArea = () => {
    const captureDiv = document.getElementById('captureArea');

    function sendImageToServer(blob) {
      const userDummy = '1';
      const formData = new FormData();
      formData.append('result_image', blob, 'capture.png');
      formData.append('user_id', userDummy);

      // console.log(blob);
      // console.log(formData);
      fetch('http://localhost:8000/api/v1/frame/add/', {
        method: 'POST',
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

  return (
    <div>
      <Container>
        <MainWrap>
          <Header />
          <TitleWrap>
            <Title>커스터마이징</Title>
          </TitleWrap>
          <ProgressBar>
            프로그레스 바/프로그레스 바/프로그레스 바/프로그레스 바/프로그레스
            바/프로그레스 바/프로그레스 바
          </ProgressBar>
          {/* <CustomWrap> */}
          {/* <MenuWrap>
              <CustomMenuBar />
            </MenuWrap> */}
          <CaptureWrap>
            <DivArea id="captureArea">
              <CustomPhoto />
              <TextBoxWrap>
                <CustomTextBox />
              </TextBoxWrap>
            </DivArea>
            <AddPhotoBtn
              onClick={captureArea}
              whileHover={{ scale: 1.2 }}
              whileTap={{ borderRadius: '50%' }}
            />
          </CaptureWrap>
          {/* </CustomWrap> */}
        </MainWrap>
      </Container>
    </div>
  );
}

export default CustomizingPage;

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
// const CustomWrap = styled.div`
//   display: flex;
//   align-items: center;
// `;

// const MenuWrap = styled.div`
//   display: flex;
// `;

const AddPhotoBtn = styled(motion.div)`
  margin-left: 30px;
  width: 79.5px;
  height: 66px;
  flex-shrink: 0;
  background: url(${addphoto}) lightgray 50% / cover no-repeat;
  background-color: ${(props) => props.theme.backgroundColor};
  cursor: pointer;
`;

const TextBoxWrap = styled.div``;

const CaptureWrap = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 33%;
  width: 38rem;
  height: 38rem;
`;

const DivArea = styled.div`
  width: 100%;
  height: 100%;
  font-size: 900;
  background: url(${cut4}) lightgray 50% / cover no-repeat;
  /* background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background: #ffffff;
  border: solid 2px; */
`;

// const TestWrap = styled.div`
//   display: flex;
//   flex-direction: column;
//   margin-left: 2rem;
// `;
// const IMG = styled.div`
//   width: 100%;
//   height: 100%;
//   /* background-image: url('https://t4y-bucket.s3.amazonaws.com/22023-07-1814:05:53105150.jpeg');
//   background-position: center;
//   background-repeat: no-repeat;
//   background-size: cover; */
// `;
