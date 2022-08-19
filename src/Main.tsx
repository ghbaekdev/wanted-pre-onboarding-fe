import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Input } from 'antd';
import { customAxios } from './Auth/customAxios';
import List from './components/List';
import TodoDetail from './components/TodoDetail';
import styled from 'styled-components';

const DETAIL_DATA = {
  todo: '',
  id: '',
  isCompleted: false,
  userId: '',
};

interface dataType {
  id: string;
  todo: string;
  isCompleted: boolean;
  userId: string;
}

export const isToken = localStorage.getItem('access_token');

const Main = () => {
  const [inputValue, setInputValue] = useState({
    todo: '',
    isCompleted: false,
  });

  const { todo, isCompleted } = inputValue;

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const checkedInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setInputValue({ ...inputValue, [name]: checked });
  };

  const [todoData, setTodoData] = useState<dataType[]>([]);

  const [detailData, setDetailData] = useState(DETAIL_DATA);

  const [update, setUpdate] = useState(false);

  const handleEditMode = () => {
    setUpdate(!update);
  };

  const detailForm = detailData.id;

  const params = useParams();

  const navigate = useNavigate();

  const getDate = async () => {
    await customAxios.get(`/todos`).then((res) => {
      setTodoData(res.data);
    });
  };

  useEffect(() => {
    const detailId = params.id;
    if (!detailId) return;

    const filterData: any = todoData.filter((todo) => todo.id == detailId)[0];
    filterData ? setDetailData(filterData) : setDetailData(DETAIL_DATA);
  }, [params]);

  useEffect(() => {
    getDate();

    // if (!isToken) {
    //   navigate('/');
    //   alert)
    // }
  }, []);

  const handleDetailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDetailData({ ...detailData, [name]: value });
  };

  const todoAdd = async () => {
    await customAxios.post(`/todos`, {
      todo: todo,
    });
    getDate();
  };

  setTimeout(() => {
    if (!isToken) {
      alert('로그인을 해주세요.');
      navigate('/');
    }
  }, 30000);

  const putTodo = async (id: string) => {
    await customAxios.put(`/todos/${id}`, {
      todo: detailData.todo,
      isCompleted: detailData.isCompleted,
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
          name="todo"
          placeholder="Title"
          style={{ width: '500px', marginBottom: '30px', fontSize: '22px' }}
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
          checkedInput={checkedInput}
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
