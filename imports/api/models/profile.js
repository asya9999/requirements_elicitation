import { Class } from 'meteor/jagi:astronomy';


const Profile = Class.create({                  // Main class of users
  name: 'Profile',
  collection: new Meteor.Collection('profiles'),    // Creating the collection of users in database

  fields: {// fields that users will have and the type of this field

    userID: {
      type: String,
      optional: true,

    },

    email: {
      type: String,
      optional: true,

    },

    userType: {
      type: [String],
      default: function() {return []},
      optional: false,
    },

    name: {
      type: String,
      optional: false,
    },

    surname: {
      type: String,
      optional: false,
    },



  },

});


export default Profile