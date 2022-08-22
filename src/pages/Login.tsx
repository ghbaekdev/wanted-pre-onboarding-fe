import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginModal from '../components/LoginModal';
import { Button } from 'antd';
import 'antd/dist/antd.css';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { userTokenState } from '../store/store';

interface DataType {
  title: string;
  url: string;
}

export default function Main() {
  const [modal, setModal] = useState('');

  const [token, setToken] = useRecoilState(userTokenState);

  const navigate = useNavigate();

  const loginOpen = () => {
    if (localStorage.getItem('access_token')) {
      navigate('/todo');
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
    localStorage.removeItem('access_token');
    setToken('');
    navigate('/');
  };

  const goTodo = () => {
    navigate('/todo');
  };

  useEffect(() => {
    const defaultToken = localStorage.getItem('access_token');
    if (defaultToken) {
      setToken(defaultToken);
      navigate('/todo');
    }
  }, []);

  return (
    <ButtonWrap>
      {localStorage.getItem('access_token') ? (
        <>
          <Button onClick={goTodo} style={{ width: '200px', margin: '20px' }}>
            <TodoSpan>Todo</TodoSpan>
          </Button>
          <Button
            onClick={loginOpen}
            type="primary"
            style={{ width: '200px', margin: '20px' }}
          >
            Login
          </Button>
          <Button
            style={{
              width: '200px',
              marginTop: '20px',
              backgroundColor: 'black',
              color: 'white',
            }}
            onClick={logout}
          >
            logout
          </Button>
        </>
      ) : (
        <>
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
        </>
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

const TodoSpan = styled.span`
  font-weight: 600;
`;

const SIGNUP_DATA: DataType = {
  title: 'Sign up',
  url: 'signup',
};

const LOGIN_DATA: DataType = {
  title: 'Login',
  url: 'signin',
};
