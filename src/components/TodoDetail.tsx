import React, { useState } from 'react';
import { Button } from 'antd';
import styled from 'styled-components';

interface dataType {
  data: {
    title: string;
    content: string;
    id: string;
    createdAt?: string;
    updatedAt?: string;
  };
  onClickList: (id: string) => void;
  onInputValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TodoDetail = (props: dataType): JSX.Element => {
  const {
    data: { title, content, id },
    onClickList,
    onInputValue,
  } = props;
  const [update, setUpdate] = useState(false);

  const handleState = () => {
    update ? setUpdate(false) : setUpdate(true);
  };

  // const headers = {
  //   Authorization: localStorage.getItem('token')!,
  // };

  // const = (id: any) => {
  //   axios.put(
  //     `http://localhost:8080/todos/${id}`,
  //     {
  //       title: data.title,
  //       content: data.content,
  //     },
  //     {
  //       headers: headers,
  //     }
  //   );
  // };

  return (
    <DetailWrap>
      {update ? (
        <DetailForm>
          <input value={title} name="title" onChange={onInputValue} />
          <input value={content} name="content" onChange={onInputValue} />
          <Button onClick={handleState}>수정취소</Button>
          <Button onClick={() => onClickList(id)}>수정완료</Button>
        </DetailForm>
      ) : (
        <DetailForm>
          <TitleLabel> {title}</TitleLabel>
          <ContentLabel>{content}</ContentLabel>
          <Button style={{ marginTop: '100px' }} onClick={handleState}>
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
  background-color: lightgrey;
  margin: 30px;
  font-size: 25px;
`;

const ContentLabel = styled(TitleLabel)`
  font-size: 20px;
`;
