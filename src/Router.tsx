import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Main from './Main';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const Router = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<Login />} />
          <Route path="/" element={<Main />} />
          <Route path="/:id" element={<Main />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default Router;
