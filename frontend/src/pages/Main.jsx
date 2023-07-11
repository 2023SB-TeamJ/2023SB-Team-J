// import { styled } from 'styled-components';

// function Main() {
import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';

function Main() {
  const navigate = useNavigate();

  return (
    <div>
      <Container>
        메인페이지입니다
        <TestBtn onClick={() => navigate('/album')}>앨범 Button</TestBtn>
      </Container>
    </div>

  );
}

export default Main;

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${(props) => props.theme.backgroundColor};
`;

const TestBtn = styled.div`
  position: absolute;
  top: 20%;
  background-color: #0a0a23;
  color: #fff;
  font-size: 40px;
  border: 2px;
  border-radius: 10px;
  box-shadow: 0px 0px 2px 2px rgb(0, 0, 0);

  &:hover {
    background-color: skyblue;
    color: blue;
  }
`;
