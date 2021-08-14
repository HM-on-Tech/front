import axios from 'axios';
import { all, call, delay, fork, put, takeLatest, throttle } from 'redux-saga/effects';
import {
  LOAD_POSTS_FAILURE,
  LOAD_POSTS_REQUEST,
  LOAD_POSTS_SUCCESS,
  REMOVE_POSTS_REQUEST,
  REMOVE_POSTS_SUCCESS,
  REMOVE_POSTS_FAILURE,
} from '../reducers/posts';

function loadPostsAPI() {
  return axios.post('http://localhost:3065/api/posts/list',null ,{
    withCredentials: true,
  });
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
function removePostsAPI(data) {
  console.log(data)
  return axios.post('http://localhost:3065/api/posts/remove',data );
}

function* removePosts(action) {
  try {
    const result = yield call(removePostsAPI, action.data.selectionModel);
    yield put({
      type: REMOVE_POSTS_SUCCESS,
      data: result.data
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: REMOVE_POSTS_FAILURE,
      data: err.response.data,
    });
  }
}

function* watchLoadPosts() {
  yield throttle(5000, LOAD_POSTS_REQUEST, loadPosts);
}
function* watchRemovePosts() {
  yield throttle(5000, REMOVE_POSTS_REQUEST, removePosts);
}

export default function* postSaga() {
  yield all([
    fork(watchLoadPosts),
    fork(watchRemovePosts),

  ]);
}
