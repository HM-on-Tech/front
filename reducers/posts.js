
import produce from '../util/produce';
import { toast } from 'react-toastify';
import { shuffleArray } from '../helper/util'

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
export const LOAD_AUTHOR_POSTS_REQUEST = 'LOAD_AUTHOR_POSTS_REQUEST';
export const LOAD_AUTHOR_POSTS_SUCCESS = 'LOAD_AUTHOR_POSTS_SUCCESS';
export const LOAD_AUTHOR_POSTS_FAILURE = 'LOAD_AUTHOR_POSTS_FAILURE';

export const ADD_POSTS_REQUEST = 'ADD_POSTS_REQUEST';
export const ADD_POSTS_SUCCESS = 'ADD_POSTS_SUCCESS';
export const ADD_POSTS_FAILURE = 'ADD_POSTS_FAILURE';
export const REMOVE_POSTS_REQUEST = 'REMOVE_POSTS_REQUEST';
export const REMOVE_POSTS_SUCCESS = 'REMOVE_POSTS_SUCCESS';
export const REMOVE_POSTS_FAILURE = 'REMOVE_POSTS_FAILURE';
export const REMOVE_POSTS_DONE = 'REMOVE_POSTS_DONE';

const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case LOAD_POSTS_REQUEST:
      draft.loadPostsDone = false;
      draft.loadPostsError = null;
      break;
    case LOAD_POSTS_SUCCESS:
      draft.loadPostsDone = true;
      draft.mainPosts = [...action.data];
      draft.mainPosts = shuffleArray(draft.mainPosts)
      break;
    case LOAD_POSTS_FAILURE:
      draft.loadPostsError = action.error;
      break;
    case LOAD_AUTHOR_POSTS_REQUEST:
      draft.loadPostsDone = false;
      draft.loadPostsError = null;
      break;
    case LOAD_AUTHOR_POSTS_SUCCESS:
      draft.loadPostsDone = true;
      draft.mainPosts = [...action.data];
      break;
    case LOAD_AUTHOR_POSTS_FAILURE:
      draft.loadPostsError = action.error;
      break;
    case ADD_POSTS_SUCCESS:
      draft.mainPosts = [action.data,  ...draft.mainPosts];
      break;

    case REMOVE_POSTS_SUCCESS:
      draft.removePostDone = true;
      draft.mainPosts = draft.mainPosts.filter((post) => {
        if ( action.data.id.includes(post.id.toString())) {
          return false
        }
        return true
      })
      toast.success("REMOVE_POSTS_SUCCESS");
      break;
   
    default:
      break;
  }
});

export default reducer;
