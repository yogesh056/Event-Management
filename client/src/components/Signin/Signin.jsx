
import React from 'react';
import 'antd/dist/antd.css';
import {
  Drawer,
  Form,
  Input,
  Select,
  Row,
  Col,
  DatePicker ,
  Button,
} from 'antd';
import moment from 'moment';

import {signin} from "../../middleware/users"
const { Option } = Select;
class Signin extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };


  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        values.country="India"
        values.city="India"
        values.state="India"
        let response=signin(values)
        console.log(response)
      }
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };


  render() {
    const { visible } = this.props;
    const { getFieldDecorator } = this.props.form;

    return (
      <Drawer
        title="Create a new account"
        width={720}
        onClose={this.props.onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <Form onSubmit={this.handleSubmit}>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="First Name">
                {getFieldDecorator('first_name', {
                  rules: [{ required: true, message: 'Please enter First Name' }],
                })(<Input placeholder="Please enter First Name" />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Last Name">
                {getFieldDecorator('last_name', {
                  rules: [{ required: true, message: 'Please enter Last Name' }],
                })(
                  <Input placeholder="Please enter Last Name" />,
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
            <Form.Item label="User Name">
            {getFieldDecorator('user_name', {
              rules: [
                {
                  required: true,
                  message: 'Please input your User Name!',
                },
              ],
            })(<Input />)}
          </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
            <Form.Item label="E-mail">
            {getFieldDecorator('email', {
              rules: [
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ],
            })(<Input />)}
          </Form.Item>
          </Col>
          <Col span={12}>
         
          <Form.Item label="Secret Key" extra="We must make sure that your are a valid user.">
          <Row gutter={8}>
            <Col span={12}>
              {getFieldDecorator('secretKey', {
                rules: [{ required: true, message: 'Please input the secret key you got!' }],
              })(<Input />)}
            </Col>
            <Col span={12}>
              <Button>Verify Mail</Button>
            </Col>
          </Row>
        </Form.Item>
          </Col>
          </Row>
          <Form.Item label="Password" hasFeedback>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: 'Please input your password!',
                },
                {
                  validator: this.validateToNextPassword,
                },
              ],
            })(<Input.Password />)}
          </Form.Item>
          <Row gutter={16}>
            <Col span={12}>
          <Form.Item label="Gender"
          >
            {getFieldDecorator('gender', {
              rules: [{ required: true, message: 'Please input your gender!' }],
            })(<Select defaultValue="male" style={{ width: 120 }} >
      <Option value="male">Maler</Option>
      <Option value="female">Female</Option>
    </Select>)}
          </Form.Item>
          </Col>
          <Col span={12}>
          <Form.Item label="Date of Birth">
          {getFieldDecorator('dob', {
            rules: [{ required: true, message: 'Please Select DOB' }],
          })(
            <DatePicker defaultValue={moment('2015-01-01', 'YYYY-MM-DD')} format='YYYY-MM-DD'/>
          )}
        </Form.Item>
          </Col>
          </Row>
          <Form.Item label="Phone Number">
            {getFieldDecorator('phone', {
              rules: [{ required: true, message: 'Please input your phone number!' }],
            })(<Input style={{ width: '100%' }} />)}
          </Form.Item>
          
          {/* <Form.Item label="Captcha" extra="We must make sure that your are a human.">
          <Row gutter={8}>
            <Col span={12}>
              {getFieldDecorator('captcha', {
                rules: [{ required: true, message: 'Please input the captcha you got!' }],
              })(<Input />)}
            </Col>
            <Col span={12}>
              <Button>Get captcha</Button>
            </Col>
          </Row>
        </Form.Item> */}
          <Button type="primary" htmlType="submit">
            Register
          </Button>
          
        </Form>
      </Drawer>
    );
  }
}
export const WrappedSignin = Form.create({ name: 'register' })(Signin);
