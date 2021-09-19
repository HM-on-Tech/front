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
  },
  sidebarGrid: {
    marginLeft : 15,
    marginRight : 15,
  },
  articleSpacing: {
    marginLeft : 35,
  }

}));

const PublicationComponent = () => {
  const classes = useStyles();

  const router = useRouter()
  const { name } = router.query
  const [publicationList, setPublicationList] = useState([])

  console.log(name, name, name)
  useEffect( async () => {
    const nameWithPosts = await axios.post(`http://localhost:3065/api/posts/publication`, {name: name});
    setPublicationList(nameWithPosts.data.Posts)
  }, [name])



    return(
    <>
      <Container container className={classes.mainGrid}>
      <main>
        <Grid container>
          {/* {console.log(publicationList)} */}
          <Grid item xs={12} md={8} className={classes.articleSpacing}>
            <Main title="Recently Published" posts={publicationList} />
          </Grid>
          
          <Grid item xs={12} md={3} className={classes.sidebarGrid}>
            <Sidebar
              title={sidebar.title}
              description={sidebar.description}
              archives={sidebar.archives}
              social={sidebar.social}
            />
          </Grid>

            
          <Grid item xs={2} md={2} />
        </Grid>
      </main>
    </Container>
    </>
    )
}

export default PublicationComponent;