/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';
import styled from 'styled-components';
import { useDropzone } from 'react-dropzone';
import sampleUploadImage from '../assets/images/SampleUploadImage.png';

function UploadImage({ onImageUpload }) {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [fileError, setFileError] = useState(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      acceptedFiles.forEach((file) => {
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();

          reader.onabort = () => console.log('file reading was aborted');
          reader.onerror = () => console.log('file reading has failed');
          reader.onload = () => {
            const binaryStr = reader.result;
            setUploadedImage(binaryStr);
            setFileError(null);
            onImageUpload(file); // Pass the file to the parent component
          };
          reader.readAsDataURL(file);
        } else {
          setFileError('Only image files are allowed.');
        }
      });
    },
    accept: 'image/*',
  });

  return (
    <RowWrap {...getRootProps()}>
      <input {...getInputProps()} />
      <UploadImageFrame isDragActive={isDragActive}>
        {uploadedImage ? (
          <UploadedImg src={uploadedImage} alt="Uploaded Image" />
        ) : (
          <>
            <SampleUploadImage />
            <UploadGuideText>클릭하거나 이미지를 드래그하세요</UploadGuideText>
          </>
        )}
        {fileError && <ErrorMessage>{fileError}</ErrorMessage>}
      </UploadImageFrame>
    </RowWrap>
  );
}

export default UploadImage;

const RowWrap = styled.div`
  display: flex;
  align-items: center;
  margin: 0 1rem;
`;

const UploadImageFrame = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 15rem;
  height: 10rem;
  flex-shrink: 0;
  background: #fff;
  box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.25);
  opacity: ${(props) => (props.isDragActive ? 0.5 : 1)};
  border: ${(props) =>
    props.isDragActive ? '3px dashed #666' : '0.1px solid #d8cccc'};

  &:hover {
    cursor: pointer;
  }
`;
const SampleUploadImage = styled.div`
  width: 120px;
  height: 100px;
  margin-bottom: 8px;
  flex-shrink: 0;
  background: url(${sampleUploadImage}) no-repeat center center;
  background-size: cover;
`;

const UploadGuideText = styled.div`
  font-family: 'Pretendard-Regular';
`;

const UploadedImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 8px;
`;
