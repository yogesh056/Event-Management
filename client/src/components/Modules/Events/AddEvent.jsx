import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker, Icon, message } from 'antd';
import React, { Component } from 'react'
import AsyncSelect from '../../Inputs/AsyncSelect';
import { storage } from '../../../firebase/index';
import API from "../../../middleware/api"
import moment from 'moment';

const { Option } = Select;

class EventForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false,
      loading: false,
    };
  }

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
  uploadImage = (e) => {
    const img = e.target.files[0];
    this.setState(({ img, loading: true }));
    const uploadTask = storage.ref(`images/${img.name}`).put(img);
    uploadTask.on('state_changed', (snapshot) => { },
      (error) => { console.log(error) },
      () => {
        storage.ref('images').child(img.name).getDownloadURL().then(url => {
          console.log('uuu', url)
          this.setState({ imgurl: url, loading: false }, () => {
            console.log('123', this.state.imgurl)
          })

        })
      })
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        values.college = 1
        values.city = 2
        values.state = 3
        values.UserId=localStorage.getItem('user_id')
        values.images = this.state.imgurl
        console.log(values)
        let response
        try {
          response = await API.post('/events/addEvent', { name: values.name, description: values.description, image: values.image, state: values.state, city: values.city, college: values.college, start_date: values.start_date })
          console.log(response)
          message.success(response.data.msg, 4);
          this.onClose()

        }
        catch (e) {
          message.error(e.msg, 4);
        }

      }

    });
    // handleConfirmBlur = e => {
    //   const { value } = e.target;
    //   this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    // };
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { loading } = this.state
    return (
      <div>
        <Button type="primary" onClick={this.showDrawer} style={{ float: 'right' }}>
          <Icon type="plus" /> New Event
        </Button>
        <Drawer
          title="Create a new Event"
          width={720}
          onClose={this.onClose}
          visible={this.state.visible}
          bodyStyle={{ paddingBottom: 80 }}
        >
          <Form layout="vertical" onSubmit={this.handleSubmit}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Name">
                  {getFieldDecorator('name', {
                    rules: [{ required: true, message: 'Please enter user name' }],
                  })(<Input placeholder="Please enter user name" />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Upload Image">
                  {!loading ? <input
                    type="file"
                    className="form-control"
                    name="image"
                    onChange={this.uploadImage}
                  /> : <Icon type="loading" style={{ fontSize: 24 }} spin />}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="State">
                  {getFieldDecorator('state', {
                    rules: [{ message: 'Please select an owner' }],
                  })(
                    <AsyncSelect />
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="City">
                  {getFieldDecorator('city', {
                    rules: [{ message: 'Please choose the type' }],
                  })(
                    <AsyncSelect />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="College">
                  {getFieldDecorator('college', {
                    rules: [{ message: 'Please choose the approver' }],
                  })(
                    <AsyncSelect />
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Date of Birth">
                  {getFieldDecorator('start_date', {
                    rules: [{ required: true, message: 'Please Select DOB' }],
                  })(
                    <DatePicker defaultValue={moment('2015-01-01', 'YYYY-MM-DD')} format='YYYY-MM-DD' />
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
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
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

          </div>
        </Drawer>
      </div>
    );
  }
}

export const AddEvent = Form.create()(EventForm);

