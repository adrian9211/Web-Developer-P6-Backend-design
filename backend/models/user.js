const mongoose = require('mongoose');                                   // Import mongoose 
const uniqueValidator = require('mongoose-unique-validator');           // Import uniqueValidator for mongoose

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);