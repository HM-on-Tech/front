import { all, fork } from 'redux-saga/effects';
import axios from 'axios';


import post from './post';
import posts from './posts';
import user from './user';
import publication from './publication'
import { isAuth } from '../helper/auth';


// axios.defaults.baseURL = '';
axios.defaults.withCredentials= true;
axios.defaults.headers.common['Authorization'] = isAuth();

// axios.interceptors.request.use(function (config) {
//   config.headers.Authorization = isAuth();
//   return config;
// });
export default function* rootSaga() {
  yield all([
    fork(post),
    fork(posts),
    fork(user),
    fork(publication),
  ]);
}
