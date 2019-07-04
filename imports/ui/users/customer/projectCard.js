import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Grid, Row, Col, List, Card , Icon, Typography, Modal, Button, Checkbox, Input, Tooltip} from 'antd';
const { TextArea } = Input;
import { BrowserRouter as Router, Route, Link, Switch,  withRouter } from "react-router-dom";
import { withTracker } from 'meteor/react-meteor-data';
import '../users.css';
const { Text } = Typography;

import Notification from '../../../api/models/notification';
import Question from '../../../api/models/question';
import Answer from '../../../api/models/answer';
import Note from './note';


class ProjectCard extends Component{

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
  deleteProject = (id) => {
    console.log(id);
    Meteor.call("delProject", id);
  }

  create_list_of_questions = () =>{
    let list_of_notes = this.props.notifications.filter(el => el.projectID == this.props.item._id);
    list_of_notes = list_of_notes.map(
      function(element){
        let question;
        let id = element._id;
        question = element.answersID[0];
        question = Answer.find({"_id": question}).fetch()[0].questionID;
        question = Question.find({"_id": question}).fetch()[0].question;

        let ua = [];
        element.answersID.forEach(element => {
          ua.push({
            answerID: element,
            user: Answer.find({"_id": element}).fetch()[0].userID,
            answer: Answer.find({"_id": element}).fetch()[0].answer,
          })
        });
        //question = this.props.answers.filter(el => question == el._id)[0].questionID;
        //question = this.props.questions.filter(el => el._id == question)[0].question;

        return({
          id: id,
          question: question,
          ua: ua,
        })
      }
    );
    console.log("LIST OF NOTEs");
    console.log(list_of_notes);
    return list_of_notes ;
  }

    render() {

      const item = this.props.item;

      return(
        <div>
        <Card 
        size="small" 
        title={item.title}
        extra={
            <div>
              {
                this.props.notifications.filter(el => el.projectID == item._id).length > 0 
                ?
                (<Tooltip title="Notifications"><Icon onClick={() => this.showModal()} 
                type="exclamation-circle" 
                style={{marginRight: 10}} 
                theme="twoTone" twoToneColor="#dc3545" spin/></Tooltip>)
                :
                ("")
              }
                <Tooltip title="Answer questions">
                <Icon onClick={ 
                    () => this.props.history.push(`/account/customer/questions/${item._id}`)
                } type="message" style={{marginRight: 10}}/>
                </Tooltip>
                <Tooltip title="Modify">
                <Icon onClick={ () => this.showModal()} type="setting" style={{marginRight: 10}}/>
                </Tooltip>
                <Tooltip title="Delete">
                <Icon onClick={ () => this.deleteProject(item._id)} type="minus-circle-o"/>
                </Tooltip>
            </div>
        } 
        >
          <Text style={{color: 'black'}}>Developers: </Text>
          {item.developerID.map( user => <Text code>{Meteor.users.find({"_id": user}).fetch()[0].username}</Text>)}
          <br />
          <Text style={{color: 'black'}}>Stakeholders: </Text>
          {item.stakeholderID.map( user => <Text code>{Meteor.users.find({"_id": user}).fetch()[0].username}</Text>)}
          <br />
          <Text style={{color: 'black'}}>Description: </Text>
          <Text>{item.description}</Text>
          <br />
          <Text style={{color: 'black'}}>Comments: </Text>
          <Text>{item.comments}</Text>
          <br />
 

        </Card>
        <Modal
          title="Notifications"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
        <List
          grid={{
                  column: 1
              }}
          dataSource={this.create_list_of_questions()}
          size="small"
          renderItem={(el)=> (
              <List.Item>
                  <div style={{padding: 5}}>
                  <Note element={el} />
                  </div>
              </List.Item>
          )}
        />
  
        </Modal>
        </div>
      )
      }
}

export default withTracker(() => {
  return {
    currentUser: Meteor.user(),
    answers: Answer.find({}).fetch(),
    questions: Question.find({}).fetch(),
    notifications: Notification.find({"customerID": Meteor.userId()}).fetch(),
  };
})(withRouter(ProjectCard));