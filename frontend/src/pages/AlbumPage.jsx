/* eslint-disable react/no-array-index-key */
/* eslint-disable no-use-before-define */
/* eslint-disable func-names */
/* eslint-disable array-callback-return */
/* eslint-disable no-undef */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Masonry from 'react-masonry-css';
import axios from 'axios';
import styled from 'styled-components';
import { motion } from 'framer-motion';
// import UploadBtn from '../components/UploadBtn';
import AOS from 'aos';
import Header from '../components/HeaderAlbum';
import AlbumDetailModal from '../components/AlbumDetailModal';
import Loading from '../components/Loading';
import FloatingImage from '../components/FloatingImage';
import 'aos/dist/aos.css';

const apiUrl = process.env.REACT_APP_API_URL;

function AlbumPage() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [resultImgId, setResultImgId] = useState('');

  const openModalHandler = (id) => {
    setResultImgId(id);
    setIsOpen(true);
  };

  const breakpointColumnObj = {
    default: 4,
    1200: 3,
    900: 2,
    600: 1,
  };

  const [images, setImages] = useState([]);

  async function inquireAlbum() {
    setIsLoading(true);

    try {
      const access = localStorage.getItem('access');
      const response = await axios.post(
        `${apiUrl}album/`,
        {},
        { headers: { Authorization: `Bearer ${access}` } },
      );

      const albumData = response.data;
      console.log(albumData);
      setImages((prevImages) => [...prevImages, ...albumData]);

      setIsLoading(false);

      AOS.init({
        // Add AOS settings if needed
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    inquireAlbum().then(() => {
      setTimeout(() => {
        AOS.refresh();
      }, 300); // 500ms 뒤에 AOS.refresh()를 호출
    });
  }, []);

  return (
    <div>
      <Container>
        <Header />
        <MainWrap>
          <BtnWrap>
            <AddBtn
              onClick={() => navigate('/choose')}
              whileHover={{ scale: 1.2 }}
            >
              START
            </AddBtn>
          </BtnWrap>
          <MyMasonryGrid
            breakpointCols={breakpointColumnObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {images.length > 0 &&
              images.map((img, i) => {
                return (
                  <MyMasonryGridColumn key={img.result_image_id}>
                    <ImageWithShadow
                      src={img.result_url}
                      alt="photo"
                      onClick={() => openModalHandler(img.result_image_id)}
                      data-aos="fade-up"
                      data-aos-delay={i * 20} // i * 100을 사용하여 각 이미지에 대해 다른 딜레이를 설정합니다.
                    />
                  </MyMasonryGridColumn>
                );
              })}
            {images.length === 0 && (
              <FloatingWrap>
                <FloatingImage />
              </FloatingWrap>
            )}

            {isOpen && (
              <AlbumDetailModal
                imgId={resultImgId}
                setIsOpen={setIsOpen}
                setImages={setImages} // 삭제된 이미지가 모달창을 닫은 후에 자동으로 렌더링되도록 수정하기 위해 images 상태를 업데이트하는 함수를 정의
              />
            )}
          </MyMasonryGrid>
          {/* <CenteredButton>
            <UploadBtn path="/upload" />
          </CenteredButton> */}
        </MainWrap>
      </Container>
    </div>
  );
}

export default AlbumPage;

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #f6f6f6;
`;

const MainWrap = styled.div`
  max-width: 1440px;
  width: 76vw;
  height: 100%;
  margin: 0 auto;
  flex-shrink: 0;
  background-color: #f6f6f6;
  justify-content: center;
`;

const BtnWrap = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10rem;
`;

const AddBtn = styled(motion.button)`
  margin: 0 auto;
  width: 9rem; // width 추가
  height: 3.5rem; // height 추가
  background-color: #f1f1f1;
  border-radius: 30px;
  color: #1f1f1f;
  font-size: 1.2rem;
  font-family: 'Pretendard-Regular';
  font-weight: 600;
  border: 1.5px solid #1f1f1f;

  &:hover {
    cursor: pointer;
  }
`;
const MyMasonryGrid = styled(Masonry)`
  display: flex;
  margin: 0 auto;
  margin-top: 10rem;
  justify-content: center;
  align-items: center;
  width: auto;
  &::after {
    content: '';
    display: block;
    clear: both;
  }
`;

const MyMasonryGridColumn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-clip: padding-box;
`;

const ImageWithShadow = styled.img`
  box-shadow: 10px 10px 6px 0px rgba(0, 0, 0, 0.25);
  width: 85%;
  margin: 0 auto;
  margin-bottom: 3rem;
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
`;

const FloatingWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;
