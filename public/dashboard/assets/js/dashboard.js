var state = {
  student_records: [],
  teacher_first_name: '',
  teacher_last_name: '',
  templates: {
    addStudent: `
    <div class="addStudent popIn">
    <h1>Add a Student</h1>
      <p class="optional_text">Optional<span class="optional">*</span></p>

      <form class="signup">
        <fieldset class="general_info"> General info

        <div class="mode_select">
          <label for="add_student" id="add_label">Add Student</label>            
          <input type="radio" name="radSize" id="add_student" value="add_student" checked="checked">
          <label for="edit_student" id="edit_label">Edit Student</label>
          <input type="radio" name="radSize" id="edit_student" value="edit_student">
        </div>

          <br>
          <label for="first_name">First name</label>
          <input type="text" name="first_name" id="first_name">

          <label for="last_name">Last name</label>
          <input type="text" name="last_name" id="last_name">

          <br>
          <label for="email">Email</label>
          <input type="email" name="email" id="email">
          <br>
          <label for="parent_first_name">Parent's First Name<span class="optional">*</span></label>
          <input type="text" name="parent_first_name" id="parent_first_name">

          <label for="parent_last_name">Parent's Last Name<span class="optional">*</span></label>
          <input type="text" name="parent_last_name" id="parent_last_name">
        </fieldset>

        <fieldset> Address
          <br>

          <label for="street_address">Street Address</label>
          <input type="text" name="street_address" id="street_address">

          <label for="apartment_number">Apartment #<span class="optional">*</span></label>
          <input type="text" name="apartment_number" id="apartment_number">
          <br>
          <label for="city">City</label>
          <input type="text" name="city" id="city">

          <label for="state">State</label>
          <select id="state">
              <option value="AL">Alabama</option>
              <option value="AK">Alaska</option>
              <option value="AZ">Arizona</option>
              <option value="AR">Arkansas</option>
              <option value="CA">California</option>
              <option value="CO">Colorado</option>
              <option value="CT">Connecticut</option>
              <option value="DE">Delaware</option>
              <option value="DC">District Of Columbia</option>
              <option value="FL">Florida</option>
              <option value="GA">Georgia</option>
              <option value="HI">Hawaii</option>
              <option value="ID">Idaho</option>
              <option value="IL">Illinois</option>
              <option value="IN">Indiana</option>
              <option value="IA">Iowa</option>
              <option value="KS">Kansas</option>
              <option value="KY">Kentucky</option>
              <option value="LA">Louisiana</option>
              <option value="ME">Maine</option>
              <option value="MD">Maryland</option>
              <option value="MA">Massachusetts</option>
              <option value="MI">Michigan</option>
              <option value="MN">Minnesota</option>
              <option value="MS">Mississippi</option>
              <option value="MO">Missouri</option>
              <option value="MT">Montana</option>
              <option value="NE">Nebraska</option>
              <option value="NV">Nevada</option>
              <option value="NH">New Hampshire</option>
              <option value="NJ">New Jersey</option>
              <option value="NM">New Mexico</option>
              <option value="NY">New York</option>
              <option value="NC">North Carolina</option>
              <option value="ND">North Dakota</option>
              <option value="OH">Ohio</option>
              <option value="OK">Oklahoma</option>
              <option value="OR">Oregon</option>
              <option value="PA">Pennsylvania</option>
              <option value="RI">Rhode Island</option>
              <option value="SC">South Carolina</option>
              <option value="SD">South Dakota</option>
              <option value="TN">Tennessee</option>
              <option value="TX">Texas</option>
              <option value="UT">Utah</option>
              <option value="VT">Vermont</option>
              <option value="VA">Virginia</option>
              <option value="WA">Washington</option>
              <option value="WV">West Virginia</option>
              <option value="WI">Wisconsin</option>
              <option value="WY">Wyoming</option>
            </select>

          <label for="zipcode">Zipcode</label>
          <input type="text" name="zipcode" id="zipcode">

        </fieldset>


        <fieldset>Student Lesson Time
          <br>

          <label for="startDate">Lesson Start Date</label>
          <input type="date" name="startDate" id="startDate">

          <label for="weekday">Weekday</label>

          <select id="weekday">
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
              <option value="Sunday">Sunday</option>
            </select>

          <br>

          <label for="startTime">Start Time</label><input type="text" name="startTime" class="time_element" id="startTime">

          <label for="endTime">End Time</label>
          <input type="text" name="endTime" class="time_element" id="endTime">

          </label>
        </fieldset>
        <label for="teacher_comments">Teacher Comments<span class="optional">*</span></label>
        <br>
        <textarea type="textarea" name="teacher_comments" id="teacher_comments">
        </textarea>

        <div class="button_container">
          <button type="submit" name="add_student">Add Student</button>
        </div>



      </form>
      </div>
      `,

    unauthorized: `
      <div class="unauthorized">
        <p class="unauthorized_redirect">You are being redirected back to the login page in 5 seconds.</p>
      </div>
        `,

    addStudentProject: `
    <div class="addProject popIn">
      <h1>Add a Project</h1>
      <p class="optional_text">Student name must match an existing student.<span class="optional">*</span></p>

      
      <form class="project">

          <div class="mode_select">
          <label for="add_student_project" id="add_label">Add Student Project</label>            
          <input type="radio" name="radSize" id="add_student_project" value="add_student_project" checked="checked">
          <label for="edit_student_project" id="edit_label">Edit Student Project</label>
          <input type="radio" name="radSize" id="edit_student_project" value="edit_student_project">
        </div>

          <label for="first_name">Student's first name</label>
          <input type="text" name="student_first_name" id="student_first_name">

          <label for="last_name">Student's last name</label>
          <input type="text" name="student_last_name" id="student_last_name">

          <label for="email">Student's Email</label>
          <input type="email" name="student_email" id="student_email">
        
          <label for="project_date">Project Date</label>
          <input type="date" name="project_date" id="project_date">

          <label for="project_name">Project Name</label>
          <input type="text" name="project_name" id="project_name">

          <label for="project_description">Project Description</label>
          <input type="text" name="project_description" id="project_description">

          <label for="project_comments">Project Comments</label>
          <textarea type="textarea" name="project_comments" id="project_comments">
          </textarea>
          
          <div class="button_container">
          <button type="submit" name="add_student_project" id="student_project">Add Student Project</button>
          </div>
      
      </form>
    </div>
    `,

    studentList: `
    <div class="studentList popIn">
      <h1>Student List</h1>
      <div class="card_container">
      </div>
    </div>`
  }
};

function studentNavbarListener () {
   $('nav li').click(function (event) {
    console.log('clicked');

  });
}

function navbarListener() {

  $('nav li').click(function (event) {

    if ($(this).text() === 'Add / Edit Student') {
      setTimeout(function () {
        // console.log('scrolling up');
        $(this).scrollTop(0);

      }, 1);

      $('div.background').empty();
      $('div.background').html(state.templates.addStudent);
      $(this).addClass('selected');
      $('div.nav li').not($(this)).removeClass('selected');
      $('.time_element').timepicki({
        overflow_minutes: true,
        increase_direction: 'up',
        step_size_minutes: 15,
        reset: true
      });

      addStudentListener();

    }

    if ($(this).text() === 'Add Student Project') {

      setTimeout(function () {
        // console.log('scrolling up');
        $(this).scrollTop(0);

      }, 1);

      $('div.background').empty();
      // TODO Make template
      $('div.background').html(state.templates.addStudentProject);
      $(this).addClass('selected');
      $('div.nav li').not($(this)).removeClass('selected');
      studentProjectListener();
      $('input#project_date').val(moment().format('YYYY-MM-DD'));
    }

    if ($(this).text() === 'Student List and Schedule') {
      setTimeout(function () {
        // console.log('scrolling up');
        $(this).scrollTop(0);

      }, 1);

      $('div.background').empty();
      // TODO Make template
      $('div.background').html(state.templates.studentList);
      $(this).addClass('selected');
      $('div.nav li').not($(this)).removeClass('selected');
      renderStudentCard(state.student_records);
    }

    if ($(this).attr('id') === 'logged_in') {
      console.log('clearing token');
      window.localStorage.setItem('token', '');
      window.localStorage.setItem('current_user', '');
      window.localStorage.setItem('dashboard_url', '');
      window.location = "/";

    }
  });
}

function displayNav() {
  if (window.localStorage.getItem('token')) {

    var loggedIn = `
    <nav>
      <div class="nav">
        <li>Add / Edit Student</li>
        <li>Add Student Project</li>      
  		  <li>Student List and Schedule</li>
        <li id="logged_in">Not <span>${window.localStorage.getItem('current_user')}?</span class="logged_user"><br><span>Log out</span></li>
    </div>
  </nav>
              `;

    $('body').append(loggedIn);
    navbarListener();

  }
}

function displayStudentNav() {
  if (window.localStorage.getItem('token')) {

    var loggedIn = `
    <nav>
      <div class="nav">
        <li>Welcome</li>
        <li>Student Projects</li>
        <li id="logged_in">Not <span>${window.localStorage.getItem('current_user')}?</span class="logged_user"><br><span>Log out</span></li>
    </div>
  </nav>
              `;

    $('body').append(loggedIn);
    studentNavbarListener();

  }
}

function getStudentData() {
  return $.ajax({
    type: 'GET',
    url: '/cu-manager/',
    headers: {
      Authorization: `bearer ${window.localStorage.getItem('token')}`
    }
  });
}


function postStudentData(studentObj) {
  console.log('this is the obj to be sent', studentObj);
  return $.ajax({
    type: 'POST',
    url: '/cu-manager/',
    data: studentObj,
    headers: {
      Authorization: `bearer ${window.localStorage.getItem('token')}`
    }
  });
}

function addStudentListener() {

  $('button[name="add_student"]').click(function (event) {
    event.preventDefault();
    var studentObj = {

      first_name: $('input[name="first_name"]').val(),
      last_name: $('input[name="last_name"]').val(),
      email: $('input[name="email"]').val(),
      parent_first_name: $('input[name="parent_first_name"]').val(),
      parent_last_name: $('input[name="parent_last_name"]').val(),
      street_address: $('input[name="street_address"]').val(),
      apartment_number: $('input[name="apartment_number"]').val(),
      city: $('input[name="city"]').val(),
      state: $('select#state').val(),
      zipcode: $('input[name="zipcode"]').val(),
      startDate: $('input[name="startDate"]').val(),
      weekday: $('select#weekday').val(),
      startTime: $('input[name="startTime"]').val(), // 12:30
      endTime: $('input[name="endTime"]').val(), // 01:30
      teacher_comments: $('textarea[name="teacher_comments"]').val()
    };

    console.log(studentObj.startTime);
    console.log(studentObj.endTime);

    // convert time/date fiels to ISO strings
    var rawstartTime = moment(studentObj.startTime, "hh:mm:A").format("HH:mm");
    var rawendTime = moment(studentObj.endTime, "hh:mm:A").format("HH:mm");
    var startDate = moment(studentObj.startDate, 'YYYY-MM-DD').toISOString();
    console.log(rawendTime, rawstartTime);
    var startTime = moment(rawstartTime, "hh:mm").toISOString();
    var endTime = moment(rawendTime, "hh:mm").toISOString();
    studentObj.startTime = startTime;
    studentObj.startDate = startDate;
    studentObj.endTime = endTime;
    // console.log(studentObj.startDate);
    console.log(startDate);

    console.log(studentObj);

    var validatedStudent = validateNewStudent(studentObj);
    console.log('validated student', validatedStudent);
    if ('message' in validatedStudent && validatedStudent.message === 'No errors found.') {
      delete validatedStudent.message;
      postStudentData(validatedStudent)
        .then(function (data) {
          console.log(data);
          state.student_records.push(data);
          var success = `
          <p class="success">Student successfully added!</p>
          `;
          $('div.button_container').before(success);
          clearStudentform();
        })
        .catch(function (err) {
          console.log('There was an error');
          console.log(err);
        });
    }

  });
}


function validateNewStudent(studentObj) {

  $('.error').remove();

  var errors = {};
  var formData = {};
  formData.address = {};
  formData.student_lesson_time = {};
  $('.error').remove();
  console.log(studentObj);

  Object.keys(studentObj).forEach(function (field) {
    console.log(studentObj[field]);
    console.log(field);

    if (studentObj[field] === "") {
      // if the following fields are empty, do nothing (they are optional)
      switch (field) {
      case 'parent_first_name':
      case 'parent_last_name':
      case 'apartment_number':
      case 'teacher_comments':
        break;
      default:
        errors[field] = `The ${field.replace('_', ' ')} field is empty.`;
      }

    } else {
      switch (field) {

      case "first_name":
      case "last_name":
      case "parent_first_name":
      case "parent_last_name":
        var nameValid = new RegExp(/^([ \u00c0-\u01ffa-zA-Z'\-]{1,20})+$/);
        if (!(nameValid.test(studentObj[field]))) {
          errors[field] = `The ${field.replace('_', ' ')} field must be between 1 and 20 characters and contain only UTF-8 letters and/or a hyphen.`;
        } else {
          formData[field] = studentObj[field];
        }
        break;

      case "email":
        var emailValid = new RegExp(/^.+@{1}.+\.[a-zA-Z]{2,4}$/);
        if (!(emailValid.test(studentObj[field]))) {
          errors[field] = `The ${field} field is not valid.`;
        } else {
          formData[field] = studentObj[field];
        }
        break;

      case "city":
        var cityValid = new RegExp(/^([ \u00c0-\u01ffa-zA-Z'\-]{2,20})+$/);
        if (!(cityValid.test(studentObj[field]))) {
          errors[field] = `The ${field} field must contain only UTF-8 letters and be between 2 and 20 characters.`;
        } else {
          formData.address[field] = studentObj[field];
        }
        break;

      case "zipcode":
        var zipcodeValid = new RegExp(/^\d{5}(?:[-\s]\d{4})?$/);
        if (!(zipcodeValid.test(studentObj[field]))) {
          errors[field] = `The ${field} field must either be in the format XXXXX or XXXXX-XXXX.`;
        } else {
          formData.address[field] = studentObj[field];
        }
        break;

      case "apartment_number":
      case "state":
      case "street_address":
        formData.address[field] = studentObj[field];
        break;

      case "teacher_comments":
        formData[field] = studentObj[field];
        break;

      case "startDate":
      case "weekday":
      case "startTime":
        formData.student_lesson_time[field] = studentObj[field];
        break;
      case "endTime":
        var startTime = moment(studentObj.startTime).format("HH:mm");
        var endTime = moment(studentObj.endTime).format("HH:mm");
        var startTimeN = parseInt(startTime.replace(":", ""));
        var endTimeN = parseInt(endTime.replace(":", ""));
        console.log(startTime);
        console.log('start time', startTimeN);
        console.log(endTime);
        console.log('end time', endTimeN);
        if (endTimeN < startTimeN) {
          errors[field] = `The ${field} cannot be before the start time.`;
        } else {
          formData.student_lesson_time[field] = studentObj[field];
        }
      }
    }
  });

  if (Object.keys(errors).length > 0) {

    console.log(errors);

    Object.keys(errors).forEach(function (elem) {
      var currentError = errors[elem];
      var errorMsg = `<p class="error" id="${elem}_error"> ${currentError}</p>`;
      $(`input[name="${elem}"]`).after(errorMsg);
    });
    return errors;

  } else {
    formData.message = "No errors found.";
    console.log(formData);
    return formData;
  }
}

function studentProjectListener() {
  $('button#student_project').click(function (event) {
    event.preventDefault();
    $('input#project_date').val(moment().format('YYYY-MM-DD'));
    var student_curriculum = {
      student_first_name: $('input[name="student_first_name"]').val().trim(),
      student_last_name: $('input[name="student_last_name"]').val().trim(),
      email: $('input[name="student_email"]').val().trim(),
      project_date: $('input#project_date').val().trim(),
      project_name: $('input#project_name').val().trim(),
      project_description: $('input#project_description').val().trim(),
      teacher_project_comments: $('textarea#project_comments').val().trim()
    };

    // Validate the input and verify the 'no errors' message 
    var validatedProject = validateStudentProject(student_curriculum);

    console.log(validatedProject);
    UpdateStudentProject(validatedProject);

    
  });
}




function UpdateStudentProject (checkedProject) {

  if ('message' in checkedProject && checkedProject.message === 'No errors found.') {
    delete checkedProject.message;

      // Find the student record in the state, and append it's position in the array to the object for later processing 
    var searchResult = state.student_records.find(function (record) {
      if (record.first_name === checkedProject.student_first_name &&
          record.last_name === checkedProject.student_last_name &&
          record.email === checkedProject.email
        ) {
        return record;
      } else {
        return false;
      }

    });
      // use the index to update the returned item in the state if it is found

    var searchResultIndex = searchResult.order - 1;
    console.log('Search result in state matching the student the project belongs to', searchResult);
      // If the result is found, build the object to send
      // for the update containing: student_curriculum (project date, project name, project description, project comments), the id
      // Delete the extra keys not needed in the object
    if (searchResult) {
      var index = searchResult.student_curriculum.length.toString();

      delete checkedProject.student_first_name;
      delete checkedProject.student_last_name;
      delete checkedProject.email;

      sendStudentProject(checkedProject, searchResult.id, index)
          .then(function (student_record) {
            console.log('the result was successful');
            console.log(student_record);
            // write the change back to the state;

            student_record.updated.student_curriculum.forEach(function (project, projectIndex) {
              console.log(project);
              console.log(state.student_records[searchResultIndex].student_curriculum[projectIndex]);
              state.student_records[searchResultIndex].student_curriculum[projectIndex] = project;
            });

            var success = `<p class="success">Project successfully added.</p>`;

            $('button#student_project').before(success);


            

            console.log('Updated state:', state.student_records);

          })
          .catch(function (err) {
            console.log(err);
          });


    } else {
      console.log('the search result wasnt found');
    }
  }
}




function validateStudentProject(curriculum) {
  console.log(curriculum);
  var errors = {};
  var formdata = {};


  Object.keys(curriculum).forEach(function (field) {
    if (curriculum[field] === '') {
      errors[field] = `The ${field} field is empty.`;
    } else {
      switch (field) {

      case 'student_first_name':
      case 'student_last_name':
        var whiteSpace = new RegExp(/\s/);
        if (curriculum[field].length > 25) {
          errors[field] = `The ${field.replace('_', ' ')} field must have a maximum of 25 characters.`;
        } else if ((whiteSpace.test(curriculum[field] === false))) {
          errors[field] = `The ${field.replace('_', ' ')} field must not have spaces.`;
        } else {
          formdata[field] = curriculum[field];
        }
        break;

      case 'project_name':
        if (curriculum[field].length > 30) {
          errors[field] = `The ${field.replace('_', ' ')} field must be between 1 and 30 characters.`;
        } else {
          formdata[field] = curriculum[field];
        }
        break;

      case 'project_description':
        if (curriculum[field].length > 100) {
          errors[field] = `The ${field.replace('_', ' ')} field must be between 1 and 100 characters.`;
        } else {
          formdata[field] = curriculum[field];
        }
        break;

      case 'teacher_project_comments':
        formdata[field] = curriculum[field];
        break;

      case 'project_date':
        formdata[field] = curriculum[field];
        break;

      case "email":
        var emailValid = new RegExp(/^.+@{1}.+\.[a-zA-Z]{2,4}$/);
        if (!(emailValid.test(curriculum[field]))) {
          errors[field] = `The ${field} field is not valid.`;
        } else {
          formdata[field] = curriculum[field];
        }
        break;

      } // ends switch
    }
  });

  if (Object.keys(errors).length > 0) {
    Object.keys(errors).forEach(function (elem) {
      var currentError = errors[elem];
      var errorMsg = `<p class="error" id="${elem}_error"> ${currentError}</p>`;
      $(`input[name="${elem}"]`).after(errorMsg);
    });


    console.log(errors);
    return errors;
  } else {
    formdata.message = "No errors found.";
    console.log(formdata);
    return formdata;
  }

}

function clearStudentform() {
  $('input[name="first_name"]').val(''),
    $('input[name="last_name"]').val(''),
    $('input[name="email"]').val(''),
    $('input[name="parent_first_name"]').val(''),
    $('input[name="parent_last_name"]').val(''),
    $('input[name="street_address"]').val(''),
    $('input[name="apartment_number"]').val(''),
    $('input[name="city"]').val(''),
    $('select#state').val(''),
    $('input[name="zipcode"]').val(''),
    $('input[name="startDate"]').val(''),
    $('select#weekday').val(''),
    $('input[name="startTime"]').val(''),
    $('input[name="endTime"]').val(''),
    $('input[name="teacher_comments"]').val('');
}

function renderStudentCard(state) {

  state.forEach(function (student_record, index) {
    // var colorArr = ['#4caf50','#9c27b0', '#ff5722', '#ffc107' ];
    // var lastColor = colorArr[Math.floor(Math.random() * colorArr.length)];
    //  var colorIndex = 0;
    //  if (colorIndex > 3) {
    //    colorIndex = 0;
    //  }

    var studentCard = `
    <div class="card flip" id=${student_record.id}>
      <div class="card_color">
        <button class="add_student_project">
        Add Student Project
        </button>
        <button class="student_info">
        Student info
        </button>
      </div>
      <div class="student_container">
      <p class="student_basic_info">Name: ${student_record.first_name} ${student_record.last_name}</p>
      <p class="lesson_time">Lesson time: <br> ${student_record.student_lesson_time.weekday} at ${moment(student_record.student_lesson_time.startTime).format("hh:mm A")}</p>
      </div>
    </div>
  `;
    

    // stagger the append of the cards
    setTimeout(function () {
      // var bgColor = colorArr[Math.floor(Math.random() * colorArr.length)];
      // while (bgColor === lastColor) {
      //   bgColor = colorArr[Math.floor(Math.random() * colorArr.length)];
      // }
      $('.card_container').append(studentCard);
      // console.log(colorIndex);
      // console.log(colorArr[colorIndex]);
      // $(`.card_color${colorIndex}`).css('background-color', lastColor);
      // colorIndex +=1;
    }, 400 * index);

  });

}


function addstudentProjecCardListener () {

  $('div.background').on('click', 'button.add_student_project', function (event) {
    event.preventDefault();

    console.log('add student project clicked on card');

    var id = $(this).closest('div.card').attr('id');
    // console.log(id);
    var student_record = state.student_records.find(function (record) {
      // console.log(id);
      if (record.id === id) {
        return record;
      }
      // console.log(student_record);
    });


      // 'redirect' to student Project form
    setTimeout(function () {
        // console.log('scrolling up');
      $(this).scrollTop(0);

    }, 1);

    $('div.background').empty();
      // TODO Make template
    $('div.background').html(state.templates.addStudentProject);
      
    $('div.nav li')
      .filter(function(index) {
        return $(this).text() === "Add / Edit Student Project";
      })
      .addClass('selected');
      
    $('div.nav li')
      .filter(function(index) {
        return $(this).text() === "Student List and Schedule";
      })
      .removeClass('selected');


    $('input#student_first_name').val(student_record.first_name);
    $('input#student_last_name').val(student_record.last_name);
    $('input#student_email').val(student_record.email);
    $('input#project_date').val(moment().format('YYYY-MM-DD'));
    
    studentProjectListener();

  });
}


function studentInfoListener() {

  $('div.background').on('click', 'button.student_info', function (event) {
    event.preventDefault();
    // console.log('this listener is working');
    var id = $(this).closest('div.card').attr('id');
    // console.log(id);
    var student_record = state.student_records.find(function (record) {
      // console.log(id);
      if (record.id === id) {
        return record;
      }
      // console.log(student_record);
    });
    var bgColor = $(this).closest('.card_color').css('background-color');
    renderStudentInfo(student_record, bgColor);

    console.log(student_record);

  });
}


function renderStudentInfo(student_record, color) {

  // Stop scroll on main window
  $('html, body').css('overflow', 'hidden');
  console.log('This is the student record inside the student info render', student_record);

  // disable bottom click events
  $('.nav li, button.student_info, button.add_student_project').css('pointer-events', "none");

  var lesson_duration = moment(student_record.student_lesson_time.endTime).diff(moment(student_record.student_lesson_time.startTime), 'minutes');
  var lesson_start_time = moment(student_record.student_lesson_time.startTime).format("hh:mm A");
  var lesson_end_time = moment(student_record.student_lesson_time.endTime).format("hh:mm A");
  console.log(student_record.student_lesson_time.startTime);
  console.log(student_record.student_lesson_time.endTime);
  console.log(lesson_start_time);
  console.log(lesson_end_time);

  var parentEmpty = `Parent's name not provided`;
  var teacherCommentsEmpty = `Teacher comments not provided`;

  var studentHtml = `
    <div class="student_modal slowPopIn">
    <div class="frame_top"></div>
    <div class="frame_bottom"></div>
    <div class="frame_left"></div>
    <div class="frame_right"></div>
      <div class="student_main_info" id="${student_record.id}">
      <div class="color_strip"></div>
        <h2 class="student_name"><span id="first_name">${student_record.first_name}</span> <span id="last_name">${student_record.last_name}</h2>
        <p class="email">Email: <span id="email">${student_record.email}</span></p>
        <div class="columns">
          
          <p class="parent_name"> Parent's name: <br><span id="parent_first_name">${student_record.parent_first_name}</span> <span id="parent_last_name">${student_record.parent_last_name}</span></p>
          
          <p class="street_address">Address: <br><span id="street_address">${student_record.address.street_address}</span></p>
          
          <p class="street_address_2"><span id="city">${student_record.address.city}</span>, <span id="state">${student_record.address.state}</span> <span id="zipcode">${student_record.address.zipcode}</span></p>
          
          <p class="lesson_time">Lesson Time: <br><span id="weekday">${student_record.student_lesson_time.weekday}</span> from <span id="lesson_start_time">${lesson_start_time}</span> to <span id="lesson_end_time">${lesson_end_time}</span></p>
          
          <p class="lesson_date">First lesson date: <span id="first_lesson_date">${moment(student_record.student_lesson_time.startDate).format('dddd, MMMM Do YYYY')}</span></p>
          
          <p class="lesson_duration">Lesson duration: <span id="lesson_duration">${lesson_duration}</span> minutes</p>

          <div class="comments_container">
            <p class="teacher_comments">Teacher comments: <br><span id="Teacher comments">${student_record.teacher_comments}</span></p>
          </div>

        </div>
        <button class="student_exit">
        Back to List
        </button>
        <button class="edit_info">
        Edit Student Info
        </button>
        <button class ="student_curriculum">
        Student Projects
        </button>

      </div>
    </div>
    `;
  console.log(studentHtml);
  $('body').prepend(studentHtml);
  $('.color_strip, button.edit_info, button.student_exit, button.student_curriculum').css('background-color', color);

  if ($('.color_strip').css('background-color') === 'rgb(255, 193, 7)') {
    $('button.edit_info, button.student_exit, button.student_curriculum').css('color', 'black');
  }

  $('button.edit_info, button.student_exit, button.student_curriculum').hover(
    function(event) {
      $(this).css('background-color', 'rgb(33, 80, 97)');
      if ( $(this).css('background-color') === "rgb(255, 193, 7)") {
        $(this).css('color', 'white');
      }
    },
    function(event) {
      $(this).css('background-color', color);
      if ( $(this).css('background-color') === "rgb(255, 193, 7)") {
        $(this).css('color', 'black');
      }
    }
  
  );

  if (student_record.parent_first_name === undefined && student_record.parent_last_name === undefined) {
    $('p.parent_name').html(parentEmpty);
  }

  if (student_record.teacher_comments === undefined) {
    $('p.teacher_comments').html(teacherCommentsEmpty);
  }

  setTimeout(function () {
    $('div.student_modal').css('overflow', 'scroll');

  }, 800);

  studentInfoExitListener();
  studentEditListener();
  studentCurriculumListener(color);

}

function studentCurriculumListener(color) {
  $('button.student_curriculum ').click(function (event) {
    console.log('student_curriculum listener');
    var id = $(this).closest('.student_main_info').attr('id');
    console.log(id);


    var student_record = state.student_records.find( function(record) {
      if (record.id === id) {
        return record;
      }
    });

    renderStudentCurriculum(student_record, color);
    exitStudentCurriculumListener();

  });
}

function renderStudentCurriculum (record, color) {
  var studentCurriculumModal = `
  
<div class="student_curriculum_container slowPopIn">

  <section class="slider">
    <div class="flexslider">

      <div class="flex-viewport">

        <ul class="slides">

        </ul>

      </div>

      <ol class="flex-control-nav flex-control-paging">

      </ol>

      <ul class="flex-direction-nav">
        <li class="flex-nav-prev">
          <a class="flex-prev" href="#">Previous</a>
        </li>
        <li class="flex-nav-next">
          <a class="flex-next" href="#">Next</a>
        </li>
      </ul>
    </div>
  </section>
  <button class="exit_student_curriculum">
  Exit Student Curriculum
  </button>

</div>
    `;

    $('button.student_exit, button.edit_info, button.student_curriculum, .frame_bottom, .frame_top, .frame_left, .frame_right').css('pointer-events', "none");

    $('body').prepend(studentCurriculumModal);

    console.log(record);

    var studentCurriculumHtml = record.student_curriculum.map(function (project, index) {

      var projectHtml = `
        <div class="project_container" index="${index}" id =${record.id} draggable="false">
          <p class="project_name">Project Name: <br> ${project.project_name}</p>
          <br>
          <p class="project_date">Project started on ${moment(project.project_date).format('dddd, MMMM Do YYYY')} </p>
          <p class="project_description">Project Description: <br> ${project.project_description}</p>
          <div class="teacher_project_container">
            <p class="teacher_project_comments">Project Comments: <br> ${(project.teacher_project_comments || "No comments were provided.")}</p>
          </div>
        </div>
      `;

      if (index === 0) {
        return `<li class="clone" aria-hidden="true"> ${projectHtml} </li>`;
      } else {
        return `<li class="" data-thumb-alt=""> ${projectHtml} </li>`;
      }
    }).join('');
    console.log(studentCurriculumHtml);
    if (record.student_curriculum.length !== 0 ) {
      $('ul.slides').html(studentCurriculumHtml);
    } else {
      var noProjects = `
      <li class="clone" aria-hidden="true">
      <p class="no_projects">No Projects were added.</p>
      </li>`;
      $('ul.slides').html(noProjects);
    }

    $('.flexslider').css('background-color', color);

    $('button.exit_student_curriculum').css('background-color', color);


    if ($('div.flexslider').css('background-color') === 'rgb(255, 193, 7)') {
    $('div.student_curriculum_container p').css('color', 'black');
  };

    $('button.exit_student_curriculum').hover(
    function(event) {
      $(this).css('background-color', 'rgb(33, 80, 97)');
      if ( $(this).css('background-color') === "rgb(255, 193, 7)") {
        $(this).css('color', 'white');
      }
    },
    function(event) {
      $(this).css('background-color', color);
      if ( $(this).css('background-color') === "rgb(255, 193, 7)") {
        $(this).css('color', 'black');
      }
    }  
  );

    $('.flexslider').flexslider({
      animation: "slide"
    });

}

function exitStudentCurriculumListener() {
  $('button.exit_student_curriculum').click(function (event) {

    //Re-enable listeners
    $('button.student_exit, button.edit_info, button.student_curriculum').css('pointer-events', "auto");
    
    $('div.student_curriculum_container').fadeOut();
    setTimeout(function () {
      $('div.student_curriculum_container').remove();

    }, 700);
    });
}

function studentEditListener() {
  $('button.edit_info').click(function(event) {
    event.preventDefault();
    console.log('This is the edit info listener');

    var id = $(this).closest('.student_main_info').attr('id');
    console.log(id);


    var student_record = state.student_records.find( function(record) {
      if (record.id === id) {
        return record;
      }
    });

// Re-allow scrolling on main page
    $('html, body').css('overflow', 'auto');

    // Remove scroll from the modal
    $('div.student_modal').css('overflow', 'auto');


    // Re-allow clicks on the main page
    $('.nav li, button.student_info, button.add_student_project').css('pointer-events', "auto");

    // Remove the modal
    $('div.student_modal').fadeOut();
    setTimeout(function () {
      $('div.student_modal').remove();

    }, 700);

    // Scroll to top of page   
    setTimeout(function () {
        // console.log('scrolling up');
      $(this).scrollTop(0);

    }, 1);

    // write HTML
    $('div.background').empty();
    $('div.background').html(state.templates.addStudent);
      
    // Add selected elements to Nav
    $('div.nav li')
      .filter(function(index) {
        return $(this).text() === "Add / Edit Student";
      })
      .addClass('selected');
      
    $('div.nav li')
      .filter(function(index) {
        return $(this).text() === "Student List and Schedule";
      })
      .removeClass('selected');

      // re-initialize Timepicki
    $('.time_element').timepicki({
      overflow_minutes: true,
      increase_direction: 'up',
      step_size_minutes: 15,
      reset: true
    });

    addStudentListener();

    var optionalFields = ['parent_first_name', 'parent_last_name', 'teacher_comments', 'apartment_number'];

    optionalFields.forEach(function (field) {
      if ((student_record.address[field]) && field === 'apartment_number' ) {
        $(`input[name="${field}"]`).val(student_record.address[field]);
      } else if ((student_record[field]) && field === 'teacher_comments' ) {
        $(`textarea[name="${field}"]`).val(student_record.address[field]); 
      } else if (field) {
        $(`input[name="${field}"]`).val(student_record[field]);  
      }
    });

    $('input[name="first_name"]').val(student_record.first_name);
    $('input[name="last_name"]').val(student_record.last_name);
    $('input[name="email"]').val(student_record.email);
    $('input[name="street_address"]').val(student_record.address.street_address);
    $('input[name="city"]').val(student_record.address.city);
    $('select#state').val(student_record.address.state);
    $('input[name="zipcode"]').val(student_record.address.zipcode);
    $('input[name="startDate"]').val(moment(student_record.student_lesson_time.startDate).format('YYYY-MM-DD'));
    $('select#weekday').val(student_record.student_lesson_time.weekday);
    $('input[name="startTime"]').val(moment(student_record.student_lesson_time.startTime).format('hh:DD A')); // 12:30
    $('input[name="endTime"]').val(moment(student_record.student_lesson_time.endTime).format('hh:DD A')); // 01:30

  }); 
}

function studentInfoExitListener() {

  $('.frame_bottom, .frame_top, .frame_left, .frame_right, button.student_exit').click(function (event) {

    event.preventDefault();
    event.stopPropagation();

    if ($(this) === $('.student_main_info')) {
      console.log('clicked');
      return false;
    }
    // Re-allow scrolling on main page
    $('html, body').css('overflow', 'auto');

    // Remove scroll from the modal
    $('div.student_modal').css('overflow', 'auto');

    // Re-allow clicks on the main page
    $('.nav li, button.student_info, button.add_student_project').css('pointer-events', "auto");

    // Remove the modal
    $('div.student_modal').fadeOut();
    setTimeout(function () {
      $('div.student_modal').remove();

    }, 700);

  });
}

function sendStudentProject(project, id, index) {
  var projectData = {
    'student_curriculum': project,
    'id': id,
    'index': index
  };
  console.log('Project Data to be sent to server', projectData);
  return $.ajax({
    type: 'PUT',
    url: `/cu-manager/student-curriculum-projects/${id}`,
    data: projectData,
    headers: {
      Authorization: `bearer ${window.localStorage.getItem('token')}`
    }
  });
}

function authenticateToken() {
  return $.ajax({
    type: 'POST',
    url: '/auth/authenticate',
    headers: {
      Authorization: `bearer ${window.localStorage.getItem('token')}`
    }
  });
}

function authenticateResult() {
  authenticateToken()
    .then(function (result) {
      console.log(result);
      if (redirectHome() === false) {
        console.log(result.first_name);
        console.log(result.last_name);
        state.teacher_first_name = result.first_name;
        state.teacher_last_name = result.last_name;
        state.role = result.role;
        console.log(state.role);
        if (state.role === 'teacher') {
          saveStudentData();          
          displayNav();
          studentInfoListener();
          addstudentProjecCardListener();
        } else if (state.role === 'student') {
          displayStudentNav();
          getStudentData()
          .then(function(data) {
            console.log(data);
          })

        }
      } else {
        $('div.background').html(state.templates.unauthorized);
      }
    })
    .catch(function (err) {
      console.log(err);
      $('div.background').html(state.templates.unauthorized);
      redirectHome(err);

    });
}

function redirectHome(err = null) {
  var pathArr = window.location.pathname.split('/');
  var urlUser = pathArr.slice(pathArr.length - 2, pathArr.length - 1)[0];

  if ((urlUser !== localStorage.getItem('current_user')) || (err)) {
    setTimeout(function () {
      window.location = "/";
    }, 5000);
    return true;
  } else {
    return false;
  }
}

function renderWelcome () {
  
  var welcomeHTML = `

    <h1 class="dashboard_welcome">Welcome ${state.teacher_first_name} ${state.teacher_last_name},</h1>

    <h2 class="features F_one">You currently have <strong>${state.student_records.length}</strong> students!</h2>

    <h2 class="features F_two">To add a student, click the <strong>Add / Edit Student</strong> button.</h2>

    <h2 class="features F_three">To add a student project, click the <strong>Add Student Project</strong> button. A project can only be added for an existing student.</h2>

    <h2 class="features F_four">To view your student list, search and sort students, and view detailed student info and curriculum data, click the <strong>Student List and Schedule</strong> button.</h2>
  `;
  
  $('div.background').html(welcomeHTML);


if (state.student_records.length === 0) {
  $('.features F_One').text('You have not added any students yet.');
}
}

function saveStudentData() {
  getStudentData()
    .then(function (data) {
      console.log(data);
      data.student_records.forEach(function (record, index) {
        record.order = index + 1;
        state.student_records.push(record);
      });
      renderWelcome();
      console.log('state.student_records', state.student_records);
      
    });
}

//-----------------Initialize the manager----------------//
//-------------------------------------------------------//
($(document).ready(function () {
  $(this).scrollTop(0);
  authenticateResult();
  
  $('.flexslider').flexslider({
    animation: "slide"
  });

}));