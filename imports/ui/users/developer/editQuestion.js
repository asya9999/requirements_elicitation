import React, { Component } from 'react';
import {Meteor} from 'meteor/meteor';
import 'antd/dist/antd.css';
import { Form, Icon, Input, Button, Select } from 'antd';
import Profile from "../../../api/models/profile";

const { Option } = Select;


let id = 0;

class NormalLoginForm extends Component{

    
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
            Meteor.call('editQuestion', this.props.match.params.id, values);
            this.props.form.resetFields();
            this.props.history.push('/account/developer/')
          }
        });
      };

      getUsers = () => {

            var profile = Profile.find({userType: ['sth']}).fetch().map(e => [e.userID, Meteor.users.find({"_id": e.userID}).fetch()[0].username]);
       
            profile = profile.concat(Profile.find({userType: ['cust']}).fetch().map(e => [e.userID, Meteor.users.find({"_id": e.userID}).fetch()[0].username]));
      
            profile = profile.concat(Profile.find({userType: ['sth', 'cust']}).fetch().map(e => [e.userID, Meteor.users.find({"_id": e.userID}).fetch()[0].username]));
            profile = profile.concat(Profile.find({userType: ['cust', 'sth']}).fetch().map(e => [e.userID, Meteor.users.find({"_id": e.userID}).fetch()[0].username]));
      
            profile = profile.concat(Profile.find({userType: ['sth', 'dev']}).fetch().map(e => [e.userID, Meteor.users.find({"_id": e.userID}).fetch()[0].username]));
            profile = profile.concat(Profile.find({userType: ['dev', 'sth']}).fetch().map(e => [e.userID, Meteor.users.find({"_id": e.userID}).fetch()[0].username]));
            
            profile = profile.concat(Profile.find({userType: ['dev', 'cust']}).fetch().map(e => [e.userID, Meteor.users.find({"_id": e.userID}).fetch()[0].username]));
            profile = profile.concat(Profile.find({userType: ['cust', 'dev']}).fetch().map(e => [e.userID, Meteor.users.find({"_id": e.userID}).fetch()[0].username]));
      
            profile = profile.concat(Profile.find({userType: ['dev', 'cust', 'sth']}).fetch().map(e => [e.userID, Meteor.users.find({"_id": e.userID}).fetch()[0].username]));
            profile = profile.concat(Profile.find({userType: ['dev', 'sth', 'cust']}).fetch().map(e => [e.userID, Meteor.users.find({"_id": e.userID}).fetch()[0].username]));
      
            profile = profile.concat(Profile.find({userType: ['sth', 'dev', 'cust']}).fetch().map(e => [e.userID, Meteor.users.find({"_id": e.userID}).fetch()[0].username]));
            profile = profile.concat(Profile.find({userType: ['sth', 'cust', 'dev']}).fetch().map(e => [e.userID, Meteor.users.find({"_id": e.userID}).fetch()[0].username]));
      
            profile = profile.concat(Profile.find({userType: ['cust', 'dev', 'sth']}).fetch().map(e => [e.userID, Meteor.users.find({"_id": e.userID}).fetch()[0].username]));
            profile = profile.concat(Profile.find({userType: ['cust', 'sth', 'dev']}).fetch().map(e => [e.userID, Meteor.users.find({"_id": e.userID}).fetch()[0].username]));
      
      
            return profile;
      }
    
    render() {
        const { getFieldDecorator } = this.props.form;

        return (
          <Form onSubmit={this.handleSubmit} className="login-form">

            <h3>Question edition</h3>

            <Form.Item style={{ marginBottom: 5}}>
              {getFieldDecorator('question')(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Question"
                />
              )}
            </Form.Item>

            <Form.Item style={{ marginBottom: 5}}>
              {getFieldDecorator('users')(
                <Select mode="multiple" placeholder="Select developer">
                    {this.getUsers().map( e => {
                        return <Option value = {e[0]}> {e[1]} </Option>})}
                </Select>
              )}
            </Form.Item>

            <Form.Item style={{ marginBottom: 5}}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>


          </Form>
        );
      }
}

const EditQuestion = Form.create({ name: 'normal_login' })(NormalLoginForm);
export default EditQuestion;