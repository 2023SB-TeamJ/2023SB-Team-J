/* eslint-disable consistent-return */
import React, { useState, useEffect } from 'react';
import { styled, css, keyframes } from 'styled-components';
import axios from 'axios';
import {
  AuthLogo,
  AuthTitle,
  AuthInputField,
  AuthBtn,
  AuthQuestion,
  AuthLink,
  RowDiv,
} from './AuthModalStyle';

import { useAuth } from '../contexts/AuthContext';
// import getCsrfToken from './getCsrfToken';

const apiUrl = process.env.REACT_APP_API_URL;

// eslint-disable-next-line react/prop-types
function LoginModal({ isOpen, onClose, onOpen }) {
  const MAX_EMAIL_LENGTH = 20; // 최대 이메일 길이
  const MAX_PASSWORD_LENGTH = 14; // 최대 비밀번호 길이
  const [showPassword, setShowPassword] = useState(false); //  눈 아이콘 패스워드 보이기
  const toggleShowPassword = () => {
    setShowPassword(!showPassword); // 눈 아이콘 토글
  };
  const [isVisible, setIsVisible] = useState(false);
  const [animation, setAnimation] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [failMessage, setFailMessage] = useState('');

  const { setIsLoggedIn } = useAuth();

  // 로그인 API 요청
  const handleLogin = async () => {
    try {
      const response = await axios.post(`${apiUrl}login/`, {
        email,
        password,
      });

      if (response.status === 200) {
        localStorage.setItem('refresh', response.data.refresh);
        localStorage.setItem('access', response.data.access);
        localStorage.setItem('nickname', response.data.nickname);
        setIsLoggedIn(true);
        console.log(response);
        onClose();
      }
    } catch (error) {
      console.error(error);
      setFailMessage('로그인 실패. 이메일이나 비밀번호를 확인해주세요'); // 로그인 실패 시 실패 메세지 state 업데이트
    }
  };

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setAnimation('fadeIn');
    } else if (!isOpen && animation !== 'fadeOut') {
      setAnimation('fadeOut');
    }
  }, [isOpen, animation]);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (animation === 'fadeOut') {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setAnimation('');
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [animation]);

  if (!isVisible) return null;

  const handleInputFocus = (e) => {
    e.target.dataset.placeholder = e.target.placeholder; // 현재 placeholder 저장
    if (e.target.value === '') {
      e.target.placeholder = ''; // 기본 텍스트 지우기
    }
  };
  const handleInputBlur = (e) => {
    e.target.placeholder = e.target.dataset.placeholder; // 저장한 placeholder 복원
  };

  const handleEmailLength = (e) => {
    const { value } = e.target;
    if (value.length > MAX_EMAIL_LENGTH) {
      e.target.value = value.slice(0, MAX_EMAIL_LENGTH); // 최대 이메일 길이를 넘어가는 경우 잘라내기
    }
  };

  const handlePasswordLength = (e) => {
    const { value } = e.target;
    if (value.length > MAX_PASSWORD_LENGTH) {
      e.target.value = value.slice(0, MAX_PASSWORD_LENGTH); // 최대 비밀번호 길이를 넘어가는 경우 잘라내기
    }
  };

  return (
    <ModalOverlay animation={animation}>
      <ModalWindow>
        <LoginModalFrame>
          <XIcon
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 12 12"
            fill="none"
            onClick={() => {
              setFailMessage(''); // 닫을 때 실패 메세지 초기화
              onClose();
            }}
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0.29903 10.8524C0.0793599 11.0721 0.0793599 11.4282 0.29903 11.6479C0.5187 11.8676 0.874855 11.8676 1.09452 11.6479L5.94677 6.79566L10.9056 11.7545C11.1253 11.9742 11.4815 11.9742 11.7011 11.7545C11.9208 11.5348 11.9208 11.1787 11.7011 10.959L6.74227 6.00016L11.7011 1.0413C11.9208 0.821632 11.9208 0.465477 11.7011 0.245807C11.4815 0.026137 11.1253 0.0261374 10.9056 0.245807L5.94677 5.20466L1.09452 0.352414C0.874855 0.132744 0.5187 0.132744 0.29903 0.352414C0.0793599 0.572084 0.0793599 0.92824 0.29903 1.14791L5.15128 6.00016L0.29903 10.8524Z"
              fill="#D3D3D3"
            />
          </XIcon>
          <AuthLogo />
          <AuthTitle>로그인</AuthTitle>
          {/* 로그인 실패 시 에러 메시지를 보여주는 코드 */}
          {failMessage && <FailText>{failMessage}</FailText>}
          <AuthInputField>
            <input
              type="text"
              placeholder="이메일"
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              maxLength={MAX_EMAIL_LENGTH}
              onChange={(e) => {
                handleEmailLength(e);
                setEmail(e.target.value);
              }}
            />
          </AuthInputField>
          <AuthInputField>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="비밀번호"
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              maxLength={MAX_PASSWORD_LENGTH}
              onChange={(e) => {
                handlePasswordLength(e);
                setPassword(e.target.value);
              }}
            />
            <EyeIcon
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="16"
              viewBox="0 0 22 16"
              fill="none"
              onClick={toggleShowPassword}
            >
              <path
                d="M1.26387 8.71318C1.12769 8.49754 1.05959 8.38972 1.02147 8.22342C0.992842 8.0985 0.992842 7.9015 1.02147 7.77658C1.05959 7.61028 1.12769 7.50246 1.26387 7.28682C2.38928 5.50484 5.73915 1 10.8442 1C15.9492 1 19.299 5.50484 20.4244 7.28682C20.5606 7.50246 20.6287 7.61028 20.6668 7.77658C20.6955 7.9015 20.6955 8.0985 20.6668 8.22342C20.6287 8.38972 20.5606 8.49754 20.4244 8.71318C19.299 10.4952 15.9492 15 10.8442 15C5.73915 15 2.38928 10.4952 1.26387 8.71318Z"
                stroke="#EFEFEF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10.8442 11C12.501 11 13.8442 9.65685 13.8442 8C13.8442 6.34315 12.501 5 10.8442 5C9.1873 5 7.84415 6.34315 7.84415 8C7.84415 9.65685 9.1873 11 10.8442 11Z"
                stroke="#EFEFEF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </EyeIcon>
          </AuthInputField>
          <AuthBtn onClick={handleLogin}>로그인</AuthBtn>
          <RowDiv>
            <AuthQuestion>아직 회원이 아니신가요?</AuthQuestion>
            <AuthLink
              onClick={() => {
                onClose();
                onOpen();
              }}
            >
              가입하기
            </AuthLink>
          </RowDiv>
        </LoginModalFrame>
      </ModalWindow>
    </ModalOverlay>
  );
}

export default LoginModal;

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  z-index: 5;

  ${(props) =>
    props.animation === 'fadeIn' &&
    css`
      animation: ${fadeIn} 0.5s forwards;
    `}

  ${(props) =>
    props.animation === 'fadeOut' &&
    css`
      animation: ${fadeOut} 0.5s forwards;
    `}
`;

const ModalWindow = styled.div`
  width: 420px;
  height: 460px;
  border-radius: 25px;
  background: white;
  position: relative;
`;

const LoginModalFrame = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  flex-shrink: 0;
  border-radius: 25px;
  background: #ffffff;
`;

const FailText = styled.p`
  color: red;
  margin-top: 10px;
  font-size: 14px;
`;

const XIcon = styled.svg`
  position: absolute;
  top: 20px;
  right: 20px;

  &:hover {
    cursor: pointer; /* pointer 커서 스타일로 변경 */
  }
`;

const EyeIcon = styled.svg`
  cursor: pointer;

  &:hover {
    cursor: pointer; /* pointer 커서 스타일로 변경 */
  }
`;
