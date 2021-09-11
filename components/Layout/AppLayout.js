import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Header from '../Header'
import { useSelector } from 'react-redux';
import { Button, CssBaseline } from '@material-ui/core';
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
  { title: 'pub #1', url: '#' },
  { title: 'pub #2', url: '#' },
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
        <Header title="HM on Tech" sections={sections} />
        {children}
      </Container>
    </>
  );
}
