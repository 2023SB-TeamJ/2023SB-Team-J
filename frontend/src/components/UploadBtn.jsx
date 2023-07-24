import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function UploadBtn({ path }) {
  const navigate = useNavigate();

  return (
    <UploadStyle
      onClick={() => {
        navigate(path);
      }}
    >
      +
    </UploadStyle>
  );
}

const UploadStyle = styled.button`
  background-color: black;
`;

export default UploadBtn;
