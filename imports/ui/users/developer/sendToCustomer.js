import React, { Component } from 'react';
import {Meteor} from 'meteor/meteor';
import 'antd/dist/antd.css';
import { Form, Icon, Input, Button, Typography, Card, Checkbox } from 'antd';
const { Text } = Typography;
import Project from '../../../api/models/project';

class NormalLoginForm extends Component{

    handleSubmit = e => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        console.log('button clicked');
        console.log(values);
        const res = {
          customerID: this.props.item.customerID,
          answersID: values.answers,
          projectID: this.props.item.projectID,
        }
        Meteor.call("addNotification", res);
        this.props.form.resetFields();
      });
    };
    
    render() {
        const item = this.props.item;
        const { getFieldDecorator } = this.props.form
        return (
          <Form onSubmit={this.handleSubmit} className="login-form">

                <Card 
                    size="small" 
                    title={item.question}
                    extra={ (item.ua.length > 1) 
                        ? 
                        <Form.Item style={{margin:0}}>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                        Send to customer
                        </Button> 
                        </Form.Item>
                        : 
                        "" }
                    >
                    <Form.Item style={{margin:0}}>
                    {getFieldDecorator('answers', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                     })(
                    <Checkbox.Group>
                    {item.ua.map(function(el){
                        return(
                        <div>
                        <Checkbox value={el.answerID}>
                        <Text style={{color: 'black'}}>User: </Text>
                        <Text code>{el.user}</Text>
                        <br />
                        <Text style={{color: 'black'}}>Answer: </Text>
                        <Text>{el.answer}</Text>
                        <br />
                        {
                          el.comment ?
                        (<Text style={{color: 'black'}}>Comment: </Text> ): ("")
                        }
                        <Text>{el.comment}</Text>
                        </Checkbox>
                        </div>
                        
                        )
                    })}
                    </Checkbox.Group>)}
                    </Form.Item>

                </Card>
          </Form>
        );
      }
}

const SendToCustomer = Form.create({ name: 'normal_login' })(NormalLoginForm);
export default SendToCustomer;