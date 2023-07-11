/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import styled from 'styled-components';

const ProgressBarContainer = styled.div`
  position: relative;
  margin-bottom: 30px;
`;

const ProgressBar = styled.div`
  position: absolute;
  background: #3f3d3f;
  height: 7px;
  width: ${({ progress }) => `${progress}%`};
  top: 30%;
  left: 0;
`;

const ProgressNumList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  justify-content: space-between;

  &::before {
    content: '';
    background-color: #b1b1b1;
    position: absolute;
    top: 30%;
    left: 0;
    height: 7px;
    width: 100%;
    z-index: -1;
  }
`;

const ProgressNumItem = styled.li`
  border-radius: 100%;
  width: ${({ active }) => (active ? '40px' : '30px')};
  height: ${({ active }) => (active ? '40px' : '20px')};
  line-height: 40px;
  text-align: center;
  display: table;
  font-weight: 600;
  background-color: ${({ active }) => (active ? '#3F3D3F' : '#b1b1b1')};
  color: ${({ active }) => (active ? '#fff' : 'inherit')};
  font-family: sans-serif;
  font-size: 14px;
  position: relative;
  z-index: 1;
`;

const PrevButton = styled.button`
  background-color: #b1b1b1;
  padding: 5px 10px;
  border: none;
  margin-right: 10px;
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
`;

const NextButton = styled.button`
  background-color: #3f3d3f;
  padding: 5px 10px;
  border: none;
  cursor: pointer;
`;

function ProgressBarComponent() {
  const [active, setActive] = useState(1);

  const handleNext = () => {
    setActive((prevActive) =>
      prevActive < steps.length ? prevActive + 1 : prevActive,
    );
  };

  const handlePrev = () => {
    setActive((prevActive) => (prevActive > 1 ? prevActive - 1 : prevActive));
  };

  const updateProgress = () => {
    if (active < 1) setActive(1);
    if (active > steps.length) setActive(steps.length);
  };

  const steps = [1, 2, 3, 4];

  return (
    <ProgressBarContainer>
      <ProgressBar progress={((active - 1) / (steps.length - 1)) * 100} />
      <ProgressNumList>
        {steps.map((step, index) => (
          <ProgressNumItem
            key={index}
            active={index < active}
            className={index < active ? 'active' : ''}
          >
            {step}
          </ProgressNumItem>
        ))}
      </ProgressNumList>
      <PrevButton disabled={active === 1} onClick={handlePrev}>
        Prev
      </PrevButton>
      <NextButton disabled={active === steps.length} onClick={handleNext}>
        Next
      </NextButton>
    </ProgressBarContainer>
  );
}

export default ProgressBarComponent;
