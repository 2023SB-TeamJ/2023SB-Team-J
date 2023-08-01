import React from 'react';
import styled from 'styled-components';

const ProgressBarWrapper = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
`;

const Progress = styled.div`
  display: flex;
  height: 100%;
  border-radius: 40px;
  background-color: #8a8a8a;
  width: ${(props) => props.progress}%;
  justify-content: end;
  align-items: center;
  padding-right: 40px;
  transition: width 0.3s ease;
`;

const ProgressNumber = styled.div`
  width: 40px;
  height: 40px;
  /* border: 2px solid black; */
  border-radius: 20px;
  text-align: center;
  font-size: 35px;
`;

function ProgressBar({ progress, number }) {
  return (
    <ProgressBarWrapper>
      <Progress progress={progress}>
        <ProgressNumber>{number}</ProgressNumber>
      </Progress>
    </ProgressBarWrapper>
  );
}

export default ProgressBar;
