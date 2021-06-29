import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CardComponent from '../components/CardComponent';
import AppLayout from '../components/AppLayout';
import { LOAD_POSTS_REQUEST } from '../reducers/post';

const Home = () => {

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
  const { mainPosts } = useSelector(state => state.post)
  useEffect(() => {
    dispatch({
      type: LOAD_POSTS_REQUEST,
    })
  }, [])



  return (
    <AppLayout>


      <div className={classes.root}>
        <Grid container spacing={3}>
          {mainPosts.map((item, index) => (
            <Grid item xs={6} sm={3}>
              <CardComponent item={item} index={index}></CardComponent>
            </Grid>
          ))}
        </Grid>
      </div>
      {/* { 
      mainPosts?.map( (post)=> <div>{post.title}</div> )
    } */}
    </AppLayout>

  );
};

export default Home;
