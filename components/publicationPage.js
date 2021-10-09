import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios';
import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import { Grid, makeStyles } from '@material-ui/core';
import { Container } from 'next/app';
import Main from './Main';
import Sidebar from './Sidebar';


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

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginRight: 15,
    padding:20,
  },
  sidebarGrid: {
    marginLeft : 15,
    marginRight : 15,
  },
  // articleSpacing: {
  //   marginLeft : 10,
  // }

}));

const PublicationComponent = () => {
  const classes = useStyles();

  const router = useRouter()
  const { name } = router.query
  const [publicationList, setPublicationList] = useState([])

  useEffect( async () => {
    const nameWithPosts = await axios.post(`http://localhost:3065/api/posts/publication`, {name: name});
    setPublicationList(nameWithPosts.data.Articles)
  }, [name])



    return(
    <>
        <Grid container>
          <Grid item xs={false} md={1} />
          <Grid item xs={12} md={6}>
            <Main 
              title="Recently Published"
              posts={publicationList}
            />
          </Grid>
          <Grid item xs={12} md={4} style={{padding:40}}>
            <Sidebar
              title={sidebar.title}
              description={sidebar.description}
              archives={sidebar.archives}
              social={sidebar.social}
              className={classes.sidebarGrid}
            />
          </Grid>
          <Grid item xs={false} md={1} />
        </Grid>
    </>
    )
}

export default PublicationComponent;