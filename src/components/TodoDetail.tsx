import React from 'react';
import { Button, Input } from 'antd';
import styled from 'styled-components';

interface dataType {
  data: {
    todo: string;
    id: string;
    isCompleted: boolean;
    userId: string;
  };
  closeForm: () => void;
  update: boolean;
  onClickList: (id: string) => void;
  onInputValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleEditMode: () => void;
  prevDetail: () => void;

  checkedInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TodoDetail = ({
  data: { todo, id, isCompleted },
  closeForm,
  update,
  onClickList,
  onInputValue,
  handleEditMode,
  prevDetail,
  checkedInput,
}: dataType) => {
  return (
    <DetailWrap>
      {update ? (
        <DetailForm>
          <DetailFormSpan>상세</DetailFormSpan>
          <Input
            value={todo}
            name="todo"
            style={{
              margin: '30px',
              width: '400px',
              fontSize: '22px',
            }}
            onChange={onInputValue}
          />
          <div> 완료여부 </div>
          <DetailCheckbox
            type="checkbox"
            name="isCompleted"
            checked={isCompleted}
            onChange={checkedInput}
          />

          <ButtonWrap>
            <Button onClick={closeForm}>닫기</Button>
            <Button onClick={prevDetail}>뒤로가기</Button>
            <Button onClick={handleEditMode}>수정취소</Button>
            <Button onClick={() => onClickList(id)}>수정완료</Button>
          </ButtonWrap>
        </DetailForm>
      ) : (
        <DetailForm>
          <DetailFormSpan>상세</DetailFormSpan>
          <TitleLabel> {todo}</TitleLabel>
          {isCompleted ? (
            <CheckTrue>완료</CheckTrue>
          ) : (
            <CheckFalse>미완료 </CheckFalse>
          )}
          <ButtonWrap>
            <Button onClick={closeForm}>닫기</Button>
            <Button onClick={prevDetail}>뒤로가기</Button>
            <Button onClick={handleEditMode}>수정</Button>
          </ButtonWrap>
        </DetailForm>
      )}
    </DetailWrap>
  );
};

export default TodoDetail;

const DetailWrap = styled.div`
  margin-top: 100px;
  border: 1px solid black;
`;

const DetailForm = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 50px;
  width: 500px;
  height: 400px;
`;

const TitleLabel = styled.label`
  width: 400px;
  margin: 30px;
  font-size: 22px;
  padding: 12px;
`;

const DetailCheckbox = styled.input`
  width: 15px;
  height: 15px;
`;

const CheckFalse = styled.span`
  font-size: 24px;
  color: red;
`;

const CheckTrue = styled(CheckFalse)`
  color: blue;
`;

const DetailFormSpan = styled.span`
  font-size: 22px;
  font-weight: 600;
`;

const ButtonWrap = styled.div`
  display: flex;
  margin: auto;
`;
