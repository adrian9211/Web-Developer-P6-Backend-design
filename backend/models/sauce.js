// Data models 
const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({
                                     userId: {type: String, required: true},                 //the MongoDB unique identifier for the user who created the sauce
                                     name: {type: String, required: true},                   //name of the sauce
                                     manufacturer: {type: String, required: true},           //manufacturer of the sauce
                                     description: {type: String, required: true},            //description of the sauce
                                     mainPepper: {type: String, required: false},            //the main pepper ingredient in the sauce
                                     imageUrl: {type: String, required: true},               //the URL for the picture of the sauce uploaded by the user
                                     heat:{type: Number, required: true, min: 1, max: 10},   //number between 1 and 10 describing the sauce
                                     likes: {type: Number, required: false, default: 0},     //number of users liking the sauce
                                     dislikes: {type:  Number, required: false, default: 0}, //number of users disliking the sauce
                                     usersLiked:[{type: String}],                            //array of user IDs of users having liked the sauce
                                     usersDisliked: [{type: String}]                         //array of user IDs of users having disliked the sauce
                                  });
module.exports = mongoose.model('Thing', sauceSchema);