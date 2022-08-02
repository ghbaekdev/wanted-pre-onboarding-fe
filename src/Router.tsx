import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Main from './Main';
import UpdateList from './components/UpdateList';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<Login />} />
        <Route path="/" element={<Main />} />
        <Route path="/update/:id" element={<UpdateList />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
