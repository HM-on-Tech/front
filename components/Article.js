import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useRouter } from 'next/router'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles  } from '@material-ui/core'
import Moment from 'moment'
import { LOAD_PUBLICATION_REQUEST } from '../reducers/publication';


const useStyles = makeStyles((theme) => ({
  author: {
    marginBottom: 0,
    lineHeight: 1.3
  },
  img: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 30,
    fontWeight: 600,
    marginTop: 40, 
    marginBottom: 6,
    [theme.breakpoints.up('md')]: {
      fontSize: 50,
      fontWeight: 600,
      marginTop: 40, 
    },
  },
  overline: {
    fontSize: 15,
    marginTop: -10,
    lineHeight: 0.5
  },

}))




const Article = ({post}) => {
  const classes = useStyles()
  const router = useRouter()
  const dispatch = useDispatch()
  const { name } = router.query
  const { publicationList } = useSelector(state => state.publication || initialState)

  
  const currentPubId = post?.PublicationId
  const currentPubName = publicationList[currentPubId]?.name

  const formatter = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "long",
    day: "2-digit"
  });


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
        <img
          src={post?.thumbnail}
          className={classes.img}
          
        />
          By: {post?.author}
        </Typography>
        <Typography
          className={classes.overline}
          variant='overline'
        >
          {currentPubName}, {/* {Moment(post?.updatedAt).format('MM-DD-YYYY')} */}
        </Typography>
        <div dangerouslySetInnerHTML={{ __html: post?.content }} />
      </Grid>
    </Container>
    </>
  )
}

export default Article