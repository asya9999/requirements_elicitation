import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Grid, Row, Col, List, Card , Icon, Typography, Form, Button, Checkbox, Input, Radio} from 'antd';
const { TextArea } = Input;
import { BrowserRouter as Router, Route, Link, Switch,  withRouter } from "react-router-dom";
import { withTracker } from 'meteor/react-meteor-data';
import '../users.css';
const { Text } = Typography;

class NormalLoginForm extends Component{

      handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {

            console.log("NOTE");
            
            let res = {
                comment: values.comment,
                id: values.answers,
            }
            console.log("RESULT");
            console.log(res);

            let all_answers = this.props.element.ua.map(el => el.answerID);
            
            Meteor.call('delNotification', this.props.element.id);

            all_answers.forEach(element => {
              if(element != res.id){
                Meteor.call('delAnswer', element);
              }
            });
            //add notification deletion !!!!!

            Meteor.call('chooseAndComment', res);
            this.props.form.resetFields();

        });
      };
      
  
      render() {
          const { getFieldDecorator } = this.props.form;
          const el = this.props.element;
          //console.log(values);
          return (
            <Form onSubmit={this.handleSubmit} className="login-form">

                <Card
                  size="small" 
                  title={el.question + "New version"}
                  extra={
                    <Form.Item style={{margin:0}}>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                      Send to developer
                    </Button>
                    </Form.Item>
                  }
                  > 
                   <Form.Item style={{margin:0}}>
                   {getFieldDecorator('answers', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                     })(
                    <Radio.Group>
                    {el.ua.map(element => (
                      <div>
                      <Radio style={{margin: 0, padding:0}} value={element.answerID}>
                        <Text style={{color: 'black'}}>User: </Text>
                        {<Text code>{element.user}</Text>}
                        <br />
                        <Text style={{color: 'black'}}>Answer: </Text>
                        <Text>{element.answer}</Text>
                        <br />
                        </Radio>
                      </div>
                      ))}
                    </Radio.Group>)}
                    </Form.Item>
                    <Form.Item style={{ marginBottom: 0}}>
                      {getFieldDecorator('comment', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                      })(
                        <TextArea 
                        rows={1} 
                        placeholder="your answer"
                      />,
                      )}
                      </Form.Item>
                </Card>
            </Form>
          );
        }
  }
  
  const Note = Form.create({ name: 'normal_login' })(NormalLoginForm);
  export default Note;