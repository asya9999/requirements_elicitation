import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Grid, Row, Col, List, Card , Icon, Typography, Modal, Tooltip} from 'antd';
import { BrowserRouter as Router, Route, Link, Switch,  withRouter } from "react-router-dom";
import { withTracker } from 'meteor/react-meteor-data';
import '../users.css';
const { Text } = Typography;

import Project from '../../../api/models/project';


class Stakeholder extends Component{

    state = { visible: false };

    showModal = () => {
        console.log("modify question")
    }

    render(){
        return(

            <Row center="xs">
            <Col xs={24}>
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
                            <Tooltip title="Answer questions">
                            <Icon onClick={ 
                                () => this.props.history.push(`/account/stakeholder/questions/${item._id}`)
                            } type="message" style={{marginRight: 10}}/>
                            </Tooltip>
                        } 
                    >
                        <Text style={{color: 'black'}}>Customer: </Text>
                        <Text code>{Meteor.users.find({"_id": item.customerID}).fetch()[0].username}</Text>
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
      projects: Project.find({"stakeholderID": Meteor.userId()}).fetch(),
      //questions: Question.find({}).fetch(),
      //users: Meteor.users.find().fetch(),
    };
  })(withRouter(Stakeholder));