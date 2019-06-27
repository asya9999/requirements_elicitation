import React, { Component } from 'react';
import {Meteor} from 'meteor/meteor';
import 'antd/dist/antd.css';
import { Form, Icon, Input, Button, Select, Card} from 'antd';
const { TextArea } = Input;
const { Option } = Select;
import { Grid, Row, Col } from 'react-flexbox-grid';
import Profile from "../../api/models/profile";



class NormalLoginForm extends Component{

    handleSubmit = e => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          console.log(values);
          Meteor.call('addProject',values)
        }
      });
    };


    getDevelopers = () => {
      var profile = Profile.find({userType: ['dev']}).fetch().map(e => [e.userID, e.name]);
      profile = profile.concat(Profile.find({userType: ['dev', 'cust']}).fetch().map(e => [e.userID, e.name]));
      profile = profile.concat(Profile.find({userType: ['cust', 'dev']}).fetch().map(e => [e.userID, e.name]));

      profile = profile.concat(Profile.find({userType: ['dev', 'sth']}).fetch().map(e => [e.userID, e.name]));
      profile = profile.concat(Profile.find({userType: ['sth', 'dev']}).fetch().map(e => [e.userID, e.name]));

      profile = profile.concat(Profile.find({userType: ['dev', 'cust', 'sth']}).fetch().map(e => [e.userID, e.name]));
      profile = profile.concat(Profile.find({userType: ['dev', 'sth', 'cust']}).fetch().map(e => [e.userID, e.name]));

      profile = profile.concat(Profile.find({userType: ['sth', 'dev', 'cust']}).fetch().map(e => [e.userID, e.name]));
      profile = profile.concat(Profile.find({userType: ['sth', 'cust', 'dev']}).fetch().map(e => [e.userID, e.name]));

      profile = profile.concat(Profile.find({userType: ['cust', 'dev', 'sth']}).fetch().map(e => [e.userID, e.name]));
      profile = profile.concat(Profile.find({userType: ['cust', 'sth', 'dev']}).fetch().map(e => [e.userID, e.name]));
      
      
      return profile;
    };

    getStakeholders = () => {

      var profile = Profile.find({userType: ['sth']}).fetch().map(e => [e.userID, e.name]);
 
      profile = profile.concat(Profile.find({userType: ['cust']}).fetch().map(e => [e.userID, e.name]));

      profile = profile.concat(Profile.find({userType: ['sth', 'cust']}).fetch().map(e => [e.userID, e.name]));
      profile = profile.concat(Profile.find({userType: ['cust', 'sth']}).fetch().map(e => [e.userID, e.name]));

      profile = profile.concat(Profile.find({userType: ['sth', 'dev']}).fetch().map(e => [e.userID, e.name]));
      profile = profile.concat(Profile.find({userType: ['dev', 'sth']}).fetch().map(e => [e.userID, e.name]));
      
      profile = profile.concat(Profile.find({userType: ['dev', 'cust']}).fetch().map(e => [e.userID, e.name]));
      profile = profile.concat(Profile.find({userType: ['cust', 'dev']}).fetch().map(e => [e.userID, e.name]));

      profile = profile.concat(Profile.find({userType: ['dev', 'cust', 'sth']}).fetch().map(e => [e.userID, e.name]));
      profile = profile.concat(Profile.find({userType: ['dev', 'sth', 'cust']}).fetch().map(e => [e.userID, e.name]));

      profile = profile.concat(Profile.find({userType: ['sth', 'dev', 'cust']}).fetch().map(e => [e.userID, e.name]));
      profile = profile.concat(Profile.find({userType: ['sth', 'cust', 'dev']}).fetch().map(e => [e.userID, e.name]));

      profile = profile.concat(Profile.find({userType: ['cust', 'dev', 'sth']}).fetch().map(e => [e.userID, e.name]));
      profile = profile.concat(Profile.find({userType: ['cust', 'sth', 'dev']}).fetch().map(e => [e.userID, e.name]));


      return profile;
    };


    render() {
        const { getFieldDecorator } = this.props.form;
        return (
          <Col  xs={6}>
          <Form onSubmit={this.handleSubmit} className="login-form">

            Add project

            <Form.Item style={{ marginBottom: 5}}>
              {getFieldDecorator('title', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Title"
                />,
              )}
            </Form.Item>

            <Form.Item style={{ marginBottom: 5}}>
              {getFieldDecorator('desc', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <TextArea 
                rows={4} 
                placeholder="Description"
              />,
              )}
            </Form.Item>

            <Form.Item style={{ marginBottom: 5}}>
              {getFieldDecorator('dev', {
                rules: [
                  { required: true, message: 'Please select developer!', type: 'array' },
                ],
              })(
                <Select mode="multiple" placeholder="Select developer">
                {this.getDevelopers().map( e => {
                  return <Option value = {e[0]}> {e[1]} </Option>
                })}
                </Select>
              )}
            </Form.Item>

            <Form.Item style={{ marginBottom: 5}}>
              {getFieldDecorator('sth', {
                rules: [
                  { required: true, message: 'Please select stakeholder/end user!', type: 'array' },
                ],
              })(
                <Select mode="multiple" placeholder="Select stakeholder/end user">
                {this.getStakeholders().map( e => {
                  return <Option value = {e[0]}> {e[1]} </Option>
                })}
                </Select>
              )}
            </Form.Item>

            <Form.Item style={{ marginBottom: 5}}>
              {getFieldDecorator('com')
              (
                <TextArea 
                rows={4} 
                placeholder="Comments"
              />,
              )}
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                SUBMIT
              </Button>
            </Form.Item>
          </Form>
          </Col>
        );
      }
}

const AddProject = Form.create({ name: 'normal_login' })(NormalLoginForm);

export default AddProject