import styled from "styled-components";
import image77 from "../assets/images/image77.png";

let NameStyle = styled.div`
  width: 290px;
  height: 50px;
  flex-shrink: 0;
  background-image: url(${image77});
  background-size: cover;
`;

function Name() {
  return <NameStyle alt="F4Y" />;
}

export default Name;
