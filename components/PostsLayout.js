import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import AdminCrudArticle from "./AdminCrudArticle"
import { makeStyles } from '@material-ui/core/styles';
import CardComponent from './CardComponent';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginRight:15,
    height:'100%',
  }
}));

const PostsLayout = ({children, posts}) => {
  const classes = useStyles();

  return (
    <>
    
      <Grid container spacing={3}>
        <Grid item xs={12} sm={3}>
          {/* <Paper className={classes.paper}>
          </Paper> */}
        </Grid>
        <Grid item xs={12} sm={6} >
          {posts.map((post, index) => (
            <CardComponent item={post} index={index} key={index} />
          ))}
          {/* <Paper className={classes.paper}>{children}</Paper> */}
        </Grid>
      </Grid>
      <Grid item xs={12} sm={3}>
        {/* <Paper className={classes.paper}>
        </Paper> */}
      </Grid>
    </>
  )
}

export default PostsLayout;
