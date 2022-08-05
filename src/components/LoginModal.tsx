import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface propsType {
  data: { title: string; url: string };
  closeModal: () => void;
  setModal: React.Dispatch<React.SetStateAction<string>>;
}

const Login = ({ data: { title, url }, closeModal, setModal }: propsType) => {
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  });

  const { email, password } = userInfo;

  const navigate = useNavigate();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const LoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post(`http://localhost:8080/users/${url}`, {
        email: email,
        password: password,
      })
      .then((res) => {
        localStorage.setItem('token', res.data.token);
        if (res.data.token) {
          navigate('/');
          alert('login success');
        }
      });
  };

  const infoCondition =
    email.includes('.') && email.includes('@') && password.length >= 8;

  return (
    <Wrap>
      <Overlay></Overlay>
      <MainWrap>
        <MainForm onSubmit={LoginSubmit}>
          <FormTitle>{title}</FormTitle>
          <LoginInput onChange={onChange} placeholder="email" name="email" />
          <LoginInput
            onChange={onChange}
            placeholder="password"
            name="password"
            type="password"
          />
          <LoginBtn type="submit" disabled={!infoCondition}>
            {title}
          </LoginBtn>
          <CloseBtn onClick={closeModal}>x</CloseBtn>
        </MainForm>
      </MainWrap>
    </Wrap>
  );
};

export default Login;

const Wrap = styled.div`
  position: relative;
  margin: auto 0;
  max-width: 100vw;
  padding: 16px;
  width: 100%;
`;

const MainWrap = styled.div`
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  position: relative;
  z-index: 11;
  background: #fff;
`;

const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 10;
`;

const MainForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const FormTitle = styled.span`
  font-size: 30px;
  font-weight: 600;
`;

const LoginInput = styled.input`
  width: 300px;
  height: 40px;
  border: 1px solid #9f9f9f;
  border-radius: 5px;
  padding: 5px;
  font-size: 16px;
  margin: 10px;
`;

const LoginBtn = styled.button`
  width: 300px;
  height: 46px;
  font-weight: 700;
  font-size: 16px;
  margin-bottom: 20px;
  background-color: #fdcf41;
  transition: ease-in-out 0.5s;
  color: #222222;
  background-size: 200% 100%;
  background-position: right bottom;
  cursor: pointer;
  &:disabled {
    background-color: black;
    color: white;
  }
`;

const CloseBtn = styled.button`
  width: 50px;

  border: none;
`;
