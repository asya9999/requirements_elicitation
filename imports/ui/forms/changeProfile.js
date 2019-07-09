import React, { Component } from 'react';
import {Meteor} from 'meteor/meteor';
import 'antd/dist/antd.css';
import {
  Form,
  Input,
  Icon,
  Button,
  Select
} from 'antd';



class RegForm extends Component{
    handleSubmit = (event) => {
      event.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            Meteor.call('editProfile', Meteor.userId(), values);
          }
        });
      };

    render(){
        const { getFieldDecorator } = this.props.form;
        return(
            <Form  onSubmit={this.handleSubmit} className="login-form">

            <Form.Item style={{ marginBottom: 5}}>
                {getFieldDecorator('email', {
                    rules: [
                    {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                    },
                    {
                        required: false,
                        message: 'Please input your E-mail!',
                    },
                    ],
                })(<Input 
                    prefix={<Icon type="email" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Email"
                />)}
            </Form.Item>

            <Form.Item style={{ marginBottom: 5}}>
                {getFieldDecorator('name', {
                    rules: [{ required: false, message: 'Please input your name!' }],
                })(
                    <Input
                    prefix={<Icon type="name" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Name"
                    />,
                )}
            </Form.Item>

            <Form.Item style={{ marginBottom: 5}}>
                {getFieldDecorator('surname', {
                    rules: [{ required: false, message: 'Please input your surname!' }],
                })(
                    <Input
                    prefix={<Icon type="surname" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Surname"
                    />,
                )}
            </Form.Item>

            <Form.Item style={{ marginBottom: 5}}>
              {getFieldDecorator('userType', {
                rules: [
                  { required: false, message: 'Please select your type!', type: 'array' },
                ],
              })(
                <Select mode="multiple" placeholder="⠀⠀Select Type">
                  <Option value="dev">Developer</Option>
                  <Option value="cust">Customer</Option>
                  <Option value="sth">Stakeholder/enduser</Option>
                </Select>,
              )}
            </Form.Item>


            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Change
              </Button>
            </Form.Item>
          </Form>
        )
    }
}


const ChangeProfile = Form.create({ name: 'register'})(RegForm);
export default ChangeProfile;