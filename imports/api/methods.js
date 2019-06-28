import { Accounts } from 'meteor/accounts-base'
import Profile from './models/profile';
import { Meteor } from 'meteor/meteor';
import {updateObject} from "./utility";
import Project from './models/project';
import Question from './models/question';


Meteor.methods({

  'addUser'(values,callback) {
    
    Accounts.createUser({
      username: values.username,
      password: values.password,
    },callback);
    console.log(values.username);

    const user = Meteor.users.findOne({username : values.username});


    let profile = new Profile({
      userID: user._id,
      email: values.email,
      userType: values.userType,
      name: values.name,
      surname: values.surname,
    });

    // Accounts.sendEnrollmentEmail(user._id);
    profile.save();
  },

  'delUser'(username) {
    Meteor.users.remove({username});
    Profile.remove({"username":username});
  },

  'editProfile'(ID,values) {
    let profile = Profile.findOne({userID:ID});
    console.log(values);

    profile = new Profile({...updateObject(profile,values)});

    profile.save();
  },

});

Meteor.methods({

  'addProject'(values) {
    console.log(values);

    Project.insert({
      title: values.title,
      description: values.desc,
      developerID: values.dev,
      stakeholderID: values.sth,
      comments: values.com,
      customerID: values.customer,
    });
  },

  'delProject'(projectID) {
    Project.remove({_id: projectID})
  },


  'editProject'(ID,values) {
    let project = Project.findOne({_id:ID});
    console.log(values);

    project = new Project({...updateObject(project,values)});

    project.save();
  },

});


Meteor.methods({
  'addQuestion'(values){
      let question = new Question({
          question: values.question,
          answers: values.answer,
          users: values.users,
          projectID: values.projectID,
      });
      question.save();
      console.log('Question Added');
  },
})