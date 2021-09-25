import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import Header from './Header';
import MainFeaturedPost from './Post/MainFeaturedPost';
import Main from './Main';
import Sidebar from './Sidebar';
import Footer from './Footer';
import FeaturedPostCarousel from './FeaturedPostCarousel'
import { LOAD_POSTS_REQUEST } from '../reducers/posts';



const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
    padding: 20,
  },
  sidebarGrid:{
    padding: 20,
  }}
  ));
  
  const mainFeaturedPost = {
    title: 'Title of a longer featured blog post',
    description:
    "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
    image: 'https://source.unsplash.com/random',
    imgText: 'main image description',
    linkText: 'Continue reading…',
  };
  
  const featuredPosts = [
    
  ];
  
  const sidebar = {
    title: 'About',
    description:
    'Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.',
    archives: [
      { title: 'March 2020', url: '#' },
      { title: 'February 2020', url: '#' },
      { title: 'January 2020', url: '#' },
      { title: 'November 1999', url: '#' },
      { title: 'October 1999', url: '#' },
      { title: 'September 1999', url: '#' },
      { title: 'August 1999', url: '#' },
      { title: 'July 1999', url: '#' },
      { title: 'June 1999', url: '#' },
      { title: 'May 1999', url: '#' },
      { title: 'April 1999', url: '#' },
    ],
    social: [
      { name: 'GitHub', icon: GitHubIcon },
      { name: 'Twitter', icon: TwitterIcon },
      { name: 'Facebook', icon: FacebookIcon },
    ],
  };
  
  export default function LandingPage() {
    const classes = useStyles();
    const dispatch = useDispatch()
    const { mainPosts } = useSelector(state => state.posts)

    useEffect( async () => {
      dispatch({
        type: LOAD_POSTS_REQUEST,
        
      })
    },[])
    
    return (
      <>
        <Grid container>
          <MainFeaturedPost post={mainFeaturedPost} />
          
          <Grid item xs={1} md={1}></Grid>
          <Grid item xs={10} md={10}>
            <FeaturedPostCarousel featuredPosts={mainPosts.slice(0, 4)} />
          </Grid>
          <Grid item xs={1} md={1}></Grid>
          
          <Grid item xs={4} md={1} />
          <Grid item xs={12} md={6} className={classes.mainGrid}>
            <Main title="Recently Published" posts={mainPosts.slice(4, mainPosts.length)} />
          </Grid>
          <Grid item xs={12} md={4} className={classes.sidebarGrid}>
          
            <Sidebar
              title={sidebar.title}
              description={sidebar.description}
              archives={sidebar.archives}
              social={sidebar.social}
            />
          </Grid>
          <Grid item xs={0} md={1} />
        </Grid>
        <Footer title="Footer" description="Something here to give the footer a purpose!" />
      </>
  );
}