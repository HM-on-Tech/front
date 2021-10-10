
import { toast } from 'react-toastify';
import produce from '../util/produce';
import Router from 'next/router';


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

export const EDIT_POST_REQUEST = 'EDIT_POST_REQUEST'
export const EDIT_POST_SUCCESS = 'EDIT_POST_SUCCESS'
export const EDIT_POST_FAILURE = 'EDIT_POST_FAILURE'

const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case LOAD_POST_REQUEST:
      draft.loadPostDone = false;
      draft.loadPostError = null;
      break;
    case LOAD_POST_SUCCESS:
      draft.loadPostDone = false;
      draft.loadPostError = null;
      draft.mainPost = action.data
      break;
    case LOAD_POST_FAILURE:
      draft.loadPostsError = action.error;
      break;
    case ADD_POST_SUCCESS:
      Router.push('/admin/list')
      toast.success('Post Added')
      break;
    case ADD_POST_FAILURE:
      toast.error('add Post failed')
      break;
    case REMOVE_POST_SUCCESS:
      draft.removePostDone = true;
      let filterCandidate = action.data?.PatientIds?.map( (x)=> parseInt(x) )
      draft.mainPosts = draft.mainPosts.filter( (v) => !filterCandidate?.includes(v.id))
      break;
    case EDIT_POST_FAILURE:
      toast.error('failed to edit post')
      break;
    case EDIT_POST_SUCCESS:
      Router.push('/admin/list')
      toast.success('edit success')
      break;
    default:
      break;
  }
});

export default reducer;
