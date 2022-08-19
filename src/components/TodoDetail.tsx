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
}

const TodoDetail = ({
  data: { todo, id, isCompleted },
  closeForm,
  update,
  onClickList,
  onInputValue,
  handleEditMode,
  prevDetail,
}: dataType) => {
  return (
    <DetailWrap>
      {update ? (
        <DetailForm>
          <DetailFormSpan>Title</DetailFormSpan>
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
          {/* <DetailFormSpan>Content</DetailFormSpan>
          <Input
            value={content}
            name="content"
            style={{
              margin: '30px',
              width: '400px',
              fontSize: '22px',
            }}
            onChange={onInputValue}
          /> */}
          <ButtonWrap>
            <Button onClick={closeForm}>닫기</Button>
            <Button onClick={prevDetail}>뒤로가기</Button>
            <Button onClick={handleEditMode}>수정취소</Button>
            <Button onClick={() => onClickList(id)}>수정완료</Button>
          </ButtonWrap>
        </DetailForm>
      ) : (
        <DetailForm>
          <DetailFormSpan>Title</DetailFormSpan>
          <TitleLabel> {todo}</TitleLabel>
          {/* <DetailFormSpan>Content</DetailFormSpan>
          <ContentLabel>{content}</ContentLabel> */}
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
`;

const ContentLabel = styled(TitleLabel)`
  font-size: 20px;
`;

const DetailFormSpan = styled.span`
  font-size: 22px;
  font-weight: 600;
`;

const ButtonWrap = styled.div`
  display: flex;
  margin: auto;
`;
