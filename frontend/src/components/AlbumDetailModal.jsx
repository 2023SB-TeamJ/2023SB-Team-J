import { useState } from 'react';
import styled from 'styled-components';
import image from '../assets/images/photo1.png';
import star from '../assets/images/star.png';
import trash from '../assets/images/trash.png';
import save from '../assets/images/save.png';

const ModalContainer = styled.div`
  // Modal을 구현하는데 전체적으로 필요한 CSS를 구현
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const ModalBackdrop = styled.div`
  // Modal이 떴을 때의 배경을 깔아주는 CSS를 구현
  z-index: 1; //위치지정 요소
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 10px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const ModalBtn = styled.button`
  text-decoration: none;
  border: none;
  padding: 20px;
  color: black;
  border-radius: 30px;
  cursor: grab;
`;

// const ExitBtn = styled(ModalBtn)`
//   background-color: #4000c7;
//   border-radius: 10px;
//   text-decoration: none;
//   margin: 10px;
//   padding: 5px 10px;
//   width: 40px;
//   height: 40px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

const ModalView = styled.div.attrs(() => ({
  // attrs 메소드를 이용해서 아래와 같이 div 엘리먼트에 속성을 추가할 수 있다.
  role: 'dialog',
}))`
  // Modal창 CSS를 구현합니다.
  display: flex;
  align-items: center;
  flex-direction: column;
  border-radius: 20px;
  width: 50rem;
  height: 40rem;
  background-color: #3f3d3f;
  > div.desc {
    position: absolute;
    top: 70%;
    margin: 50px;
    font-size: 2rem;
    color: white;
  }
`;

const Photo = styled.div`
  margin: 1rem;
  width: 165px;
  height: 503px;
  flex-shrink: 0;
  border-radius: 20px;
  background:
    url(${image}),
    lightgray 50% / cover no-repeat;
  box-shadow: 10px 10px 6px 0px rgba(0, 0, 0, 0.25);
`;

const Date = styled.div`
  position: absolute;
  top: 80%;
  color: white;
  font-size: 2rem;
`;

const ButtonWrap = styled.div`
  display: flex;
  position: absolute;
  top: 80%;
  right: 13%;
`;

const BookmarkBtn = styled.div`
  width: 70px;
  height: 70px;
  margin: 10px;
  flex-shrink: 0;
  border-radius: 20px;
  background:
    url(${star}),
    lightgray 50% / cover no-repeat;
  box-shadow: 10px 10px 6px 0px rgba(0, 0, 0, 0.25);
`;
const DeleteBtn = styled.div`
  width: 70px;
  height: 70px;
  margin: 10px;
  flex-shrink: 0;
  border-radius: 20px;
  background:
    url(${trash}),
    lightgray 50% / cover no-repeat;
  box-shadow: 10px 10px 6px 0px rgba(0, 0, 0, 0.25);
`;
const SaveBtn = styled.div`
  width: 75px;
  height: 70px;
  margin: 10px;
  flex-shrink: 0;
  border-radius: 20px;
  background:
    url(${save}),
    lightgray 50% / cover no-repeat;
  box-shadow: 10px 10px 6px 0px rgba(0, 0, 0, 0.25);
`;

function AlbumDetailModal() {
  const [isOpen, setIsOpen] = useState(false);

  const openModalHandler = () => {
    // isOpen의 상태를 변경하는 메소드를 구현
    // !false -> !true -> !false
    setIsOpen(!isOpen);
  };

  return (
    <ModalContainer>
      <ModalBtn
        onClick={openModalHandler}
        // 클릭하면 Modal이 열린 상태(isOpen)를 boolean 타입으로 변경하는 메소드가 실행되어야 합니다.
      >
        {' '}
        Open Modal
        {/* 조건부 렌더링을 활용해서 Modal이 열린 상태(isOpen이 true인 상태)일 때는 ModalBtn의 내부 텍스트가 'Opened!' 로 Modal이 닫힌 상태(isOpen이 false인 상태)일 때는 ModalBtn 의 내부 텍스트가 'Open Modal'이 되도록 구현 */}
      </ModalBtn>
      {/* 조건부 렌더링을 활용해서 Modal이 열린 상태(isOpen이 true인 상태)일 때만 모달창과 배경이 뜰 수 있게 구현 */}
      {isOpen ? (
        <ModalBackdrop onClick={openModalHandler}>
          <ModalView onClick={(e) => e.stopPropagation()}>
            <Photo />
            <Date>2023.07.12</Date>
            <ButtonWrap>
              <BookmarkBtn />
              <DeleteBtn />
              <SaveBtn />
            </ButtonWrap>
          </ModalView>
        </ModalBackdrop>
      ) : null}
    </ModalContainer>
  );
}

// <ExitBtn onClick={openModalHandler}>x</ExitBtn>
export default AlbumDetailModal;
