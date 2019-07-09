import React, { Component } from 'react';
import { Grid, Row, Col, List, Card , Icon, Typography, Button, Modal} from 'antd';
const { Text } = Typography;
import { BrowserRouter as Router, Route, Link, Switch,  withRouter } from "react-router-dom";
import 'antd/dist/antd.css';

import ChangeProfile from "../ui/forms/changeProfile";

import Profile from "../api/models/profile";

class Account extends Component{

    state = { visible: false };

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

    render(){
        const profile = Profile.findOne({"userID": Meteor.userId()});
        console.log(profile);
        return(

            <Row center="xs">

            <Col xs={10}>

                <h1>Hello, {profile.name}</h1>

                <Card 
                size="small" 
                title="User information"
                >
 
                <Text style={{color: 'black'}}>Name: </Text>
                <Text>{profile.name}</Text>
                <br />
                <Text style={{color: 'black'}}>Surname: </Text>
                <Text>{profile.surname}</Text>
                <br />
                <Text style={{color: 'black'}}>Email: </Text>
                <Text>{profile.email}</Text>
                <br />
                <Text style={{color: 'black'}}>User type: <br/> </Text>
                {profile.userType.includes("cust") ?
                (<span><Text>Customer</Text> <br /></span>) : ("")}
                {profile.userType.includes("dev") ?
                (<span><Text>Developer</Text> <br /></span>) : ("")}
                {profile.userType.includes("sth") ?
                (<span><Text>Stakeholder</Text> <br /></span>): ("")}
                <br />

                </Card>
                <Button 
                onClick={() => this.setState({visible: true})}
                style={{marginTop: 10}} type="primary" htmlType="submit" className="login-form-button">
                    Change profile information
                </Button>
                        
            </Col>

            <Modal
            title="Change profile information"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={[
            ]}
            >

            <ChangeProfile />
    
            </Modal>

            </Row>
        )
    }
}

export default Account;