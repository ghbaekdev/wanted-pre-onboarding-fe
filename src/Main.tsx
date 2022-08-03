import React, { useEffect, useState } from 'react';
import List from './components/List';
import { Button } from 'antd';
import axios, { AxiosRequestConfig } from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import TodoDetail from './components/TodoDetail';
import { Input } from 'antd';

const Main = () => {
  const [todo, setTodo] = useState({
    title: '',
    content: '',
  });

  const [todoData, setTodoData] = useState([]);

  const [detailData, setDetailData] = useState({
    title: '',
    content: '',
    id: '',
    createdAt: '',
    updatedAt: '',
  });

  const [update, setUpdate] = useState(false);

  const handleState = () => {
    update ? setUpdate(false) : setUpdate(true);
  };

  const detailForm = detailData.id;

  const headers = {
    Authorization: localStorage.getItem('token')!,
  };

  const getDate = () => {
    axios
      .get('http://localhost:8080/todos', {
        headers: headers,
      })
      .then((res) => {
        setTodoData(res.data.data);
      });
  };

  useEffect(() => {
    getDate();
  }, []);

  const { title, content } = todo;

  const navigate = useNavigate();

  const HandleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTodo({ ...todo, [name]: value });
  };

  const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDetailData({ ...detailData, [name]: value });
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

    getDate();
  };

  setTimeout(() => {
    if (!localStorage.getItem('token')) {
      alert('로그인을 해주세요.');
      navigate('/auth');
    }
  }, 30000);

  const putTodo = async (id: string) => {
    await axios.put(
      `http://localhost:8080/todos/${id}`,
      {
        title: detailData.title,
        content: detailData.content,
      },
      {
        headers: headers,
      }
    );
    getDate();
    setUpdate(false);
  };

  const openDetail = (id: string) => {
    // await axios
    //   .get(`http://localhost:8080/todos/${id}`, {
    //     headers: headers,
    //   })
    //   .then((res) => {
    //     setDetailData(res.data.data);
    //   });
    let test = todoData.filter((detail: { id: string }) => detail.id === id)[0];
    setDetailData(test);
  };

  return (
    <TodoWrap>
      <TodoForm>
        <Input
          onChange={HandleInput}
          name="title"
          placeholder="Title"
          style={{ width: '500px', margin: '30px', fontSize: '22px' }}
        />

        <Input
          onChange={HandleInput}
          name="content"
          placeholder="Content"
          type="text"
          style={{ width: '500px', margin: '30px', fontSize: '22px' }}
        />
        <ButtonBox>
          <Button onClick={todoAdd} style={{ width: '80px', margin: '20px' }}>
            ADD
          </Button>
        </ButtonBox>
        <List
          todoData={todoData}
          openDetail={openDetail}
          detailData={detailData}
        />
      </TodoForm>
      {detailForm && (
        <SideWrap>
          <TodoDetail
            data={detailData}
            onClickList={putTodo}
            onInputValue={handleInputValue}
            handleState={handleState}
            update={update}
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
