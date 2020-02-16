
import React, { Component, Fragment } from "react";
import 'antd/dist/antd.css';
import { Menu, Icon, Avatar,Badge } from 'antd';
import "./Navbar.css"
import { Redirect, withRouter } from "react-router-dom";
import {
  Link
} from "react-router-dom";
import API from '../../../middleware/api';

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
    let isLogged = localStorage.getItem('user_id')
    console.log(isLogged)
    if (isLogged) {
      this.getUserDetails(isLogged)
    }
  }
  getUserDetails=async(isLogged)=>
  {
   let response= await API.post('/users/user',{user_id:isLogged})
        let userDetails=response.data.response
        console.log(userDetails,response)
        this.setState({ isLogged: true ,userDetails},()=>{console.log("123",this.state)})
  }
  logOut=()=>
  {
    localStorage.removeItem("user_id");
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
    const {userDetails ,isLogged} = this.state
    if(isLogged)
      return(

        [<Menu.Item>
          <Badge dot>
      <Icon type="notification" />
    </Badge>
        </Menu.Item>,
        <SubMenu
          title={
            <Avatar src={userDetails.image} />
          }
        >
          <Menu.ItemGroup title={userDetails.user_name}>
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