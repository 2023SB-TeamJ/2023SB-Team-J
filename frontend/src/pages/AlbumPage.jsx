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
import Header from '../components/HeaderAlbum';
import AlbumDetailModal from '../components/AlbumDetailModal';
import PlusBtn from '../assets/images/plusBtn.png';
import Loading from '../components/Loading';

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
    default: 4, // 기본 레이아웃에서 4열
    1200: 3, // 창 너비 1200px 이하일 때 3열
    900: 2, // 창 너비 900px 이하일 때 2열
    600: 1, // 창 너비 600px 이하일 때 1열
  };

  // userId 가 노출됌...
  // // state로 이미지 관리
  // const [images, setImages] = useState([]);

  // const [userId] = useState('2');
  // async function inquireAlbum(userId) {
  //   try {
  //     const response = await axios.get(
  //       // get 말고 post로 바꿔야
  //       `http://localhost:8000/api/v1/album/?user_id=${userId}`,
  //     );

  //     // 서버 응답 처리
  //     const albumData = response.data; // 응답 데이터

  //     // 이미지 배열에 추가
  //     const newImages = albumData.map((item) => item.result_url);
  //     setImages((prevImages) => [...prevImages, ...newImages]);
  //   } catch (error) {
  //     console.log('에러 발생');
  //   }
  // }

  // // 앨범 조회 요청 보내기
  // useEffect(() => {
  //   // 요청을 1번만 보내게 설정
  //   if (images.length === 0) {
  //     inquireAlbum(userId);
  //   }
  // }, [images, userId]);

  // state로 이미지 관리
  const [images, setImages] = useState([]);

  async function inquireAlbum() {
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:8000/api/v1/album/', {
        user_id: '2',
      });

      // 서버 응답 처리
      const albumData = response.data; // 응답 데이터
      console.log(albumData);
      // 이미지 배열에 추가

      setImages((prevImages) => [...prevImages, ...albumData]);

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      console.log('에러 발생');
    }
  }

  // 앨범 조회 요청 보내기
  useEffect(() => {
    // 요청을 1번만 보내게 설정
    inquireAlbum();
  }, []);

  return (
    <div>
      <Container>
        <Header />
        <MainWrap>
          <AddBtn
            onClick={() => navigate('/choose')}
            whileHover={{ scale: 1.2 }}
            whileTap={{ borderRadius: '50%' }}
          />
          <MyMasonryGrid
            breakpointCols={breakpointColumnObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {isLoading ? (
              <LoadingWrap>
                <Loading />
              </LoadingWrap>
            ) : (
              images.map((img, i) => {
                return (
                  <MyMasonryGridColumn key={img.result_image_id}>
                    <ImageWithShadow
                      src={img.result_url}
                      alt="photo"
                      onClick={() => openModalHandler(img.result_image_id)} // 보내는 값에 따라 다름
                    />
                    {/* id값을 모달창에 보내야됨 */}
                  </MyMasonryGridColumn>
                );
              })
            )}
            {isOpen && (
              <AlbumDetailModal imgId={resultImgId} setIsOpen={setIsOpen} />
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
  background: ${(props) => props.theme.backgroundColor};
`;

const MainWrap = styled.div`
  position: relative;
  max-width: 1440px;
  width: 76vw;
  height: 100%;
  margin: 0 auto;
  flex-shrink: 0;
  border: 3px solid black;
  background-color: white;
`;

const AddBtn = styled(motion.div)`
  position: absolute;
  top: 10vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 60px; // width 추가
  height: 60px; // height 추가
  background: url(${PlusBtn}) no-repeat center/cover;

  &:hover {
    cursor: pointer;
  }
`;
const MyMasonryGrid = styled(Masonry)`
  display: flex;
  margin-top: 30vh;
  margin-left: -30px; /* 컬럼 간격을 조절하기 위해 음수 마진을 적용 */
  width: auto;

  &::after {
    content: '';
    display: block;
    clear: both;
  }
`;

const MyMasonryGridColumn = styled.div`
  padding-left: 30px; /* 컬럼 간격을 조절하기 위해 패딩을 적용 */
  background-clip: padding-box;

  img {
    width: 100%;
    display: block;
    margin-bottom: 20px;
  }
`;

const ImageWithShadow = styled.img`
  box-shadow: 10px 10px 6px 0px rgba(0, 0, 0, 0.25);
`;

const LoadingWrap = styled.div``;
