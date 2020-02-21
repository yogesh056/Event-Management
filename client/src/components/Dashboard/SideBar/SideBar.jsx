import { Menu, Icon } from 'antd';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
const { SubMenu } = Menu;

export default class SideBar extends React.Component {
  handleClick = e => {
    console.log('click ', e);
  };

  render() {
    return (
      
      <Menu
        inlineCollapsed={true}
        onClick={this.handleClick}
        style={{ height: '100%', borderRight: 0 }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1','sub2','sub3']}
        mode="inline"
      >
       <Menu.Item key="1"><Link to="/">Home</Link></Menu.Item>
        <SubMenu
          key="sub1"
          title={
            <span>
             <Icon type="flag" />
              <span>Events</span>
            </span>
          }
        >
            <Menu.Item key="2"><Link to="/events">All Events</Link></Menu.Item>
            <Menu.Item key="3"><Link to="/your-events">Your Events</Link></Menu.Item>
            {/* <Menu.Item key="3">Option 3</Menu.Item>
            <Menu.Item key="4">Option 4</Menu.Item> */}
        </SubMenu>
        <SubMenu
          key="sub2"
          title={
            <span>
             <Icon type="team" />
              <span>Forum</span>
            </span>
          }
        >
          <Menu.Item key="4"><Link to="/forum">All Questions</Link></Menu.Item>
          <Menu.Item key="5"><Link to="/your-questions">Your Questions</Link></Menu.Item>
          {/* <SubMenu key="sub3" title="Submenu">
            <Menu.Item key="7">Option 7</Menu.Item>
            <Menu.Item key="8">Option 8</Menu.Item>
          </SubMenu> */}
        </SubMenu>
        <SubMenu
          key="sub3"
          title={
            <span>
            <Icon type="google" />
              <span>Google Events</span>
            </span>
          }
        >
          <Menu.Item key="6">Today Events</Menu.Item>
        </SubMenu>
      </Menu>
    );
  }
}