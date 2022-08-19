import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Input } from 'antd';
import { customAxios } from './Auth/customAxios';
import List from './components/List';
import TodoDetail from './components/TodoDetail';
import styled from 'styled-components';
import useInputs from './hooks/useInputs';

const DETAIL_DATA = {
  title: '',
  content: '',
  id: '',
  createdAt: '',
  updatedAt: '',
};

interface dataType {
  title: string;
  content: string;
  id: string;
  createdAt: string;
  updatedAt: string;
}

const Main = () => {
  const {
    inputValue: { title, content },
    handleInput,
  } = useInputs({
    title: '',
    content: '',
  });

  const [todoData, setTodoData] = useState<dataType[]>([]);

  const [detailData, setDetailData] = useState(DETAIL_DATA);

  const [update, setUpdate] = useState(false);

  const handleEditMode = () => {
    setUpdate(!update);
  };

  const detailForm = detailData.id;

  const isToken = localStorage.getItem('access_token');

  const params = useParams();

  const navigate = useNavigate();

  const getDate = async () => {
    await customAxios.get(`/todos`).then((res) => {
      setTodoData(res.data.data);
    });
  };

  useEffect(() => {
    const detailId = params.id;
    if (!detailId) return;
    customAxios.get(`/todos/${detailId}`).then((res) => {
      res.data.data ? setDetailData(res.data.data) : setDetailData(DETAIL_DATA);
    });
  }, [params]);

  useEffect(() => {
    getDate();
  }, []);

  const handleDetailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDetailData({ ...detailData, [name]: value });
  };

  const todoAdd = async () => {
    await customAxios.post(`/todos`, {
      title: title,
      content: content,
    });
    getDate();
  };

  setTimeout(() => {
    if (!isToken) {
      alert('로그인을 해주세요.');
      navigate('/auth');
    }
  }, 30000);

  const putTodo = async (id: string) => {
    await customAxios.put(`/todos/${id}`, {
      title: detailData.title,
      content: detailData.content,
    });
    getDate();

    setUpdate(!update);
  };

  const prevDetail = () => {
    navigate(-1);
  };

  const CloseDetail = () => {
    setDetailData(DETAIL_DATA);
  };

  const deleteList = async (id: string) => {
    await customAxios.delete(`/todos/${id}`);
  };

  return (
    <TodoWrap>
      <TodoForm>
        <Input
          onChange={handleInput}
          name="title"
          placeholder="Title"
          style={{ width: '500px', marginBottom: '30px', fontSize: '22px' }}
        />

        <Input
          onChange={handleInput}
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
          detailData={detailData}
          deleteList={deleteList}
          isToken={isToken}
        />
      </TodoForm>

      {detailForm && (
        <SideWrap>
          <TodoDetail
            data={detailData}
            onClickList={putTodo}
            onInputValue={handleDetailInput}
            handleEditMode={handleEditMode}
            update={update}
            closeForm={CloseDetail}
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
