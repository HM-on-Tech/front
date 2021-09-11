import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import AppLayout from '../components/Layout/AppLayout';
import { LOAD_POSTS_REQUEST } from '../reducers/posts';
import LandingPage from '../components/LandingPage'

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
      <LandingPage/>
    </AppLayout>

  );
};

export default Home;
