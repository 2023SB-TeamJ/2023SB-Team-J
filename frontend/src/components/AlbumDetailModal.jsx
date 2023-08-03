/* eslint-disable no-restricted-globals */
/* eslint-disable no-const-assign */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import axios from 'axios';
// import image from '../assets/images/photo1.png';

const apiUrl = process.env.REACT_APP_API_URL;

function AlbumDetailModal({ setIsOpen, imgId, setImages }) {
  const closeModal = () => {
    setIsOpen(false);
  };
  const access = localStorage.getItem('access');

  const [url, setUrl] = useState('');
  const [date, setDate] = useState('');

  async function InquireAlbumDetail() {
    try {
      const response = await axios.get(`${apiUrl}album/detail/`, {
        params: {
          result_image_id: imgId,
        },
        headers: { Authorization: `Bearer ${access}` },
      });
      const albumDetailData = response.data; // 응답 데이터
      // console.log('앨범 상세 데이터: ', albumDetailData);
      setUrl(albumDetailData.result_image);
      setDate(albumDetailData.create_date);
    } catch (error) {
      console.error('앨범 상세 조회 오류: ', error);
      console.log('에러 발생');
    }
  }

  const deleteImage = async () => {
    const access = localStorage.getItem('access');

    try {
      const response = await axios.put(
        `${apiUrl}album/detail/`,
        { result_image_id: imgId },
        { headers: { Authorization: `Bearer ${access}` } },
      );
      if (response.status === 200) {
        console.log('이미지 삭제 성공');
        closeModal(); // 삭제 후 모달 닫기

        // 이전 이미지 목록을 받아와서 위에서 설명한 필터링 작업을 수행하여 새로운 이미지 목록을 생성합니다.
        setImages((prevImages) =>
          // result_image_id가 imgId와 같지 않은 경우에만 true를 반환
          // 즉, imgId와 다른 이미지만 필터링하여 새로운 배열을 생성합니다.
          prevImages.filter((img) => img.result_image_id !== imgId),
        );
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 400) {
        console.log('이미지 삭제 실패');
      }
    }
  };

  useEffect(() => {
    InquireAlbumDetail();
  }, []);

  return (
    <ModalContainer>
      <ModalBackdrop>
        <ModalView onClick={(e) => e.stopPropagation()}>
          <ExitBtn
            onClick={closeModal}
            style={{ backgroundColor: 'transparent' }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 12 12"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.29903 10.8524C0.0793599 11.0721 0.0793599 11.4282 0.29903 11.6479C0.5187 11.8676 0.874855 11.8676 1.09452 11.6479L5.94677 6.79566L10.9056 11.7545C11.1253 11.9742 11.4815 11.9742 11.7011 11.7545C11.9208 11.5348 11.9208 11.1787 11.7011 10.959L6.74227 6.00016L11.7011 1.0413C11.9208 0.821632 11.9208 0.465477 11.7011 0.245807C11.4815 0.026137 11.1253 0.0261374 10.9056 0.245807L5.94677 5.20466L1.09452 0.352414C0.874855 0.132744 0.5187 0.132744 0.29903 0.352414C0.0793599 0.572084 0.0793599 0.92824 0.29903 1.14791L5.15128 6.00016L0.29903 10.8524Z"
                fill="#000000"
              />
            </svg>
          </ExitBtn>
          {url && (
            <img
              style={{ height: '80%', objectFit: 'contain' }}
              src={url}
              alt="img"
            />
          )}
          <Date>{date}</Date>
          <ButtonWrap>
            <DeleteBtn onClick={deleteImage}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="48"
                viewBox="0 -960 960 960"
                width="48"
              >
                <path d="M261-120q-24.75 0-42.375-17.625T201-180v-570h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438v-570ZM367-266h60v-399h-60v399Zm166 0h60v-399h-60v399ZM261-750v570-570Z" />
              </svg>
            </DeleteBtn>
          </ButtonWrap>
        </ModalView>
      </ModalBackdrop>
    </ModalContainer>
  );
}

export default AlbumDetailModal;

const ModalContainer = styled.div`
  // Modal을 구현하는데 전체적으로 필요한 CSS를 구현
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const ModalBackdrop = styled.div`
  // Modal이 떴을 때의 배경을 깔아주는 CSS를 구현
  z-index: 1; //위치지정 요소
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const ModalView = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  border-radius: 20px;
  width: 50rem;
  height: 40rem;
  background-color: #f6f6f6;
  box-shadow: 10px 10px 6px 0px rgba(0, 0, 0, 0.25);
`;

// const Photo = styled.img`
//   width: 100%;
//   height: 503px;
//   flex-shrink: 0;
//   border-radius: 20px;
//   margin-top: 20px;
//   background-image: url(${(props) => props.url});
//   background-position: center;
//   background-repeat: no-repeat;
//   background-size: cover;
//   background-color: lightgray;

//   box-shadow: 10px 10px 6px 0px rgba(0, 0, 0, 0.25);
// `;

const Date = styled.div`
  display: flex;
  width: 177px;
  height: 36px;
  flex-direction: column;
  flex-shrink: 0;
  margin-top: 30px;

  color: '#000000';
  text-align: center;
  text-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  font-family: 'Pretendard-Regular';
  font-size: 26px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const ButtonWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: absolute;
  bottom: 1.5rem;
  right: 2rem;
`;

// const BookmarkBtn = styled.div`
//   flex-shrink: 0;
//   stroke-width: 5px;
//   margin-bottom: 5px;
//   stroke: #fff;
//   filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
//   cursor: pointer;
// `;

const DeleteBtn = styled.div`
  flex-shrink: 0;
  border-radius: 20px;
  fill: #000;
  /* filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25)); */
  cursor: pointer;
`;
// const SaveBtn = styled.div`
//   flex-shrink: 0;
//   fill: #fff;
//   filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
//   cursor: pointer;
// `;

const ExitBtn = styled.div`
  position: absolute;
  top: 25px;
  right: 25px;
  &:hover {
    cursor: pointer;
  }
`;
