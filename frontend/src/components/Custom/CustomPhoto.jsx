/* eslint-disable no-shadow */
/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-props-no-spreading */
import 'react-resizable/css/styles.css';
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { ResizableBox } from 'react-resizable';
import Draggable from 'react-draggable';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import imageButton from '../../assets/images/photo.png';

function CustomPhoto() {
  // 배열로 변경, 페이지 관리
  const [image, setImage] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState({ width: 300, height: 200 });

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = () => {
      setImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleResize = (e, { size }) => {
    setSize(size);
  };

  const handleDelete = () => {
    setImage(null);
  };

  return (
    <ImageContainer>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <ImageButtonContainer
          whileHover={{ scale: 1.2 }}
          whileTap={{ borderRadius: '50%' }}
        >
          <img src={imageButton} alt="Upload" />
        </ImageButtonContainer>
      </div>
      <Wrapper>
        {image && (
          <Draggable
            position={position}
            onStop={(e, data) => setPosition({ x: data.x, y: data.y })}
            cancel=".react-resizable-handle"
          >
            <ResizableBox
              width={size.width}
              height={size.height}
              onResize={handleResize}
            >
              <div style={{ width: '100%', height: '100%' }}>
                <DeleteButton onClick={handleDelete}>X</DeleteButton>
                <img
                  src={image}
                  style={{ width: '100%', height: '100%' }}
                  alt="Uploaded"
                />
              </div>
            </ResizableBox>
          </Draggable>
        )}
      </Wrapper>
    </ImageContainer>
  );
}

const ImageContainer = styled.div`
  position: relative;
`;

const ImageButtonContainer = styled(motion.div)`
  border: none;
  background: none;
  padding: 0;
  cursor: pointer;
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

const Wrapper = styled.div`
  position: absolute;
`;
export default CustomPhoto;