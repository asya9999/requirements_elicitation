import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Grid, Row, Col, List, Card , Icon, Typography} from 'antd';
import { BrowserRouter as Router, Route, Link, Switch,  withRouter } from "react-router-dom";
import { withTracker } from 'meteor/react-meteor-data';
import '../users.css';
const { Text } = Typography;

import Question from '../../../api/models/question';
import CreateQuestion from '../../forms/createQuestion';
import QuestionBox from './question';


class CreateInterview extends Component{

    render(){
        
        console.log(this.props.questions);

        return(

            <Row center="xs">

            <Col xs={10}>
                <CreateQuestion projectID={this.props.match.params.id}/>
            </Col>

            <Col xs={14}>
                <h3 style={{paddingLeft: 10}}>Questions</h3>
                <div className="questions">
                <List
                grid={{  column: 1 }}
                dataSource={this.props.questions}
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
      //users: Meteor.users.find().fetch(),
    };
  })(withRouter(CreateInterview));