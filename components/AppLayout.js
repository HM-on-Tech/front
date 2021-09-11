import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Header from './Header'
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { Button, CssBaseline } from '@material-ui/core';
import MyGoogleLogin from './MyGoogleLogin';
import { Container } from 'next/app';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  paper: {
    marginRight:15,
    height:'100%',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
}));
const sections = [
  { title: 'Home', url: '/' },
  { title: 'Admins', url: '/admins/list' },
  { title: 'Culture', url: '#' },
  { title: 'Business', url: '#' },
  { title: 'Politics', url: '#' },
  { title: 'Opinion', url: '#' },
  { title: 'Science', url: '#' },
  { title: 'Health', url: '#' },
  { title: 'Style', url: '#' },
  { title: 'Travel', url: '#' },
];

export default function AppLayout( {children}) {
  const classes = useStyles();

  const { isLoggedIn, isAdmin } = useSelector(state => state.user)
  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="Blog" sections={sections} />
        {children}
      </Container>
    </>
  );
}
