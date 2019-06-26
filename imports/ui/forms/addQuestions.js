import React, { Component } from 'react';
import {Meteor} from 'meteor/meteor';
import 'antd/dist/antd.css';
import { Form, Icon, Input, Button, Select, Card} from 'antd';
const { TextArea } = Input;
const { Option } = Select;
import { Grid, Row, Col } from 'react-flexbox-grid';

class Questions extends Component{

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

            Question types

            <hr/>

            <div>Open question</div>

            <Form.Item style={{ marginBottom: 5}}>
              {getFieldDecorator('select-mult', {
                rules: [
                  { required: true, message: 'Please select your favourite colors!', type: 'array' },
                ],
              })(
                <Select mode="multiple" placeholder="Choose user">
                  <Option value="id3">Bob</Option>
                  <Option value="id4">Kris</Option>
                  <Option value="id5">Anabel</Option>
                </Select>,
              )}
            </Form.Item>

            <Form.Item style={{ marginBottom: 5}}>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Open question"
                />,
              )}
            </Form.Item>

            <hr/>

            <div>Close question</div>

            <Form.Item style={{ marginBottom: 5}}>
              {getFieldDecorator('select-mult', {
                rules: [
                  { required: true, message: 'Please select your favourite colors!', type: 'array' },
                ],
              })(
                <Select mode="multiple" placeholder="Choose user">
                  <Option value="id8">Kate</Option>
                  <Option value="id9">Victor</Option>
                </Select>,
              )}
            </Form.Item>

            <Form.Item style={{ marginBottom: 5}}>
              {getFieldDecorator('close_quest', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input
                  prefix={<Icon type="close_question" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Close question"
                />,
              )}
            </Form.Item>

            <p>Answers</p>

            <Form.Item style={{ marginBottom: 5}}>
              {getFieldDecorator('a3', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input
                  prefix={<Icon type="a1" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Answer 1"
                />,
              )}
            </Form.Item>

            <Form.Item style={{ marginBottom: 5}}>
              {getFieldDecorator('a2', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input
                  prefix={<Icon type="a2" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Answer 2"
                />,
              )}
            </Form.Item>

            <Form.Item style={{ marginBottom: 5}}>
              {getFieldDecorator('a1', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input
                  prefix={<Icon type="a3" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Answer 3"
                />,
              )}
            </Form.Item>

            <hr />

          </Form>
          </Col>
        );
      }
}

const AddQuestions = Form.create({ name: 'normal_login' })(Questions);
export default AddQuestions;