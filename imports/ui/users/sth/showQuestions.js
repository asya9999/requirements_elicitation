import React, { Component } from 'react';
import {Icon, Typography, Row, Col, Card, List} from 'antd';
const { Text } = Typography;
import { BrowserRouter as Router, Route, Link, Switch,  withRouter } from "react-router-dom";
import { withTracker } from 'meteor/react-meteor-data';
import 'antd/dist/antd.css';
import Question from '../../../api/models/question';
import Answer from './answer';

class ShowQuestions extends Component{
    render(){
        return(
            <div className="all_questions">
            <List
                grid={{
                    column: 1
                  }}
            dataSource={this.props.questions}
            size="small"
            renderItem={(item)=> (
                <List.Item>
                    <div style={{padding: 5}}>
                    <Card 
                        size="small" 
                        title={item.question}
                    >
                        <Answer  {...item}/>
                    </Card>
                    </div>
                </List.Item>
            )}
            />
            </div>
        )
    }
}

export default withTracker(() => {
    return {
      currentUser: Meteor.user(),
      questions: Question.find({}).fetch(),
      //users: Meteor.users.find().fetch(),
    };
  })(withRouter(ShowQuestions));