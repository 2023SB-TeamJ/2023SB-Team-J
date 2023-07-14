import { styled } from 'styled-components';
import StartBtn from '../components/StartBtn';
import SampleImage1 from '../assets/images/1x4sampleImage.png';
import SampleImage2 from '../assets/images/2x2sampleImage.jpg';
import HeaderMain from '../components/HeaderMain';

function MainPage() {
  return (
    <div>
      <Container>
        <MainWrap>
          <HeaderMain />
          <Slogan1>추억을 간직하는</Slogan1>
          <Slogan2>THIS IS 4 YOU</Slogan2>
          <StartBtn />
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

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${(props) => props.theme.backgroundColor};
`;

const MainWrap = styled.div`
  position: relative;
  max-width: 1440px;
  height: 100vh;
  margin: 0 auto;
  flex-shrink: 0;
  border: 3px solid black;
`;

const Slogan1 = styled.div`
  position: absolute;
  z-index: 3;
  left: 10px;
  bottom: 250px;
  color: ${(props) => props.theme.deepGrayColor};
  width: 570px;
  height: 250px;
  text-shadow: 0px 4px 7px 0px rgba(0, 0, 0, 0.35);
  font-size: 75px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  @media screen and (max-width: 980px) {
    display: none;
  }
`;

const Slogan2 = styled.div`
  position: absolute;
  z-index: 3;
  left: 10px;
  bottom: 135px;
  color: ${(props) => props.theme.deepGrayColor};
  width: 570px;
  height: 250px;
  text-shadow: 0px 4px 7px 0px rgba(0, 0, 0, 0.35);
  font-size: 75px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  @media screen and (max-width: 980px) {
    display: none;
  }
`;

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
  transform: rotate(-10deg);
  flex-shrink: 0;
  background:
    url(${SampleImage1}),
    lightgray 50% / cover no-repeat;
  background-size: cover;
  box-shadow: 3px 4px 4px 3px rgba(0, 0, 0, 0.25);

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
  transform: rotate(5.63deg);
  background:
    url(${SampleImage2}),
    lightgray 50% / cover no-repeat;
  background-size: cover;
  box-shadow: 3px 4px 4px 3px rgba(0, 0, 0, 0.25);

  @media screen and (max-width: 980px) {
    position: absolute;
    width: 350px;
    height: 470px;
    top: 3vh;
    right: 7%;
  }
`;
