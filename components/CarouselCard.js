import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

export default function ImgMediaCard({key, post}) {
  console.log(key, post)
  const useStyles = makeStyles({
    root: {
      maxWidth: 345,
      marginRight: 10,
      marginTop: 10,
    },
  });

  const classes = useStyles();


  return (
    <Card className={classes.root}>
      <CardActionArea onClick={() => router.push('/#')}>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image={post.image}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {key}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {post.content.split(' ').slice(0,Math.max(post.content.split(' ').length,15)).join(" ")}...
          </Typography>
        </CardContent>
      </CardActionArea>
      {/* <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions> */}
    </Card>
  );
}
