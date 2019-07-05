import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Grid, Row, Col, List, Card , Icon, Typography, Modal} from 'antd';
import { BrowserRouter as Router, Route, Link, Switch,  withRouter } from "react-router-dom";
import { withTracker } from 'meteor/react-meteor-data';
import '../users.css';
const { Text } = Typography;

import Project from '../../../api/models/project';

import AddProject from '../../forms/addProject';
import ProjectCard from './projectCard';

class Customer extends Component{

    state = { visible: false };

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
                        <ProjectCard item={item} />
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