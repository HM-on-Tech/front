import React, { useState } from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import withReduxSaga from 'next-redux-saga';
import 'antd/dist/antd.css';
import LinearProgress from '@material-ui/core/LinearProgress';


import wrapper from '../store/configureStore';
import { LOAD_POSTS_REQUEST } from '../reducers/post';


const WebT = ({ Component }) => {

  return (
    <>
      <Head>
        <title>Hello</title>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />

      </Head>
      <Component />
      
    </>
  );
}

WebT.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export function reportWebVitals(metric) {
  // console.log(metric);
}

export default wrapper.withRedux(withReduxSaga(WebT));
