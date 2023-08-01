import styled from 'styled-components';
import logoText from '../assets/images/logoText.png';

const NameStyle = styled.div`
  width: 13rem;
  height: 3rem;
  margin-left: 0.4rem;
  flex-shrink: 0;
  background: url(${logoText}) no-repeat center/cover;
  background-size: cover;

  @media screen and (max-width: 500px) {
    width: 8rem;
  }
`;

function Name() {
  return <NameStyle alt="F4Y" />;
}

export default Name;
