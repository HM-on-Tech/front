import React, { useEffect, useState } from 'react';
import AppLayout from '../components/Layout/AppLayout';
import LandingPage from '../components/LandingPage'
import { LOAD_PUBLICATION_REQUEST } from '../reducers/publication';
import { CAN_SCROLL_REQUEST, LOAD_POSTS_REQUEST, LOAD_POSTS_SCROLL_REQUEST } from '../reducers/posts';
import { useDispatch, useSelector } from 'react-redux';


const Home = () => {
  const dispatch = useDispatch();
  const { mainPosts, canScroll } = useSelector(state => state.posts)
  useEffect( async () => {
    dispatch({
      type: LOAD_POSTS_REQUEST,
      data: {
        howMany: 5,
      }
    })
    dispatch({
      type: CAN_SCROLL_REQUEST,
    })
  },[])
  useEffect( () => {
    function onScroll() {
      if (window.pageYOffset + document.documentElement.clientHeight > document.documentElement.scrollHeight - 100) {
        if ( canScroll ) { // condition
          
          dispatch({
            type: LOAD_POSTS_SCROLL_REQUEST,
            data: {
              howMany: 5,
              length: mainPosts.length,
            }
          })
        }
      }
    }
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [mainPosts, mainPosts.length, canScroll]);


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
