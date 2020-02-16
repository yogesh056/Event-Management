import React, { Component } from 'react'
import CardContainer from './CardContainer/CardContainer'
import {AddEvent} from './AddEvent'

export default class Events extends Component {
    render() {
        return ([
                <AddEvent/>,
                <CardContainer />]
        )
    }
}
