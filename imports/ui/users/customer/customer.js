import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Grid, Row, Col, List, Card , Icon, Typography} from 'antd';
import { BrowserRouter as Router, Route, Link, Switch,  withRouter } from "react-router-dom";
import { withTracker } from 'meteor/react-meteor-data';
import '../users.css';
const { Text } = Typography;

import Project from '../../../api/models/project';

import AddProject from '../../forms/addProject';

class Customer extends Component{

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

            <Row center="xs">

            <Col xs={10}>
                <AddProject />
            </Col>

            <Col xs={14}>
                <div className="all_questions">
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
                                    <Icon onClick={ () => this.answer()} type="message" style={{marginRight: 10}}/>
                                    <Icon onClick={ () => this.showModal()} type="setting" style={{marginRight: 10}}/>
                                    <Icon onClick={ () => this.deleteProject(item._id)} type="minus-circle-o"/>
                                </div>
                            } 
                        >
                            <Text style={{color: 'black'}}>Developers: </Text>
                            {item.developerID.map( user => <Text code>{user}</Text>)}
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
                </div>
            </Col>
            </Row>
        )
    }
}

export default withTracker(() => {
    return {
      currentUser: Meteor.user(),
      projects: Project.find({"customerID": Meteor.userId()}).fetch(),
      //questions: Question.find({}).fetch(),
      //users: Meteor.users.find().fetch(),
    };
  })(withRouter(Customer));