/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable react/no-array-index-key */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-else-return */
/* eslint-disable prettier/prettier */
/* eslint-disable no-use-before-define */
/* eslint-disable consistent-return */
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import PageShiftBtn from '../components/PageShiftBtn';
import UploadImage from '../components/UploadImage';
import ProgressBar from '../components/ProgressBar';
import Loading from '../components/LoadingAnimation';

const apiUrl = process.env.REACT_APP_API_URL;

function UploadImagePage() {
  const location = useLocation();
  const [frameType] = useState(location.state);
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태를 관리하는 상태 변수를 추가합니다.

  const [progress, setProgress] = useState(1);

  useEffect(() => {
    // 0부터 50까지 프로그레스 증가 애니메이션
    let currentProgress = 1;
    const targetProgress = 22;
    const increment = 1;

    const animateProgress = () => {
      if (currentProgress <= targetProgress) {
        setProgress(currentProgress);
        currentProgress += increment;
        requestAnimationFrame(animateProgress);
      }
    };

    animateProgress();

    // 페이지 1 작업이 완료될 때까지 50%로 설정
    setTimeout(() => {
      setProgress(22);
    }, 2000); // 2초로 변경
  }, []);

  const onImageUpload = (file) => {
    setFiles((prevFiles) => [...prevFiles, file]);
  };

  const uploadAllImages = async () => {
    if (files.length < 4) {
      alert('이미지 4개를 모두 업로드 해주세요.'); // 여기에 사용자에게 알릴 메시지를 적어주세요.
      return; // Return early to prevent page navigation
    }
    setIsLoading(true);
    const promises = files.map((file, index) => {
      const formData = new FormData();
      const access = localStorage.getItem('access');
      formData.append('image', file);
      Array.from(formData.entries()).forEach((pair) => {
        console.log(`${pair[0]}, ${pair[1]}`);
      });

      return axios
        .post(`${apiUrl}frame/`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${access}`,
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

    // Move navigation here with sorted results
    navigate('/convert', {
      state: { frameType, aiResponse: results },
    });
  };

  const uploadImageToCharacterEndpoint = (originImgId, imageUrl, index) => {
    const formData = new FormData();
    formData.append('image_origin_id', originImgId);
    formData.append('image', imageUrl);
    const access = localStorage.getItem('access');

    return axios
      .post(`${apiUrl}frame/ai/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${access}`,
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

  const uploadImageComponents = Array(4)
    .fill(0)
    .map((_, index) => (
      <div key={index}>
        <WrapContent>
          <UploadImage onImageUpload={onImageUpload} />
          <ImageText>{`${index + 1}번 이미지`}</ImageText>
        </WrapContent>
      </div>
    ));

  return (
    <div>
      <Container>
        <Header />
        <MainWrap>
          {isLoading ? (
            <LoadingWrap>
              <Loading />
            </LoadingWrap>
          ) : (
            <ImageContainer>
              <ImageWrapper frameType={frameType}>
                {uploadImageComponents}
              </ImageWrapper>
            </ImageContainer>
          )}
          <PageShiftWrap
            onClick={uploadAllImages}
            whileHover={{ scale: 1.2 }}
            whileTap={{ borderRadius: '50%' }}
          >
            <PageShiftBtn />
          </PageShiftWrap>
          <ProgressWrap>
            <ProgressBar progress={progress} number={`${progress}%`} />
          </ProgressWrap>
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

const ImageContainer = styled.div`
  display: flex;
  max-width: 100rem;
  height: 370px;
  margin-top: 7rem;
  margin-bottom: 7rem;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
`;

const WrapContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ImageWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  ${({ frameType }) => {
    if (frameType === '1X4') {
      return `
        gap: 20px;
      `;
    } else if (frameType === '2X2') {
      return `
        display: grid;
        grid-template-rows: repeat(2, 200px);
        grid-template-columns: repeat(2, 200px);
        grid-gap: 2rem;

      `;
    }
  }}
`;

const ImageText = styled.p`
  font-size: 1.2rem;
  margin-top: 1rem;
  text-align: center;
  font-family: 'Pretendar-Regular';
`;

const PageShiftWrap = styled(motion.div)`
  position: absolute;
  bottom: 50%;
  right: 5rem;
`;

const LoadingWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.2);
`;

const ProgressWrap = styled.div`
  margin-top: 5rem;
  margin-left: 10rem;
  margin-right: 10rem;
  padding-bottom: 2rem;
`;
