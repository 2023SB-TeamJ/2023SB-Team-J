/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import axios from 'axios';
import image from '../assets/images/photo1.png';

function AlbumDetailModal({ setIsOpen }) {
  const closeModal = () => {
    setIsOpen(false);
  };

  const formData = new FormData();
  const [resultImageId] = useState('4');
  formData.append('result_image_id', resultImageId);

  async function InquireAlbumDetail() {
    try {
      const response = await axios.get(
        'http://localhost:8000/api/v1/album/detail',
        {
          params: {
            result_image_id: 4,
          },
        },
      );
      const albumDetailData = response.data; // 응답 데이터
      console.log('앨범 상세 데이터: ', albumDetailData);
    } catch (error) {
      console.error('앨범 상세 조회 오류: ', error);
      console.log('에러 발생');
    }
  }

  InquireAlbumDetail();

  useEffect(() => {
    if (albumDetailData !== null) {
      InquireAlbumDetail(resultImageId);
    }
  }, [resultImageId]);

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
                fill="#fff"
              />
            </svg>
          </ExitBtn>
          <Photo />
          <Date>2023.07.12</Date>
          <ButtonWrap>
            <BookmarkBtn>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                viewBox="0 0 73 75"
                fill="none"
              >
                <g filter="url(#filter0_d_606_260)">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M23.4095 63.538C20.8651 64.7462 17.8935 63.503 16.7723 60.7611C16.4212 59.9025 16.2827 58.9604 16.3704 58.0269L17.8114 42.6903L8.28036 31.1955C6.42776 28.9612 6.60673 25.5315 8.6801 23.5351C9.32939 22.9099 10.118 22.4769 10.969 22.2783L24.9496 19.0159L32.1491 5.69562C33.5486 3.10649 36.6307 2.23008 39.0333 3.73811C39.7857 4.21036 40.4116 4.88482 40.8499 5.69562L48.0494 19.0159L62.03 22.2783C64.7474 22.9125 66.4734 25.8005 65.8849 28.7289C65.7006 29.6459 65.2988 30.4958 64.7186 31.1955L55.1876 42.6903L56.6286 58.0269C56.9086 61.0079 54.8931 63.6692 52.1268 63.971C51.2605 64.0656 50.3863 63.9163 49.5895 63.538L36.4995 57.3219L23.4095 63.538Z"
                    stroke="white"
                    strokeWidth="5"
                    strokeLinecap="round"
                    shapeRendering="crispEdges"
                  />
                </g>
                <defs>
                  <filter
                    id="filter0_d_606_260"
                    x="0.500122"
                    y="0.496094"
                    width="71.9977"
                    height="74.0098"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                  >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feOffset dy="4" />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow_606_260"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow_606_260"
                      result="shape"
                    />
                  </filter>
                </defs>
              </svg>
            </BookmarkBtn>
            <DeleteBtn>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                viewBox="0 0 67 69"
                fill="none"
              >
                <g filter="url(#filter0_d_606_264)">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12.85 53.375C12.85 54.7787 14.1708 55.9167 15.8 55.9167H51.2C52.8292 55.9167 54.15 54.7787 54.15 53.375V22.875H12.85V53.375ZM48.25 7.625H54.15C59.0377 7.625 63 11.0388 63 15.25V20.3333C63 21.7371 61.6792 22.875 60.05 22.875V53.375C60.05 57.5862 56.0877 61 51.2 61H15.8C10.9123 61 6.95 57.5862 6.95 53.375V22.875C5.32076 22.875 4 21.7371 4 20.3333V15.25C4 11.0388 7.96228 7.625 12.85 7.625H18.75C18.75 3.41383 22.7123 0 27.6 0H39.4C44.2877 0 48.25 3.41383 48.25 7.625ZM18.75 33.0417C18.75 31.6379 20.0708 30.5 21.7 30.5C23.3292 30.5 24.65 31.6379 24.65 33.0417V45.75C24.65 47.1537 23.3292 48.2917 21.7 48.2917C20.0708 48.2917 18.75 47.1537 18.75 45.75V33.0417ZM30.55 33.0417C30.55 31.6379 31.8708 30.5 33.5 30.5C35.1292 30.5 36.45 31.6379 36.45 33.0417V45.75C36.45 47.1537 35.1292 48.2917 33.5 48.2917C31.8708 48.2917 30.55 47.1537 30.55 45.75V33.0417ZM42.35 33.0417C42.35 31.6379 43.6708 30.5 45.3 30.5C46.9292 30.5 48.25 31.6379 48.25 33.0417V45.75C48.25 47.1537 46.9292 48.2917 45.3 48.2917C43.6708 48.2917 42.35 47.1537 42.35 45.75V33.0417ZM27.6 5.08333C25.9708 5.08333 24.65 6.22128 24.65 7.625H42.35C42.35 6.22128 41.0292 5.08333 39.4 5.08333H27.6ZM9.9 17.7917H57.1V15.25C57.1 13.8463 55.7792 12.7083 54.15 12.7083H12.85C11.2208 12.7083 9.9 13.8463 9.9 15.25V17.7917Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <filter
                    id="filter0_d_606_264"
                    x="0"
                    y="0"
                    width="67"
                    height="69"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                  >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feOffset dy="4" />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow_606_264"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow_606_264"
                      result="shape"
                    />
                  </filter>
                </defs>
              </svg>
            </DeleteBtn>
            <SaveBtn>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50px"
                height="50px"
                viewBox="0 0 78 69"
                fill="none"
              >
                <g filter="url(#filter0_d_606_263)">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M41.9167 37.0081L54.4376 26.1158C55.5766 25.125 57.4234 25.125 58.5624 26.1158C59.7014 27.1067 59.7014 28.7132 58.5624 29.7041L41.0624 44.9277C39.9234 45.9186 38.0766 45.9186 36.9376 44.9277L19.4376 29.7041C18.2986 28.7132 18.2986 27.1067 19.4376 26.1158C20.5766 25.125 22.4234 25.125 23.5624 26.1158L36.0833 37.0081V2.53727C36.0833 1.13597 37.3892 0 39 0C40.6108 0 41.9167 1.13597 41.9167 2.53727V37.0081ZM9.83333 55.9255H68.1667V43.1336C68.1667 41.7323 69.4725 40.5963 71.0833 40.5963C72.6942 40.5963 74 41.7323 74 43.1336V58.4627C74 59.864 72.6942 61 71.0833 61H6.91667C5.30584 61 4 59.864 4 58.4627V43.2913C4 41.89 5.30584 40.7541 6.91667 40.7541C8.5275 40.7541 9.83333 41.89 9.83333 43.2913V55.9255Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <filter
                    id="filter0_d_606_263"
                    x="0"
                    y="0"
                    width="78"
                    height="69"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                  >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feOffset dy="4" />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow_606_263"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow_606_263"
                      result="shape"
                    />
                  </filter>
                </defs>
              </svg>
            </SaveBtn>
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
  background-color: rgba(0, 0, 0, 0.2);
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
  border-radius: 20px;
  width: 50rem;
  height: 40rem;
  background-color: #3f3d3f;
  box-shadow: 10px 10px 6px 0px rgba(0, 0, 0, 0.25);
`;

const Photo = styled.div`
  width: 165px;
  height: 503px;
  flex-shrink: 0;
  border-radius: 20px;
  margin-top: 20px;
  background:
    url(${image}),
    lightgray 50% / cover no-repeat;
  box-shadow: 10px 10px 6px 0px rgba(0, 0, 0, 0.25);
`;

const Date = styled.div`
  display: flex;
  width: 177px;
  height: 36px;
  flex-direction: column;
  flex-shrink: 0;
  margin-top: 30px;

  color: #fff;
  text-align: center;
  text-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  font-size: 26px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const ButtonWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 180px;
  position: absolute;
  bottom: 10px;
  right: 15px;
`;

const BookmarkBtn = styled.div`
  flex-shrink: 0;
  stroke-width: 5px;
  margin-bottom: 5px;
  stroke: #fff;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  cursor: pointer;
`;

const DeleteBtn = styled.div`
  flex-shrink: 0;
  border-radius: 20px;
  fill: #fff;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  cursor: pointer;
`;
const SaveBtn = styled.div`
  flex-shrink: 0;
  fill: #fff;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  cursor: pointer;
`;

const ExitBtn = styled.div`
  position: absolute;
  top: 25px;
  right: 25px;

  &:hover {
    cursor: pointer;
  }
`;
