/* eslint-disable react/button-has-type */
import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import Header from '../components/Header';
import Title from '../components/Title';
import CustomMenuBar from '../components/Custom/CustomMenuBar';
import addphoto from '../assets/images/addphoto.png';
import CustomPhoto from '../components/Custom/CustomPhoto';
import CustomTextBox from '../components/Custom/CustomTextBox';

function CustomizingPage() {
  const navigate = useNavigate();

  const captureArea = () => {
    const captureDiv = document.getElementById('captureArea');

    html2canvas(captureDiv)
      .then((canvas) => {
        // 캡처된 canvas 객체를 사용할 수 있습니다.
        // 예를 들어, 이미지로 저장하거나 다른 작업을 수행할 수 있습니다.
        // 아래는 이미지로 저장하는 예제입니다.
        const imgData = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = imgData;
        link.download = 'capture.png';
        link.click();
      })
      .then(() => {
        navigate('/album');
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
          <CustomWrap>
            <MenuWrap>
              <CustomMenuBar />
              <TestWrap>
                <TextBoxWrap>
                  <CustomTextBox />
                </TextBoxWrap>
                <CustomPhoto />
              </TestWrap>
            </MenuWrap>
            <CaptureWrap>
              <div id="captureArea"> 이미지 들어 가는 곳</div>
            </CaptureWrap>

            <AddPhotoBtn
              onClick={captureArea}
              whileHover={{ scale: 1.2 }}
              whileTap={{ borderRadius: '50%' }}
            />
          </CustomWrap>
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
const CustomWrap = styled.div`
  display: flex;
  align-items: center;
`;

const MenuWrap = styled.div`
  display: flex;
`;

const AddPhotoBtn = styled(motion.div)`
  width: 79.5px;
  height: 66px;
  flex-shrink: 0;
  margin-left: 10rem;
  background: url(${addphoto}) lightgray 50% / cover no-repeat;
  background-color: ${(props) => props.theme.backgroundColor};

  cursor: pointer;
`;

const TextBoxWrap = styled.div``;

const CaptureWrap = styled.div`
  width: 40rem;
  height: 40rem;
  border: solid 2px;
  margin-left: 10rem;
  flex-shrink: 1;
`;

const TestWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 2rem;
`;
