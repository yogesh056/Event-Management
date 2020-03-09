import React, { Component } from 'react'
import Navbar from "./Navbar/Navbar"
import SideBar from "./SideBar/SideBar"
import { Layout, Breadcrumb, Affix,BackTop } from 'antd';
import { Route, Switch } from 'react-router-dom';
import Events from "../Events/Events"
import Article from "../Article/Article"
import Forum from "../Forum/Forum"
import Banner from "../Dashboard/Banner"
const { Header, Footer, Sider, Content, Spin } = Layout;

export default class Dashboard extends Component {
    render() {
        return (
            [
                <Layout>
                    <Header>
                    <Affix offsetTop={0}>
                    <Navbar />
                    </Affix>
                        
                    </Header>
                    <Layout>
                        <Sider style={{
                            background: "#ffffff",
                            // overflow: 'auto',
                            // height: '100vh',
                            position: 'fixed',
                            // left: 0,
                            width: 300
                        }}>
                            <SideBar />
                        </Sider>
                        <Layout style={{ padding: '0 24px 24px', background: "#ffffff",margin:"0 auto" }}>
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
                              <Route exact path="/" component={Banner} />
                                <Route path="/events" component={Events} />
                              
                                <Route path="/your-events" component={Events} />
                                <Route path="/forum" component={Forum} />
                                <Route path="/your-article" component={Article} />
                                <Route path="/article" component={Article} />
                                <BackTop>
                                    <div className="ant-back-top-inner">UP</div>
                                </BackTop>
                            </Content>
                        </Layout>
                       
                    </Layout>
                   
                </Layout>,
                // <Spin spinning={false}></Spin>
            ]
        )
    }
}
