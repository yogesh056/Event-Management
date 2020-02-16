import React, { Component } from 'react'
import Navbar from "./Navbar/Navbar"
import SideBar from "./SideBar/SideBar"
import { Layout, Breadcrumb,BackTop } from 'antd';
import { Route, Switch } from 'react-router-dom';
import Events from "../Modules/Events/Events"
const { Header, Footer, Sider, Content } = Layout;

export default class Dashboard extends Component {
    render() {
        return (
            <Layout>
                <Header>
                    <Navbar/>
                </Header>
                <Layout>
                    <Sider style={{
                        background: "#ffffff",
                        // overflow: 'auto',
                        // height: '100vh',
                        // position: 'fixed',
                        // left: 0,
                        width: 300
                    }}>
                        <SideBar />
                    </Sider>
                    <Layout style={{ padding: '0 24px 24px' ,  background: "#ffffff"}}>
                        {/* <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>List</Breadcrumb.Item>
                            <Breadcrumb.Item>App</Breadcrumb.Item>
                        </Breadcrumb> */}
                        <Content
                            style={{
                                background: '#ffffff',
                                padding: 24,
                            }}
                        >
                            <Route path="/events" component={Events} />
                            <Route path="/your-events" component={Events} />
                            <BackTop>
      <div className="ant-back-top-inner">UP</div>
    </BackTop>
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        )
    }
}
