import React, { Component } from 'react'
import Navbar from "../Navbar/Navbar"
import Feed from "../Sidebar/Sidebar"
import Sidebar from '../Sidebar/Sidebar'

export default class Dashboard extends Component {
    render() {
        return (
            <React.Fragment>
           <Navbar/>
           <Sidebar/>
           </React.Fragment>
        )
    }
}
