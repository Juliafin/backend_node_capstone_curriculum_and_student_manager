const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

mongoose.Promise = global.Promise;

const userValidation = [/^\w{4,}$/, 'Username must contain only alphanumberic characters'];
const maxlength = [20, 'The length is longer than 20 characters.'];
const roleValidation = [/(?=^student$)|(?=^teacher$)|(?=^admin$)/, 'Role must be a teacher or a student'];
const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: maxlength,
    match: userValidation,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    trim: true
  },
  role: {
    type: String,
    required: true,
    match: roleValidation
  },
  first_name: {
    type: String,
    minlength: 2,
    maxlength: maxlength,
    required: true,
    trim: true
  },
  last_name: {
    type: String,
    minlength: 2,
    maxlength: maxlength,
    required: true,
    trim: true
  }
});

userSchema.methods.showUser = function () {
  return {
    username: this.username,
    first_name: this.first_name,
    last_name: this.last_name,
    role: this.role,
    id: this._id
  };  
};

userSchema.statics.hashPassword = function(password) {
  return bcrypt.hash(password, 10);
};

userSchema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model('user', userSchema);

module.exports = {
  User
};