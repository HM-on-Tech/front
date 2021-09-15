import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';

import posts from './posts';
import post from './post';
import user from './user';
import publication from './publication'

const rootReducer = combineReducers({
  index: (state = {}, action) => {
    switch (action.type) {
      case HYDRATE:
        return { ...state, ...action.payload };
      default:
        return state;
    }
  },
  posts,
  post,
  user,
  publication,
});

export default rootReducer;
