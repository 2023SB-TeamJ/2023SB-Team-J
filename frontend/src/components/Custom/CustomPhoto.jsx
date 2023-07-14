/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-props-no-spreading */
import 'react-resizable/css/styles.css';
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { ResizableBox } from 'react-resizable';
import Draggable from 'react-draggable';
import styled from 'styled-components';

function CustomPhoto() {
  const [image, setImage] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState({ width: 200, height: 200 });

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = () => {
      setImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <ImageContainer>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <button>Upload Image</button>
      </div>
      {image && (
        <Draggable
          position={position}
          onStop={(e, data) => setPosition({ x: data.x, y: data.y })}
          cancel=".react-resizable-handle"
        >
          <ResizableBox
            width={size.width}
            height={size.height}
            onResizeStop={(e, data) =>
              setSize({ width: data.size.width, height: data.size.height })
            }
          >
            <div style={{ width: '100%', height: '100%' }}>
              <img
                src={image}
                style={{ width: '100%', height: '100%' }}
                alt="Uploaded"
              />
            </div>
          </ResizableBox>
        </Draggable>
      )}
    </ImageContainer>
  );
}

const ImageContainer = styled.div`
  position: relative;
`;

export default CustomPhoto;
