
import { Router } from 'next/router';
import produce from '../util/produce';
// =============================================================
export const initialState = {
  mainPost: {},
  loadPostDone: false,
  loadPostError: null,
  addPostDone: false,
  addPostError: null,
  removePostDone: false,
  removePostError: null,
};

// =============================================================
//  Action Define
export const LOAD_POST_REQUEST = 'LOAD_POST_REQUEST';
export const LOAD_POST_SUCCESS = 'LOAD_POST_SUCCESS';
export const LOAD_POST_FAILURE = 'LOAD_POST_FAILURE';

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_DONE = 'REMOVE_POST_DONE';

const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case LOAD_POST_REQUEST:
      draft.loadPostDone = false;
      draft.loadPostError = null;
      break;
    case LOAD_POST_SUCCESS:
      draft.loadPostDone = true;
      draft.loadPostError = null;
      draft.mainPost = action.data
    case LOAD_POST_FAILURE:
      draft.loadPostsError = action.error;
      break;
    case ADD_POST_SUCCESS:
      draft.mainPosts = [action.data,  ...draft.mainPosts];
      Router.push('/');
      break;
    case REMOVE_POST_SUCCESS:
      draft.removePostDone = true;
      let filterCandidate = action.data?.PatientIds?.map( (x)=> parseInt(x) )
      draft.mainPosts = draft.mainPosts.filter( (v) => !filterCandidate?.includes(v.id))
      break;
    case REMOVE_POST_DONE:
      draft.removePostDone = false;
      break;
    default:
      break;
  }
});

export default reducer;
