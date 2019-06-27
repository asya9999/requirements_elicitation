import React, { Component } from 'react';
import {Meteor} from 'meteor/meteor';
import 'antd/dist/antd.css';
import { Form, Icon, Input, Button, Text } from 'antd';

class NormalLoginForm extends Component{

    handleSubmit = e => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          Meteor.loginWithPassword(values.username, values.password, (err) => {
            console.log(err);
          } );

          this.props.history.push("/");
        }
      });
    };

    handleBack = () => {
      this.props.history.push('/auth/reg');
  }
    
    /*
      handleSubmitHendler(event) {

        event.preventDefault();
        
        const values = {
            username: event.target.elements.username.value,
            password: event.target.elements.password.value,
        }

        Meteor.loginWithPassword(values.username, values.password, (err) => {
            console.log(err);
        } );

        this.props.history.push("/account");

    }
    
    render(){

      
        return(
            <div>
                Log In Form
                <form onSubmit={this.handleSubmitHendler.bind(this)}>
                    <label>username</label>
                    <input name="username" type="text"/>
                    <br />

                    <label>password</label>
                    <input name="password" type="password"/>
                    <br />

                    <input type="submit" value="Log In"/>
                    <input type="button" onClick={() => {this.props.history.push('/reg')}} value="Register"/>
                </form>
            </div>
        )
    }*/
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
          <Form onSubmit={this.handleSubmit} className="login-form">

            <h1>Log In</h1>

            <Form.Item style={{ marginBottom: 5}}>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Username"
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
                {/*
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(<Checkbox>Remember me</Checkbox>)}
              <a className="login-form-forgot" href="">
                Forgot password
              </a>
            */}
              <Button type="primary" htmlType="submit" className="login-form-button">
                LOGIN
              </Button>
              <Button style={{marginLeft:5}} onClick={this.handleBack.bind(this)}>
                Register
              </Button>
            </Form.Item>
          </Form>
        );
      }
}

const LogInForm = Form.create({ name: 'normal_login' })(NormalLoginForm);
export default LogInForm;