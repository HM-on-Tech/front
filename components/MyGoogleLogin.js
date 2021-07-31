import { GoogleLogin } from 'react-google-login';


const MyGoogleLogin = () => {

  const responseGoogle = (response) => {
    if (response?.error) {
      dispatch({
        type: LOG_IN_USER_FAILURE,
        data: response,
      })
    }
    if (response?.accessToken) {
      dispatch({
        type: LOG_IN_USER_SUCCESS,
        data: response
      })
    }
    console.log(response);
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
