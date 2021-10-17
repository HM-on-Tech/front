import axios from 'axios';
import { all, call, delay, fork, put, takeLatest, throttle } from 'redux-saga/effects';
import { LOAD_POST_REQUEST, LOAD_POST_SUCCESS, EDIT_POST_FAILURE } from '../reducers/post';

import {
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  EDIT_POST_REQUEST,
  EDIT_POST_SUCCESS,
} from '../reducers/post';
import { LOAD_POSTS_FAILURE, LOAD_POSTS_REQUEST, LOAD_POSTS_SUCCESS } from '../reducers/posts';

function loadPostAPI(blogId) {
  return axios.post('/post/',{blogId:blogId});
}

function* loadPost(action) {
  try {
    const result = yield call(loadPostAPI, action.data);
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

function editPostAPI(data) {
  return axios.post(`/post/edit/${data.id}`, data)
}

function* editPost(action) {
  try {
    const result = yield call(editPostAPI, action.data)
    yield put({
      type: EDIT_POST_SUCCESS,
      data: result.data
    })
  }
  catch (err) {
    yield put({
      type: EDIT_POST_FAILURE,
      data: err.response.data,
    })
  }
}

function addPostAPI(data) {
  return axios.post('/post/add', data);
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

function* watchLoadPost() {
  yield throttle(5000, LOAD_POST_REQUEST, loadPost);
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* watchEditPost() {
  yield throttle(5000, EDIT_POST_REQUEST, editPost);
}

export default function* postSaga() {
  yield all([
    fork(watchLoadPost),
    fork(watchAddPost),
    fork(watchEditPost),

  ]);
}