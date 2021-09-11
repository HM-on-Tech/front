import React from 'react'
import Container from '@material-ui/core/Container'

const Article = ({post}) => {

  return(
    <>
    <Container>
      {console.log(post)}
      <h1 style={{marginBottom:'-20px'}}>{post?.title}</h1>
      <h3>{post?.author}</h3>
      <div dangerouslySetInnerHTML={{ __html: post?.content }} />
    </Container>
    </>
  )
}

export default Article