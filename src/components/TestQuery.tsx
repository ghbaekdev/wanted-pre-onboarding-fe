import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { customAxios } from '../Auth/customAxios';

interface dataType {
  title: string;
  content: string;
  id: string;
  createdAt: string;
  updatedAt: string;
}

const getData = async () => {
  const { data } = await customAxios.get('/todos');
  return data;
};

export const TestQuery = () => {
  const [arr, setArr] = useState<dataType[]>([]);

  const { data, status, error } = useQuery(['todos'], getData, {
    refetchOnWindowFocus: false,
    retry: 0, // 실패시 재호출 몇번 할지
    onSuccess: (data: dataType[]) => {
      setArr(data);
    },
    onError: (error: Error) => {
      console.log(error.message);
    },
  });

  return (
    <>
      {arr.map((todo) => {
        <div key={todo.id}>
          {todo.title}
          {todo.content}
        </div>;
      })}
    </>
  );
};
