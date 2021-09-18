import axios from 'axios';
import { all, call, delay, fork, put, takeLatest, throttle } from 'redux-saga/effects';
import { 
  LOAD_PUBLICATION_REQUEST,
  LOAD_PUBLICATION_FAILURE,
  LOAD_PUBLICATION_SUCCESS,
  ADD_PUBLICATION_REQUEST,
  ADD_PUBLICATION_SUCCESS,
  ADD_PUBLICATION_FAILURE,
  REMOVE_PUBLICATION_REQUEST,
  REMOVE_PUBLICATION_SUCCESS,
  REMOVE_PUBLICATION_FAILURE,
} from '../reducers/publication';


function loadPublicationAPI(blogId) {
  return axios.post('http://localhost:3065/api/publication/list',{blogId:blogId});
}

function* loadPublication(action) {
  try {
    console.log('loadPublication')
    const result = yield call(loadPublicationAPI, action.data);
    yield put({
      type: LOAD_PUBLICATION_SUCCESS,
      data: result.data
    });
  } catch (err) {
    console.error(err);
    // yield put({
    //   type: LOAD_PUBLICATIONS_FAILURE,
    //   data: err.response.data,
    // });
  }
}

function addPublicationAPI(data) {
  return axios.post('http://localhost:3065/api/publication/add', data);
}

function* addPublication(action) {
  try {
    const result = yield call(addPublicationAPI, action.data);
    yield put({
      type: ADD_PUBLICATION_SUCCESS,
      data: result.data
    });
  } catch (err) {
    console.error(err);
    // yield put({
    //   type: LOAD_PUBLICATIONS_FAILURE,
    //   data: err.response.data,
    // });
  }
}

function removePublicationAPI(data) {
  return axios.post('http://localhost:3065/api/publication/remove', data);
}

function* removePublication(action) {
  try {
    const result = yield call(removePublicationAPI, action.data);
    yield put({
      type: REMOVE_PUBLICATION_SUCCESS,
      data: result.data
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: REMOVE_PUBLICATION_FAILURE,
      data: err.response.data,
    });
  }
}



function* watchLoadPublication() {
  yield throttle(5000, LOAD_PUBLICATION_REQUEST, loadPublication);
}

function* watchAddPublication() {
  yield throttle(5000, ADD_PUBLICATION_REQUEST, addPublication);
}

function* watchRemovePublication() {
  yield throttle(5000, REMOVE_PUBLICATION_REQUEST, removePublication);
}


// function* watchEditPublication() {
//   yield throttle(5000, EDIT_PUBLICATION_REQUEST, editPublication);
// }

export default function* postSaga() {
  yield all([
    fork(watchLoadPublication),
    fork(watchAddPublication),
    fork(watchRemovePublication),
    // fork(watchEditPublication),

  ]);
}