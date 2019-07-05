import { Class } from 'meteor/jagi:astronomy';
import { array } from 'prop-types';


const Question = Class.create({
    name: 'Question',
    collection: new Meteor.Collection('questions'),
    fields: {// fields that items will have and the type of this field
        question: {
            type: String,
            optional: false,
        },
        projectID: {
            type: String,
            optional: false,
        },
        answers: {
            type: [String],
            default: function() {
                return [];
            }
        },
        users: {
            type: [String],
            default: function() {
                return [];
            }
        },
    }
});

export default Question;