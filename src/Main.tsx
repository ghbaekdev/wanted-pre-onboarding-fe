import React, { useState } from 'react';
import TodoList1 from './components/TodoList1';
import { Button } from 'antd';
import axios, { AxiosRequestConfig } from 'axios';
import styled from 'styled-components';

const Main = () => {
  const [todo, setTodo] = useState({
    title: '',
    content: '',
  });

  const { title, content } = todo;

  const HandleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTodo({ ...todo, [name]: value });
  };

  const headers = {
    Authorization: localStorage.getItem('token')!,
  };
  const todoAdd = async () => {
    await axios.post<AxiosRequestConfig>(
      'http://localhost:8080/todos',
      {
        title: title,
        content: content,
      },
      {
        headers: headers,
      }
    );
  };

  return (
    <TodoWrap>
      <TodoForm>
        <TitleInput onChange={HandleInput} name="title" placeholder="title" />
        <ContentInput
          onChange={HandleInput}
          name="content"
          placeholder="description"
          type="text"
        />
        <ButtonBox>
          <Button onClick={todoAdd} style={{ width: '80px', margin: '20px' }}>
            ADD
          </Button>
        </ButtonBox>
        <TodoList1 />
      </TodoForm>
    </TodoWrap>
  );
};

export default Main;

const TodoWrap = styled.div`
  width: 100vw;
  height: 100vh;
`;

const TodoForm = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const TitleInput = styled.input`
  width: 500px;
  margin: 30px;
`;

const ContentInput = styled.input`
  width: 500px;
  height: 30px;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  width: 400px;
`;
