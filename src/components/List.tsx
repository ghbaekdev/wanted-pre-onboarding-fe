import axios from 'axios';
import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';

interface todoDataType {
  todoData: {
    title: string;
    content: string;
    id: string;
    createdAt: string;
    updatedAt: string;
  }[];
  setDetailData: Dispatch<
    SetStateAction<{
      title: string;
      content: string;
      id: string;
      createdAt: string;
      updatedAt: string;
    }>
  >;
}

const List = (props: todoDataType) => {
  const { setDetailData, todoData } = props;
  // const [todoData, setTodoData] = useState([]);

  // const headers: headerType = {
  //   Authorization: localStorage.getItem('token')!,
  // };
  // const getDate = () => {
  //   axios
  //     .get('http://localhost:8080/todos', {
  //       headers: headers,
  //     })
  //     .then((res) => {
  //       setTodoData(res.data.data);
  //     });
  // };
  // useEffect(() => {
  //   getDate();
  // }, []);

  const headers = {
    Authorization: localStorage.getItem('token')!,
  };

  const deleteList = async (id: string) => {
    await axios.delete(`http://localhost:8080/todos/${id}`, {
      headers: headers,
    });
  };

  const openDetail = async (id: string) => {
    await axios
      .get(`http://localhost:8080/todos/${id}`, {
        headers: headers,
      })
      .then((res) => {
        setDetailData(res.data.data);
      });
  };

  return (
    <>
      {todoData && (
        <ListWrap>
          <ListHeader>
            <HeaderSpan>Title</HeaderSpan>
          </ListHeader>
          {localStorage.getItem('token') &&
            todoData.map(({ id, title }) => {
              return (
                <div key={id} onClick={() => openDetail(id)}>
                  <ListBox>
                    <ListTitle>{title}</ListTitle>
                    <div>
                      <DeleteBtn onClick={() => deleteList(id)}>X</DeleteBtn>
                    </div>
                  </ListBox>
                </div>
              );
            })}
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

const ListTitle = styled.div`
  margin: 10px;
`;

const DeleteBtn = styled.button`
  width: 30px;
  height: 30px;
`;

export default List;
