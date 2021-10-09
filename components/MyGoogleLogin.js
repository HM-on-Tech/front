import { GoogleLogin } from 'react-google-login';
import { useSelector, useDispatch } from 'react-redux';
import { LOG_IN_USER_FAILURE, LOG_IN_USER_REQUEST, LOG_IN_USER_SUCCESS } from '../reducers/user';


const MyGoogleLogin = () => {
  const dispatch = useDispatch()

  const responseGoogle = (response) => {
    if (response?.error) {
      dispatch({
        type: LOG_IN_USER_FAILURE,
        data: response,
      })
    }
    if (response?.googleId) {
      dispatch({
        type: LOG_IN_USER_REQUEST,
        data: {
          name: response.profileObj.name,
          email: response.profileObj.email,
        }
      })
    }
    (response);
  }


  return (
    <>
      {/* {isLoggedIn ?
      `Hello, ${userName}`
      : */}
      <GoogleLogin
        clientId="185607410093-fph2nms7s0bacisqfnc784ub3bea85vt.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
      {/* }   */}
    </>

  )
};

export default MyGoogleLogin;
