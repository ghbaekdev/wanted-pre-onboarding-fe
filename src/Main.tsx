import React, { useState } from 'react';
import List from './components/List';
import { Button } from 'antd';
import axios, { AxiosRequestConfig } from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import TodoDetail from './components/TodoDetail';

const Main = () => {
  const [todo, setTodo] = useState({
    title: '',
    content: '',
  });

  const [detailData, setDetailData] = useState({
    title: '',
    content: '',
    id: '',
    createdAt: '',
    updatedAt: '',
  });

  const { title, content } = todo;

  const navigate = useNavigate();

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
  setTimeout(() => {
    if (!localStorage.getItem('token')) {
      alert('로그인을 해주세요.');
      navigate('/auth');
    }
  }, 30000);

  const putTodo = (id: string) => {
    axios.put(
      `http://localhost:8080/todos/${id}`,
      {
        title: title,
        content: content,
      },
      {
        headers: headers,
      }
    );
  };

  const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDetailData({ ...detailData, [name]: value });
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
        <List setDetailData={setDetailData} />
      </TodoForm>
      {detailData && (
        <SideWrap>
          <TodoDetail
            data={detailData}
            onClickList={putTodo}
            onInputValue={handleInputValue}
          />
        </SideWrap>
      )}
    </TodoWrap>
  );
};

export default Main;

const TodoWrap = styled.div`
  display: flex;
  width: 1200px;
  margin: 0 auto;
`;

const TodoForm = styled.form`
  width: 60%;
  height: 800px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: 1px solid black;
  margin-top: 150px;
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

const SideWrap = styled.div`
  width: 500px;
  height: 800px;
  margin-top: 150px;
`;
