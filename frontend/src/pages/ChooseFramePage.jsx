import { React } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';
import Title from '../components/Title';
import PageShiftBtn from '../components/PageShiftBtn';

function ChooseFramePage() {
  const navigate = useNavigate();

  return (
    <div>
      <Container>
        <MainWrap>
          <Header />
          <TitleWrap>
            <Title>프레임 선택</Title>
          </TitleWrap>
          <ProgressBar>
            프로그레스 바/프로그레스 바/프로그레스 바/프로그레스 바/프로그레스
            바/프로그레스 바/프로그레스 바
          </ProgressBar>
          <PageShiftWrap>
            <PageShiftBtn path="/upload" />
            <TestBtn onClick={() => navigate('/album')}>앨범 Button</TestBtn>
          </PageShiftWrap>
        </MainWrap>
      </Container>
    </div>
  );
}

export default ChooseFramePage;

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
  justify-content: center;
`;

const TestBtn = styled.div`
  position: absolute;
  top: 20%;
  background-color: #0a0a23;
  color: #fff;
  font-size: 40px;
  border: 2px;
  border-radius: 10px;
  box-shadow: 0px 0px 2px 2px rgb(0, 0, 0);

  &:hover {
    background-color: skyblue;
    color: blue;
  }
`;
