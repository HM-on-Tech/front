import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { LOG_IN_USER_FAILURE, LOG_IN_USER_REQUEST } from '../reducers/user';


const MyGoogleLogin = () => {
  const dispatch = useDispatch()

  const responseGoogle = (response) => {
    console.log(reponse?.errors)
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
