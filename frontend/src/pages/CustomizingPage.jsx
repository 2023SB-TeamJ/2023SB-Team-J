import { React } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Title from '../components/Title';
import CustomMenuBar from '../components/Custom/CustomMenuBar';
import addphoto from '../assets/images/addphoto.png';

function CustomizingPage() {
  const navigate = useNavigate();

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
          <PageShiftWrap />
          <CustomWrap>
            <CustomMenuBar />
          </CustomWrap>
          <AddPhotoBtn
            onClick={() => navigate('/album')}
            // {앨범에 추가}
            whileHover={{ scale: 1.2 }}
            whileTap={{ borderRadius: '50%' }}
          />
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

const PageShiftWrap = styled.div`
  display: flex;
  justify-content: center;
`;

const CustomWrap = styled.div`
  display: flex;
`;

const AddPhotoBtn = styled(motion.div)`
  position: absolute;
  bottom: 20%;
  right: 20%;
  width: 79.5px;
  height: 66px;
  flex-shrink: 0;
  background: url(${addphoto}) lightgray 50% / cover no-repeat;
  background-color: ${(props) => props.theme.backgroundColor};
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  cursor: pointer;
`;
