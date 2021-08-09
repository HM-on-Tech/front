import { all, fork } from 'redux-saga/effects';
import axios from 'axios';


import post from './post';
import posts from './posts';
import user from './user';


// axios.defaults.baseURL = '';
axios.defaults.withCredentials= true;
export default function* rootSaga() {
  yield all([
    fork(post),
    fork(posts),
    fork(user),
  ]);
}
