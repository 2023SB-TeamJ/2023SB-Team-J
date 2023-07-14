/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
// import { ResizableBox } from 'react-resizable';
import { Draggable } from 'react-draggable';
import styled from 'styled-components';

function CustomPhoto() {
  const [image, setImage] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  // const [size, setSize] = useState({ width: 200, height: 200 });

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
        >
          {/* <ResizableBox
            width={size.width}
            height={size.height}
            onResizeStop={(e, data) =>
              setSize({ width: data.size.width, height: data.size.height })
            }
          > */}
          <img src={image} alt="Uploaded" />
          {/* </ResizableBox> */}
        </Draggable>
      )}
    </ImageContainer>
  );
}

const ImageContainer = styled.div`
  position: relative;
`;

export default CustomPhoto;
