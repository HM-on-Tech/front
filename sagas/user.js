import axios from 'axios';
import { all, call, delay, fork, put, takeLatest, throttle } from 'redux-saga/effects';
import { LOG_IN_USER_REQUEST, LOG_IN_USER_SUCCESS } from '../reducers/user';
import { toast } from 'react-toastify';

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
// function* watchLoadLogout() {
//   yield throttle(5000, LOG_OUT_USER_REQUEST, loadLogin);
// }


export default function* userSaga() {
  yield all([
    fork(watchLoadLogin),
    // fork(watchLoadLogout),
  ]);
}
