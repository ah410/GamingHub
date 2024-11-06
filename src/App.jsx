import { useState } from 'react';
import { useRoutes } from 'react-router-dom';
import './App.css';

import Home from './pages/Home';
import EditPost from './pages/EditPost';
import CreatePost from './pages/CreatePost';

import Navigation from './components/Navigation';

function App() {
  const routes = useRoutes([
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/create_post',
      element: <CreatePost />
    },    {
      path: '/edit_post/:post_id',
      element: <EditPost />
    },
  ])

  return (
    <>
      <Navigation/>
      {routes}
    </>
  )
}

export default App;
