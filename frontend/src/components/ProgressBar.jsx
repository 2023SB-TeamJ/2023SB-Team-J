/* eslint-disable react/no-array-index-key */
import React from 'react';
import styled from 'styled-components';

const ProgressBarWrapper = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  position: relative;
  background-color: #dddddd;
  border-radius: 50px;
`;

const Progress = styled.div`
  display: flex;
  height: 100%;
  border-radius: 50px;
  background-color: ${(props) =>
    props.progress >= props.position
      ? props.theme.pointColor
      : props.theme.pointColor};
  width: ${(props) => props.progress}%;
  justify-content: end;
  align-items: center;
  padding-right: 40px;
  transition: width 1s ease;
`;

// const ProgressNumber = styled.div`
//   width: 40px;
//   height: 40px;
//   border-radius: 20px;
//   text-align: center;
//   font-size: 30px;
// `;

const Separator = styled.div`
  position: absolute;
  height: 100%;
  width: 4px;
  background-color: #ffffff;
  left: ${(props) => props.separatorPosition - 1}%;
  display: ${(props) => (props.showSeparator ? 'block' : 'none')};
  /* transition-delay: 3s;
  transition: 3s ease-in; */
`;

// state -> useEffect -> setTimeout 1000
function ProgressBar({ progress }) {
  return (
    <ProgressBarWrapper>
      {[20, 40, 60, 80].map((position) => (
        <Separator
          key={position}
          separatorPosition={position + 1}
          showSeparator={progress >= position + 1}
        />
      ))}
      <Progress progress={progress} />
    </ProgressBarWrapper>
  );
}

export default ProgressBar;
