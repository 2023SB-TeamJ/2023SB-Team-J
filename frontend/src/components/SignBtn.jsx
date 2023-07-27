import styled from 'styled-components';

export default styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 120px;
  height: 35px;
  flex-shrink: 0;
  border-radius: 30px;
  background: #f7f7f7;
  /* box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25); */
  border: none;

  font-family: 'Noto Sans', '맑은 고딕', 'Malgun Gothic', verdana, sans-serif;
  font-weight: 600;
  font-style: normal;
  line-height: normal;
  font-size: 1.1rem;

  cursor: pointer;

  &:hover {
    background-color: #000;
    color: #fff;
    transition: all 0.4s;
  }
`;
