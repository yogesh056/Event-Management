import React, { Component } from 'react';
import { Mentions } from 'antd';
import API from "../../middleware/api"
const { Option } = Mentions;

export default class Mention extends Component{
  state = {
    prefix: '@',
    data:[]
  };

  onSearch = (_, prefix) => {
    this.setState({ prefix });
  };
   componentDidUpdate(prevProps) {
    if (JSON.stringify(this.props) !== JSON.stringify(prevProps)) {
      this.getValues()
        return true;
    } else return false;
}
getValues = async()=> {
   const {api,custom}=this.props
   const{data}=this.state
    this.lastFetchId += 1;
    // const fetchId = this.lastFetchId;
    this.setState({ data:[],fetching: true });
    let valueRes = await API.get(`/${api}`)
    console.log('fetching mention details',valueRes,this.props)
    valueRes.data.response.map(value => {
        data.push(custom?(value[`${this.props.customValue}`]):`${value.name}`)
        });
    this.setState({data, fetching: false });
  };

  render() {
    const { prefix,data} = this.state;

    return (
      <Mentions
        style={{ width: '100%' }}
        placeholder="input @ to mention people, # to mention tag"
        prefix={['@', '#']}
        onSearch={this.onSearch}
      >
        {(data).map(value => (
          <Option key={value} value={value}>
            {value}
          </Option>
        ))}
      </Mentions>
    );
  }
}