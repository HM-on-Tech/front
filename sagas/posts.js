import axios from 'axios';
import { all, call, delay, fork, put, takeLatest, throttle } from 'redux-saga/effects';
import {
  LOAD_POSTS_FAILURE,
  LOAD_POSTS_REQUEST,
  LOAD_POSTS_SUCCESS,
  REMOVE_POSTS_REQUEST,
  REMOVE_POSTS_SUCCESS,
  REMOVE_POSTS_FAILURE,
  LOAD_AUTHOR_POSTS_REQUEST,
  LOAD_AUTHOR_POSTS_SUCCESS,
  LOAD_AUTHOR_POSTS_FAILURE,
  LOAD_POSTS_BY_PUBLICATION_SUCCESS,
  LOAD_POSTS_BY_PUBLICATION_REQUEST,
  LOAD_POSTS_BY_PUBLICATION_SCROLL_SUCCESS,
  LOAD_POSTS_BY_PUBLICATION_SCROLL_FAILURE,
  LOAD_POSTS_BY_PUBLICATION_FAILURE,
  LOAD_POSTS_BY_PUBLICATION_SCROLL_REQUEST,
  LOAD_POSTS_SCROLL_REQUEST,
  LOAD_POSTS_SCROLL_SUCCESS,
  LOAD_POSTS_SCROLL_FAILURE,
} from '../reducers/posts';

function loadPubScrollPostsAPI(data) {
  return axios.post(`/posts/publication/scroll`, data);
}

function* loadPubScrollPosts(action) {
  try {
    const result = yield call(loadPubScrollPostsAPI,action.data);
    yield put({
      type: LOAD_POSTS_BY_PUBLICATION_SCROLL_SUCCESS,
      data: result.data
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_POSTS_BY_PUBLICATION_SCROLL_FAILURE,
      data: err.response.data,
    });
  }
}

function loadPubPostsAPI(data) {
  return axios.post(`/posts/publication`, data);
}

function* loadPubPosts(action) {
  try {
    const result = yield call(loadPubPostsAPI,action.data);
    yield put({
      type: LOAD_POSTS_BY_PUBLICATION_SUCCESS,
      data: result.data
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_POSTS_BY_PUBLICATION_FAILURE,
      data: err.response.data,
    });
  }
}

function loadAuthorPostsAPI(data) {
  return axios.post(`/posts/list/${data}`,{
    withCredentials: true,
  });
}

function* loadAuthorPosts(action) {
  try {
    const result = yield call(loadAuthorPostsAPI,action.data);
    yield put({
      type: LOAD_AUTHOR_POSTS_SUCCESS,
      data: result.data
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_AUTHOR_POSTS_FAILURE,
      data: err.response.data,
    });
  }
}
function loadPostsScrollAPI(data) {
  return axios.post('/posts/scroll',data ,{
    withCredentials: true,
  });
}

function* loadScrollPosts(action) {
  try {
    const result = yield call(loadPostsScrollAPI,action.data);

    yield put({
      type: LOAD_POSTS_SCROLL_SUCCESS,
      data: result.data
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_POSTS_SCROLL_FAILURE,
      data: err.response.data,
    });
  }
}

function loadPostsAPI(data) {
  return axios.post('/posts/list',data ,{
    withCredentials: true,
  });
}

function* loadPosts(action) {
  try {
    const result = yield call(loadPostsAPI,action.data);
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
  return axios.post('/posts/remove',data );
}

function* removePosts(action) {
  try {
    const result = yield call(removePostsAPI, action.data);
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
function* watchLoadScrollPosts() {
  yield takeLatest(LOAD_POSTS_SCROLL_REQUEST, loadScrollPosts);
}
function* watchRemovePosts() {
  yield throttle(5000, REMOVE_POSTS_REQUEST, removePosts);
}
function* watchLoadAuthorPosts() {
  yield throttle(5000, LOAD_AUTHOR_POSTS_REQUEST, loadAuthorPosts);
}
function* watchLoadPostByPublicationPosts() {
  yield takeLatest(LOAD_POSTS_BY_PUBLICATION_REQUEST, loadPubPosts);
}
function* watchLoadPostByPublicationScrollPosts() {
  yield takeLatest(LOAD_POSTS_BY_PUBLICATION_SCROLL_REQUEST, loadPubScrollPosts);
}

export default function* postSaga() {
  yield all([
    fork(watchLoadPosts),
    fork(watchLoadScrollPosts),
    fork(watchRemovePosts),
    fork(watchLoadAuthorPosts),
    fork(watchLoadPostByPublicationPosts),
    fork(watchLoadPostByPublicationScrollPosts),

  ]);
}
