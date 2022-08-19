import React, { useState } from 'react';

type InputType = {
  todo: string;
  isCompleted: boolean;
};

const useInputs = (initialValue: InputType) => {
  const [inputValue, setInputValue] = useState(initialValue);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    setInputValue({ ...inputValue, [name]: value || checked });
  };

  return { inputValue, handleInput };
};

export default useInputs;
