import { keyframes, styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
// import SampleImage1 from '../assets/images/1x4sampleImage.png';
// import SampleImage2 from '../assets/images/2x2sampleImage.jpg';
// import { useState, useEffect } from 'react';
import ImageSample1 from '../assets/images/imageSample1.jpg';
import ImageSample2 from '../assets/images/imageSample2.jpg';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import HeaderMain from '../components/HeaderMain';

function MainPage() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  // const [scrollPos, setScrollPos] = useState(0);

  // useEffect(() => {
  //   function updateScrollPos() {
  //     setScrollPos(window.scrollY);
  //   }
  //   window.addEventListener('scroll', updateScrollPos);
  //   return () => window.removeEventListener('scroll', updateScrollPos);
  // }, []);

  // const diameter = 500 + 2 * scrollPos;

  return (
    <div>
      <Container>
        {isLoggedIn ? <Header /> : <HeaderMain />}
        <MainWrap>
          <Slogan1>인생의 한장을 그림으로</Slogan1>
          <Slogan2>당신의 추억을 간직합니다</Slogan2>
          <Slogan3>당신의 추억을 특별하게 만들어줄</Slogan3>
          <Slogan4>네장의 사진을 만들어보세요</Slogan4>
          {/* useLocation */}
          <StartBtn1
            onClick={() =>
              navigate('/album', {
                // state: { userId, nickName },
              })
            }
          >
            시작하기
          </StartBtn1>
          {/* <StartBtn2
            onClick={() =>
              navigate('/album', {
                // state: { userId, nickName },
              })
            }
          >
            앨범보기
          </StartBtn2> */}
          <SampleImageWrapper>
            <OneTimesFourSampleImage />
            <TwoTimesTwoSampleImage />
          </SampleImageWrapper>
          <Circle1 />
          <Circle2 />
        </MainWrap>
        {/* <MainPageComponent>
          <SpreadCircle diameter={diameter} />
        </MainPageComponent> */}
      </Container>
    </div>
  );
}
export default MainPage;

const textSlide1 = keyframes`
  0% {
    top: 14rem;
    opacity: 0;
  }

  100% {
      top: 12rem;
      opacity: 1;
  }
`;

const textSlide2 = keyframes`
  0% {
    top: 19rem;
    opacity: 0;
  }
  100% {
    top: 17rem;
    opacity: 1;
  }
`;

const textSlide3 = keyframes`
  0% {
    top: 24.8rem;
    opacity: 0;
  }
  100% {
    top: 22.8rem;
    opacity: 1;
  }
`;

const textSlide4 = keyframes`
  0% {
    top: 27.5rem;
    opacity: 0;
  }
  100% {
    top: 25.5rem;
    opacity: 1;
  }
`;

const opacity = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const startBtnOpacity = keyframes`
  0% {
    top: 33rem;
    opacity: 0;
  }
  100% {
    top: 31rem;
    opacity: 1;
  }
`;

const move1 = keyframes`
  0% {
    transform: translate3d(0, 0, 10px) rotate(-10deg);
  }
  100% {
    transform: translate3d(-5px, 10px, 10px) rotate(-10deg);
  }
`;

const move2 = keyframes`
  0% {
    transform: translate3d(0, 0, 10px) rotate(5.63deg);
  }
  100% {
    transform: translate3d(5px, 10px, 10px) rotate(5.63deg);
  }
`;

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  background: #f6f6f6;
  overflow: hidden;
`;

const MainWrap = styled.div`
  position: relative;
  max-width: 1440px;
  height: calc(100vh - 5.4rem);
  margin: 0 auto;
  flex-shrink: 0;
`;

const Slogan1 = styled.div`
  position: absolute;
  z-index: 3;
  left: 3.5rem;
  color: #1f1f1f;
  width: 60rem;
  height: 5rem;
  font-size: 3rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0.8rem;
  word-spacing: -1rem;
  font-family: 'Noto Sans', '맑은 고딕', 'Malgun Gothic', verdana, sans-serif;
  font-weight: 800;
  opacity: 0;

  animation: ${textSlide1} 1s ease-out;
  animation-delay: 1.3s;
  animation-fill-mode: forwards;
  position: relative;

  @media screen and (max-width: 980px) {
    display: none;
  }
`;

const Slogan2 = styled.div`
  position: absolute;
  z-index: 3;
  left: 3.5rem;
  top: 50vh;
  color: #1f1f1f;
  width: 45rem;
  height: 5rem;
  font-size: 3rem;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  letter-spacing: 0.8rem;
  word-spacing: -1rem;
  opacity: 0;
  font-family: 'Noto Sans', '맑은 고딕', 'Malgun Gothic', verdana, sans-serif;

  animation: ${textSlide2} 1s ease-out;
  animation-delay: 1.4s;
  animation-fill-mode: forwards;

  @media screen and (max-width: 980px) {
    display: none;
  }
`;

const Slogan3 = styled.div`
  position: absolute;
  z-index: 3;
  left: 3.5rem;
  top: 50vh;
  color: #5f5f5f;
  width: 45rem;
  height: 5rem;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0.7rem;
  word-spacing: -0.4rem;
  opacity: 0;
  font-family: 'Pretendard-Regular';

  animation: ${textSlide3} 1s ease-out;
  animation-delay: 1.6s;
  animation-fill-mode: forwards;

  @media screen and (max-width: 980px) {
    display: none;
  }
`;

const Slogan4 = styled.div`
  position: absolute;
  z-index: 3;
  left: 3.5rem;
  top: 50vh;
  color: #5f5f5f;
  width: 45rem;
  height: 5rem;
  font-size: 1.5rem;
  font-weight: 400;
  letter-spacing: 0.7rem;
  word-spacing: -0.4rem;
  opacity: 0;
  font-family: 'Pretendard-Regular';

  animation: ${textSlide4} 1s ease-out;
  animation-delay: 1.8s;
  animation-fill-mode: forwards;

  @media screen and (max-width: 980px) {
    display: none;
  }
`;

const StartBtn1 = styled.button`
  display: flex;
  position: absolute;
  z-index: 3;
  left: 15rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 12rem;
  height: 3.7rem;
  flex-shrink: 0;
  border-radius: 50px;
  background: #f6f6f6;
  border: 1.3px solid black;
  opacity: 0;

  animation: ${startBtnOpacity} 1s ease-out;
  animation-delay: 2s;
  animation-fill-mode: forwards;

  font-family: 'Noto Sans', '맑은 고딕', 'Malgun Gothic', verdana, sans-serif;
  font-weight: 600;
  font-style: normal;
  line-height: normal;
  font-size: 1.5rem;
  color: #1f1f1f;
  letter-spacing: 0.3rem;
  padding-left: 0.3rem;

  cursor: pointer;

  &:hover {
    background-color: #000;
    color: #fff;
    transition: all 0.4s;
  }

  @media screen and (max-width: 980px) {
    top: 83%;
    left: 0;
    right: 0;
    bottom: -25%;
    margin: auto;
    width: 11rem;
    height: 3rem;
    font-size: 1.5rem;
  }
`;

const SampleImageWrapper = styled.div`
  position: absolute;
  top: 2rem;
  right: 3rem;
  width: 650px;
  height: 650px;

  @media screen and (max-width: 980px) {
    width: 500px;
    top: 15%;
    left: 0;
    right: 0;
    margin: auto;
  }
`;

const OneTimesFourSampleImage = styled.div`
  position: absolute;
  z-index: 2;
  top: 0;
  right: 26rem;
  width: 13rem;
  height: 39.5rem;
  flex-shrink: 0;
  background:
    url(${ImageSample2}),
    lightgray 50% / cover no-repeat;
  background-size: cover;
  box-shadow: 3px 4px 4px 3px rgba(0, 0, 0, 0.25);
  opacity: 0;

  animation:
    ${opacity} 1s ease-out 1s forwards,
    ${move1} 2s linear infinite alternate;
  animation-delay: 1.2s;
  animation-fill-mode: forwards;

  @media screen and (max-width: 980px) {
    position: absolute;
    width: 160px;
    height: 500px;
    top: 3vh;
    right: 61%;
  }
`;

const TwoTimesTwoSampleImage = styled.div`
  position: absolute;
  z-index: 1;
  top: 2rem;
  right: 3rem;
  width: 25rem;
  height: 37.5rem;
  background:
    url(${ImageSample1}),
    lightgray 50% / cover no-repeat;
  background-size: cover;
  box-shadow: 3px 4px 4px 3px rgba(0, 0, 0, 0.25);
  opacity: 0;

  animation:
    ${opacity} 1s ease-out 1s forwards,
    ${move2} 2s linear infinite alternate;
  animation-delay: 1s;
  animation-fill-mode: forwards;

  @media screen and (max-width: 980px) {
    position: absolute;
    width: 350px;
    height: 470px;
    top: 3vh;
    right: 7%;
  }
`;

// const MainPageComponent = styled.div`
//   position: relative;
//   width: 100vw;
//   height: 100vh;
//   background-color: black;
//   overflow: hidden;
// `;

// const SpreadCircle = styled.div`
//   position: absolute;
//   top: calc(50% - ${(props) => props.diameter / 2}px);
//   left: calc(50% - ${(props) => props.diameter / 2}px);
//   width: ${(props) => props.diameter}px;
//   height: ${(props) => props.diameter}px;
//   background: #f4d3d7;
//   border-radius: 50%;
//   transform-origin: center;
//   transition: all 0.5s;
// `;

const Circle1 = styled.div`
  position: absolute;
  top: 35rem;
  left: -15rem;
  width: 25rem;
  height: 25rem;
  background-color: #f4d3d7;
  border-radius: 50%;
  opacity: 0;

  animation: ${opacity} 1s ease-out 1s forwards;
  animation-delay: 2.2s;
  animation-fill-mode: forwards;
`;

const Circle2 = styled.div`
  position: absolute;
  top: 4rem;
  left: 17rem;
  width: 20rem;
  height: 20rem;
  background-color: #f4d3d7;
  border-radius: 50%;
  opacity: 0;

  animation: ${opacity} 1s ease-out 1s forwards;
  animation-delay: 1.5s;
  animation-fill-mode: forwards;
`;
