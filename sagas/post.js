import axios from 'axios';
import { all, call, delay, fork, put, takeLatest, throttle } from 'redux-saga/effects';
import { LOAD_POST_REQUEST, LOAD_POST_SUCCESS } from '../reducers/post';

import {
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
} from '../reducers/post';
import { LOAD_POSTS_REQUEST } from '../reducers/posts';

function loadPostAPI(blogId) {
  return axios.post('http://localhost:3065/api/post/',{blogId:blogId});
}

function* loadPost(action) {
  try {
    const result = yield call(loadPostAPI,action.data);
    yield put({
      type: LOAD_POST_SUCCESS,
      data: result.data
    });
  } catch (err) {
    console.error(err);
    // yield put({
    //   type: LOAD_POSTS_FAILURE,
    //   data: err.response.data,
    // });
  }
}


function loadPostsAPI() {
  return axios.post('http://localhost:3065/api/post/list');
  // return axios.get('https://api.nytimes.com/svc/news/v3/content/all/all.json?api-key=kzMmOlHAw7K5LxjTAHqQ9KJ4tS44W4zr');
}

function* loadPosts(action) {
  try {
    const result = yield call(loadPostsAPI);
    yield put({
      type: LOAD_POSTS_SUCCESS,
      data: result.data
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_POSTS_FAILURE,
      data: err.response.data,
    });
  }
}

function addPostAPI(data) {
  console.log(data)
  return axios.post('http://localhost:3065/api/post/add', data);
}

function* addPost(action) {
  try {
    const result = yield call(addPostAPI, action.data);
    yield put({
      type: ADD_POST_SUCCESS,
      data: result.data
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_POST_FAILURE,
      data: err.response.data,
    });
  }
}

function* watchLoadPosts() {
  yield throttle(5000, LOAD_POSTS_REQUEST, loadPosts);
}
function* watchLoadPost() {
  yield throttle(5000, LOAD_POST_REQUEST, loadPost);
}

function* watchAddPost() {
  yield throttle(5000, ADD_POST_REQUEST, addPost);
}

export default function* postSaga() {
  yield all([
    fork(watchLoadPosts),
    fork(watchLoadPost),
    fork(watchAddPost),

  ]);
}
