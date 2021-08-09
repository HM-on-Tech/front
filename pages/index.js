import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { ToastContainer, toast } from 'react-toastify';
import CardComponent from '../components/CardComponent';
import AppLayout from '../components/AppLayout';
import { LOAD_POSTS_REQUEST } from '../reducers/posts';
import PostsLayout from '../components/PostsLayout';

const Home = ({children}) => {

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));

  const classes = useStyles();
  const dispatch = useDispatch()
  const { mainPosts } = useSelector(state => state.posts)
  useEffect(() => {
    dispatch({
      type: LOAD_POSTS_REQUEST,
    })
  }, [])



  return (
    <AppLayout>
      <PostsLayout posts={mainPosts}>
        {/* {mainPosts.map((post, index) => (
          <CardComponent item={post} index={index} key={index} />
        ))} */}
      </PostsLayout>
      <ToastContainer />
    </AppLayout>

  );
};

export default Home;
