
import { toast } from 'react-toastify';
import produce from '../util/produce';
import { removeLocalStorage } from '../helper/auth'
// =============================================================
export const initialState = {
    accessToken: null,
    userName: null,
    userId: null,
    email: null,
    isLoggedIn: false,
    role: 2,
};

// =============================================================
//  Action Define
export const LOG_IN_USER_REQUEST = 'LOG_IN_USER_REQUEST';
export const LOG_IN_USER_SUCCESS = 'LOG_IN_USER_SUCCESS';
export const LOG_IN_USER_FAILURE = 'LOG_IN_USER_FAILURE';

export const LOAD_ME_REQUEST = 'LOAD_ME_REQUEST';
export const LOAD_ME_SUCCESS = 'LOAD_ME_SUCCESS';
export const LOAD_ME_FAILURE = 'LOAD_ME_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';


const reducer = (state = initialState, action) => produce(state, (draft) => {
    switch (action.type) {
        case LOG_IN_USER_SUCCESS:
            draft.userId = action.data.user.id
            draft.email = action.data.user.email
            draft.userName = action.data.user.name
            draft.role = action.data.user.role
            draft.accessToken = action.data.requestToken
            draft.isLoggedIn = true;
            localStorage.setItem('HM_ON_TECH_ACCESS_TOKEN', action.data.requestToken);

            toast.success("You are Logged In");
            // authenticate(action.data);
            // requestToken
            draft.isLoggedIn = true
            break;
        case LOG_IN_USER_FAILURE:
            draft.isLoggedIn = false
            toast.error("로그인 실패!!!!");
            break;
        case LOAD_ME_REQUEST:
            break;
        case LOAD_ME_SUCCESS:
            draft.userId = action.data.id
            draft.userName = action.data.name
            draft.email = action.data.email
            draft.role = action.data.role
            draft.isLoggedIn = true;
            break;
        case LOAD_ME_FAILURE:
            break;
        case LOG_OUT_REQUEST:
            draft.userId = null;
            draft.userName = null;
            draft.email = null;
            draft.role = null;
            draft.isLoggedIn = false;
            draft.accessToken = '';
            removeLocalStorage('HM_ON_TECH_ACCESS_TOKEN')
            break;
        default:
            break;
    }
});

export default reducer;
