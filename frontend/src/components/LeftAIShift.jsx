import styled from 'styled-components';

function LeftAIShift() {
  return (
    <LeftContainer>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 76">
        <line
          y1="-5"
          x2="56.6392"
          y2="-5"
          transform="matrix(-0.741536 0.670913 -0.960966 -0.276668 42 0)"
          stroke="#1f1f1f"
          strokeWidth="10"
        />
        <line
          y1="-5"
          x2="56.6392"
          y2="-5"
          transform="matrix(-0.741536 -0.670913 -0.960966 0.276668 42 76)"
          stroke="#1f1f1f"
          strokeWidth="10"
        />
      </svg>
    </LeftContainer>
  );
}

export default LeftAIShift;

const LeftContainer = styled.div`
  width: 2rem;
  height: 3rem;
  flex-shrink: 0;
  cursor: pointer;
`;
