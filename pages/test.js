import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import PostForm from '../components/PostForm'
const Test = () => {
  // state
  const [name, setName] = useState('123');


  const buttonClikced = (e) => {
    setName('456')
  }
  return(
    <>
    New Component
    <PostForm />
    <div>{name}</div>
    <Button onClick={buttonClikced}> This is Button</Button>
    </>
  )
}

export default Test;