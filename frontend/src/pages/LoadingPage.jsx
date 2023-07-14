import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import logoImage from '../assets/images/logoImage.png';

function LoadingPage() {
  return (
    <div>
      <Container>
        <Logo
          alt="T4Y Logo"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        />
      </Container>
    </div>
  );
}

export default LoadingPage;

const Logo = styled(motion.div)`
  width: 20rem;
  height: 20rem;
  flex-shrink: 0;
  border-radius: 10px;
  background: url(${logoImage}) lightgray 50% / cover no-repeat;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
  background: ${(props) => props.theme.backgroundColor};
`;
