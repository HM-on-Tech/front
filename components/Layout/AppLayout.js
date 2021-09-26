import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Header from '../Header'
import { Button, CssBaseline } from '@material-ui/core';
import { Container } from 'next/app';
import { useSelector, useDispatch } from 'react-redux';

export default function AppLayout( {children}) {

  const { publicationList } = useSelector(state => state.publication)
  const dispatch = useDispatch();



  const { isLoggedIn, role } = useSelector(state => state.user)
  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="HM on Tech" sections={publicationList} />
        {children}
      </Container>
    </>
  );
}
