import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import AppLayout from '../components/AppLayout';
const Home = () => {

  const dispatch = useDispatch()
  const { mainPosts } = useSelector(state => state.post)
  useEffect(() => {
    console.log(mainPosts)
    console.log(123)
    console.log('login added')
    console.log('awefwefkg')
    console.log('feature/a') 
  }, [mainPosts])

  return (
    <AppLayout>
    { 
      mainPosts?.map( (post)=> <div>{post.title}</div> )
    }
    </AppLayout>
  );
};

export default Home;
