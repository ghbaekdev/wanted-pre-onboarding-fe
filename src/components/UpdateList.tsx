import axios, { AxiosRequestHeaders } from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Radio } from 'antd';

const UpdateList = () => {
  const [updateData, setUpdateData] = useState({
    title: '',
    content: '',
  });
  const params = useParams();
  const navigate = useNavigate();

  const { title, content } = updateData;

  interface headerType extends AxiosRequestHeaders {
    Authorization: string;
  }
  const headers: headerType = {
    Authorization: localStorage.getItem('token')!,
  };
  useEffect(() => {
    const listId = params.id;
    axios
      .get(`http://localhost:8080/todos/${listId}`, {
        headers: headers,
      })
      .then((res) => {
        setUpdateData(res.data.data);
      });
  }, []);

  const inputHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdateData({ ...updateData, [name]: value });
  };

  const updatePut = () => {
    const putId = params.id;
    axios.put(
      `http://localhost:8080/todos/${putId}`,
      {
        title: title,
        content: content,
      },
      {
        headers: headers,
      }
    );
    navigate('/todo');
  };

  const updateCancel = () => {
    navigate('/todo');
  };

  return (
    <UpdateWrap>
      <UpdateForm>
        <UpdateInput value={title} onChange={inputHandle} name="title" />
        <UpdateContent value={content} onChange={inputHandle} name="content" />
        <ButtonBox>
          <Radio.Button onClick={updatePut} value="default">
            Update
          </Radio.Button>
          <Radio.Button onClick={updateCancel} value="default">
            Cancel
          </Radio.Button>
        </ButtonBox>
      </UpdateForm>
    </UpdateWrap>
  );
};

export default UpdateList;

const UpdateWrap = styled.div`
  width: 1000px;
  height: 500px;
  margin: 0 auto;
`;

const UpdateForm = styled.form`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const UpdateInput = styled.input`
  width: 300px;
  height: 35px;
  margin: 15px;
`;

const UpdateContent = styled(UpdateInput)`
  height: 50px;
`;

const ButtonBox = styled.div``;
