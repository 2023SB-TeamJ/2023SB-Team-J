import React, { useState } from 'react';
import styled from 'styled-components';
import LeftAIShift from './LeftAIShift';
import RightAIShift from './RightAIShift';

function Carousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  // 이전 버튼 클릭 시 activeIndex 값 업데이트
  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? 3 : prevIndex - 1));
  };

  // 다음 버튼 클릭 시 activeIndex 값 업데이트
  const handleNext = () => {
    setActiveIndex((nextIndex) => (nextIndex === 3 ? 0 : nextIndex + 1));
  };

  return (
    <CarouselWrap id="carouselExampleIndicators">
      {/* <CarouselIndicators>
        <IndicatorButton
          type="button"
          active={activeIndex === 0}
          aria-label="Slide 1"
        />
        <IndicatorButton
          type="button"
          active={activeIndex === 1}
          aria-label="Slide 2"
        />
        <IndicatorButton
          type="button"
          active={activeIndex === 2}
          aria-label="Slide 3"
        />
      </CarouselIndicators> */}

      <ButtonWrap onClick={handlePrev}>
        <LeftAIShift
          className="carousel-control-prev-icon"
          aria-hidden="true"
        />
      </ButtonWrap>

      <ImageWrap>
        <CarouselImage active={activeIndex === 0}>
          {activeIndex === 0 && (
            <img
              src="https://s3-alpha-sig.figma.com/img/d88d/26ab/2a34848bb34e23182f196addb6a5f94e?Expires=1690156800&Signature=QNL78JQFp22aDc3PMuKzcwI8DA4SDpFzihbdeaJdR9RO9H0Hhh58UD1Q5s9GyROIVjC394Bao9BX2qZsp67fqtA6RLCMlJSE9Ol-Ft9zlGbcxW8XPK6Zmw~kOtXL5Zg2Ts1aL0yLrpMvpavQq8Ju2IbNOxG0vO6aEOlo4HN7jz6SOnGRCOwb5uitA8CUD1BdAU0mh72NdP0E~MlvZ38d-9pPHyJtNgTdBQ2A5aeEKVBVRz8jWzfGWSWaZ9zUY0otiOW1l~V3W-7CHhR71NA5A45XmV7Bze5KCr0ZO0Zsp7IcO3uS90eSDL0D9iEQAGhS5kkdJ6X6dskaPURSGvhcYQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
              alt="..."
            />
          )}
        </CarouselImage>
        <CarouselImage active={activeIndex === 1}>
          {activeIndex === 1 && (
            <img
              src="https://s3-alpha-sig.figma.com/img/abde/4fe2/54544cbe46f564ce5c1ab58f1c7d63e2?Expires=1690156800&Signature=HwBcavXbVvT1qleNnyARjbl5a-NX0TMklwf-BAhFMeNk4xd8wJdMpcK~7YrBvEYl5SjGwLcav4ReTFDqATBzmkl6VtUAWKu2wpnEwPcVuJ1GnZzCjOn6POUdYpAPn64UcI47G-HlNKrGlbwNVSaWBX~IxfVYvzujJmz~f-W7kaSWzuVEWo9G86QVV~AF-IEfnPv3TLmQhbY6bgofmRL6Bm-LBYAOvmj8CP24-8w0~mPLUojYqOqegUn3Nq-lBa10VqDu1cEpfoeLjQwuANcPZRL6Sx61RFPjpqDLj6uN5xaFULvXPSAxWf5IcVbFvJOiWxlczh31IWjjZCukByYajQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
              alt="..."
            />
          )}
        </CarouselImage>
        <CarouselImage active={activeIndex === 2}>
          {activeIndex === 2 && (
            <img
              src="https://s3-alpha-sig.figma.com/img/0487/6420/382c8a53ab6c2ba48349a527abb24e20?Expires=1690156800&Signature=gzVrpxTqT0~QocXP~txLUEyF8c7zfH4cI2LM5rYRt54HNoL16rNth-PBfcoZTRfy2uxVSF4CMfvTPslYKnmgvzQSaDBLTIcYCzYIyvRMS7xZL4-X2c-OPZROBbXjWPHjXCMsU6YxRfO-QnaHYVmfGBPZ59wWGbStUnU-hp9iLqkYSM6kSRDPO4BJ22k~PcXM5BXNNIxADkmA9dIn74jEKRRTVjcyHucfzTcobBOi1cARs~oD-EEz95UI9Bzf7OuLBsr47L8V~9rrRSaOC43iUQrmauwq-U77H9ntCj9o7yUrj3QVfuG2EsxQWF8tsO9iT7d~ocbJq2lmKbMLBXlrfA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
              alt="..."
            />
          )}
        </CarouselImage>
        <CarouselImage active={activeIndex === 3}>
          {activeIndex === 3 && (
            <img
              src="https://s3-alpha-sig.figma.com/img/b490/72b8/b6e2af96e382a139192d09d98b20972e?Expires=1690156800&Signature=UzYiOff8t3YXzI3-d8QydCS9wI38MeDfeNfNdguYxURcHeizNvtf~XuHxdOv6QFPqMpHJOPTtmYltxJIRphH5mqt5QM49ZvE62~sJPHjv6NSRPWU1KfDJKVJZyY7YzcM3jMpuhE4zz6JkVA1acPYYPx3kETazfirQBTlICZOnCpulfzKjaUGHDMvLIF9b8MTI7kNAqJJeH3Gq5jmlm~wCh9t02n8XWgn0RPqoKZr4Slby3EhsNkqHzs-QIw-aDn8vvpOsFs8K~zC6Mg9ALJW8xA~~sMZAxIL57jegeoSO8v~XYHO8AK610W96rtld4X3c3EOXSoFitY7wyMAjPOxGg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
              alt="..."
            />
          )}
        </CarouselImage>
      </ImageWrap>
      <ButtonWrap onClick={handleNext}>
        <RightAIShift // 밑의 두 줄 코드 있어야만 Carousel 동작함
          className="carousel-control-next-icon"
          aria-hidden="true"
        />
      </ButtonWrap>
    </CarouselWrap>
  );
}

export default Carousel;

// Carousel 컨테이너 스타일
const CarouselWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

// Indicator 버튼 컨테이너 스타일
// const CarouselIndicators = styled.div``;

// // Indicator 버튼 스타일
// // 슬라이드 표시

// const IndicatorButton = styled.button``;

// 전체 이미지 스타일
const ImageWrap = styled.div`
  margin: 3rem;
`;

// 각각의 이미지 스타일
const CarouselImage = styled.div``;

const ButtonWrap = styled.div``;
