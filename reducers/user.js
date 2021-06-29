
import produce from '../util/produce';
// =============================================================
export const initialState = {
    googleId: null,
    accessToken: null,
    userName: null,
    email: null,
    imageUrl: null,
    isLoggedIn: false,
};

// =============================================================
//  Action Define
export const LOG_IN_USER_REQUEST = 'LOG_IN_USER_REQUEST';
export const LOG_IN_USER_SUCCESS = 'LOG_IN_USER_SUCCESS';
export const LOG_IN_USER_FAILURE = 'LOG_IN_USER_FAILURE';

const reducer = (state = initialState, action) => produce(state, (draft) => {
    switch (action.type) {
        case LOG_IN_USER_SUCCESS:
            draft.googleId = action.data.googleId
            draft.accessToken = action.data.accessToken
            draft.userName = action.data.profileObj.givenName
            draft.email = action.data.profileObj.email
            draft.imageUrl = action.data.profileObj.imageUrl
            draft.isLoggedIn = true
            console.log('success')
            break;
        case LOG_IN_USER_FAILURE:
            draft.isLoggedIn = false
            console.log('failure')
            break;
        default:
            break;
    }
});

export default reducer;
