import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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

const AdminLayout = ({children}) => {
  const classes = useStyles();

  return(
  <>
      <div className={classes.root}>
      <Grid container>
        <Grid item xs={2}>
          <Link href='/admin/list'><Button>Article List</Button></Link>
          <Link href='/admin/new'><Button>Create Article</Button></Link>
          <Link href='/admin/publication'><Button>Publication List</Button></Link>
        </Grid>
        <Grid item xs={8}>
          {children}
        </Grid>
        <Grid item xs={2}>
        </Grid>
      </Grid>
    </div>
  </>
  )
}

export default AdminLayout;