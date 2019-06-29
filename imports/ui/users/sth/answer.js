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
    this.state = { ready: false };
   }


    handleSubmit = e => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {

        const type = ( values.text_area ? "text" : "mult")

        const answer = {
          questionID: this.props._id,
          projectID: this.props.projectID,
          userID: Meteor.userId(),
          type: type,
          answer: ( type=="text" ? values.text_area : values.radio), 
        }
        Meteor.call('addAnswer', answer);
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
                    {getFieldDecorator('radio')(
                      <Radio.Group>
                        {values.answers.map((answer, index )=> <Radio style={{display: 'block'}} value={answer}>{answer}</Radio>)}
                      </Radio.Group>,
                    )}
                    </Form.Item>                
                ) 
                :
                (
                    <Form.Item style={{ marginBottom: 5}}>
                    {getFieldDecorator('text_area', {
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
                (<Icon type="check-circle" style={{ fontSize:25, paddingLeft: 5}} theme="twoTone" twoToneColor="#52c41a"/>)
                :
                (<Icon type="close-circle" style={{ fontSize:25, paddingLeft: 5}} theme="twoTone" twoToneColor="#dc3545" spin/>)
              }
            </Form.Item>
          </Form>
        );
      }
}

const Answer = Form.create({ name: 'normal_login' })(NormalLoginForm);
export default Answer;