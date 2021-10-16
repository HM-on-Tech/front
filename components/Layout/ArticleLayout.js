import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));
export default function ArticleLayout({children}) {
  const classes = useStyles();
  
  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={1} md={2}>
        </Grid>
        <Grid item xs={10} md={8}>
          {children}
        </Grid>
        <Grid item xs={1} md={2}>
        </Grid>
      </Grid>
    </div>
  );
}