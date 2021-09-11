import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';
import Link from 'next/link'


const useStyles = makeStyles({
  card: {
    display: 'flex',
    height: 150,
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: '40%',
  },
});

function getText(html){
  var divContainer= document.createElement("div");
  divContainer.innerHTML = html;
  let semiResult =  divContainer.textContent || divContainer.innerText || "";
  const length = semiResult.length
  semiResult = semiResult.split(' ').slice(0, Math.min(length, 15));
  return semiResult.join(" ");
}

export default function RegularPost(props) {
  const classes = useStyles();
  const { post } = props;

  return (
    <Grid item xs={12} md={12} style={{marginTop:10}}>
      {/* <CardActionArea component="a" >* href="#" */}
      <Link href={`/article/${post.id}`}>
        <Card className={classes.card}>
          <div className={classes.cardDetails}>
            <CardContent>
              <Typography component="h2" variant="h5">
                {post.title}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                By {post.author}
              </Typography>
              <Typography variant="subtitle2" color="textSecondary">
                {post.date}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {getText(post.content)}...
              </Typography>
            </CardContent>
          </div>
          <Hidden xsDown>
            <CardMedia className={classes.cardMedia} image={post.thumbnail} title={post.imageTitle} />
          </Hidden>
        </Card>
      </Link>
      {/* </CardActionArea> */}
    </Grid>
  );
}

RegularPost.propTypes = {
  post: PropTypes.object,
};