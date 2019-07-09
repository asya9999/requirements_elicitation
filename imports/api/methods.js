import { Accounts } from 'meteor/accounts-base'
import Profile from './models/profile';
import { Meteor } from 'meteor/meteor';
import {updateObject} from "./utility";
import Project from './models/project';
import Question from './models/question';
import Answer from './models/answer';
import Notification from './models/notification';


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
    Project.remove({_id: projectID});
    Question.remove({projectID: projectID});
    Answer.remove({projectID: projectID});
    Notification.remove({projectID: projectID})
  },


  'editProject'(ID,values) {
    let project = Project.findOne({_id:ID});
    console.log(values);

    if (values.title)
      project.title = values.title;
    if (values.desc)
      project.description = values.desc;
    if (values.dev)
      project.developerID = values.dev;
    if (values.sth)
      project.stakeholderID = values.sth;
    if (values.com)
      project.comments = values.com;

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
  'delQuestion'(questionID) {
    Question.remove({_id: questionID})
  },

  'editQuestion'(ID,values){
    console.log('method', values);
    let question = Question.findOne({_id:ID});

    if (values.question)
      question.question = values.question;
    if (values.users)
      question.users = values.users;

    question.save()
  }
});

Meteor.methods({
  'addAnswer'(values){
      let answer = new Answer({
        questionID: values.questionID,
        projectID: values.projectID,
        userID: values.userID,
        type: values.type,
        answer: values.answer
      });
      answer.save();
      console.log('Answer Added');
  },
  'chooseAndComment'(values){
    let answer = Answer.findOne({_id: values.id});
    answer.comment = values.comment;
    answer.save();
  },
  'delAnswer'(answerID) {
    Answer.remove({_id: answerID})
  },
});

Meteor.methods({
  'addNotification'(values){
      let notification = new Notification({
        customerID: values.customerID,
        answersID: values.answersID,
        projectID: values.projectID,
      });
      notification.save();
      console.log('Notification Added');
  },
  'delNotification'(noteID) {
    Notification.remove({_id: noteID})
  },
});