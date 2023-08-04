/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-shadow */
/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import styled from 'styled-components';
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';

function CustomSticker({ imageList }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState({ width: 200, height: 200 });

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleResize = (e, { size }) => {
    setSize(size);
  };

  const handleDelete = () => {
    setSelectedImage(null);
  };

  return (
    <Container>
      {imageList.map((image, index) => (
        <ImageContainer key={index}>
          <Image
            src={image}
            alt={`Sticker ${index + 1}`}
            onClick={() => handleImageClick(image)}
          />
        </ImageContainer>
      ))}
      {selectedImage && (
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
            <DeleteButton onClick={handleDelete}>X</DeleteButton>
            <SelectedImage
              src={selectedImage}
              alt="Selected Sticker"
              size={size}
            />
          </ResizableBox>
        </Draggable>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Image = styled.img`
  width: 100px;
  height: 100px;
  object-fit: contain;
  margin: 5px;
  cursor: pointer;
`;

const SelectedImage = styled.img`
  width: ${(props) => `${props.size.width}px`};
  height: ${(props) => `${props.size.height}px`};
  object-fit: contain;
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

const ImageContainer = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  margin: 5px;
`;

export default CustomSticker;
