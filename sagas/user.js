import axios from 'axios';
import { all, call, delay, fork, put, takeLatest, throttle } from 'redux-saga/effects';
import { LOAD_ME_REQUEST, LOAD_ME_SUCCESS, LOG_IN_USER_REQUEST, LOG_IN_USER_SUCCESS } from '../reducers/user';
import { toast } from 'react-toastify';

function loadMeAPI() {
  return axios.post('http://localhost:3065/api/auth/me');
}
function* loadMe(action) {
  try {
    console.log('loadLoadMe called');
    const result = yield call(loadMeAPI);
    console.log('load me result', result.data)
    console.log('????????????????????????/')
    yield put({
      type: LOAD_ME_SUCCESS,
      data: result.data
    });
    console.log('????????????????????????/222222')
  } catch (err) {
    toast.error('Server issue - login failed');
  }
}

function loadLoginAPI(data) {
  return axios.post('http://localhost:3065/api/auth',data);
}

function* loadLogin(action) {
  try {
    console.log('loadLogin called');
    const result = yield call(loadLoginAPI,action.data);
    if (result.data.statusCode === 0) {
      return toast.error(result.data.message);
    }
    yield put({
      type: LOG_IN_USER_SUCCESS,
      data: result.data
    });
  } catch (err) {
    toast.error('Server issue - login failed');
  }
}

function* watchLoadLogin() {
  yield throttle(5000, LOG_IN_USER_REQUEST, loadLogin);
}
function* watchLoadMe() {
  yield throttle(5000, LOAD_ME_REQUEST, loadMe);
}
// function* watchLoadLogout() {
//   yield throttle(5000, LOG_OUT_USER_REQUEST, loadLogin);
// }


export default function* userSaga() {
  yield all([
    fork(watchLoadLogin),
    fork(watchLoadMe),
    // fork(watchLoadLogout),
  ]);
}
