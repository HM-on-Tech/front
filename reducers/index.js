import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';

import posts from './posts';
import post from './post';
import user from './user';

const rootReducer = combineReducers({
  index: (state = {}, action) => {
    switch (action.type) {
      case HYDRATE:
        console.log('HYDRATE', action);
        return { ...state, ...action.payload };
      default:
        return state;
    }
  },
  posts,
  post,
  user,
});

export default rootReducer;
