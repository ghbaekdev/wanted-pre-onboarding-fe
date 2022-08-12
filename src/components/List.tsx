import { useNavigate } from 'react-router-dom';
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
  deleteList: (id: string) => void;
  isToken: string | null;
}

const List = ({ todoData, detailData, deleteList, isToken }: todoDataType) => {
  const navigate = useNavigate();

  const goToDetail = (id: string) => {
    navigate(`/${id}`);
  };

  return (
    <>
      {todoData && (
        <ListWrap>
          <ListHeader>
            <HeaderSpan>Title</HeaderSpan>
          </ListHeader>
          {isToken &&
            todoData.map(({ id, title }) => {
              return (
                <ListDiv key={id} onClick={() => goToDetail(id)}>
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
