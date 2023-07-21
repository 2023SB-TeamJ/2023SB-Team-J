/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
import React, { useState } from 'react';
import styled from 'styled-components';
import { ResizableBox } from 'react-resizable';
import Draggable from 'react-draggable';
import { motion } from 'framer-motion';
import img from '../../assets/images/textbox.png';

function CustomText() {
  const [textElements, setTextElements] = useState([]);
  const handleAddTextbox = () => {
    setTextElements((prevTextElements) => [
      ...prevTextElements,
      {
        id: Date.now().toString(),
        text: '',
        position: { x: 0, y: 0 },
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
    // 폰트 크기를 원하는 비율로 조절하는 로직을 작성하세요
    // 예를 들어, 폭이 커질수록 폰트 크기도 커지도록 비율을 계산할 수 있습니다.
    const ratio = width / 200; // 원하는 비율 계산
    const fontSize = 16 * ratio; // 기본 폰트 크기에 비율을 곱하여 적용
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
            style={{ width: '100%', height: '100%' }}
            alt="Uploaded"
          />
        </AddTextboxButton>
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
            maxConstraints={[500, 300]}
          >
            <TextboxContainer>
              <DeleteButton onClick={() => handleDeleteTextbox(element.id)}>
                X
              </DeleteButton>
              <TextboxInput
                type="text"
                value={element.text}
                onChange={(e) => handleTextChange(element.id, e.target.value)}
                style={{ fontSize: `${element.fontSize}px` }}
              />
            </TextboxContainer>
          </ResizableBox>
        </Draggable>
      ))}
    </div>
  );
}

const BtnWrap = styled.div`
  position: absolute;
  top: 35%;
  left: 21%;
`;
const AddTextboxButton = styled(motion.div)`
  width: 100px;
  height: 100px;
`;

const TextboxContainer = styled.div`
  position: relative;
  border: 1px solid #ccc;
  width: 100%;
  height: 100%;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  padding: 5px;
  border: none;
  background-color: red;
  color: white;
  font-weight: bold;
  cursor: pointer;
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
