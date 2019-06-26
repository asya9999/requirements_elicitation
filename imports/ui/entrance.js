import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import RegistrationForm from './forms/registration';
import LogInForm from './forms/login';
import 'antd/dist/antd.css';
import './entrance.css';
import { Grid, Row, Col } from 'react-flexbox-grid';
class Entrance extends Component{
    render(){
        return(

            <Row center="xs">

            <Col xs={6}>
            <Row className="block">
          
          {
            <Col className="left_block" xs={6}>
            <div className="info">
                <h1>REQUIREMENTS ELICITATOR</h1>
                <span>Application that makes it easier for developer to gather reauirements</span>
            </div>
            </Col>
          }

            <Col xs={6}>
                <div className="right_block">
           
                    <Route exact path="/auth/login" component={LogInForm} />
                    <Route path="/auth/reg" component={RegistrationForm} />
                
                </div>
            </Col>

            </Row>
            </Col>
            </Row>
        )
    }
}


export default Entrance;