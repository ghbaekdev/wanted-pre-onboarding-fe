import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from 'antd';
import 'antd/dist/antd.css';
import LoginModal from './components/LoginModal';

export default function Main() {
  const [modal, setModal] = useState('');

  const navigate = useNavigate();

  const loginOpen = () => {
    if (localStorage.getItem('token')) {
      navigate('/');
    } else {
      setModal('login');
    }
  };

  const signUpOpen = () => {
    setModal('signup');
  };

  const closeModal = () => {
    setModal('');
  };

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/auth');
  };

  return (
    <ButtonWrap>
      <Button
        onClick={loginOpen}
        type="primary"
        style={{ width: '200px', margin: '20px' }}
      >
        Login
      </Button>
      {modal === 'login' && (
        <LoginModal
          data={LOGIN_DATA}
          closeModal={closeModal}
          setModal={setModal}
        />
      )}
      <Button onClick={signUpOpen} style={{ width: '200px' }}>
        Signup
      </Button>
      {modal === 'signup' && (
        <LoginModal
          data={SIGNUP_DATA}
          closeModal={closeModal}
          setModal={setModal}
        />
      )}
      {localStorage.getItem('token') && (
        <LogoutBtn onClick={logout}>logout</LogoutBtn>
      )}
    </ButtonWrap>
  );
}

const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
`;

const LogoutBtn = styled.button`
  width: 150px;
  margin: 20px;
  background-color: black;
  color: white;
  border: none;
`;

interface DataType {
  title: string;
  url: string;
}

const SIGNUP_DATA: DataType = {
  title: 'Sign up',
  url: 'create',
};

const LOGIN_DATA: DataType = {
  title: 'Login',
  url: 'login',
};
