import styled from "styled-components";

let StartStyle = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 240px;
  height: 72px;
  flex-shrink: 0;
  border-radius: 50px;
  background: #fff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  border: none;

  color: #000;
  font-family: Do Hyeon;
  font-size: 36px;
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

function StartBtn() {
  return (
    <div>
      <StartStyle>시작하기</StartStyle>
    </div>
  );
}

export default StartBtn;
