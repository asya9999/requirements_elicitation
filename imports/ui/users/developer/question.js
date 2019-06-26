import React, { Component } from 'react';
import {Icon, Typography, Row, Col} from 'antd';
const { Text } = Typography;
import 'antd/dist/antd.css';
import '../users.css';

const QuestionBox = (values) => (
    <div className="question">
      <Row center="xs">
          <Col xs={20}>
            <div>{values.question}</div>
          </Col>
          <Col xs={4}>
            <div style={{}}>
            <Icon type="setting" style={{marginRight: 10}}/>
            <Icon type="minus-circle-o"/>
            </div>
          </Col>
      </Row>
      {values.users.map(user =><Text code>{user}</Text> )}    
      <ul style={{paddingLeft: 20}}>             
      {values.answers.map(answer => <li>{answer}</li>)}
      </ul>
    </div>
  );

export default QuestionBox;