// import { styled } from 'styled-components';

// function Main() {
//   return <Container>메인페이지입니다</Container>;
// }

// export default Main;

// const Container = styled.div`
//   width: 100%;
//   min-height: 100vh;
//   background: ${(props) => props.theme.backgroundColor};
// `;

import { styled } from 'styled-components';
import UploadImage from '../components/UploadImage';

function Main() {
  return (
    <Container>
      <UploadImage />
    </Container>
  );
}

export default Main;

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${(props) => props.theme.backgroundColor};
`;
