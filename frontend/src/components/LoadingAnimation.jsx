/* eslint-disable react/no-array-index-key */
import React from 'react';
import styled, { keyframes } from 'styled-components';

function LoadingAnimation() {
  const text = 'AI 변환중입니다';
  return (
    <Ring>
      Loading
      <Span />
      <TextWrapper>
        {[...text].map((char, i) => (
          <Character key={i} delay={`${i * 0.1}s`}>
            {char}
          </Character>
        ))}
      </TextWrapper>
    </Ring>
  );
}

export default LoadingAnimation;

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const bounce = keyframes`
  0%, 100% { 
    transform: translateY(0);
  }
  50% { 
    transform: translateY(-20px);
  }
`;

// 대신, Character 컴포넌트에서 animation 속성을 정의할 때 delay 매개변수를 사용합니다.
const Character = styled.span`
  animation: ${bounce} 1s ${(props) => props.delay} ease-in-out infinite;
  display: inline-block;
  margin: 0 2px;
  font-size: 2em; //텍스트 크기를 더 크게 만듭니다.
  font-family: 'NeoDunggeunmoPro-Regular';
`;

// TextWrapper를 추가하여 텍스트를 화면 중앙에 위치시킵니다.
const TextWrapper = styled.div`
  position: absolute;
  bottom: 6rem;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`;

const Ring = styled.div`
  position: fixed; // absolute에서 fixed로 변경
  top: 0;
  left: 0;
  width: 100vw; // 화면 전체를 덮도록 변경
  height: 100vh; // 화면 전체를 덮도록 변경
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
