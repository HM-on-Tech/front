
import produce from '../util/produce';
// =============================================================
export const initialState = {
  mainPosts: [
      
    ],
  loadPostsDone: false,
  loadPostsError: null,
  addPostDone: false,
  addPostError: null,
  removePostDone: false,
  removePostError: null,
};

// =============================================================
//  Action Define
export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST';
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS';
export const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE';

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_DONE = 'REMOVE_POST_DONE';


const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case LOAD_POSTS_REQUEST:
      draft.loadPostsDone = false;
      draft.loadPostsError = null;
      break;
    case LOAD_POSTS_SUCCESS:
      draft.loadPostsDone = true;
      draft.mainPosts = [...action.data];
      break;
    case LOAD_POSTS_FAILURE:
      draft.loadPostsError = action.error;
      break;
    case ADD_POST_SUCCESS:
      draft.mainPosts = [action.data,  ...draft.mainPosts];
      break;

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
