/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

import photo from '../../assets/images/photo.png';
import sticker from '../../assets/images/sticker.png';
// import CustomTextBox from './CustomTextBox';
import CustomSticker from './CustomSticker';
import smile from '../../assets/images/sticker_smile.png';
import sunglass from '../../assets/images/sticker_sunglass.png';
import heart from '../../assets/images/sticker_heart.png';

function CustomMenuBar() {
  const imageList = [smile, sunglass, heart];
  const [isMenuOpen, setMenuOpen] = useState(false);

  // const toggleMenu1 = () => {
  //   setMenuOpen(false);
  // };

  const toggleMenu2 = () => {
    setMenuOpen(false);
  };

  const toggleMenu3 = () => {
    setMenuOpen(!isMenuOpen);
  };
  return (
    <div>
      <MenuWrap>
        <ButtonWrap>
          {/* <CustomTextBox /> */}

          <PhotoBtn
            onClick={toggleMenu2}
            whileHover={{ scale: 1.2 }}
            whileTap={{ borderRadius: '50%' }}
          />

          <StickerBtn
            onClick={toggleMenu3}
            whileHover={{ scale: 1.2 }}
            whileTap={{ borderRadius: '50%' }}
          />
        </ButtonWrap>

        <ContentWrap>
          <AnimatePresence>
            {' '}
            {/* Framer Motion의 AnimatePresence를 추가 */}
            {isMenuOpen && (
              <ContentSticker
                initial={{ width: 0 }}
                animate={{ width: '30rem' }}
                exit={{ width: 0 }}
                transition={{ duration: 0.5 }}
              >
                <PageContainer>
                  <ImageGallery imageList={imageList} />
                </PageContainer>
              </ContentSticker>
            )}
          </AnimatePresence>
        </ContentWrap>
      </MenuWrap>
    </div>
  );
}

// const TextboxBtn = styled(motion.div)`
//   background-color: #c8cfd4;
//   margin: 8px;
//   padding: 10px;
//   border: 10x;
//   cursor: pointer;
//   margin-bottom: 10px;
//   display: block;
//   width: 63px;
//   height: 63px;
//   flex-shrink: 0;
//   background:
//     url(${textbox}),
//     lightgray 50% / cover no-repeat;
//   background-size: cover;
// `;
const PhotoBtn = styled(motion.div)`
  background-color: #c8cfd4;
  margin: 8px;
  padding: 10px;
  border: none;
  cursor: pointer;
  margin-bottom: 10px;
  display: block;
  width: 4rem;
  height: 4rem;
  flex-shrink: 0;
  background:
    url(${photo}),
    lightgray 50% / cover no-repeat;
  background-size: cover;
  background-color: ${(props) => props.theme.backgroundColor};
`;
const StickerBtn = styled(motion.div)`
  background-color: #c8cfd4;
  margin: 8px;
  padding: 10px;
  border: none;
  cursor: pointer;
  margin-bottom: 10px;
  display: block;
  width: 63px;
  height: 63px;
  flex-shrink: 0;
  background:
    url(${sticker}),
    lightgray 50% / cover no-repeat;
  background-size: cover;
  background-color: ${(props) => props.theme.backgroundColor};
`;

// const ContentTextBox = styled(motion.div)`
//   display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
//   width: 30rem;
//   height: 100%;
//   padding: 10px;
//   background-color: #f5f5f5;
//   transition: 0.1 ease-in-out;
// `;

// const ContentPhoto = styled(motion.div)`
//   display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
//   width: 30rem;
//   height: 100%;
//   padding: 10px;
//   background-color: #f5f5f5;
//   transition: 0.1 ease-in-out;
// `;

const ContentSticker = styled(motion.div)`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  width: 30rem;
  height: 100%;
  padding: 10px;
  background-color: #f5f5f5;
  transition: 0.1 ease-in-out;
`;

const ButtonWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 620px;
  border: 2px solid #3f3d3f;
`;

const ContentWrap = styled.div`
  height: 620px;
  border: 2px solid #3f3d3f;
`;

const MenuWrap = styled.div`
  display: flex;
`;

const PageContainer = styled.div``;

export default CustomMenuBar;

function ImageGallery({ imageList }) {
  return (
    <GalleryContainer>
      <CustomSticker imageList={imageList} />
    </GalleryContainer>
  );
}

const GalleryContainer = styled.div`
  width: 10px;
`;
