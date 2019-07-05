import { Class } from 'meteor/jagi:astronomy';


const Project = Class.create({                  // Main class of users
  name: 'Project',
  collection: new Meteor.Collection('projects'),    // Creating the collection of users in database

  fields: {// fields that users will have and the type of this field

    title: {
      type: String,
      optional: false,

    },

    description: {
      type: String,
      optional: true,
    },

    developerID: {
        type: [String],
        default: function() {return []},
        optional: false,
    },

    customerID: {
      type: String,
      optional: false,
    },

    stakeholderID: {
      type: [String],
      default: function() {return []},
      optional: false,
    },

    comments: {
        type: String,
        optional: true,
      },

  },

});


export default Project