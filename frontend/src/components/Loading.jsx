import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import logoImage from '../assets/images/logoImage.png';

function Loading() {
  return (
    <div>
      <Logo
        alt="T4Y Logo"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
}

export default Loading;

const Logo = styled(motion.div)`
  width: 20rem;
  height: 20rem;
  flex-shrink: 0;
  border-radius: 10px;
  background: url(${logoImage}) lightgray 50% / cover no-repeat;
`;
