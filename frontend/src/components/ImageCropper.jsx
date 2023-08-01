/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/button-has-type */
/* eslint-disable no-use-before-define */
/* eslint-disable no-shadow */
import React, { useState, useCallback, useEffect } from 'react';
import ReactCrop from 'react-image-crop';
import styled from 'styled-components';
import 'react-image-crop/dist/ReactCrop.css';

function ImageCropper({ imageUrl }) {
  const [crop, setCrop] = useState({ aspect: 1 });
  const [completedCrop, setCompletedCrop] = useState(null);
  const [croppedImageUrl, setCroppedImageUrl] = useState(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false); // 이미지 로드 여부 상태 추가

  console.log(imageUrl);

  const onLoad = useCallback((img) => {
    // 이미지가 로드되면 가로세로 비율이 1:1인 crop 영역을 설정합니다.
    const aspectRatio = 1 / 1;
    const imageWidth = img.width;
    const imageHeight = img.height;
    let cropWidth = imageWidth;
    let cropHeight = imageHeight;

    // 이미지의 가로세로 비율에 따라 crop 영역의 크기를 조정합니다.
    if (imageWidth > imageHeight) {
      cropWidth = imageHeight * aspectRatio;
    } else {
      cropHeight = imageWidth * aspectRatio;
    }

    // crop 영역이 이미지 중앙에 위치하도록 x, y 좌표를 설정합니다.
    const x = (imageWidth - cropWidth) / 2;
    const y = (imageHeight - cropHeight) / 2;

    // crop 상태를 업데이트하여 crop 영역을 설정합니다.
    setCrop({
      unit: '%',
      width: cropWidth,
      height: cropHeight,
      x,
      y,
      aspect: aspectRatio,
    });

    setIsImageLoaded(true); // 이미지 로드 완료 시 상태 변경
  }, []);

  const onImageLoaded = useCallback(
    (image) => {
      // 이미지가 로드되면 onLoad 함수를 호출하여 crop 영역을 설정합니다.
      onLoad(image);
    },
    [onLoad],
  );

  const onCropComplete = useCallback((crop) => {
    // crop이 완료되면 완료된 crop 정보를 상태에 저장합니다.
    setCompletedCrop(crop);
  }, []);

  const getCroppedImageUrl = useCallback(async () => {
    if (completedCrop) {
      try {
        // 완료된 crop 정보를 바탕으로 이미지를 크롭하여 URL을 생성합니다.
        const croppedCanvas = await getCroppedCanvas(completedCrop);
        setCroppedImageUrl(croppedCanvas.toDataURL());
      } catch (error) {
        console.error('Failed to crop the image: ', error);
      }
    }
  }, [completedCrop]);

  const getCroppedCanvas = (crop) => {
    return new Promise((resolve) => {
      const image = new Image();
      image.src = imageUrl;

      image.onload = () => {
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');

        // 이미지를 crop 영역에 맞게 그려서 캔버스에 그립니다.
        ctx.drawImage(
          image,
          crop.x * scaleX,
          crop.y * scaleY,
          crop.width * scaleX,
          crop.height * scaleY,
          0,
          0,
          crop.width,
          crop.height,
        );

        resolve(canvas);
      };
    });
  };

  useEffect(() => {
    setIsImageLoaded(false); // 이미지가 변경될 때마다 로드 여부를 false로 초기화
  }, [imageUrl]);

  return (
    <div>
      {/* react-image-crop 컴포넌트를 사용하여 이미지를 표시하고 크롭 영역을 지정합니다. */}
      {isImageLoaded ? ( // 이미지 로드가 완료되었을 때에만 <ReactCrop> 컴포넌트 렌더링
        <Div>
          <ReactCrop
            src={imageUrl}
            crop={crop}
            onImageLoaded={onImageLoaded}
            onChange={(newCrop) => setCrop(newCrop)}
            onComplete={onCropComplete}
          />
        </Div>
      ) : (
        <p>Loading image...</p> // 이미지 로드 중이면 "Loading image..." 표시
      )}
      {/* 크롭된 이미지 URL을 얻기 위한 버튼 */}
      <button onClick={getCroppedImageUrl}>Crop Image</button>
      {/* <img src={imageUrl} /> */}
      {/* 크롭된 이미지를 표시합니다. */}
      {croppedImageUrl && <img src={croppedImageUrl} alt="Cropped" />}
    </div>
  );
}

export default ImageCropper;

const Div = styled.div`
  border: solid 2px black;
`;
