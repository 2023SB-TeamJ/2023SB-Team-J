import React from 'react';
import styled, { keyframes } from 'styled-components';
import emptyBox from '../assets/images/albumIcon.png';

function FloatingImage() {
  return (
    <Container>
      <StyledImage src={emptyBox} alt="empty logo" />
      <StyledText>사진을 추가해주세요</StyledText>
    </Container>
  );
}

export default FloatingImage;

// keyframes 함수를 사용하여 "translatey"와 "translatex" 변환을 이용하여 이미지가 수직 및 수평으로 이동
const float = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-30px);
  }
  100% {
    transform: translateY(0px);
  }
`;

const Container = styled.div`
  width: 250px;
  height: 250px;
  animation: ${float} 4s ease-in-out infinite;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledImage = styled.img`
  max-width: 90%;
  max-height: 90%;
  margin-bottom: 10px;
  position: relative;
`;

const StyledText = styled.p`
  font-size: 20px; /* adjust this value as needed */
  text-align: center;
  position: absolute;
  bottom: 10px;
`;
