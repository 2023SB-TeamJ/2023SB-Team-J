import { styled } from "styled-components";

const TitleStyle = styled.h1`
  width: 976px;
  height: 111px;
  flex-direction: column;
  flex-shrink: 0;

  color: #7a6c79;
  text-align: center;
  font-family: Do Hyeon;
  font-size: 5rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

function Title({ type }) {
  return <TitleStyle>{type}</TitleStyle>;
}

export default Title;
