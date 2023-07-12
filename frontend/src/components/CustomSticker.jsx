/* eslint-disable camelcase */
import styled from 'styled-components';
import React, { useState, useRef } from 'react';
import Draggable from 'react-draggable';

// import axios from 'axios';

// eslint-disable-next-line react/prop-types
export default function App({ list, isAdmin }) {
  const nodeRef = useRef(null);

  // eslint-disable-next-line react/prop-types
  const { sticker_url, xcoor, ycoor } = list; // 좌표랑, 스티커주소 불러옴
  // eslint-disable-next-line no-unused-vars
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const [Opacity, setOpacity] = useState(false);

  const trackPos = (data) => {
    setPosition({ x: data.x, y: data.y });
  };

  const handleStart = () => {
    setOpacity(true);
  };
  const handleEnd = () => {
    // submit();
    setOpacity(false);
  };

  return (
    <Draggable
      bounds="parent"
      nodeRef={nodeRef}
      onDrag={(e, data) => trackPos(data)}
      onStart={handleStart}
      onStop={handleEnd}
      defaultPosition={{ x: xcoor, y: ycoor }}
      disabled={!isAdmin}
    >
      <MemoBox
        ref={nodeRef}
        className="box"
        style={{
          opacity: Opacity ? '0.6' : '1',
          position: 'absolute',
        }}
        background={sticker_url}
      />
    </Draggable>
  );
}

const MemoBox = styled.div`
  //스티커 크기 지정
  width: 80px;
  height: 80px;
  background: url(${(props) => props.background});
  background-size: cover;
  border-radius: 15px;
  z-index: 1100;
`;
