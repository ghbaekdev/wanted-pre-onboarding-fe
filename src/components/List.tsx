import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface todoDataType {
  todoData: {
    todo: string;
    id: string;
    isCompleted: boolean;
    userId: string;
  }[];
  detailData: {
    todo: string;
    id: string;
    isCompleted: boolean;
    userId: string;
  };
  deleteList: (id: string) => void;
  isToken: string | null;
  checkedInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const List = ({
  todoData,
  detailData,
  deleteList,
  isToken,
  checkedInput,
}: todoDataType) => {
  const navigate = useNavigate();

  const goToDetail = (id: string) => {
    navigate(`/todo/${id}`);
  };

  return (
    <>
      {todoData && (
        <ListWrap>
          <ListHeader>
            <HeaderSpan>Title</HeaderSpan>
          </ListHeader>
          {isToken &&
            todoData.map(({ id, todo, isCompleted }) => {
              return (
                <ListDiv key={id}>
                  <ListBox>
                    <ListTitle onClick={() => goToDetail(id)}>
                      {id === detailData.id ? detailData.todo : todo}
                    </ListTitle>
                    <div>
                      <input
                        type="checkbox"
                        name="isCompleted"
                        onChange={checkedInput}
                      />
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
