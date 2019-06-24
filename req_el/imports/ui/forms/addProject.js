import React, { Component } from 'react';
import {Meteor} from 'meteor/meteor';
import 'antd/dist/antd.css';
import { Form, Icon, Input, Button, Select, Card} from 'antd';
const { TextArea } = Input;
const { Option } = Select;
import { Grid, Row, Col } from 'react-flexbox-grid';

class NormalLoginForm extends Component{

    handleSubmit = e => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
      });
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
                  { required: true, message: 'Please select your favourite colors!', type: 'array' },
                ],
              })(
                <Select placeholder="Select developer">
                  <Option value="id1">Developer Nick</Option>
                  <Option value="id2">Developer John</Option>
                  <Option value="id3">Developer Kate</Option>
                </Select>,
              )}
            </Form.Item>

            <Form.Item style={{ marginBottom: 5}}>
              {getFieldDecorator('sth', {
                rules: [
                  { required: true, message: 'Please select your favourite colors!', type: 'array' },
                ],
              })(
                <Select mode="multiple" placeholder="Select stakeholder/end user">
                  <Option value="id3">Bob</Option>
                  <Option value="id4">Kris</Option>
                  <Option value="id5">Anabel</Option>
                </Select>,
              )}
            </Form.Item>

            <Form.Item style={{ marginBottom: 5}}>
              {getFieldDecorator('com', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
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
export default AddProject;