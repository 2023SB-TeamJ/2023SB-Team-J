import React, { useState } from 'react';
import { styled } from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UploadImage from '../components/UploadImage';
import PageShiftBtn from '../components/PageShiftBtn';

function TestPage() {
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();

  const onImageUpload = (file) => {
    setFiles((prevFiles) => [...prevFiles, file]);
  };

  const uploadAllImages = () => {
    const formData = new FormData();
    const userId = 1;
    formData.append('user_id', userId);
    files.forEach((file) => {
      formData.append(`img_files`, file);
    });

    axios
      .post('http://localhost:8000/api/v1/frame/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        console.log(response);
        navigate('/ConvertAIPage');
      })
      .catch((error) => {
        console.log(error);
      });
    console.log([...formData.entries()]);
  };

  return (
    <div>
      <Container>
        <MainWrap>
          <div>테스트 페이지 입니다</div>
          <UploadImage onImageUpload={onImageUpload} />
          <UploadImage onImageUpload={onImageUpload} />
          <UploadImage onImageUpload={onImageUpload} />
          <UploadImage onImageUpload={onImageUpload} />
          <PageShiftBtn onClick={uploadAllImages} />
        </MainWrap>
      </Container>
    </div>
  );
}

export default TestPage;

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${(props) => props.theme.backgroundColor};
`;

const MainWrap = styled.div`
  max-width: 1440px;
  width: 76vw;
  height: 100vh;
  margin: 0 auto;
  flex-shrink: 0;
  border: 3px solid black;
`;
