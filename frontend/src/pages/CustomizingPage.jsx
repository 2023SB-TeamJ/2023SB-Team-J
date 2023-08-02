/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/button-has-type */
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styled, { keyframes } from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import html2canvas from 'html2canvas';
import { SketchPicker } from 'react-color';
import HeaderCustom from '../components/HeaderCustom';
import addphoto from '../assets/images/saveAlbum.png';
import addlocal from '../assets/images/download.png';
import CustomPhoto from '../components/Custom/CustomPhoto';
import CustomTextBox from '../components/Custom/CustomTextBox';
import CustomEmoji from '../components/Custom/CustomEmoji';
import FoldSvg from '../assets/images/foldSvg.svg';

const apiUrl = process.env.REACT_APP_API_URL;

function CustomizingPage() {
  const navigate = useNavigate();

  const location = useLocation();
  // FramePage.jsx에서 받아온 colImg를 가져와 colImg에 저장
  // location.state가 객체이고 그 객체의 colImg 프로퍼티도 객체인 것을 가정하고 있습니다.
  // 그러나 실제로는 colImg가 문자열이어서 아래 코드처럼 작성
  const { colImg, frameType3 } = location.state;
  console.log(location.state);
  // const { frameType } = location.state;

  const [color, setColor] = useState('#000000');
  const [fontFamily, setFontFamily] = useState('Pretendar-Regular');
  const [isTextDivVisible, setIsTextDivVisible] = useState(true);
  const [isFolded, setIsFolded] = useState(false);

  useEffect(() => {
    let timerId;
    if (!isFolded) {
      timerId = setTimeout(() => {
        setIsTextDivVisible(true);
      }, 400);
    } else {
      setIsTextDivVisible(false);
    }
    return () => clearTimeout(timerId);
  }, [isFolded]);

  const handleChangeComplete = (newColor) => {
    setColor(newColor.hex);
  };

  const captureArea = () => {
    const captureDiv = document.getElementById('captureArea');

    function sendImageToServer(blob) {
      const userDummy = '1';
      const formData = new FormData();
      formData.append('result_image', blob, 'capture.png');
      const access = localStorage.getItem('access');
      // console.log(blob);
      // console.log(formData);
      fetch(`${apiUrl}frame/add/`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${access}` },
        body: formData, // 이미지 데이터를 FormData로 전송
      })
        .then((data) => {
          console.log('서버 응답:', data); // 서버로부터의 응답을 확인합니다.
          navigate('/album'); // 작업이 완료되면 원하는 페이지로 이동합니다.
        })
        .catch((error) => {
          console.error('에러 발생:', error); // 오류 처리
        });
    }

    html2canvas(captureDiv)
      .then((canvas) => {
        canvas.toBlob((blob) => {
          sendImageToServer(blob); // 이미지 데이터(Blob)를 서버로 전송하는 함수 호출
        }, 'image/png');
      })
      .catch((error) => {
        console.error('캡처 중 오류 발생:', error);
      });
  };

  const captureLocal = () => {
    const captureDiv = document.getElementById('captureArea');

    html2canvas(captureDiv).then((canvas) => {
      // 캡처된 canvas 객체를 사용할 수 있습니다.
      // 예를 들어, 이미지로 저장하거나 다른 작업을 수행할 수 있습니다.
      // 아래는 이미지로 저장하는 예제입니다.
      const imgData = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = imgData;
      link.download = 'capture.png';
      link.click();
    });
  };

  return (
    <div>
      <Container>
        {/* <IconWrap /> */}
        <HeaderCustom />
        <CustomWrap>
          <MenuWrap isFolded={isFolded}>
            {isTextDivVisible && !isFolded && (
              <TextDiv>
                <SketchPicker
                  color={color}
                  onChangeComplete={handleChangeComplete}
                  styles={{
                    default: {
                      picker: {
                        background: '#f6f6f6',
                      },
                    },
                  }}
                />
                <FontCol>
                  <FontPicker
                    style={{ fontFamily: 'iceSotong-Rg', fontSize: '2.4rem' }}
                    onClick={() => setFontFamily('iceSotong-Rg')} // 클릭 시 폰트 패밀리 변경
                  >
                    인천교육소통체
                  </FontPicker>
                  <FontPicker
                    style={{
                      fontFamily: 'Hangeuljaemin4-Regular',
                      fontSize: '1.8rem',
                    }}
                    onClick={() => setFontFamily('Hangeuljaemin4-Regular')} // 클릭 시 폰트 패밀리 변경
                  >
                    한글재민체3.0
                  </FontPicker>
                  <FontPicker
                    style={{
                      fontFamily: 'WandohopeR',
                      fontSize: '1.8rem',
                    }}
                    onClick={() => setFontFamily('WandohopeR')} // 클릭 시 폰트 패밀리 변경
                  >
                    완도희망체
                  </FontPicker>
                  <FontPicker
                    style={{
                      fontFamily: 'KCCChassam',
                      fontSize: '1.8rem',
                    }}
                    onClick={() => setFontFamily('KCCChassam')} // 클릭 시 폰트 패밀리 변경
                  >
                    KCC차쌤체
                  </FontPicker>
                </FontCol>
              </TextDiv>
            )}
            {isTextDivVisible && !isFolded && <Divider />}
          </MenuWrap>
          <CaptureWrap>
            <DivArea id="captureArea" aiimage={colImg} frameType3={frameType3}>
              <CustomTextBox
                color={color}
                fontFamily={fontFamily}
                onClick={() => setIsTextDivVisible(true)}
              />
              <CustomPhoto />
              <CustomEmoji whileHover={() => setIsTextDivVisible(false)} />
            </DivArea>
            <SaveWrap>
              <BtnWrap
                onClick={captureArea}
                whileHover={{ scale: 1.1 }}
                whileTap={{ borderRadius: '50%' }}
              >
                <AddPhotoBtn />
                <SaveText>앨범저장</SaveText>
              </BtnWrap>
              <BtnWrap
                onClick={captureLocal}
                whileHover={{ scale: 1.1 }}
                whileTap={{ borderRadius: '50%' }}
              >
                <AddLocalBtn />
                <SaveText>다운로드</SaveText>
              </BtnWrap>
            </SaveWrap>
          </CaptureWrap>
          <Fold isFolded={isFolded} onClick={() => setIsFolded(!isFolded)} />
        </CustomWrap>
      </Container>
    </div>
  );
}

export default CustomizingPage;

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

const IconWrap = styled.div`
  position: absolute;
  top: 13rem;
  left: -0.2rem;
  width: 7rem;
  height: 20.7rem;
  border: 2px solid black;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  background-image: linear-gradient(
    to bottom,
    transparent 33%,
    black 33%,
    black 33.7%,
    transparent 33.7%,
    transparent 66%,
    black 66%,
    black 66.7%,
    transparent 66.7%
  );

  &:hover {
    cursor: pointer;
  }
`;

const CustomWrap = styled.div`
  display: flex;
  margin-top: 1rem;
`;

const MenuWrap = styled.div`
  flex: ${(props) => (props.isFolded ? '0.145' : '1')};
  border-top: 1px solid rgba(37, 40, 47, 0.1);
  border-right: 1px solid rgba(37, 40, 47, 0.1);
  border-bottom: 1px solid rgba(37, 40, 47, 0.1);
  position: relative;
  transition: flex 0.5s ease-in-out;
`;

const TextDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: absolute;
  top: 1rem;
  right: 3.3rem;
`;

const FontCol = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const FontPicker = styled.span`
  margin-top: 2rem;

  &:hover {
    cursor: pointer;
  }
`;

const Divider = styled.div`
  position: absolute; // absolute positioning 사용
  left: 5rem;
  top: 0;
  bottom: 0;
  border-left: 1px solid rgba(37, 40, 47, 0.1); // border를 사용하여 세로 구분선 생성

  &:before {
    content: '';
    position: absolute;
    top: 3rem;
    left: -0.94rem; // adjust as needed
    border-top: 0.9rem solid transparent;
    border-bottom: 0.9rem solid transparent;
    border-right: 0.9rem solid rgba(37, 40, 47, 0.1); // 삼각형 색상을 조절하세요
  }
`;

const CaptureWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 2.5;
  margin: 0 auto;
  background-color: #f1f1f2;
  border-top: 1px solid rgba(37, 40, 47, 0.1);
  border-bottom: 1px solid rgba(37, 40, 47, 0.1);
`;

const DivArea = styled.div`
  ${({ frameType3 }) => {
    if (frameType3 === '1X4') {
      return `
      width: 14rem;
      aspect-ratio: 1 / 3;
      `;
    }
    if (frameType3 === '2X2') {
      return `
      width: 22rem;
      aspect-ratio: auto 2 / 3;
      `;
    }
    return `
      width: 14rem;
      aspect-ratio: 1 / 3;
    `;
  }};
  margin: 0 auto;
  margin-top: 1rem;
  background: url(${(props) => props.aiimage}) lightgray 50% / cover no-repeat;
  background-size: cover;
`;

const SaveWrap = styled.div`
  display: flex;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const BtnWrap = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 8rem;
  height: 3rem;
  margin-right: 0.5rem;
  margin-left: 0.5rem;
  border-radius: 5px;
  background: rgba(37, 40, 47, 0.05);

  &:hover {
    cursor: pointer;
  }
`;

const AddPhotoBtn = styled.div`
  width: 1.9rem;
  height: 1.9rem;
  background: url(${addphoto}) no-repeat;
  background-size: cover;
  color: #ffffff !important;
  margin-right: 0.3rem;
`;

const AddLocalBtn = styled.div`
  width: 1.9rem;
  height: 1.9rem;
  background: url(${addlocal}) no-repeat;
  background-size: cover;
  color: #ffffff !important;
  margin-right: 0.6rem;
`;

const SaveText = styled.span`
  display: flex;
  font-size: 1rem;
  font-family: 'Pretendard-Regular';
  font-weight: 800;
  color: #1f1f1f;
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(180deg);
  }
`;

const Fold = styled.div`
  position: absolute;
  bottom: 9.5rem;
  left: 1.3rem;
  width: 2.3rem; // 필요한 크기로 지정
  height: 2.3rem; // 필요한 크기로 지정
  background: url(${FoldSvg}) no-repeat;
  background-size: cover;
  transform: ${(props) => (props.isFolded ? 'rotate(180deg)' : 'rotate(0deg)')};
  transition: transform 0.5s ease-in-out;

  &:hover {
    cursor: pointer;
  }
`;

// ----------------------
// const StickerModal = styled.div`
//   display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
//   position: fixed;
//   z-index: 1;
//   left: 0;
//   top: 0;
//   width: 100%;
//   height: 100%;
//   overflow: auto;
//   background-color: rgba(0, 0, 0, 0.7);
// `;

// const StickerContent = styled.div`
//   background-color: white;
//   margin: 15% auto;
//   padding: 20px;
//   border: 1px solid #888;
//   max-width: 300px;
// `;

// const CloseButton = styled.span`
//   color: #aaa;
//   float: right;
//   font-size: 28px;
//   font-weight: bold;
//   cursor: pointer;

//   &:hover,
//   &:focus {
//     color: black;
//   }
// `;

// const Sticker = styled.div`
//   display: inline-block;
//   font-size: 24px;
//   margin: 5px;
//   cursor: pointer;
// `;

// const DropArea = styled.div`
//   width: 100%;
//   height: 100%;
// `;

// const DraggableSticker = styled.div`
//   display: inline-flex;
//   align-items: center;
//   justify-content: center;
//   font-size: ${({ fontSize }) => fontSize || 30}px; /* 디폴트 값 24 설정 */
//   cursor: move;
//   user-select: none;
//   position: relative;
//   z-index: 1;
// `;
