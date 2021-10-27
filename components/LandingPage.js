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
import { Hidden } from '@material-ui/core';



const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
    padding: 20,
  },
  sidebarGrid:{
    padding: 20,
  },
  recentlyPublished:{
    marginLeft: 10,
  }}
  ));
  
  const mainFeaturedPost = {
    title: "Horace Mann's Publications and Magazines",
    description:
    "All in one place.",
    image: '../static/marroon.png',
    // imgText: 'main image description',
    // linkText: 'Continue reading…',
  };
  
  const featuredPosts = [
    
  ];
  
  const sidebar = {
    title: 'About',
    description:
    'HM on Tech was created by a dedicated group of four seniors and two juniors on a mission to make an impact on the HM community through our passion for computer science. This app is an accessible portal to all HM student publications, regardless of size, and allows users to sort by specific publications or by recently published issues.',
    // archives: [],
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
          <Grid item xs={12} md={7} className={classes.mainGrid}>
          
            <Main title="           Recently Published" posts={mainPosts.slice(4, mainPosts.length)} className={classes.recentlyPublished} />
          </Grid>
          <Grid item xs={12} md={3} className={classes.sidebarGrid}>
            <Hidden xsDown>
              <Sidebar
                title={sidebar.title}
                description={sidebar.description}
                archives={null}
                social={sidebar.social}
              />
            </Hidden>
          </Grid>
          <Grid item md={1} />
        </Grid>
        {/* <Footer title="Footer" description="Something here to give the footer a purpose!" /> */}
      </>
  );
}