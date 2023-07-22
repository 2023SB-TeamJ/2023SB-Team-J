/* eslint-disable consistent-return */
import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';
import Title from '../components/Title';
import PageShiftBtn from '../components/PageShiftBtn';
import UploadImage from '../components/UploadImage';

function UploadImagePage() {
  // locainon 객체를 사용하기 위해 useLocation() 훅을 사용해야 한다.
  const location = useLocation();
  // loaction 객체 속성인 state 값(이전 페이지에 전달된 상태값)을 가지고 와서 frameType에 저장한다.
  const frameType = location.state;

  // UploadImage 컴포넌트 4개로 이루어진 배열을 생성한다.
  const uploadImageComponents = Array(4).fill(<UploadImage />);
  return (
    <div>
      <Container>
        <MainWrap>
          <Header />
          <TitleWrap>
            <Title>이미지 업로드</Title>
          </TitleWrap>
          <ProgressBar>
            프로그레스 바/프로그레스 바/프로그레스 바/프로그레스 바/프로그레스
            바/프로그레스 바/프로그레스 바
          </ProgressBar>
          <PageShiftWrap>
            <PageShiftBtn path="/convert" state={{ frameType }} />
          </PageShiftWrap>
          <ImageWrapper frametype={frameType}>
            {uploadImageComponents}
          </ImageWrapper>
        </MainWrap>
      </Container>
    </div>
  );
}

export default UploadImagePage;

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

const PageShiftWrap = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ frametype }) => {
    // frameType prop을 사용하여 스타일링 변경
    if (frametype === '1X4') {
      return `
        flex-direction: column;
        gap: 20px;
        height: 2rem;
      `;
    }
    if (frametype === '2X2') {
      return `
        display: grid;
        grid-template-rows: repeat(2, 200px);
        grid-template-columns: repeat(2, 0.2fr);
      `;
    }
    // frameType에 따라 다른 스타일링을 적용하거나, 기본 스타일링을 반환할 수 있습니다.
  }}
`;
