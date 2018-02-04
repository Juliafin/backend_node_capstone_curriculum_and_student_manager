const express = require('express');
const express_jwt = require('express-jwt');
const jwt = require('jsonwebtoken');
const curriculum_router = express.Router();
const mongoose = require('mongoose');
const {
  User
} = require('../../user_models/users');
const {
  Curriculum
} = require('../../student_models/models');
const bodyParser = require('body-parser');
const {
  SECRET
} = require('../../config_variables');


mongoose.Promise = global.Promise;
curriculum_router.use(bodyParser.urlencoded({     extended: true }));
curriculum_router.use(bodyParser.json());
curriculum_router.use(express_jwt({
  secret: SECRET
}));

// To be adjusted to return a list based on the teacher id
curriculum_router.get('/', (req, res) => {
  // console.log(req.query);
  // console.log(req.user);
  if (req.user._user.role === 'student') {
    Curriculum
      .findOne({
        'first_name': req.user._user.first_name,
        'last_name': req.user._user.last_name
      })
      .then((student_record) => {
        return res.status(200).json({
          student_record: student_record.studentView()
        });
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).json({
          error: err
        });
      });
  } else if (req.user._user.role === 'teacher') {

    if (Object.keys(req.query).length === 0) {
      Curriculum
        .find({
          'author.id': req.user._user._id
        })
        .then((student_records) => {
          return res.status(200).json({
            student_records: student_records.map((record) => {
              return record.apiView();
            })
          });
        })
        .catch((err) => {
          console.error(err);
          return res.status(500).json({
            error: err
          });
        });
    } else if (Object.keys(req.query).length > 0) {
      console.log(Object.keys(req.query).length);


      console.log(req.user);
      const filtersToSearch = {};
      const queryableFields = ['first_name', 'last_name', 'email', 'parent_first_name', 'parent_last_name', 'student_lesson_time'];
      queryableFields.forEach(field => {
          //  ?first_name=
        if (req.query[field]) {
          filtersToSearch[field] = req.query[field];
        }
      });
      Curriculum
          .find(filtersToSearch)
          .then(student_records => {
            res.status(200).json({
              student_records: student_records.map((record) => {
                return record.apiView();
              })
            });

          })
          .catch((err) => {
            console.error(err);
            res.status(500).json({
              message: 'Something went wrong with the server'
            });
          });

    }

  }

});

    // open to teachers only
curriculum_router.get('/:id', (req, res) => {
  if (req.user._user.role === 'teacher') {
    Curriculum
          .findById(req.params.id)
          .then((record) => {

            if (record.author.id === req.user_user._id) {
              return res.json(record.apiView());
            } else {
              res.status(401).json({
                error: 'Unauthorized to view this student'
              });
            }
          })
          .catch((err) => {
            console.error(err);
            res.status(500).json({
              message: "Internal server error: No ID match found"
            });
          });
  }
});

    // Only teachers can post a new student record
curriculum_router.post('/', (req, res) => {
  console.log('This is the req.body !@#$%!', req.body);
  console.log('headers', req.headers);
      // console.log(req);

  if (req.user._user.role === 'teacher') {

    const requiredFields = ['first_name', 'last_name', 'email', 'address', 'student_lesson_time'];
    const addressFields = ['street_address', 'state', 'city', 'zipcode'];
    const studentCurriculumFields = ['project_name', 'project_description'];
    const studentLessonTime = ['weekday', 'startTime', 'endTime'];
    let missing = {};
    let address = {};
    let student_lesson_time = {};
    let student_curriculum = {};

        // check if first tier of required fields is missing
    requiredFields.forEach(function (field) {
      if (!(field in req.body)) {
        missing[field] = field;
      }
    });

        // check if required address fields are missing
    addressFields.forEach(function (addressCategory) {
      if (!(addressCategory in req.body.address)) {
        address.addressCategory = addressCategory;
      }
    });

    if (Object.keys(address).length !== 0) {
      missing.address = address;
    }

        //  check if student lesson times are missing
    studentLessonTime.forEach(function (lessonField) {
      if (!(lessonField in req.body['student_lesson_time'])) {
        student_lesson_time[lessonField] = lessonField;
      }
    });

    if (Object.keys(student_lesson_time).length !== 0) {
      missing.student_lesson_time = student_lesson_time;
    }

    if (Object.keys(missing).length !== 0) {
      const missingObj = {
        missing_fields: missing
      };
      return res.status(400).json(missingObj);
    }

    Curriculum
      .find({        
        'first_name':req.body.first_name,
        'last_name':req.body.last_name,
        'email': req.body.email
      })
      .count()
      .then( (student_record) => {
        console.log('this is inside the duplicate search');
        console.log(student_record);
        if (student_record) {
          return res.status(500).json({error: 'student already exists'});
        }
      })
      .catch( (err) => {
        console.log(err);
      });

        // attach user data to created document
    req.body.author = {};
    req.body.author.id = req.user._user._id;
    req.body.author.first_name = req.user._user.first_name;
    req.body.author.last_name = req.user._user.last_name;
    Curriculum
          .create(req.body)
          .then(
            (student_record) => {
              return res.status(201).json(student_record.apiView());
            }
          )
          .catch((err) => {
            console.error(err);
            return res.status(500).json({
              message: "Internal Server Error"
            });
          });
  }
});

// Update a student record, providing the entire document in the req.body
curriculum_router.put('/:id', (req, res) => {
  if (req.user._user.role !== 'teacher') {
    return res.status(401).json({
      error: 'Unauthorized'
    });
  }

  let student_record;

  Curriculum
        .findByIdAndUpdate(req.params.id)
        .then((student_record) => {

          // Check whether there are updates for nested properties. 
          // Then delete them, and update tier 1 properties according to the req.body
          if ('address' in req.body) {
            student_record.address = req.body.address;
            delete req.body.address;
          }

          if ('student_lesson_time' in req.body) {
            student_record.student_lesson_time = req.body.student_lesson_time;
            delete req.body.student_lesson_time;
          }

          if ('student_curriculum' in req.body) {
            student_record.student_curriculum[req.body.index] = req.body.student_curriculum;
            delete req.body.student_curriculum;
            delete req.body.index;
          }

          let topLevelKeys = Object.keys(req.body);
          // console.log(topLevelKeys)
          topLevelKeys.forEach((key) => {
            // console.log(req.body[key]);
            // console.log(key);
            // console.log(student_record[key])
            student_record[key] = req.body[key];
          });

          student_record
            .save()
            .then((_student_record) => {
              console.log('this is the student record thats updated!!!')
              student_record = _student_record;
              student_record.bullshitKey = true;
              console.log(student_record)
              return res.status(201).json({
                updated: student_record
              });

            })
            .catch((err) => {
              console.error(err);
              return res.status(500).json({
                message: "Internal server error, document could not be updated."
              });
            });
        });
});

// Update student by adding a student project
// Provide the following:
// Index key to write to, student curriculum object with four properties: project date, project name, project description, and project comments
// also provide the id in the body
curriculum_router.put('/student-curriculum-projects/:id', (req, res) => {
  if (req.user._user.role === 'student' || !('user' in req)) {
    return res.status(401).json({
      error: 'unauthorized'
    });

  } else if (req.user._user.role === 'teacher') {

    console.log('This is the req.body from the add student project PUT request', req.body);
    const requiredFields = ['student_curriculum', 'id', 'index'];
    const missingFields = {};
    requiredFields.forEach( (field ) => {
      if (!(field in req.body)) {
        missingFields.push(field);
      }
    });

    if (Object.keys(missingFields).length !== 0) {
      return res.status(400).json({missingFields});
    } else {

      const index = parseInt(req.body.index);
      console.log ('student curriculum before update', req.body.student_curriculum);
      Curriculum
            .findById(req.params.id)            
            .then((student_record) => {
              student_record.student_curriculum[index] = req.body.student_curriculum;
              console.log('student record just before save', student_record);
              student_record
                .save()
                .then( (result) => {

                  console.log('student record after saving', result);
                  return res.status(201).json({
                    updated: result.apiView()
                  });
                });

            })
            .catch((err) => {
              console.error(err);
              return res.status(500).json({
                error: 'Internal server error, could not update the record.'
              });

            });
    }
    
  }

});

    // delete a student
curriculum_router.delete('/:id', (req, res) => {
  Curriculum
        .findByIdAndRemove(req.params.id)
        .then((blog) => {
          return res.status(200).json({
            item_deleted: blog
          });
        })
        .catch((err) => {
          console.error(err);
          res.status(500).json({
            message: "Internal server error, item not found."
          });
        });
});


    // delete a specific student project
    // expects full curriculum object to be provided

curriculum_router.delete('/student-curriculum-projects/:id', (req, res) => {
  console.log('the delete project endpoint has been activated')
  if (req.user._user.role === 'student' || !('user' in req)) {
    return res.status(401).json({
      error: 'unauthorized'
    });

  } else if ('student_curriculum' in req.body) {

    Curriculum
          .findByIdAndUpdate(req.params.id, {
            $pull: {
              "student_curriculum": req.body.student_curriculum
            }
          }, {
            new: true
          })
          .then((student_record) => {
            return res.status(201).json({
              delete: student_record
            });
          })
          .catch((err) => {
            console.error(err);
            return res.status(500).json({
              error: 'Internal server error, could not delete the record.'
            });

          });
  }
});

module.exports = curriculum_router;