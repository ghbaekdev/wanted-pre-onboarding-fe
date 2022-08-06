import React, { useEffect, useState } from 'react';
import List from './components/List';
import { Button } from 'antd';
import axios, { AxiosRequestConfig } from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import TodoDetail from './components/TodoDetail';
import { Input } from 'antd';
import { useParams } from 'react-router-dom';

const DETAIL_DATA = {
  title: '',
  content: '',
  id: '',
  createdAt: '',
  updatedAt: '',
};

const Main = () => {
  const [todo, setTodo] = useState({
    title: '',
    content: '',
  });

  const [todoData, setTodoData] = useState([]);

  const [detailData, setDetailData] = useState(DETAIL_DATA);

  const [update, setUpdate] = useState(false);

  const handleState = () => {
    update ? setUpdate(false) : setUpdate(true);
  };

  const { title, content } = todo;

  const detailForm = detailData.id;

  const params = useParams();

  const navigate = useNavigate();

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
    // if (!params.id) return;
    let detail = todoData.filter(
      (detail: { id: string }) => detail.id === params.id
    )[0];
    detail ? setDetailData(detail) : setDetailData(DETAIL_DATA);
  }, [params]);

  useEffect(() => {
    getDate();
  }, []);

  const handleTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  // const openDetail = (id: string) => {
  //   let test = todoData.filter((detail: { id: string }) => detail.id === id)[0];
  //   setDetailData(test);
  // };

  const prevDetail = () => {
    navigate(-1);
  };

  const detailFormClose = () => {
    setDetailData({
      title: '',
      content: '',
      id: '',
      createdAt: '',
      updatedAt: '',
    });
  };

  return (
    <TodoWrap>
      <TodoForm>
        <Input
          onChange={handleTodo}
          name="title"
          placeholder="Title"
          style={{ width: '500px', marginBottom: '30px', fontSize: '22px' }}
        />

        <Input
          onChange={handleTodo}
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
        <List todoData={todoData} detailData={detailData} />
      </TodoForm>

      {detailForm && (
        <SideWrap>
          <TodoDetail
            data={detailData}
            onClickList={putTodo}
            onInputValue={handleInputValue}
            handleState={handleState}
            update={update}
            closeForm={detailFormClose}
            prevDetail={prevDetail}
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
  align-items: center;
  flex-direction: column;
  border: 1px solid black;
  margin-top: 150px;
  overflow: auto;
  padding: 50px;
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
  margin-left: 30px;
`;
