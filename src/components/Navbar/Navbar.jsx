
import React from 'react';
import 'antd/dist/antd.css';
import { Layout, Menu,Button,Icon } from 'antd';

import './Navbar.css'
const { Header } = Layout;
export default class Navbar extends React.Component {
  state = { visible: false };
  render()
{
  return (
    <Layout className="navbar">
    <Header className="main-header">
      <Menu
        mode="horizontal"
        style={{ lineHeight: '65px' }}
      >
        <Menu.Item key="1">nav 1</Menu.Item>
        <Menu.Item key="2">nav 2</Menu.Item>
       
        <Menu.Item key="3">
        <Button type="primary" onClick={this.showDrawer} visible>
          <Icon type="plus" /> Login
        </Button>
        </Menu.Item>
        <Menu.Item key="4">  
        <Button type="primary" onClick={this.showDrawer}>
          <Icon type="plus" /> Login
        </Button></Menu.Item>
      </Menu>
    </Header>
  </Layout>
  )
}
}