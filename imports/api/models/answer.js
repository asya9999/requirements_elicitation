import { Class } from 'meteor/jagi:astronomy';

const Answer = Class.create({
    name: 'Answer',
    collection: new Meteor.Collection('answers'),
    fields: {// fields that items will have and the type of this field
        questionID: {
            type: String,
            optional: false,
        },
        projectID: {
            type: String,
            optional: false,
        },
        userID: {
            type: String,
            optional: false,
        },
        type: {
            type: String,
            optional: false,
        },
        answer: {
            type: String,
            optional: false,
        },
        comment: {
            type: String,
            optional: true,
        },
    }
});

export default Answer;