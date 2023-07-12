import React, { useState } from 'react';
import styled from 'styled-components';

function CustomMenuBar() {
  const [isMenuOpen1, setMenuOpen1] = useState(false);
  const [isMenuOpen2, setMenuOpen2] = useState(false);
  const [isMenuOpen3, setMenuOpen3] = useState(false);

  const toggleMenu1 = () => {
    setMenuOpen1(!isMenuOpen1);
    setMenuOpen2(false);
    setMenuOpen3(false);
  };

  const toggleMenu2 = () => {
    setMenuOpen2(!isMenuOpen2);
    setMenuOpen1(false);
    setMenuOpen3(false);
  };

  const toggleMenu3 = () => {
    setMenuOpen3(!isMenuOpen3);
    setMenuOpen1(false);
    setMenuOpen2(false);
  };

  return (
    <div>
      <MenuWrap>
        <ButtonWrap>
          <Button onClick={toggleMenu1}>Button 1</Button>

          <Button onClick={toggleMenu2}>Button 2</Button>

          <Button onClick={toggleMenu3}>Button 3</Button>
        </ButtonWrap>
        <ContentWrap>
          <Content isOpen={isMenuOpen1}>
            {/* 상세 메뉴 내용 */}
            Content 1
          </Content>
          <Content isOpen={isMenuOpen2}>
            {/* 상세 메뉴 내용 */}
            Content 2
          </Content>
          <Content isOpen={isMenuOpen3}>
            {/* 상세 메뉴 내용 */}
            Content 3
          </Content>
        </ContentWrap>
      </MenuWrap>
    </div>
  );
}
const Button = styled.button`
  background-color: lightcyan;
  padding: 10px;
  border: none;
  cursor: pointer;
  margin-bottom: 10px;
  display: block;
`;

const Content = styled.div`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  width: 30rem;
  height: 9rem;
  padding: 10px;
  background-color: #f5f5f5;
  transition: 0.5s ease-in-out;
`;

const ButtonWrap = styled.div`
  display: inline-block;
  vertical-align: bottom;

  justify-content: left;
`;

const ContentWrap = styled.div``;
export default CustomMenuBar;

const MenuWrap = styled.div`
  display: flex;
`;
