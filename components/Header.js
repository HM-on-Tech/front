import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import { Box, Button, Divider, Drawer, Grid, List, ListItem, ListItemIcon, ListItemText} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';
import Hidden from '@material-ui/core/Hidden';
import { Link as MUILink} from '@material-ui/core';
import 'react-multi-carousel/lib/styles.css';
import Carousel from 'react-multi-carousel';
import { useDispatch, useSelector } from 'react-redux';
import {LOG_OUT_REQUEST } from '../reducers/user';
import { LOAD_PUBLICATION_REQUEST } from '../reducers/publication';
import MyGoogleLogin from './MyGoogleLogin';
import { useRouter } from 'next/router';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
  header: {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  },
  title: {
    fontSize: '2.0rem',
    '@media (max-width:600px)': {
      fontSize: '1.0rem',
    },
  }
}));

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 8,
    slidesToSlide: 2 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 8,
    slidesToSlide: 1 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 5,
    slidesToSlide: 1 // optional, default to 1.
  }
};



export default function Header({ sections, title }) {
  const [volumeIssueList, setVolumeIssueList] = useState([])
  const archivespreprocess = (data) => {
    if (name == null) return []
    return data.map( (d) => {
      return {
        title: `${d.volume} volume - ${d.issue} issue`,
        url: `/publication/${name}/${d.volume}/${d.issue}`
      }
    })
  }
  const classes = useStyles();
  const dispatch = useDispatch();
  const { role, isLoggedIn, userName } = useSelector(state => state.user)
  const router  = useRouter();
  const { pathname } = router;
  const { name } = router.query

  const logout = () => {
    dispatch({
      type: LOG_OUT_REQUEST,
    })
  }

  useEffect(() => {
    dispatch({
      type: LOAD_PUBLICATION_REQUEST,
    })
  }, [])

  const googleLoginComponent = () => {
    if( isLoggedIn ) {
      return <></>
    }
    return <MyGoogleLogin />
  }


  useEffect( async () => {
    if (name) {
      const result = await axios.post(`/publication/volumeIssueComb`,{pubName: name});
      setVolumeIssueList(result.data);
    }
  }, [name])




  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {archivespreprocess(volumeIssueList).map((element, index) => (
          <ListItem button key={element['title']}>
            <Link href={`${element['url']}`}>
              <ListItemText primary={element['title']} />
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const archivesButtonRendering = () => {
    if (pathname?.startsWith('/publication')) {
      return (
        <>
          <React.Fragment key={'left'}>
            <Button onClick={toggleDrawer('left', true)} style={{fontSize:10}}>{'Archives'}</Button>
            <Drawer
              anchor={'left'}
              open={state['left']}
              onClose={toggleDrawer('left', false)}
            >
              {list('left')}
            </Drawer>
          </React.Fragment>
        </>
      )
    }
    return null;
  }
  return (
    <>
      <Toolbar className={classes.toolbar}>
        {archivesButtonRendering()}
        {
          (role == 'admin' || role == 'editor') && isLoggedIn &&
          <>
            <Link href="/admin/list">
              <Button>Admin</Button>
            </Link>
            <Button onClick={logout}>LogOut</Button>
          </>
        }
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          className={classes.toolbarTitle}
        >
          <Link href="/"><Button className={classes.title}>{title}</Button></Link>
        </Typography>
        {googleLoginComponent()}
      </Toolbar>
      <Hidden xsDown>
        
        <Carousel
          swipeable={true}
          draggable={true}
          showDots={false}
          responsive={responsive}
          ssr={true} // means to render carousel on server-side.
          infinite={true}
          // autoPlay={this.props.deviceType !== "mobile" ? true : false}
          keyBoardControl={true}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile", 'desktop']}
          // deviceType={this.props.deviceType}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
          className={classes.header}
        >
          {sections?.map((section) => ( 
            <Button key={`header-button-${section.name}`}>
              {/* <Link href={`/publication/${section.name}`}> */}
                {/* <MUILink 
                  color="inherit"
                  noWrap
                  key={section.name}
                  variant="body2"
                  className={classes.toolbarLink}
                > */}
                  {section.name}
                {/* </MUILink> */}
              {/* </Link>    */}
            </Button>
          ))} 
        </Carousel>
      </Hidden>
    </>
  );
}

Header.propTypes = {
  sections: PropTypes.array,
  title: PropTypes.string,
};
