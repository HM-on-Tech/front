import axios from 'axios';
import { all, call, delay, fork, put, takeLatest, throttle } from 'redux-saga/effects';
import { LOAD_POST_REQUEST, LOAD_POST_SUCCESS } from '../reducers/post';
import { LOG_IN_USER_REQUEST } from '../reducers/user';

function loadLoginAPI(data) {
  return axios.post('http://localhost:3065/api/auth',data);
}

function* loadLogin(action) {
  try {
    console.log('loadLogin called');
    const result = yield call(loadLoginAPI,action.data);
    console.log('-------------------------------')
    console.log(result)
    // yield put({
    //   type: LOAD_POST_SUCCESS,
    //   data: result.data
    // });
  } catch (err) {
    console.error(err);
  }
}

function* watchLoadLogin() {
  yield throttle(5000, LOG_IN_USER_REQUEST, loadLogin);
}


export default function* userSaga() {
  yield all([
    fork(watchLoadLogin),
  ]);
}
