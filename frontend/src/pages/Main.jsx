import { styled } from 'styled-components';

function Main() {
  return <Container>메인페이지입니다</Container>;
}

export default Main;

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${(props) => props.theme.backgroundColor};
`;
