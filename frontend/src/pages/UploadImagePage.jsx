/* eslint-disable prefer-destructuring */
/* eslint-disable no-else-return */
/* eslint-disable prettier/prettier */
/* eslint-disable no-use-before-define */
/* eslint-disable consistent-return */
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import Header from '../components/Header';
import Title from '../components/Title';
import PageShiftBtn from '../components/PageShiftBtn';
import UploadImage from '../components/UploadImage';
import LoadingAnimation from '../components/LoadingAnimation';

function UploadImagePage() {
  const location = useLocation();
  const frameType = location.state;
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태를 관리하는 상태 변수를 추가합니다.

  const onImageUpload = (file) => {
    setFiles((prevFiles) => [...prevFiles, file]);
  };

  const uploadAllImages = async () => {
    setIsLoading(true); // 이미지 업로드를 시작하면 로딩 애니메이션을 표시합니다.
    const userId = 1;
    const promises = files.map((file, index) => {
      const formData = new FormData();
      formData.append('id', userId);
      formData.append('image', file);
      Array.from(formData.entries()).forEach((pair) => {
        console.log(`${pair[0]}, ${pair[1]}`);
      });

      return axios
        .post('http://localhost:8000/api/v1/frame/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          console.log(response.data);
          const originImgId = response.data.origin_img_id;
          const imageUrl = response.data.url;
          return uploadImageToCharacterEndpoint(originImgId, imageUrl, index);
        });
    });

    const results = await Promise.all(promises);
    setIsLoading(false); // 모든 이미지 업로드가 완료되면 로딩 애니메이션을 숨깁니다.
    results.sort((a, b) => a.index - b.index);
    navigate('/convert', {
      state: { frameType, aiResponse: results },
    });
  };

  const uploadImageToCharacterEndpoint = (originImgId, imageUrl, index) => {
    const formData = new FormData();
    formData.append('image_origin_id', originImgId);
    formData.append('image', imageUrl);

    return axios
      .post('http://localhost:8000/api/v1/frame/ai/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        console.log(response.data);
        return {
          index, // Include index in return
          origin_img_id: originImgId,
          origin_img_url: imageUrl,
          model1_id: response.data.model1_id,
          model1_url: response.data.model1_url,
          model2_id: response.data.model2_id,
          model2_url: response.data.model2_url,
          model3_id: response.data.model3_id,
          model3_url: response.data.model3_url,
        };
      });
  };

  const uploadImageComponents = Array(4).fill(
    <UploadImage onImageUpload={onImageUpload} />,
  );

  return (
    <div>
      <Container>
        <MainWrap>
          <Header />
          <TitleWrap>
            <Title>이미지 업로드</Title>
          </TitleWrap>
          <ProgressBar>
            프로그레스 바/프로그레스 바/프로그레스 바/프로그레스 바/프로그레스
            바/프로그레스 바/프로그레스 바
          </ProgressBar>
          <PageShiftWrap onClick={uploadAllImages}>
            <PageShiftBtn />
          </PageShiftWrap>
          <ImageWrapper frameType={frameType}>
            {uploadImageComponents}
          </ImageWrapper>
          {isLoading && <LoadingAnimation />}
        </MainWrap>
      </Container>
    </div>
  );
}

export default UploadImagePage;

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #f6f6f6;
`;
const MainWrap = styled.div`
  max-width: 1440px;
  height: 100vh;
  margin: 0 auto;
  flex-shrink: 0;
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
  justify-content: flex-end;
`;

const ImageWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  ${({ frameType }) => {
    if (frameType === '1X4') {
      return `
        flex-direction: column;
        gap: 40px;
      `;
    } else if (frameType === '2X2') {
      return `
        display: grid;
        grid-template-rows: repeat(2, 200px);
        grid-template-columns: repeat(2, 0.2fr);
      `;
    }
  }}
`;
