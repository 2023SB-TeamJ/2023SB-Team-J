import styled from 'styled-components';
import logoText from '../assets/images/logoText.png';

const NameStyle = styled.div`
  width: 290px;
  height: 50px;
  flex-shrink: 0;
  background-image: url(${logoText});
  background-size: cover;
`;

function Name() {
  return <NameStyle alt="F4Y" />;
}

export default Name;
