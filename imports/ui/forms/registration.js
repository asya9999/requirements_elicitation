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
    handleSubmitHendler(event) {

        var chosen_values = [];
        event.target.elements.sth[0].checked ? chosen_values.push(event.target.elements.sth[0].value) : null;
        event.target.elements.sth[1].checked ? chosen_values.push(event.target.elements.sth[1].value) : null;
        event.target.elements.sth[2].checked ? chosen_values.push(event.target.elements.sth[2].value) : null;

        event.preventDefault();
        const values = {
            username: event.target.elements.username.value,
            email: event.target.elements.email.value,
            password: event.target.elements.password.value,
            userType: chosen_values,
            name: event.target.elements.name.value,
            surname: event.target.elements.surname.value
        }

        console.log(chosen_values);

        const account = {
            email: event.target.elements.email.value,
            password: event.target.elements.password.value,
        };
        
        Meteor.call('addUser', values);

    }
    render(){
        const { getFieldDecorator } = this.props.form;
        return(
            <Form style={{marginTop: -70, marginBottom: -30}} onSubmit={this.handleSubmit} className="login-form">

            <h1>Registration</h1>

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

            <Form.Item style={{ marginBottom: 5}}>
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
                })(<Input 
                    prefix={<Icon type="email" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Email"
                />)}
            </Form.Item>

            <Form.Item style={{ marginBottom: 5}}>
                {getFieldDecorator('username', {
                    rules: [{ required: true, message: 'Please input your username!' }],
                })(
                    <Input
                    prefix={<Icon type="name" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Name"
                    />,
                )}
            </Form.Item>

            <Form.Item style={{ marginBottom: 5}}>
                {getFieldDecorator('username', {
                    rules: [{ required: true, message: 'Please input your username!' }],
                })(
                    <Input
                    prefix={<Icon type="surname" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Surname"
                    />,
                )}
            </Form.Item>

            <Form.Item style={{ marginBottom: 5}}>
              {getFieldDecorator('select-multiple', {
                rules: [
                  { required: true, message: 'Please select your favourite colors!', type: 'array' },
                ],
              })(
                <Select mode="multiple" placeholder="Select Type">
                  <Option value="dev">Developer</Option>
                  <Option value="cust">Customer</Option>
                  <Option value="sth">Stakeholder/enduser</Option>
                </Select>,
              )}
            </Form.Item>


            <Form.Item style={{ marginBottom: 5}}>
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


            <Form.Item style={{ marginBottom: 5}}>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="repeat_password"
                  placeholder="Repeat password"
                />,
              )}
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                REGISTER
              </Button>
              <Button style={{marginLeft:5}}>
                Log in
              </Button>
            </Form.Item>
          </Form>
        )
    }
}


const RegistrationForm = Form.create({ name: 'register'})(RegForm);
export default RegistrationForm;

/*
            <div>
                Registration Form
                <form onSubmit={this.handleSubmitHendler.bind(this)}>

                    <label>username</label>
                    <input name="username" type="text"/>
                    <br />

                    <label>email</label>
                    <input name="email" type="text"/>
                    <br />

                    <label>name</label>
                    <input name="name" type="text"/>
                    <br />

                    <label>surname</label>
                    <input name="surname" type="text"/>
                    <br />

                    <label>password</label>
                    <input name="password" type="password"/>
                    <br />

                    {
                        //users can be of diferent types
                        //develpers - who elicit information
                        //customer
                        //stakejolders - answer quiestion
                    }
                    <label>Who you want to be?</label>
                    <br />
                    <input type="checkbox" name="sth" value="sth" />Stakeholder/end user
                    <br />
                    <input type="checkbox" name="sth" value="cust" />Customer
                    <br />
                    <input type="checkbox" name="sth" value="dev" />Developer
                    <br />

                    <input type="submit" value="Submit"/>
                </form>


                <input type="button" onClick={() => {this.props.history.push('/')}} value="Log In"/>
            </div>
                */