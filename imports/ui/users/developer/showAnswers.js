import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Grid, Row, Col, List, Card , Icon, Typography, Checkbox, Button} from 'antd';
import { BrowserRouter as Router, Route, Link, Switch,  withRouter } from "react-router-dom";
import { withTracker } from 'meteor/react-meteor-data';
import '../users.css';
const { Text } = Typography;

import Question from '../../../api/models/question';
import Answer from '../../../api/models/answer';
import Project from '../../../api/models/project';
import SendToCustomer from './sendToCustomer';

//import AddProject from '../../forms/addProject';

class ShowAnswers extends Component{

    create_list_of_answers(){
        let values = this.props.answers;
        const questions = this.props.questions;
        const all_projects = this.props.projects;
        values = values.map( 
            function(el){
                return {
                answerID: el._id,
                projectID: el.projectID,
                question: questions.filter(e => e._id == el.questionID)[0].question,
                user: Meteor.users.find({"_id": el.userID}).fetch()[0].username,
                answer: el.answer, 
                comment: el.comment, 
                }
            })
        let new_values = [];
        values.forEach(element => {
            let bool = true;
            if(new_values.length > 0){
                new_values.forEach( e =>{
                    if (e.question == element.question){
                            e.ua.push({
                                answerID: element.answerID,
                                user: element.user,
                                answer: element.answer,  
                                comment: element.comment,                        
                            });
                            bool = false;
                    }
                } )
            }
            if(bool){
                new_values.push({
                    customerID: all_projects.filter(el => el._id == element.projectID)[0].customerID,
                    projectID: element.projectID,
                    question: element.question,
                    ua: [{
                        answerID: element.answerID,
                        user: element.user,
                        answer: element.answer,
                        comment: element.comment
                    }]
                })
            }
        });

        console.log(new_values);
        return new_values;
    }

    render(){
        
        const answers = this.create_list_of_answers();
        
        return(

            <List
            grid={{
                    column: 1
                }}
            dataSource={answers.filter(el => el.projectID==this.props.match.params.id)}
            size="small"
            renderItem={(item)=> (
                <List.Item>
                    <div style={{padding: 5}}>
                        <SendToCustomer item={item}/>
                    </div>
                </List.Item>
            )}
            />
        )
    }
}

export default withTracker(() => {
    return {
      currentUser: Meteor.user(),
      projects: Project.find({}).fetch(),
      answers: Answer.find({}).fetch(),
      questions: Question.find({}).fetch(),
      users: Meteor.users.find().fetch(),
    };
  })(withRouter(ShowAnswers));