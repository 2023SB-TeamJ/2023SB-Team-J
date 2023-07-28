import { keyframes, styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
// import SampleImage1 from '../assets/images/1x4sampleImage.png';
// import SampleImage2 from '../assets/images/2x2sampleImage.jpg';
import ImageSample1 from '../assets/images/imageSample1.jpg';
import ImageSample2 from '../assets/images/imageSample2.jpg';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import HeaderMain from '../components/HeaderMain';

function MainPage() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  // const [userId, setUserId] = useStat`e('');
  // const [nickName, setNickName] = useState('');
  // api~~~
  return (
    <div>
      <Container>
        <MainWrap>
          {isLoggedIn ? <Header /> : <HeaderMain />}
          <Slogan1>인생의 한장을 그림으로</Slogan1>
          <Slogan2>당신의 추억을 간직합니다</Slogan2>
          <Slogan3>당신의 추억을 특별하게 만들어줄</Slogan3>
          <Slogan4>네장의 사진으로 만들어보세요</Slogan4>
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
        </MainWrap>
      </Container>
    </div>
  );
}
export default MainPage;

const textSlide1 = keyframes`
  0% {
    top: 17rem;
    opacity: 0;
  }

  100% {
      top: 15rem;
      opacity: 1;
  }
`;

const textSlide2 = keyframes`
  0% {
    top: 26rem;
    opacity: 0;
  }
  100% {
    top: 24rem;
    opacity: 1;
  }
`;

const textSlide3 = keyframes`
  0% {
    top: 31rem;
    opacity: 0;
  }
  100% {
    top: 29rem;
    opacity: 1;
  }
`;

const textSlide4 = keyframes`
  0% {
    top: 33.5rem;
    opacity: 0;
  }
  100% {
    top: 31.5rem;
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
    top: 39rem;
    opacity: 0;
  }
  100% {
    top: 37rem;
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
`;

const MainWrap = styled.div`
  position: relative;
  max-width: 1440px;
  height: 100vh;
  margin: 0 auto;
  flex-shrink: 0;
`;

const Slogan1 = styled.div`
  position: absolute;
  z-index: 3;
  left: 10px;
  color: #1f1f1f;
  width: 60rem;
  height: 5rem;
  font-size: 3rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 1rem;
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
  left: 10px;
  top: 50vh;
  color: #1f1f1f;
  width: 45rem;
  height: 5rem;
  font-size: 3rem;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  letter-spacing: 1rem;
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
  left: 10px;
  top: 50vh;
  color: #1f1f1f;
  width: 45rem;
  height: 5rem;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  letter-spacing: 0.6rem;
  opacity: 0;
  font-family: 'Noto Sans', '맑은 고딕', 'Malgun Gothic', verdana, sans-serif;

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
  left: 10px;
  top: 50vh;
  color: #1f1f1f;
  width: 45rem;
  height: 5rem;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  letter-spacing: 0.6rem;
  opacity: 0;
  font-family: 'Noto Sans', '맑은 고딕', 'Malgun Gothic', verdana, sans-serif;

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
  left: 10rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 12rem;
  height: 3.7rem;
  flex-shrink: 0;
  border-radius: 50px;
  background: #fff;
  border: 1px solid black;
  opacity: 0;

  animation: ${startBtnOpacity} 1s ease-out;
  animation-delay: 2s;
  animation-fill-mode: forwards;

  font-family: 'Noto Sans', '맑은 고딕', 'Malgun Gothic', verdana, sans-serif;
  font-weight: 600;
  font-style: normal;
  line-height: normal;
  font-size: 1.5rem;

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
    margin: auto;
    width: 11rem;
    height: 3rem;
    font-size: 1.5rem;
  }
`;

// const StartBtn2 = styled.button`
//   display: flex;
//   position: absolute;
//   z-index: 3;
//   left: 14rem;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   width: 12rem;
//   height: 3.7rem;
//   flex-shrink: 0;
//   border-radius: 50px;
//   background: #f4d3d7;
//   border: 1px solid black;
//   opacity: 0;

//   animation: ${startBtnOpacity} 1s ease-out;
//   animation-delay: 2s;
//   animation-fill-mode: forwards;

//   font-family: 'Noto Sans', '맑은 고딕', 'Malgun Gothic', verdana, sans-serif;
//   font-weight: 600;
//   font-style: normal;
//   line-height: normal;
//   font-size: 1.5rem;

//   cursor: pointer;

//   &:hover {
//     background-color: #000;
//     color: #fff;
//     transition: all 0.4s;
//   }

//   @media screen and (max-width: 980px) {
//     top: 83%;
//     left: 0;
//     right: 0;
//     margin: auto;
//     width: 11rem;
//     height: 3rem;
//     font-size: 1.5rem;
//   }
// `;

const SampleImageWrapper = styled.div`
  position: absolute;
  top: 10%;
  right: 3%;
  width: 700px;
  height: 700px;

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
  top: 1%;
  right: 60%;
  width: 220px;
  height: 680px;
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
  top: 3vh;
  right: 7%;
  width: 480px;
  height: 645px;
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
