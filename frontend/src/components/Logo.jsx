import styled from "styled-components";
import logoImg from "../assets/images/T4YLogo.png";

const LogoStyle = styled.div`
  width: 55px;
  height: 54px;
  flex-shrink: 0;
  background-image: url(${logoImg});
`;

function Logo() {
  return <LogoStyle alt="T4Y Logo" />;
}

export default Logo;
