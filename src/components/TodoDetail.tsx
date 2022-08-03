import React, { useState } from 'react';
import { Button } from 'antd';
import styled from 'styled-components';
import { Input } from 'antd';

interface dataType {
  data: {
    title: string;
    content: string;
    id: string;
    createdAt?: string;
    updatedAt?: string;
  };
  update: boolean;
  onClickList: (id: string) => void;
  onInputValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleState: () => void;
}

const TodoDetail = (props: dataType): JSX.Element => {
  const {
    data: { title, content, id },
    onClickList,
    onInputValue,
    handleState,
    update,
  } = props;

  return (
    <DetailWrap>
      {update ? (
        <DetailForm>
          <DetailFormSpan>Title</DetailFormSpan>
          <Input
            value={title}
            name="title"
            style={{
              margin: '30px',
              width: '400px',
              border: 'none',
              fontSize: '22px',
            }}
            onChange={onInputValue}
          />
          <DetailFormSpan>Content</DetailFormSpan>
          <Input
            value={content}
            name="content"
            style={{
              margin: '30px',
              width: '400px',
              border: 'none',
              fontSize: '22px',
            }}
            onChange={onInputValue}
          />

          <Button onClick={handleState}>수정취소</Button>
          <Button onClick={() => onClickList(id)}>수정완료</Button>
        </DetailForm>
      ) : (
        <DetailForm>
          <DetailFormSpan>Title</DetailFormSpan>
          <TitleLabel> {title}</TitleLabel>
          <DetailFormSpan>Content</DetailFormSpan>
          <ContentLabel>{content}</ContentLabel>
          <Button style={{ marginTop: '30px' }} onClick={handleState}>
            수정
          </Button>
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
