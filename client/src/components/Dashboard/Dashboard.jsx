import React, { Component } from 'react'
import Navbar from "../Navbar/Navbar"
import Tab from '../Tabs/Tabs'


export default class Dashboard extends Component {
    render() {
        return (
            <React.Fragment>
           <Navbar/>
           <Tab></Tab>
           </React.Fragment>
        )
    }
}
