import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Grid, Row, Col, List, Card , Icon, Typography} from 'antd';
import { BrowserRouter as Router, Route, Link, Switch,  withRouter } from "react-router-dom";
import { withTracker } from 'meteor/react-meteor-data';
import '../users.css';
const { Text } = Typography;

import Question from '../../../api/models/question';
import Project from '../../../api/models/project';

import CreateQuestion from '../../forms/createQuestion';
import QuestionBox from './question';


class CreateInterview extends Component{


    create_list_of_users(){
        const project = this.props.projects.filter( el => el._id == this.props.match.params.id)[0];
        let users = project.stakeholderID;
        users.push(project.customerID);
        users = users.filter(function(item, pos) {
            return users.indexOf(item) == pos;
        });
        console.log("users");
        users = users.map(
            function(el){
                return {
                    id: el,
                    name: Meteor.users.find({"_id": el}).fetch()[0].username
                }
            }
        );
        console.log(users)
        console.log(Meteor.users.find());
        return users;
    }

    render(){

        const users = this.create_list_of_users();
        //console.log(project);
        //console.log(this.props.questions);

        return(

            <Row center="xs">

            <Col xs={10}>
                <CreateQuestion users={users} projectID={this.props.match.params.id}/>
            </Col>

            <Col xs={14}>
                <h3 style={{paddingLeft: 10}}>Questions</h3>
                <div className="questions">
                <List
                grid={{  column: 1 }}
                dataSource={this.props.questions.filter(el => el.projectID == this.props.match.params.id)}
                size="small"
                renderItem={(item)=> (
                    <List.Item>
                        <QuestionBox {...item} />
                    </List.Item>
                )}
                />
                
                </div>
                { /*this.props.questions.map(question => <QuestionBox key={question._id} {...question} />)*/}
            </Col>
            </Row>
        )
    }
}

export default withTracker(() => {
    return {
      currentUser: Meteor.user(),
      questions: Question.find({}).fetch(),
      projects: Project.find({}).fetch(),
      //users: Meteor.users.find().fetch(),
    };
  })(withRouter(CreateInterview));