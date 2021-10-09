import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import RegularPost from './Post/RegularPost';

const useStyles = makeStyles((theme) => ({
  markdown: {
    ...theme.typography.body2,
    padding: theme.spacing(3, 0),
  },
}));

export default function Main(props) {
  const classes = useStyles();
  const { posts, title, content, id } = props;

  return (
    <>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Divider />
      {posts?.map((post) => (
        <RegularPost key={`${post.title}-${post.id}`} post={post} content={content} id={id}/>
      ))}
    </>
  );
}

Main.propTypes = {
  posts: PropTypes.array,
  title: PropTypes.string,
};