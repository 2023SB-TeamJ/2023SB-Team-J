import React from 'react';
import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Ring = styled.div`
  position: fixed; // absolute에서 fixed로 변경
  top: 0;
  left: 0;
  width: 100%; // 화면 전체를 덮도록 변경
  height: 100%; // 화면 전체를 덮도록 변경
  display: flex; // 로딩 애니메이션을 화면 중앙에 위치시키기 위해 추가
  justify-content: center; // 로딩 애니메이션을 화면 중앙에 위치시키기 위해 추가
  align-items: center; // 로딩 애니메이션을 화면 중앙에 위치시키기 위해 추가
  background-color: #f6f6f6; // 배경색을 검정색으로 설정
  z-index: 9999; // 다른 요소들 위에 나타나도록 z-index 설정

  &:before {
    content: '';
    position: absolute;
    top: calc(50% - 75px); // 중앙에 위치시키기 위해 수정
    left: calc(50% - 75px); // 중앙에 위치시키기 위해 수정
    width: 150px;
    height: 150px;
    border: 3px solid transparent;
    border-top: 3px solid #1f1f1f;
    border-right: 3px solid #1f1f1f;
    border-radius: 50%;
    animation: ${rotate} 2s linear infinite;
  }
`;

const Span = styled.span`
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 75px; // 50%에서 75px로 변경
  height: 4px;
  background: transparent;
  transform-origin: 100% 50%;
  transform: rotate(0deg) translateX(75px); // 회전 전에 이동
  animation: ${rotate} 2s linear infinite;
`;

function LoadingAnimation() {
  return (
    <Ring>
      Loading
      <Span />
    </Ring>
  );
}

export default LoadingAnimation;
