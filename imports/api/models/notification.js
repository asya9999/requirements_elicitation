import { Class } from 'meteor/jagi:astronomy';

const Notification = Class.create({
    name: 'Natification',
    collection: new Meteor.Collection('notifications'),
    fields: {// fields that items will have and the type of this field
        customerID: {
            type: String,
            optional: false,
        },
        answersID: {
            type: [String],
            optional: false,
        },
        projectID: {
            type: String,
            optional: false,
        },
    }
});

export default Notification;