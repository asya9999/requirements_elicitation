import React, { Component } from 'react';
import {Meteor} from 'meteor/meteor';
import 'antd/dist/antd.css';
import { Form, Icon, Input, Button, Select, Card, Radio} from 'antd';
const { TextArea } = Input;
const { Option } = Select;
import { Grid, Row, Col } from 'react-flexbox-grid';

class NormalLoginForm extends Component{

  constructor(props) {
    super(props);
    // Не делайте этого!
    this.state = { ready: false };
   }


    handleSubmit = e => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        this.setState({ ready: true });
      });
    };
    

    render() {
        const { getFieldDecorator } = this.props.form;
        const values = this.props;
    
        //console.log(values);
        return (
          <Form onSubmit={this.handleSubmit} className="login-form">

            {
                values.answers.length 
                ?
                (
                    <Form.Item>
                    {getFieldDecorator('radio-group')(
                      <Radio.Group>
                        {values.answers.map((answer, index )=> <Radio style={{display: 'block'}} value={index}>{answer}</Radio>)}
                      </Radio.Group>,
                    )}
                    </Form.Item>                
                ) 
                :
                (
                    <Form.Item style={{ marginBottom: 5}}>
                    {getFieldDecorator('com', {
                      rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                      <TextArea 
                      rows={4} 
                      placeholder="your answer"
                    />,
                    )}
                    </Form.Item>
                )
            }

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Answer
              </Button>
              {
                this.state.ready
                ?
                (<Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a"/>)
                :
                (<Icon type="close-circle" style={{ fontSize:20}} theme="twoTone" twoToneColor="#dc3545" spin/>)
              }
            </Form.Item>
          </Form>
        );
      }
}

const Answer = Form.create({ name: 'normal_login' })(NormalLoginForm);
export default Answer;