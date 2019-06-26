import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch,  withRouter } from "react-router-dom";
import 'antd/dist/antd.css';
import { withTracker } from 'meteor/react-meteor-data';
import { Layout, Menu, Icon } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
import './mainPage.css';

import AddProject from './forms/addProject';
import AddQuestions from './forms/addQuestions';
import Add from './forms/addition';
import CreateInterview from './users/developer/createInterview';

class MainPage extends Component {
  render() {
    return (
        <Layout style={{height:"100vh"}}>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={broken => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          {/*<div className="logo">Hello, {this.props.currentUser ? this.props.currentUser.username : ""}</div>*/}

          <div className="logo">
          <h1>RE</h1>
          </div>
         
         
          <Menu theme="dark" mode="inline">
            <Menu.Item key="1">
              <Icon type="user" />
              <span className="nav-text">Account</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="video-camera" />
              <span className="nav-text">Customer</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="upload" />
              <span className="nav-text">Developer</span>
            </Menu.Item>
            <Menu.Item key="4">
              <Icon type="user" />
              <span className="nav-text">Sth</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header className="header_info" style={{ background: '#fff', padding: 0 }}></Header>
          <Content style={{ margin: '24px 16px 0' }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            <div>
                    <Route exact path="/account/add_project" component={AddProject} />
                    <Route exact path="/account/add_questions" component={AddQuestions} />
                    <Route exact path="/account/addition" component={Add} />
                    <Route exact path="/account/create_interview" component={CreateInterview} />
            </div>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2019 Created by Anastasia Pichka, Aleksandra Shchetinina, Bekpasha Dursunov, Kusal KC</Footer>
        </Layout>
      </Layout>
    );
  }
}

/*
      <div>
        <div>
        <p>Hello, {this.props.currentUser ? this.props.currentUser.username : ""}</p>
        {console.log(this.props.currentUser)}

        <div className="menu">
        </div>

        <input onClick={ () => {Meteor.logout(); this.props.history.push('/')} } type="button" value="Log Out"/>
        </div>
        <div>

        </div>
      </div>*/
      
export default withTracker(() => {
  return {
    currentUser: Meteor.user(),
    //users: Meteor.users.find().fetch(),
  };
})(withRouter(MainPage));
