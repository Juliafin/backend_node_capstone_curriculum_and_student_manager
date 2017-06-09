`use strict`;

const express = require('express');
const morgan = require('morgan');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const {PORT, DATABASE_URL} = require('./config_variables');

const app = express();
const {Curriculum} = require('./student_models/models');
const {User} = require('./user_models/users');
const curriculum_router = require('./routers/curriculum_router/curriculum_router');
const auth_router = require('./routers/auth_router');
const welcome_router = require('./routers/welcome_router/welcome');
const {generateFakeCurriculumData} = require('./student_models/seedDB');
const {generateUser, saveUser} = require('./user_models/seedUsers');

app.use(morgan('combined'));
app.use('/welcome', welcome_router);
app.use('/cu-manager', curriculum_router);
app.use('/auth', auth_router);
app.use(express.static('./public/login_registration/assets'));


app.use('*', (req, res) => {
  res.redirect('/welcome');
});





// add server functions to export for tests
let server;

function runServer(databaseUrl= DATABASE_URL, port=PORT) {
  return new Promise( (resolve,reject) => {
    mongoose.connect(databaseUrl, (err) => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        
        resolve(server);
      })
      .on('error', err => {
        mongoose.disconnect();
        reject(err);
      });
    });
    mongoose.connection.once('open', () => {

      
      console.log('mongoose connected');} );
  });
  
}

function closeServer() {

  return mongoose.disconnect().then( () => { 
    console.log('mongoose disconnecting');
    return new Promise( (resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          reject(err);
          return;
        } 
        resolve();
      });
    }); 
  });
}

if(require.main === module) {
  runServer()
  .then(function () {
    User.count()
        .then(function(count) {
          if (count === 0){
            saveUser(generateUser());
          }
        });
    Curriculum.count()
        .then(function(count) {
          if (count === 0) {
            generateFakeCurriculumData(19);      
          }
        });

  })
  .catch( err => {console.error(`There was an error: ${err}`);
  });
}

module.exports = {app, runServer, closeServer};
