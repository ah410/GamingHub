import { useState, useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import { supabase } from '../client.js';
import './App.css';

import Home from './pages/Home';
import EditPost from './pages/EditPost';
import CreatePost from './pages/CreatePost';
import PostDetails from './pages/PostDetails';
import Login from './pages/Login';
import Signup from './pages/Signup.jsx';

import Navigation from './components/Navigation';

const App = () => {
  // 1. Create state variables
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [sortedPosts, setSortedPosts] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // 2. Create a function to fetch all the posts from the database
  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('posts')
      .select();

    if (error) {
      console.log("Error fetching posts: ", error);
    } else {
      setPosts(data);
      setIsLoading(false);
      console.log("Success fetching posts: ", data);
    }
  }

  // 3. useEffect hook to fetch the posts data on first render
  useEffect(() => {
    fetchPosts();
  }, []);

  // 4. Set the session using supabase auth methods
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])


  const routes = useRoutes([
    {
      path: '/',
      element: <Home posts={posts} filteredPosts={filteredPosts} searchValue={searchValue} sortedPosts={sortedPosts} setSortedPosts={setSortedPosts} session={session} isLoading={isLoading} />
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
    },
    {
      path: '/login',
      element: <Login session={session} setSession={setSession}/>
    },
    {
      path: '/signup',
      element: <Signup session={session} setSession={setSession}/>
    }
  ])

  return (
    <>
      <Navigation posts={posts} setFilteredPosts={setFilteredPosts} setSearchValue={setSearchValue} setSortedPosts={setSortedPosts} session={session} />
      {routes}
    </>
  )
}

export default App;
