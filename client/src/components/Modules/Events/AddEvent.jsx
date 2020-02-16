import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker, Icon } from 'antd';
import React, { Component } from 'react'
import AsyncSelect from '../../Inputs/AsyncSelect';
import {storage} from '../../../firebase/index';
const { Option } = Select;

class EventForm extends React.Component {
  state = { visible: false };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };
  uploadImage=(e)=>
  {
    const img=e.target.files[0];
    this.setState(({img}));
  const uploadTask=storage.ref(`images/${img.name}`).put(img);
    uploadTask.on('state_changed',(snapshot)=>{},
    (error)=>{console.log(error)},
    ()=>{
      storage.ref('images').child(img.name).getDownloadURL().then(url=>{console.log('uuu',url)
      this.setState({imgurl:url},()=>{
        console.log('123',this.state.imgurl)
      })
      
      })
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Button type="primary" onClick={this.showDrawer} style={{float: 'right'}}>
          <Icon type="plus" /> New Event
        </Button>
        <Drawer
          title="Create a new account"
          width={720}
          onClose={this.onClose}
          visible={this.state.visible}
          bodyStyle={{ paddingBottom: 80 }}
        >
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Name">
                  {getFieldDecorator('name', {
                    rules: [{ required: true, message: 'Please enter user name' }],
                  })(<Input placeholder="Please enter user name" />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Url">
                <input
                  type="file"
                  className="form-control"
                  name="image"
                  onChange={this.uploadImage}
                />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="State">
                  {getFieldDecorator('owner', {
                    rules: [{ required: true, message: 'Please select an owner' }],
                  })(
                    <AsyncSelect/>
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="City">
                  {getFieldDecorator('type', {
                    rules: [{ required: true, message: 'Please choose the type' }],
                  })(
                    <AsyncSelect/>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="College">
                  {getFieldDecorator('approver', {
                    rules: [{ required: true, message: 'Please choose the approver' }],
                  })(
                    <AsyncSelect/>
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="DateTime">
                  {getFieldDecorator('dateTime', {
                    rules: [{ required: true, message: 'Please choose the dateTime' }],
                  })(
                    <DatePicker.RangePicker
                      style={{ width: '100%' }}
                      getPopupContainer={trigger => trigger.parentNode}
                    />,
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label="Description">
                  {getFieldDecorator('description', {
                    rules: [
                      {
                        required: true,
                        message: 'please enter url description',
                      },
                    ],
                  })(<Input.TextArea rows={4} placeholder="please enter url description" />)}
                </Form.Item>
              </Col>
            </Row>
          </Form>
          <div
            style={{
              position: 'absolute',
              right: 0,
              bottom: 0,
              width: '100%',
              borderTop: '1px solid #e9e9e9',
              padding: '10px 16px',
              background: '#fff',
              textAlign: 'right',
            }}
          >
            <Button onClick={this.onClose} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button onClick={this.onClose} type="primary">
              Submit
            </Button>
          </div>
        </Drawer>
      </div>
    );
  }
}

export  const AddEvent = Form.create()(EventForm);

