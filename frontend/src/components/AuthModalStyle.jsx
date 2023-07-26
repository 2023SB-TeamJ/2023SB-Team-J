import styled from 'styled-components';

export const AuthLogo = styled.div`
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  margin-top: 45px;
  border-radius: 10px;
  background-image: url(/logo.jpg);
  background-size: cover;
`;

export const AuthTitle = styled.div`
  display: flex;
  width: 284px;
  height: 27px;
  flex-direction: column;
  flex-shrink: 0;
  margin-top: 26px;

  color: #000;
  text-align: center;
  font-size: 22px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const AuthInputField = styled.div`
  display: flex;
  width: 284px;
  height: 24px;
  flex-shrink: 0;
  border-bottom: 1px solid #efefef;
  margin-top: 35px;

  color: #d3d3d3;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  input {
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    background: transparent;
    color: #080808;
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;

    &[type='password'] {
      font-family: 'Courier New', Courier, monospace;
      color: black;
    }
    &::placeholder {
      color: #d3d3d3;
      font-family: 'Do Hyeon';
    }
  }
`;

export const AuthBtn = styled.button`
  width: 282px;
  height: 40px;
  flex-shrink: 0;
  margin-top: 46px;
  font-size: 12px;
  border: none;
  border-radius: 70px;
  background: #d9d9d9;

  &:hover {
    cursor: pointer;
  }
`;

export const RowDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 250px;
`;

export const AuthQuestion = styled.div`
  display: flex;
  width: 150px;
  height: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  margin-top: 30px;
  color: #747272;
  text-align: center;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const AuthLink = styled.div`
  display: flex;
  width: 100px;
  height: 20px;
  flex-direction: column;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  color: #000;
  text-align: center;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  &:hover {
    cursor: pointer;
  }
`;
