/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import imageButton from '../../assets/images/photo.png';

function CustomPhotoBtn() {
  const [image, setImage] = useState(null);

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
    <BtnContainer>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <ImageButtonContainer
          whileHover={{ scale: 1.2 }}
          whileTap={{ borderRadius: '50%' }}
        >
          <img src={imageButton} alt="Upload" />
        </ImageButtonContainer>
      </div>
    </BtnContainer>
  );
}

const BtnContainer = styled.div``;

const ImageButtonContainer = styled(motion.div)``;
export default CustomPhotoBtn;
