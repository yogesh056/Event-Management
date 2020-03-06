
import React, { Component, Fragment } from "react";
import 'antd/dist/antd.css';
import { Menu, Icon, Avatar,Badge } from 'antd';
import "./Navbar.css"
import { Redirect, withRouter } from "react-router-dom";
import {
  Link
} from "react-router-dom";
import API from '../../../middleware/api';
import Auth from "../../../auth/ProtectedRoute";

const { SubMenu } = Menu;
// import { WrappedLogin } from '../Login/Login'
 class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      current: 'mail',
      isLogged: false
    };
  }
  componentWillMount() {
    setTimeout(async() => {
    let userDetail=await Auth.getUserDetails()
    console.log("User Navbar",userDetail)
    if (userDetail) {
      this.setState({ isLogged: true ,userDetail},()=>{console.log("123",this.state)})
    }
  },1000)
  }
  logOut=()=>
  {
    localStorage.removeItem("user_id");
    Auth.signout()
    this.props.history.push('/login')

  }
  handleClick = e => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    }, () => {
      console.log(this.state)
    });
  };
  conditionalRender() {
    const {userDetail,isLogged} = this.state
    if(isLogged)
      return(

        [<Menu.Item>
          <Badge dot>
      <Icon type="notification" />
    </Badge>
        </Menu.Item>,
        <Menu.Item>
        <Badge dot>
        <Icon type="message" />
  </Badge>
      </Menu.Item>,
        <SubMenu
          title={
            <Avatar src={userDetail.image} />
          }
        >
          <Menu.ItemGroup title={userDetail.user_name}>
            <Menu.Item key="settings">Settings</Menu.Item>
            {/* <Menu.Item key="setting:2">Option 2</Menu.Item> */}
          </Menu.ItemGroup>
          {/* <Menu.ItemGroup title="Item 2"> */}
          <Menu.Item key="logout" onClick={this.logOut}>Logout</Menu.Item>
          {/* <Menu.Item key="setting:4">Option 4</Menu.Item> */}
          {/* </Menu.ItemGroup> */}
        </SubMenu>]
      )
  }
  // selectedKeys={[this.state.current]} 
  render() {
   
    return (
      <Menu onClick={this.handleClick} mode="horizontal">

        {this.conditionalRender()}

      </Menu>
    )
  }
}
export default withRouter(Navbar);