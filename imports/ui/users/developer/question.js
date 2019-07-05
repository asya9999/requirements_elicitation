import React, { Component } from 'react';
import {Icon, Typography, Row, Col, Card, Modal} from 'antd';
const { Text } = Typography;
import 'antd/dist/antd.css';
import '../users.css';
import CreateQuestion from '../../forms/createQuestion'
import { withTracker } from 'meteor/react-meteor-data';
import { BrowserRouter as Router, Route, Link, Switch,  withRouter } from "react-router-dom";


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
    Meteor.call("delQuestion", id);
  }

  editQuestion = (id) => {
    this.props.history.push(`/account/developer/questions/edit_question/${id}`)
  }

  render(){
    const values = this.props;
    return(
    <Card 
      size="small" 
      title={values.question} 
      extra={
        <div>
          <Icon onClick={ () => this.editQuestion(values._id)} type="setting" style={{marginRight: 10}}/>
          <Icon onClick={ () => this.deleteQuestion(values._id)} type="minus-circle-o"/>
        </div>
      } 
      >
        {values.users.map(user =><Text code>{Meteor.users.find({"_id": user}).fetch()[0].username}</Text> )}    
        <ul style={{paddingLeft: 20}}>             
        {values.answers.map(answer => <li>{answer}</li>)}
        </ul>
      </Card>
    )
  }
}
 
export default withRouter(QuestionBox);