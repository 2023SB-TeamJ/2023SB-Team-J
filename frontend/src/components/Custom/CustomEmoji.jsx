/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import imojiButton from '../../assets/images/emojiSvg.svg';

function CustomEmoji() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [droppedStickers, setDroppedStickers] = useState([]);

  // 삭제 버튼의 기본적인 표시 여부 상태
  const [show, setShow] = useState(false);

  const stickers = [
    '😀',
    '🎉',
    '❤️',
    '⭐️',
    '👀',
    '🔥',
    '👍🏻',
    '🤍',
    '💣',
    '😜',
    '👏',
  ]; // 이모지 스티커 목록

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleStickerClick = (emoji) => {
    setDroppedStickers((prevStickers) => [
      ...prevStickers,
      { emoji, position: { x: 0, y: 0 }, size: { width: 80, height: 80 } },
    ]);
    handleCloseModal();
  };
  const handleDrag = (event, data, index) => {
    const { x, y } = data;
    const updatedStickers = [...droppedStickers];
    updatedStickers[index].position = { x, y };
    setDroppedStickers(updatedStickers);
  };

  const calculateFontSize = (width) => {
    // 폰트 크기를 원하는 비율로 조절하는 로직을 작성하세요
    // 예를 들어, 폭이 커질수록 폰트 크기도 커지도록 비율을 계산할 수 있습니다.
    const ratio = width / 20; // 원하는 비율 계산
    const fontSize = 14 * ratio; // 기본 폰트 크기에 비율을 곱하여 적용
    return fontSize;
  };

  const handleResize = (event, { size }, index) => {
    const { width, height } = size;
    const fontSize = calculateFontSize(width, height);
    const updatedStickers = [...droppedStickers];
    updatedStickers[index] = {
      ...updatedStickers[index],
      size: { width, height },
      fontSize, // 수정된 폰트 크기를 fontSize로 저장
    };
    setDroppedStickers(updatedStickers);
  };

  const handleDeleteSticker = (index) => {
    setDroppedStickers((prevStickers) => {
      const updatedStickers = [...prevStickers];
      updatedStickers.splice(index, 1); // 해당 인덱스의 스티커를 배열에서 삭제
      return updatedStickers;
    });
  };

  return (
    <div>
      <BtnWrap>
        <EmojiButtonContainer
          whileHover={{ scale: 1.2 }}
          whileTap={{ borderRadius: '50%' }}
        >
          <img
            src={imojiButton}
            alt="Upload"
            style={{ width: '90%', height: '90%' }}
            onClick={handleOpenModal}
          />
        </EmojiButtonContainer>
        <GuideText>스티커</GuideText>
      </BtnWrap>
      <StickerModal isOpen={isModalOpen}>
        <StickerContent>
          <CloseButton onClick={handleCloseModal}>&times;</CloseButton>
          <div>
            {stickers.map((sticker, index) => (
              <Sticker key={index} onClick={() => handleStickerClick(sticker)}>
                {sticker}
              </Sticker>
            ))}
          </div>
        </StickerContent>
      </StickerModal>
      <DropArea>
        {droppedStickers.map((sticker, index) => (
          <Draggable
            key={index}
            defaultPosition={sticker.position}
            onDrag={(event, data) => handleDrag(event, data, index)}
            cancel=".react-resizable-handle"
          >
            <ResizableBox
              width={sticker.size.width}
              height={sticker.size.height}
              onResizeStop={(event, data) => handleResize(event, data, index)}
              minConstraints={[40, 40]}
              maxConstraints={[200, 200]}
            >
              <DraggableSticker
                fontSize={sticker.fontSize}
                onMouseEnter={() => setShow(true)}
                onMouseLeave={() => setShow(false)}
              >
                {sticker.emoji}
                <DeleteButton
                  onClick={() => handleDeleteSticker(index)}
                  show={show}
                  onMouseEnter={() => setShow(true)}
                  onMouseLeave={() => setShow(false)}
                >
                  X
                </DeleteButton>
              </DraggableSticker>
            </ResizableBox>
          </Draggable>
        ))}
      </DropArea>
    </div>
  );
}
export default CustomEmoji;

const EmojiButtonContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: cover;
  border: none;
  background: none;
  padding: 0;
`;
const BtnWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 22rem;
  left: 0.7rem;
  width: 3.7rem;
  height: 3.7rem;

  &:hover {
    cursor: pointer;
  }
`;

const GuideText = styled.div`
  font-size: 0.75rem;
  font-family: 'Pretendard-Regular';
  text-align: center;
  margin-top: 0.2rem;
  color: rgba(157, 158, 163, 1);
`;

const StickerModal = styled.div`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.7);
`;

const StickerContent = styled.div`
  background-color: white;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  max-width: 800px;
  max-height: 500px;
`;

const CloseButton = styled.span`
  color: #aaa;
  float: right;
  font-size: 32px;
  font-weight: bold;
  cursor: pointer;

  &:hover,
  &:focus {
    color: black;
  }
`;

const Sticker = styled.div`
  display: inline-block;
  font-size: 3rem;
  margin: 0.6rem;
  cursor: pointer;
`;

const DropArea = styled.div`
  width: 100%;
  height: 100%;
`;

const DraggableSticker = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ fontSize }) => fontSize || 60}px; /* 디폴트 값 24 설정 */
  cursor: move;
  user-select: none;
  position: relative;
  z-index: 1;
`;

const DeleteButton = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  font-size: 14px;
  border: none;
  background-color: red;
  color: white;
  font-weight: bold;
  cursor: pointer;
  display: ${({ show }) => (show ? 'block' : 'none')};
`;
