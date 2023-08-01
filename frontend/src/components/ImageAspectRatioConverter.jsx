/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from 'react';

function ImageConverter({ url }) {
  const [convertedImageUrl, setConvertedImageUrl] = useState('');

  const convertImageToBase64 = async (imageUrl) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error('이미지 Base64 변환 중 오류가 발생했습니다:', error);
    }
  };

  const convertImageRatio = async () => {
    try {
      // Step 1: 이미지 URL을 Base64로 변환합니다.
      const base64Data = await convertImageToBase64(url);

      // Step 2: Base64로 변환된 이미지를 불러와서 원본 가로세로 비율을 얻습니다.
      const img = new Image();
      img.src = base64Data;

      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      // Step 3: 원본 가로세로 크기를 구합니다.
      const originalWidth = img.width;
      const originalHeight = img.height;

      // Step 4: 1:1 가로세로 비율로 새로운 크기를 계산합니다.
      const newWidth = Math.min(originalWidth, originalHeight);
      const newHeight = newWidth;

      // Step 5: 리사이즈된 이미지를 그릴 캔버스를 생성합니다.
      const canvas = document.createElement('canvas');
      canvas.width = newWidth;
      canvas.height = newHeight;

      // Step 6: 캔버스에 리사이즈된 이미지를 그립니다.
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, newWidth, newHeight);

      // Step 7: 캔버스를 데이터 URL로 변환합니다.
      const convertedUrl = canvas.toDataURL('image/png');

      // Step 8: 변환된 이미지 URL을 상태로 업데이트합니다.
      setConvertedImageUrl(convertedUrl);
    } catch (error) {
      console.error('이미지 변환 중 오류가 발생했습니다:', error);
    }
  };

  // 컴포넌트가 마운트되거나 URL이 변경될 때 이미지 변환 함수를 호출합니다.
  React.useEffect(() => {
    convertImageRatio();
  }, [url]);

  return <img src={convertedImageUrl} alt="변환된 이미지" />;
}

export default ImageConverter;
