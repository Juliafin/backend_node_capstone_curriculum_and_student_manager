const express = require('express');
const auth_router = express.Router();
const jwt = require('jsonwebtoken');
const express_jwt = require('express-jwt');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const {
  SECRET
} = require('../../config_variables');
const morgan = require('morgan');
const faker = require('faker');

auth_router.use(morgan('combined'));

mongoose.Promise = global.Promise;

const {
  User
} = require('../../user_models/users');

auth_router.use(bodyParser.json());
auth_router.use(bodyParser.urlencoded({
  extended: false
}));

/*
  Strategy:
  Check if fields are missing.
  If there are, let the user know which ones.
  If there are no missing fields,
  Check if a user with that username exists,
  If the user exists, return an error.
  If not, hash the password then create the user.
  To add: redirection
*/
auth_router.post('/register', (req, res) => {
  const userFields = ['username', 'password', 'first_name', 'last_name', 'role'];
  const missingFields = [];

  userFields.forEach((field) => {
    if (!(field in req.body) || (field === "")) {
      missingFields.push(field);
    }
  });

  if (missingFields.length !== 0) {
    res.status(400).json({
      missingFields
    });
  } else {
    let password = req.body.password;

    User
      .find({
        'username': req.body.username
      })
      .count()
      .then((count) => {
        if (count > 0) {
          return res.status(422).json({
            message: 'username already taken'
          });
        } else {
          return User.hashPassword(password)
            .then((hash) => {
              return User
                .create({
                  username: req.body.username,
                  password: hash,
                  role: req.body.role,
                  first_name: req.body.first_name,
                  last_name: req.body.last_name
                })
                .then((user) => {
                  return res.status(201).json(user.showUser());
                })
                .catch((err) => {
                  console.error(err);
                  return res.status(500).json(err);
                });
            });
        }
      });
  }
});

/*
Strategy:
Accept a username and password to login
Search the database for the username
If the user is not found return an bad request error
If the user is found valid the password in the db by hashing the provided one and checking the hashes
If passwords do not match, return an unauthorized error
If passwords match, sign a json web token and send it to the user
To add: redirection
*/

auth_router.post('/login', (req, res) => {
  const {
    username,
    password
  } = req.body;
  let _user;
  User
    .findOne({
      username
    })
    .then((user) => {
      _user = user;
      // console.log(user);
      if (user) {
        return user.validatePassword(password);
      } else { // user not found
        return res.status(400).json({
          error: 'Username or Password not found.'
        });
      }
    })
    .then((passwordValid) => {
      if (passwordValid) {
        const token = jwt.sign({
          _user
        }, SECRET);
        return res.status(200).json({
          token:token,
          username:req.body.username,
          url: `/welcome/dashboard/${req.body.username}` 
        });
      } else { // password doesn't match
        return res.status(401).json({
          error: 'Username or Password not Found.'
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});


auth_router.get('/users', express_jwt({
  secret: SECRET
}), (req, res) => {
  // console.log(SECRET);
  // console.log(req.headers.authorization);
  // console.log(req.user)
  User
    .find()
    .then(function (users) {
      res.status(200).json({
        users
      });
    });

});


auth_router.post('/authenticate', express_jwt({
  secret: SECRET
}), (req, res) => {

  // setTimeout(() => console.log('hello from /authenticate'), 1000);
  // console.log(req.user);
    // console.log(path.resolve(process.cwd() + '/config_variables')
// console.log(SECRET);
  res.status(200).json( {

    url: `/welcome/dashboard/${req.user._user.username}`,
    username: req.user._user.username,
    first_name: req.user._user.first_name,
    last_name: req.user._user.last_name,
    role: req.user._user.role

  });

});



module.exports = auth_router;