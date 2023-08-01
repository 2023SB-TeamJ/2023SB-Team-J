/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
import React, { useState } from 'react';
import styled from 'styled-components';
import { ResizableBox } from 'react-resizable';
import Draggable from 'react-draggable';
import { motion } from 'framer-motion';
import img from '../../assets/images/textSvg.svg';

function CustomText({ color, fontFamily }) {
  const [textElements, setTextElements] = useState([]);

  // 삭제 버튼의 기본적인 표시 여부 상태
  const [show, setShow] = useState(false);

  const handleAddTextbox = () => {
    setTextElements((prevTextElements) => [
      ...prevTextElements,
      {
        id: Date.now().toString(),
        text: '텍스트 입력 후 드래그하세요',
        position: { x: -270, y: 100 },
        size: { width: 200, height: 100 },
        fontSize: 16,
      },
    ]);
  };

  const handleTextChange = (id, value) => {
    setTextElements((prevTextElements) =>
      prevTextElements.map((element) =>
        element.id === id ? { ...element, text: value } : element,
      ),
    );
  };

  const handleDrag = (id, e, ui) => {
    setTextElements((prevTextElements) =>
      prevTextElements.map((element) =>
        element.id === id
          ? { ...element, position: { x: ui.x, y: ui.y } }
          : element,
      ),
    );
  };

  const handleDeleteTextbox = (id) => {
    setTextElements((prevTextElements) =>
      prevTextElements.filter((element) => element.id !== id),
    );
  };

  const handleResize = (id, e, { size }) => {
    const { width, height } = size;
    const fontSize = calculateFontSize(width, height);
    setTextElements((prevTextElements) =>
      prevTextElements.map((element) =>
        element.id === id ? { ...element, size, fontSize } : element,
      ),
    );
  };

  const calculateFontSize = (width, height) => {
    const ratio = width / 120;
    const fontSize = 14 * ratio;
    return fontSize;
  };
  return (
    <div>
      <BtnWrap>
        <AddTextboxButton
          onClick={handleAddTextbox}
          whileHover={{ scale: 1.2 }}
          whileTap={{ borderRadius: '50%' }}
        >
          <img
            src={img}
            style={{
              width: '90%',
              height: '90%',
            }}
            alt="Uploaded"
          />
        </AddTextboxButton>
        <GuideText>텍스트</GuideText>
      </BtnWrap>
      {textElements.map((element) => (
        <Draggable
          key={element.id}
          position={element.position}
          onDrag={(e, ui) => handleDrag(element.id, e, ui)}
          cancel=".react-resizable-handle"
        >
          <ResizableBox
            key={element.id}
            width={element.size.width}
            height={element.size.height}
            onResize={(e, data) => handleResize(element.id, e, data)}
            minConstraints={[100, 50]}
            maxConstraints={[300, 150]}
          >
            <TextboxContainer>
              {/* 삭제 버튼 */}
              <DeleteButton
                onClick={() => handleDeleteTextbox(element.id)}
                show={show}
                onMouseEnter={() => setShow(true)}
                onMouseLeave={() => setShow(false)}
              >
                X
              </DeleteButton>
              {/* 텍스트 박스 내용 */}
              <TextboxInput
                type="text"
                value={element.text}
                onChange={(e) => handleTextChange(element.id, e.target.value)}
                style={{ color, fontFamily, fontSize: `${element.fontSize}px` }}
                onMouseEnter={() => setShow(true)}
                onMouseLeave={() => setShow(false)}
              />
            </TextboxContainer>
          </ResizableBox>
        </Draggable>
      ))}
    </div>
  );
}

const BtnWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 8rem;
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

const AddTextboxButton = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TextboxContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

// 삭제 버튼 스타일 및 표시 여부에 따른 스타일 적용
const DeleteButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  padding: 3px;
  border: none;
  background-color: red;
  color: white;
  font-weight: bold;
  cursor: pointer;
  display: ${({ show }) => (show ? 'block' : 'none')};
`;

const TextboxInput = styled.input`
  padding: 5px;
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  background-color: #ffffff;
  background-color: rgba(255, 255, 255, 0);
`;

export default CustomText;
