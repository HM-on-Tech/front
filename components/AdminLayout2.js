import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Link from 'next/link';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: 700
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const AdminLayout2 = ({children}) => {
  const classes = useStyles();

  return(
  <>
      <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={1}>
          <Link href='/admins/A'><Button>a</Button></Link>
          <Link href='/admins/B'><Button>b</Button></Link>
          <Link href='/admins/C'><Button>c</Button></Link>
          <Link href='/admins/D'><Button>d</Button></Link>
        </Grid>
        <Grid item xs={9}>
          {children}
        </Grid>
      </Grid>
    </div>
  </>
  )
}

export default AdminLayout2;