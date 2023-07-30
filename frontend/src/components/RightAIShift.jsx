import styled from 'styled-components';

function RightAIShift() {
  return (
    <RightContainer>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 76">
        <line
          y1="-5"
          x2="56.6392"
          y2="-5"
          transform="matrix(0.741536 0.670913 0.960966 -0.276668 10 0)"
          stroke="#3F3D3F"
          strokeWidth="7"
        />
        <line
          y1="-5"
          x2="56.6392"
          y2="-5"
          transform="matrix(0.741536 -0.670913 0.960966 0.276668 10 76)"
          stroke="#3F3D3F"
          strokeWidth="7"
        />
      </svg>
    </RightContainer>
  );
}

export default RightAIShift;

const RightContainer = styled.div`
  width: 2rem;
  height: 3rem;
  flex-shrink: 0;
  cursor: pointer;
`;
