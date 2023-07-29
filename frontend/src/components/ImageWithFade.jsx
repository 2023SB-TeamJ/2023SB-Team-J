import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const FadeInImage = styled.img`
  transition: opacity 0.5s;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
`;

function ImageWithFade({ src, alt }) {
  const [isVisible, setIsVisible] = useState(false);
  const imgRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // When the image is visible in the viewport, update state to set isVisible true
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '0px',
        threshold: 0.1, // If at least 10% of the image is visible, the callback is run.
      },
    );
    if (imgRef.current) {
      observer.observe(imgRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return <FadeInImage ref={imgRef} src={src} alt={alt} isVisible={isVisible} />;
}

export default ImageWithFade;
