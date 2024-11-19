import { useEffect, useState } from 'react';
import { useRoutes } from 'react-router-dom';
import { supabase } from '../client.js';
import './App.css';

import Home from './pages/Home';
import EditPost from './pages/EditPost';
import CreatePost from './pages/CreatePost';
import PostDetails from './pages/PostDetails';

import Navigation from './components/Navigation';

const App = () => {
  // 1. Create state variables
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [sortedPosts, setSortedPosts] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  // 2. Create a function to fetch all the posts from the database
  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('posts')
      .select();

    if (error) {
      console.log("Error fetching posts: ", error);
    } else {
      setPosts(data);
      console.log("Success fetching posts: ", data);
    }
  }

  // 3. useEffect hook to fetch the posts data on first render
  useEffect(() => {
    fetchPosts();
  }, []);


  const routes = useRoutes([
    {
      path: '/',
      element: <Home posts={posts} filteredPosts={filteredPosts} searchValue={searchValue} sortedPosts={sortedPosts} setSortedPosts={setSortedPosts} />
    },
    {
      path: '/create_post',
      element: <CreatePost />
    },   
    {
      path: '/edit_post/:post_id',
      element: <EditPost />
    },
    {
      path: '/post/:post_id',
      element: <PostDetails setPosts={setPosts} />
    }
  ])

  return (
    <>
      <Navigation posts={posts} setFilteredPosts={setFilteredPosts} setSearchValue={setSearchValue} setSortedPosts={setSortedPosts} />
      {routes}
    </>
  )
}

export default App;
