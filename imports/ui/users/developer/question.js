import React, { Component } from 'react';
import {Icon, Typography, Row, Col, Card, Modal} from 'antd';
const { Text } = Typography;
import 'antd/dist/antd.css';
import '../users.css';
import CreateQuestion from '../../forms/createQuestion'


class QuestionBox extends Component{
  state = { visible: false };
  
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  //add DELETION from
  deleteQuestion = (id) => {
    console.log(id);

  }

  render(){
    const values = this.props;
    return(
    <Card 
      size="small" 
      title={values.question} 
      extra={
        <div>
          <Icon onClick={this.showModal} type="setting" style={{marginRight: 10}}/>
          <Icon onClick={ () => this.deleteQuestion(values._id)} type="minus-circle-o"/>
        </div>
      } 
      >
        {values.users.map(user =><Text code>{user}</Text> )}    
        <ul style={{paddingLeft: 20}}>             
        {values.answers.map(answer => <li>{answer}</li>)}
        </ul>
  
        <Modal
            title="Change question"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <CreateQuestion />
          </Modal>
      </Card>
    )
  }
}

export default QuestionBox;