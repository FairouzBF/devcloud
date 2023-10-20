import React from 'react';
import { TodoList } from '../pages/todo-list-page';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <TodoList />,
  },
]);
