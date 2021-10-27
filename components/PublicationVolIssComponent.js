import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import { Grid, makeStyles } from '@material-ui/core';
import Main from './Main';
import Sidebar from './Sidebar';
import { 
  LOAD_POSTS_BY_PUBLICATION_REQUEST,
  LOAD_POSTS_BY_PUBLICATION_SCROLL_REQUEST,
} from '../reducers/posts';

const sidebar = {
  title: 'About',
  description:
  'HM on Tech was created by a dedicated group of four seniors and two juniors on a mission to make an impact on the HM community through our passion for computer science. This app is an accessible portal to all HM student publications, regardless of size, and allows users to sort by specific publications or by recently published issues.',
  archives: [],
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

const PublicationVolIssComponent = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { mainPosts } = useSelector(state => state.posts)
  const router = useRouter()
  const { name, volume, issue } = router.query
  const [volumeIssueList, setVolumeIssueList] = useState([])
  const archivespreprocess = (data) => {
    return data.map( (d) => {
      return {
        title: `${d.volume} volume - ${d.issue} issue`,
        url: `/publication/${name}/${d.volume}/${d.issue}`
      }
    })
  }

  useEffect( async () => {
    dispatch({
      type: LOAD_POSTS_BY_PUBLICATION_REQUEST,
      data: {
        pubName: name,
        howMany: 5,
        volume,
        issue,
      }
    })
  },[name, volume, issue])

  useEffect( async () => {
    const result = await axios.post(`/publication/volumeIssueComb`,{pubName: name});
    setVolumeIssueList(result.data);
  }, [name, volume, issue])


  useEffect(() => {
    function onScroll() {
      if (window.pageYOffset + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
        if ( mainPosts.length > 0 ) { // condition
          
          dispatch({
            type: LOAD_POSTS_BY_PUBLICATION_SCROLL_REQUEST,
            data: {
              pubName: name,
              howMany: 5,
              length: mainPosts.length,
              volume,
              issue,
            }
          })
        }
      }
    }
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [mainPosts, mainPosts.length]);

    return(
    <>
        <Grid container>
          <Grid item xs={false} md={1} />
          <Grid item xs={12} md={6}>
            <Main 
              title=" Recently Published"
              posts={mainPosts}
            />
          </Grid>
          <Grid item xs={12} md={4} style={{padding:40}}>
            <Sidebar
              title={sidebar.title}
              description={sidebar.description}
              archives={archivespreprocess(volumeIssueList)}
              social={sidebar.social}
              className={classes.sidebarGrid}
            />
          </Grid>
          <Grid item xs={false} md={1} />
        </Grid>
    </>
    )
}

export default PublicationVolIssComponent;