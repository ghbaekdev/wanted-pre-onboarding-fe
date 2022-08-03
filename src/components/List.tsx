import axios from 'axios';

import styled from 'styled-components';

interface todoDataType {
  todoData: {
    title: string;
    content: string;
    id: string;
    createdAt: string;
    updatedAt: string;
  }[];
  detailData: {
    title: string;
    content: string;
    id: string;
    createdAt: string;
    updatedAt: string;
  };

  openDetail: (id: string) => void;
}

const List = (props: todoDataType) => {
  const { openDetail, todoData, detailData } = props;

  const headers = {
    Authorization: localStorage.getItem('token')!,
  };

  const deleteList = async (id: string) => {
    await axios.delete(`http://localhost:8080/todos/${id}`, {
      headers: headers,
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
                <ListDiv key={id} onClick={() => openDetail(id)}>
                  <ListBox>
                    <ListTitle>
                      {id === detailData.id ? detailData.title : title}
                    </ListTitle>
                    <div>
                      <DeleteBtn onClick={() => deleteList(id)}>X</DeleteBtn>
                    </div>
                  </ListBox>
                </ListDiv>
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

const ListDiv = styled.div`
  cursor: pointer;
`;

export default List;
