
import React from 'react';
import 'antd/dist/antd.css';
import {storage} from '../../../firebase/index';

import {
  Drawer,
  Form,
  Input,
  Select,
  Row,
  Col,
  DatePicker ,
  message,
  Button,
  Layout
} from 'antd';
import moment from 'moment';
import { withRouter } from 'react-router'

import API from '../../../middleware/api';
const { Option } = Select;
class Signin extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {
      confirmDirty: false,
      autoCompleteResult: [],
    };
  }
  uploadImage=(e)=>
  {
    console.log("heoll image",e)
    const img=e.target.files[0];
    console.log("heoll image",img)
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
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(async(err, values) => {
      if (!err) {
        values.college=1
        values.city=2
        values.state=3
        values.image=this.state.imgurl
        console.log(values)
        let response
        try{
          response= await API.post('/users/verify',{email:values.email})
          console.log(response)
          response.data.code===200?message.success(response.data.msg,4): message.error(response.data.msg,4); 
          this.props.next(values)
        }
        catch(e)
        {
         console.log(e)
        }
      
      }
     
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };


  render() {
    const { current } = this.state;

    const { getFieldDecorator } = this.props.form;

    return (
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
          {/* <Form.Item label="Upload" >
          {getFieldDecorator('upload', {
            valuePropName: 'fileList',
            getValueFromEvent:this.uploadImage,
          })( */}
            <input
                  type="file"
                  className="form-control"
                  name="image"
                  
                 
                  onChange={this.uploadImage}
                />
{/* 
          )}
        </Form.Item> */}
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
            Next
          </Button>
          
        </Form>    
        
    );
  }
}
export const WrappedSignin = Form.create({ name: 'register' })(withRouter(Signin));
