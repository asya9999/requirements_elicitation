import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Grid, Row, Col, List, Card , Icon, Typography} from 'antd';
import { BrowserRouter as Router, Route, Link, Switch,  withRouter } from "react-router-dom";
import { withTracker } from 'meteor/react-meteor-data';
import '../users.css';
const { Text } = Typography;

import Project from '../../../api/models/project';

import AddProject from '../../forms/addProject';

class Developer extends Component{

    answer = () => {
        console.log("answer question")
    }

    showModal = () => {
        console.log("modify question")
    }

    //add DELETION from
    deleteQuestion = (id) => {
        console.log(id);
    }

    render(){
        return(

            <List
            grid={{
                    column: 1
                }}
            dataSource={this.props.projects}
            size="small"
            renderItem={(item)=> (
                <List.Item>
                    <div style={{padding: 5}}>
                    <Card 
                        size="small" 
                        title={item.title}
                        extra={
                            <div>
                                <a 
                                    style={{paddingRight: 10}} 
                                    onClick = {() => this.props.history.push(`/account/developer/questions/${item._id}`)}
                                >Questions</a>
                                <a 
                                    style={{paddingRight: 10}} 
                                    onClick = {() => this.props.history.push(`/account/developer/check_answers/${item._id}`)}
                                >Check answers</a>
                            </div>
                        } 
                    >
                        <Text style={{color: 'black'}}>Customer: </Text>
                        <Text code>{item.customerID}</Text>
                        <br />
                        <Text style={{color: 'black'}}>Stakeholders: </Text>
                        {item.stakeholderID.map( user => <Text code>{user}</Text>)}
                        <br />
                        <Text style={{color: 'black'}}>Description: </Text>
                        <Text>{item.description}</Text>
                        <br />
                        <Text style={{color: 'black'}}>Comments: </Text>
                        <Text>{item.comments}</Text>
                        <br />
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
      projects: Project.find({"developerID": Meteor.userId()}).fetch(),
      //questions: Question.find({}).fetch(),
      //users: Meteor.users.find().fetch(),
    };
  })(withRouter(Developer));