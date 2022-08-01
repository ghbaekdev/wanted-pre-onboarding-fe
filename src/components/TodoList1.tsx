import axios, { AxiosRequestHeaders } from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const TodoList1 = () => {
  const [todoData, setTodoData] = useState([]);
  // const [updateModal, setUpdateModal] = useState(false);

  const navigate = useNavigate();

  interface headerType extends AxiosRequestHeaders {
    Authorization: string;
  }
  const headers: headerType = {
    Authorization: localStorage.getItem('token')!,
  };

  useEffect(() => {
    axios
      .get('http://localhost:8080/todos', {
        headers: headers,
      })
      .then((res) => {
        setTodoData(res.data.data);
      });
  });

  const deleteList = async (id: any) => {
    await axios.delete(`http://localhost:8080/todos/${id}`, {
      headers: headers,
    });
  };

  const updateHandle = (id: string) => {
    navigate(`/update/${id}`);
    // setUpdateModal(true);
  };

  return (
    <>
      {todoData && (
        <ListWrap>
          <ListHeader>
            <HeaderSpan>Title</HeaderSpan>
            <HeaderSpan>Content</HeaderSpan>
          </ListHeader>
          {localStorage.getItem('token') &&
            todoData.map(({ id, title, content }) => {
              return (
                <div key={id}>
                  <ListBox>
                    <List>{title}</List>
                    <Content>{content}</Content>
                    <DeleteBtn onClick={() => deleteList(id)}>X</DeleteBtn>
                    <UpdateBtn onClick={() => updateHandle(id)}>수정</UpdateBtn>
                  </ListBox>
                </div>
              );
            })}
          {/* {updateModal && <UpdateList />} */}
        </ListWrap>
      )}
    </>
  );
};

const ListWrap = styled.div`
  width: 500px;
`;

const ListBox = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  padding-bottom: 15px;
  border-bottom: 2px solid black;
`;

const HeaderSpan = styled.span`
  font-size: 25px;
  font-weight: 600;
`;

const List = styled.div`
  margin: 10px;
`;

const DeleteBtn = styled.button`
  width: 30px;
  height: 30px;
`;

const UpdateBtn = styled.button`
  width: 50px;
  height: 30px;
`;

const Content = styled.div`
  margin: 10px;
`;

export default TodoList1;
