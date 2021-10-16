import React from 'react'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles  } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  author: {
    marginBottom: 10,
  },
  img: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 30,
    fontWeight: 600,
    marginTop: 40, 
    [theme.breakpoints.up('md')]: {
      fontSize: 50,
      fontWeight: 600,
      marginTop: 40, 
    },
  },

}))


const Article = ({post}) => {
const classes = useStyles()

  return(
    <>
    <Container>
      <Grid item xs={12} md={12}>
        <Typography 
          className={classes.title} 
          variant='h2'
        >
          {post?.title}
        </Typography>
        <Typography
          className={classes.author}
          variant='h6'
        >
          By {post?.author}
        </Typography>
        <img
          src={post?.thumbnail}
          className={classes.img}
          
        />
        <div dangerouslySetInnerHTML={{ __html: post?.content }} />
      </Grid>
    </Container>
    </>
  )
}

export default Article