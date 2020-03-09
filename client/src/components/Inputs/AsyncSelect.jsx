import React, { Component } from 'react'
import { Select, Spin } from 'antd';
import API from "../../middleware/api"

const { Option } = Select;

export default class AsyncSelect extends Component {
  constructor(props) {
    super(props);
    this.lastFetchId = 0;
    this.state = {
      data: [],
      value: [],
      fetching: false,
    };
  }

  componentDidUpdate(prevProps) {
    if (JSON.stringify(this.props) !== JSON.stringify(prevProps)) {
      this.getValues()
        return true;
    } else return false;
}
getValues = async()=> {
   const {api,custom}=this.props
    this.lastFetchId += 1;
    // const fetchId = this.lastFetchId;
    this.setState({ data: [], fetching: true });
    let valueRes = await API.get(`/${api}`)
    console.log('fetching details',valueRes,this.props)
    const data=valueRes.data.response.map(value => ({
          text:custom?(value[`${this.props.customValue}`]):`${value.name}`,
          value:`${value.id}`
        }));
    this.setState({ data, fetching: false });
  };

  handleChange = value => {
    this.setState({
      value,
      data: [],
      fetching: false,
    });
  };

  render() {
    const { fetching, data, value } = this.state;
    const { placeholder } = this.props;

    return (
      <Select
        labelInValue
        value={value}
        placeholder={placeholder}
        notFoundContent={fetching ? <Spin size="small" /> : null}
        filterOption={false}
        onSearch={this.getValues}
        onChange={this.handleChange}
        style={{ width: '100%' }}
      >
        {data.map(d => (
          <Option key={d.value}>{d.text}</Option>
        ))}
      </Select>
    );
  }
}

