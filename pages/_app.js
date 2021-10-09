
import React, { useState } from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import withReduxSaga from 'next-redux-saga';
import LinearProgress from '@material-ui/core/LinearProgress';
import { ToastContainer, toast } from 'react-toastify';
import wrapper from '../store/configureStore';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { LOAD_ME_REQUEST } from '../reducers/user';


const WebT = ({ Component }) => {
  const dispatch = useDispatch();
  dispatch({
    type: LOAD_ME_REQUEST,
  })
  return (
    <>
      <Head>
        <title>HM on Tech</title>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />

      </Head>
      <Component />
      <ToastContainer autoClose={2500}/>

      
    </>
  );
}

WebT.propTypes = {
  Component: PropTypes.elementType.isRequired,
};


export default wrapper.withRedux(withReduxSaga(WebT));
