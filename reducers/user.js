
import { ToastContainer, toast } from 'react-toastify';
import { authenticate } from '../helper/auth';
import produce from '../util/produce';

// =============================================================
export const initialState = {
    userId: null,
    accessToken: null,
    userName: null,
    email: null,
    imageUrl: null,
    isLoggedIn: false,
    isAdmin: false,
};

// =============================================================
//  Action Define
export const LOG_IN_USER_REQUEST = 'LOG_IN_USER_REQUEST';
export const LOG_IN_USER_SUCCESS = 'LOG_IN_USER_SUCCESS';
export const LOG_IN_USER_FAILURE = 'LOG_IN_USER_FAILURE';

const reducer = (state = initialState, action) => produce(state, (draft) => {
    switch (action.type) {
        case LOG_IN_USER_SUCCESS:
            console.log('hello', action.data)
            draft.userId = action.data.user.id
            draft.userName = action.data.user.name
            draft.isAdmin = action.data.user.isAdmin
            draft.accessToken = action.data.accessToken
            toast.success("You are Logged In");
            authenticate(action.data);
            // requestToken
            draft.isLoggedIn = true
            break;
        case LOG_IN_USER_FAILURE:
            draft.isLoggedIn = false
            toast.error("로그인 실패!!!!");
            break;
        default:
            break;
    }
});

export default reducer;
