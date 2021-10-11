import React, { useEffect } from 'react';

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
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
  const classes = useStyles();
  const dispatch = useDispatch();
  const { role, isLoggedIn, userName } = useSelector(state => state.user)
  
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
  return (
    <>
      <Toolbar className={classes.toolbar}>
        <Link href="/">
          <Button>Home</Button>
        </Link>
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
          <Hidden mdDown>
            <Link href="/"><Button style={{fontSize:25}}>{title}</Button></Link>
          </Hidden>
          {/* <Hidden only>
            <Link href="/"><Button style={{fontSize:15}}>{title}</Button></Link>
          </Hidden> */}
          <Hidden mdUp>
            <Link href="/"><Button style={{fontSize:40}}>{title}</Button></Link>
          </Hidden>
        </Typography>
        {googleLoginComponent()}
      </Toolbar>
      
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
        removeArrowOnDeviceType={["tablet", "mobile"]}
        // deviceType={this.props.deviceType}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
        className={classes.header}
      >
        {sections?.map((section) => ( 
          <Button key={`header-button-${section.name}`}>
            <Link href={`/publication/${section.name}`}>
              <MUILink 
                color="inherit"
                noWrap
                key={section.name}
                variant="body2"
                className={classes.toolbarLink}
              >
                {section.name}
              </MUILink>
            </Link>   
          </Button>
        ))} 
      </Carousel>
    </>
  );
}

Header.propTypes = {
  sections: PropTypes.array,
  title: PropTypes.string,
};
