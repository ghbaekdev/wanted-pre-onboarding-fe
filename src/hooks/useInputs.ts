import React, { useState } from 'react';

type InputType = {
  title: string;
  content: string;
};

const useInputs = (initialValue: InputType) => {
  const [inputValue, setInputValue] = useState(initialValue);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  return { inputValue, handleInput };
};

export default useInputs;