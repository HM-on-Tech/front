import React, { useEffect } from 'react';
import AppLayout from '../components/Layout/AppLayout';
import LandingPage from '../components/LandingPage'
import { LOAD_PUBLICATION_REQUEST } from '../reducers/publication';
import { LOAD_POSTS_REQUEST } from '../reducers/posts';
import { useDispatch } from 'react-redux';


const Home = () => {
  const dispatch = useDispatch();

  useEffect( async () => {
    dispatch({
      type: LOAD_POSTS_REQUEST,
      
    })
  },[])
  
  useEffect(() => {
    dispatch({
      type: LOAD_PUBLICATION_REQUEST,
    })
  }, [])
  return (
    <AppLayout>
      <LandingPage/>
    </AppLayout>

  );
};

export default Home;
