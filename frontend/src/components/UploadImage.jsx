/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';
import styled from 'styled-components';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import sampleUploadImage from '../assets/images/SampleUploadImage.png';

function UploadImage() {
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

            // 서버에 이미지를 POST 하는 코드
            const formData = new FormData();
            const userId = 'dummyUser123';
            formData.append('user_id', userId);
            formData.append('img_files', file);

            axios
              .post('http://localhost:8000/api/v1/frame/', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              })

              .then((response) => {
                console.log(response);
              })
              .catch((error) => {
                console.error(error);
              });
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
    <ColDiv {...getRootProps()}>
      <input {...getInputProps()} />
      <UploadImageFrame>
        {uploadedImage ? (
          <UploadedImg src={uploadedImage} alt="Uploaded Image" />
        ) : (
          <>
            <SampleUploadImage />
            <UploadGuideText>
              {isDragActive
                ? 'Drop image here'
                : 'Click here or drag and drop image'}
            </UploadGuideText>
          </>
        )}
        {fileError && <ErrorMessage>{fileError}</ErrorMessage>}
      </UploadImageFrame>
    </ColDiv>
  );
}

export default UploadImage;

const ColDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const UploadImageFrame = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 240px;
  height: 160px;
  flex-shrink: 0;
  border-radius: 10px;
  background: #fff;
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
  font-family: 'Do Hyeon';
`;

const UploadedImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 8px;
`;
