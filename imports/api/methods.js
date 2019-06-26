import {Meteor} from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base'
import Profile from './models/profile';
import Question from './models/question';

Meteor.methods({
    'addQuestion'(values){
        let question = new Question({
            question: values.question,
            answers: values.answer,
            users: values.users,
        });
        question.save();
        console.log('Question Added');
    },
})