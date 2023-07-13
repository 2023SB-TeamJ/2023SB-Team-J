import styled from 'styled-components';

function StartBtn() {
  return (
    <div>
      <StartStyle>시작하기</StartStyle>
    </div>
  );
}

export default StartBtn;

const StartStyle = styled.button`
  display: flex;
  position: absolute;
  z-index: 3;
  left: 10rem;
  bottom: 18%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 13rem;
  height: 4rem;
  flex-shrink: 0;
  border-radius: 50px;
  background: #fff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  border: none;

  color: #000;
  font-size: 1.8rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  cursor: pointer;

  &:hover {
    background-color: #000;
    color: #fff;
    transition: all 0.4s;
  }
`;
