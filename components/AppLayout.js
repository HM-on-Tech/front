import React, { useState } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Col, Input, Menu, Row } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import GoogleLogin from 'react-google-login'
import { LOG_IN_USER_SUCCESS } from '../reducers/user';
import { LOG_IN_USER_FAILURE } from '../reducers/user';




const AppLayout = ({ children }) => {

  const [menu, setMenu] = useState(true)
  const dispatch = useDispatch()
  const HospitalHandler = (e) => {
    setMenu(true)
  }
  const PatientHandler = (e) => {
    setMenu(false)
  }

  const { isLoggedIn, userName } = useSelector(state => state.user)

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
    <div style={{ margin: '0 10px' }}>
      <Menu mode="horizontal">
        {console.log(isLoggedIn)}
        <Menu.Item key="home"><Link href="/"><a>tab1</a></Link></Menu.Item>
        <Menu.Item key="profile"><Link href="/"><a>tab2</a></Link></Menu.Item>
        <Menu.Item key="mail">
          <Input.Search enterButton style={{ verticalAlign: 'middle' }} />
        </Menu.Item>
        <Menu.Item key="googleLogin">

          {isLoggedIn ?
            `Hello, ${userName}`
            :
            <GoogleLogin
              clientId="185607410093-fph2nms7s0bacisqfnc784ub3bea85vt.apps.googleusercontent.com"
              buttonText="Login"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={'single_host_origin'}
            />}
        </Menu.Item>
      </Menu>
      <Row>
        <Col xs={24} md={3}>
          he
        </Col>
        <Col xs={24} md={18}>
          {children}
        </Col>

        <Col xs={24} md={3}>
          hello
        </Col>
      </Row>
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
