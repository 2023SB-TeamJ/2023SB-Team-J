/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
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

  const uploadImagesToCharacterEndpoint = (imgOriginId, imageUrl) => {
    const formData = new FormData();
    formData.append('image_origin_id', imgOriginId);
    formData.append('image', imageUrl);
    console.log([...formData.entries()]);

    axios
      .post('http://localhost:8000/api/v1/frame/ai/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        console.log(response);
        navigate('/convert');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const uploadAllImages = () => {
    const userId = 1;
    const promises = files.map((file) => {
      const formData = new FormData();
      formData.append('id', userId);
      formData.append('image', file);

      return axios.post('http://localhost:8000/api/v1/frame/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    });

    Promise.all(promises)
      .then((results) => {
        console.log('All images uploaded');
        // handle the response of each promise
        results.forEach((response) => {
          const { origin_img_id, url } = response.data;
          uploadImagesToCharacterEndpoint(origin_img_id, url);
        });
      })
      .catch((error) => {
        console.log(error);
      });
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
          <PageShiftBtn onButtonClick={uploadAllImages} />
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
