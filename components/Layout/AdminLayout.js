import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Link from 'next/link';
import { Button } from '@material-ui/core';
import { useSelector } from 'react-redux';
import AdminAccess from "../../helper/adminAccess"

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
  adminCol: {
    textAlign: 'center',
  },
}));

const AdminLayout = ({children}) => {
  const classes = useStyles();
  const { role } = useSelector(state => state.user)

  return(
  <>
    <AdminAccess>
      <div className={classes.root}>
        <Grid container>
          <Grid item xs={3} sm={2} className={classes.adminCol}>
            <div><Link href='/admin/list'><Button>Article List</Button></Link></div>
            <div><Link href='/admin/new'><Button>Create Article</Button></Link></div>
            { 
              role === 'admin' && 
              <>
                <div><Link href='/admin/publication'><Button>Pub List</Button></Link></div>
                <div><Link href='/admin/userManagement'><Button>User Mgmt</Button></Link></div>
              </>
            }
          </Grid>
          <Grid item xs={8} sm={8}>
            {children}
          </Grid>
          <Grid item xs={1} sm={2}>
          </Grid>
        </Grid>
      </div>
    </AdminAccess>
  </>
  )
}

export default AdminLayout;