
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

      console.log('reducer.post: ', action.data)
      break;
    default:
      break;
  }
});

export default reducer;
