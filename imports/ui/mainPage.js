import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch,  withRouter } from "react-router-dom";
import 'antd/dist/antd.css';
import { withTracker } from 'meteor/react-meteor-data';
import { Layout, Menu, Icon } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
import './mainPage.css';

import Profile from '../api/models/profile';

import AddProject from './forms/addProject';
import AddQuestions from './forms/addQuestions';

import Account from './account';
import Customer from './users/customer/customer';

import Developer from './users/developer/developer';
import CreateInterview from './users/developer/createInterview';
import ShowQuestions from './users/sth/showQuestions';
import ModifyProject from './users/customer/modifyProject';
import EditQuestion from './users/developer/editQuestion'

import ShowAnswers from './users/developer/showAnswers';

import Stakeholder from './users/sth/sth';

class MainPage extends Component {
  render() {

    const user_profile = this.props.profile[0];
    if(this.props.currentUser){
      console.log("user");
      console.log(this.props.currentUser);
      //console.log(this.props.profile);
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
         
         
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" onClick={() => this.props.history.push("/account/my_account")}>
              <Icon type="user" />
              <span className="nav-text">Account</span>
            </Menu.Item>
            {
              user_profile.userType.includes('cust') ?
            (<Menu.Item key="2" onClick={() => this.props.history.push("/account/customer")}>
              <Icon type="video-camera" />
              <span className="nav-text">Customer</span>
            </Menu.Item>) : ("")
            }

            {
              user_profile.userType.includes('dev') ?
            (<Menu.Item key="3" onClick={() => this.props.history.push("/account/developer")}>
              <Icon type="upload" />
              <span className="nav-text">Developer</span>
            </Menu.Item>) : ("")
            }

            {
              user_profile.userType.includes('sth') ?
            (<Menu.Item key="4" onClick={() => this.props.history.push("/account/stakeholder")}>
              <Icon type="user" />
              <span className="nav-text">Stackholder</span>
            </Menu.Item>) : ("")
            }
            <Menu.Item key="5" onClick={() => Meteor.logout()}>
              <Icon type="user" />
              <span className="nav-text">Log out</span>
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

                    <Route exact path="/account/my_account" component={Account} />
                    <Route exact path="/account/customer" component={Customer}  />

                    <Route exact path="/account/developer" component={Developer} />

                    <Route exact path='/account/developer/questions/:id' component={CreateInterview} />
                    <Route exact path='/account/developer/check_answers/:id' component={ShowAnswers} />
                    <Route exact path='/account/customer/questions/:id' component={ShowQuestions} />
                    <Route exact path='/account/customer/modify_project/:id' component={ModifyProject} />
                    <Route exact path='/account/developer/questions/edit_question/:id' component={EditQuestion} />

                    <Route exact path='/account/stakeholder' component={Stakeholder} />
                    <Route exact path='/account/stakeholder/questions/:id' component={ShowQuestions} />
            </div>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2019 Created by Anastasia Pichka, Aleksandra Shchetinina, Bekpasha Dursunov, Kusal KC</Footer>
        </Layout>
      </Layout>
    );
  }
  else{
    this.props.history.push("/auth/login");
    return(
      location.reload()
    );
  }

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
    profile: Profile.find({"userID": Meteor.userId()}).fetch()
    //users: Meteor.users.find().fetch(),
  };
})(withRouter(MainPage));
