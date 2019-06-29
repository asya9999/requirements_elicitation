import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Grid, Row, Col, List, Card , Icon, Typography} from 'antd';
import { BrowserRouter as Router, Route, Link, Switch,  withRouter } from "react-router-dom";
import { withTracker } from 'meteor/react-meteor-data';
import '../users.css';
const { Text } = Typography;

import Question from '../../../api/models/question';
import Answer from '../../../api/models/answer';

//import AddProject from '../../forms/addProject';

class ShowAnswers extends Component{

    create_list_of_answers(){
        let values = this.props.answers;
        const questions = this.props.questions;
        values = values.map( 
            function(el){
                return {
                projectID: el.projectID,
                question: questions.filter(e => e._id = el.questionID)[0].question,
                user: Meteor.users.find({"_id": el.userID}).fetch()[0].username,
                answer: el.answer,  
                }
            })
        return values;
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
                    <Card 
                        size="small" 
                        title={item.question}
                    >
                        <Text style={{color: 'black'}}>User: </Text>
                        <Text code>{item.user}</Text>
                        <br />
                        <Text style={{color: 'black'}}>Answer: </Text>
                        <Text>{item.answer}</Text>
                    </Card>
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
      //projects: Project.find({"developerID": Meteor.userId()}).fetch(),
      answers: Answer.find({}).fetch(),
      questions: Question.find({}).fetch(),
      users: Meteor.users.find().fetch(),
    };
  })(withRouter(ShowAnswers));