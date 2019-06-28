import React, { Component } from 'react';
import {Meteor} from 'meteor/meteor';
import 'antd/dist/antd.css';
import { Form, Icon, Input, Button, Select } from 'antd';
const { Option } = Select;

let id = 0;

class Question extends Component{
    remove = k => {
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        // can use data-binding to set
        form.setFieldsValue({
          keys: keys.filter(key => key !== k),
        });
      };
    
    add = () => {
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(id++);
        // can use data-binding to set
        // important! notify form to detect changes
        form.setFieldsValue({
          keys: nextKeys,
        });
      };
    
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            const { keys, names } = values;
            console.log('Received values of form: ', values);
            values['projectID'] = this.props.projectID;
            Meteor.call('addQuestion', values);
          //  console.log('Merged values:', keys.map(key => names[key]));
          }
        });
      };
    
    render() {

        console.log(this.props.projectID);

        const { getFieldDecorator, getFieldValue } = this.props.form;

        const formItemLayout = {
          labelCol: {
            xs: { span: 24 },
            sm: { span: 3 },
          },
          wrapperCol: {
            xs: { span: 24 },
            sm: { span: 20 },
          },
        };

        getFieldDecorator('keys', { initialValue: [] });
        const keys = getFieldValue('keys');
        const formItems = keys.map((k, index) => (
          <Form.Item
            {...formItemLayout}
            label={'Answer' + String(index + 1)}
            required={false}
            key={k}
            style={{ marginBottom: 5}}
          >
            {getFieldDecorator(`answer[${k}]`, {
              validateTrigger: ['onChange', 'onBlur'],
              rules: [
                {
                  required: true,
                  whitespace: true,
                  message: "Please input passenger's name or delete this field.",
                },
              ],
            })(<Input placeholder="your answer " style={{ width: '60%', marginRight: 2 }} />)}
            
            <Icon
              className="dynamic-delete-button"
              type="minus-circle-o"
              onClick={() => this.remove(k)}
            />
          </Form.Item>
        ));

        return (
          <Form onSubmit={this.handleSubmit} className="login-form">

            <h3>Question addition</h3>

            <Form.Item style={{ marginBottom: 5}}>
              {getFieldDecorator('question', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Question"
                />,
              )}
            </Form.Item>

            <Form.Item style={{ marginBottom: 5}}>
              {getFieldDecorator('users', {
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
            
            {formItems}

            <Form.Item style={{ marginBottom: 5}}>
                <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
                    <Icon type="plus" /> Add answers
                </Button>
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

const CreateQuestion = Form.create({ name: 'normal_login' })(Question);
export default CreateQuestion;