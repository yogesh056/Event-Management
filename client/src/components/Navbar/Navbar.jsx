
import React from 'react';
import 'antd/dist/antd.css';
import { Layout,Button,Avatar ,Menu, Dropdown,} from 'antd';
import {WrappedSignin }from "../Signin/Signin"
import './Navbar.css'
import { WrappedLogin } from '../Login/Login';
const { Header } = Layout;
const menu = (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
        Settings
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
       Logout
      </a>
    </Menu.Item>
  </Menu>
);
export default class Navbar extends React.Component {
  state = { loginVisible: false ,signinVisible:false};

  showSigninDrawer = () => {
    this.setState({
      signinVisible: true,
    });
  };
  onSigninClose = () => {
    this.setState({
      signinVisible: false,
    });
  };
  showLoginDrawer = () => {
    this.setState({
      loginVisible: true,
    });
  };

  onLoginClose = () => {
    this.setState({
      loginVisible: false,
    });
  };
  
  render()
{
  let {signinVisible,loginVisible}=this.state
  return (
    <Layout className="navbar">
    <Header className="main-header">
      <Menu
        mode="horizontal"
        style={{ lineHeight: '65px' }}
      > 
        <Menu.Item key="1">
        <Button type="primary" onClick={this.showSigninDrawer} shape="rounded" ghost>
          Signup
        </Button>
        </Menu.Item>
        <Menu.Item key="2">  
        <Button type="primary" shape="rounded" onClick={this.showLoginDrawer}>
         Login
        </Button></Menu.Item>
        <Menu.Item key="3">
        <Dropdown overlay={menu} placement="bottomLeft">
        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
    </Dropdown>
        
        </Menu.Item>
      </Menu>
    </Header>
   
    <WrappedSignin
      visible={signinVisible}
      onClose={this.onSigninClose}
    />
    <WrappedLogin
      visible={loginVisible}
      onClose={this.onLoginClose}
    />
  </Layout>
  )
}
}