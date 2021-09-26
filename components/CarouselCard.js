import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {useRouter} from 'next/router';

function getText(html){
  var divContainer= document.createElement("div");
  divContainer.innerHTML = html;
  let semiResult =  divContainer.textContent || divContainer.innerText || "";
  const length = semiResult.length
  semiResult = semiResult.split(' ').slice(0, Math.min(length, 15));
  return semiResult.join(" ");
}
export default function CarouselCard({title, post, id}) {
  const router = useRouter();
  const useStyles = makeStyles({
    root: {
      maxWidth: 345,
      height: '100%',
      marginRight: 10,
      marginTop: 10,
    },
  });

  const classes = useStyles();


  return (
    <Card className={classes.root}>
      <CardActionArea onClick={() => router.push(`/article/${id}`)}>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image={post.thumbnail}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {getText(post.content)}...
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
