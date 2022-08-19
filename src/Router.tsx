import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Main from './Main';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/todo" element={<Main />} />
        <Route path="/todo/:id" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
