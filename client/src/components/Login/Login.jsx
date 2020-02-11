import { Form,Drawer, Icon, Input, Button, Checkbox ,message} from 'antd';
import React from 'react';
import {login} from "../../middleware/users"
import Password from 'antd/lib/input/Password';

class Login extends React.Component {
  handleSubmit =  (e) => {
    e.preventDefault();
    this.props.form.validateFields(async(err, values) => {
      if (!err) {
        console.log(values.email,values)
        let payload={
          email:values.email,
          password:values.password
        }
        let response=await login({...payload})
        localStorage.setItem("user_id",response.data.user_id)
        message.success(response.data.msg, 5);

      }
    });
  };

  render() {
    const { visible } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <Drawer
        title="Login"
        width={720}
        onClose={this.props.onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
      >
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Please input your email!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Email"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
        </Form.Item>
      </Form>
      </Drawer>
    );
  }
}

export const WrappedLogin = Form.create({ name: 'normal_login' })(Login);