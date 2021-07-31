import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import AdminCrudArticle from "./AdminCrudArticle"
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginRight:15,
    height:'100%',
  }
}));

const AdminLayout = ({children}) => {
  const classes = useStyles();

  return (
    <>
    <Grid container spacing={3}>
        <Grid item xs={12} sm={3}>
          <Paper className={classes.paper}>
            <AdminCrudArticle></AdminCrudArticle>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={9} >
          <Paper className={classes.paper}>{children}</Paper>
        </Grid>
      </Grid>
    </>
  )
}

export default AdminLayout;
