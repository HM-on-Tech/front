import React, { useState } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Col, Input, Menu, Row } from 'antd';
import PostForm from './PostForm';




const AppLayout = ({ children }) => {

  const [menu, setMenu] = useState(true)

  const HospitalHandler = (e) => {
    setMenu(true)
  }
  const PatientHandler = (e) => {
    setMenu(false)
  }
  return (
    <div style={{margin:'0 10px'}}>
      <Menu mode="horizontal">
        <Menu.Item key="home"><Link href="/"><a>tab1</a></Link></Menu.Item>
        <Menu.Item key="profile"><Link href="/"><a>tab2</a></Link></Menu.Item>
        <Menu.Item key="mail">
          <Input.Search enterButton style={{ verticalAlign: 'middle' }} />
        </Menu.Item>
      </Menu>
      <Row>
        <Col xs={24} md={3}>
          he
        </Col>
        <Col xs={24} md={18}>
          <PostForm />
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
