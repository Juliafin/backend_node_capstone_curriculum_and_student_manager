/*global $, moment Fuse */

var state = {
  student_records: [],
  current_student: {},
  current_sort:[],
  templates: {
    addStudent: `
    <div class="addStudent popIn">
    <h1 class="add_student_header">Add a Student</h1>
      <p class="optional_text">Optional<span class="optional">*</span></p>

      <form class="signup">
        <fieldset class="general_info"> General info

        <div class="mode_select">
          <label for="add_student" id="add_label">Add Student</label>            
          <input type="radio" name="radSize" id="add_student" value="add_student">
          <label for="edit_student" id="edit_label">Edit Student</label>
          <input type="radio" name="radSize" id="edit_student" value="edit_student">
        </div>

          <br>
          <label for="first_name">First Name</label>
          <input type="text" name="first_name" id="first_name">

          <label for="last_name">Last Name</label>
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
          <button type="button" name="add_student">Add Student</button>
          <button type="button" name="edit_student">Edit Student</button>
          <button type="button" name="clear_form">Clear Form</button>
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
      <h1 class="add_student_project">Add Student Project</h1>
      <p class="optional_text">Student name must match an existing student.<span class="optional">*</span></p>

      
      <form class="project">

          <div class="mode_select">
          
            <label for="add_student_project" id="add_label">Add Student Project</label>            
            <input type="radio" name="radSize" id="add_student_project" value="add_student_project">

            <label for="edit_student_project" id="edit_label">Edit Student Project</label>
            <input type="radio" name="radSize" id="edit_student_project" value="edit_student_project">
          </div>

          <label for="first_name">Student First Name</label>
          <input type="text" name="student_first_name" id="student_first_name">

          <label for="last_name">Student Last Name</label>
          <input type="text" name="student_last_name" id="student_last_name">

          <label for="email">Student Email</label>
          <input type="email" name="email" id="student_email">
        
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
            <button type="button" name="add_student_project" id="add_student_project">Add Student Project</button>
            <button type="button" name="edit_student_project" id="edit_student_project">Edit Student Project</button>
            <button type="button" name="clear_form">Clear Form</button>
          </div>
      
      </form>
    </div>
    `,

    studentList: `
    <div class="studentList popIn">
      <h1>Student List</h1>

      <label for="student_search">Student Search</label>
      <input type="text" name="student_search" id="student_search">

      <select id="sort">
        <option value="0" selected="selected">Sort Students</option>
        <option value="1">First Name: Ascending</option>
        <option value="2">First Name: Descending</option>
        <option value="3">Last Name: Ascending</option>
        <option value="4">Last Name: Descending</option>
        <option value="5">Upcoming Schedule</option>
        

      </select>

      <div class="card_container">
      </div>
    </div>`
  }
};

var sortOptions = {
  1:['first_name', false],
  2:['first_name', true],
  3: ['last_name', false],
  4: ['last_name', true]
};


// Student version navigation bar listener
function studentNavbarListener () {
  $('nav li').click(function (event) {
    // console.log('clicked');

    if ($(this).text() === 'Welcome') {
      setTimeout(function () {
        // console.log('scrolling up');
        $(this).scrollTop(0);
      }, 1);
      $('.student_curriculum_container.student_version').remove();
      $(this).addClass('selected');
      $('div.nav li').not($(this)).removeClass('selected');
      renderStudentWelcome(state.current_student);
    }

    if ($(this).text() === 'Student Projects') {
      setTimeout(function () {
        // console.log('scrolling up');
        $(this).scrollTop(0);
      }, 1);
      $(this).addClass('selected');
      $('div.nav li').not($(this)).removeClass('selected');
      $('div.student_welcome').remove();
      renderStudentCurriculum(state.current_student.student_record,null,true);
    }

    if ($(this).attr('id') === 'logged_in') {
      // console.log('clearing token');
      window.localStorage.setItem('token', '');
      window.localStorage.setItem('current_user', '');
      window.localStorage.setItem('dashboard_url', '');
      window.location = "/";

    }

  });
}


// Teacher version navigation bar listener
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

      addStudentFormListener();
      editStudentFormListener();
      addEditStudentFormRadioListener();
      clearformButtonListener();
    }

    if ($(this).text() === 'Add / Edit Student Project') {

      setTimeout(function () {
        // console.log('scrolling up');
        $(this).scrollTop(0);

      }, 1);

      $('div.background').empty();
      // TODO Make template
      $('div.background').html(state.templates.addStudentProject);
      $(this).addClass('selected');
      $('div.nav li').not($(this)).removeClass('selected');
      addStudentProjectFormListener();
      editStudentProjectFormListener();
      addEditStudentProjectFormRadioListener();
      clearformButtonListener();
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
      studentSearchListener();
      studentListSortListener();
    }

    if ($(this).attr('id') === 'logged_in') {
      // console.log('clearing token');
      window.localStorage.setItem('token', '');
      window.localStorage.setItem('current_user', '');
      window.localStorage.setItem('dashboard_url', '');
      window.location = "/";

    }
  });
}


// Render navigation bar for teacher version
function displayNav() {
  if (window.localStorage.getItem('token')) {

    var loggedIn = `
    <nav>
      <div class="nav">
        <li>Add / Edit Student</li>
        <li>Add / Edit Student Project</li>      
  		  <li>Student List and Schedule</li>
        <li id="logged_in">Not <span>${window.localStorage.getItem('current_user')}?</span class="logged_user"><br><span>Log out</span></li>
    </div>
  </nav>
              `;

    $('body').append(loggedIn);
    navbarListener();

  }
}


// Render the navigation bar for student version
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


// Update or Add student project data (same endpoint), providing the index to which to write the project
function sendStudentProject(project, id, index) {
  var projectData = {
    'student_curriculum': project,
    'id': id,
    'index': index
  };
  // console.log('Project Data to be sent to server', projectData);
  return $.ajax({
    type: 'PUT',
    url: `/cu-manager/student-curriculum-projects/${id}`,
    data: projectData,
    headers: {
      Authorization: `bearer ${window.localStorage.getItem('token')}`
    }
  });
}


// Authenticate the token in memory and return user data
function authenticateToken() {
  return $.ajax({
    type: 'POST',
    url: '/auth/authenticate',
    headers: {
      Authorization: `bearer ${window.localStorage.getItem('token')}`
    }
  });
}


// Get student list from the server
function getStudentData() {
  return $.ajax({
    type: 'GET',
    url: '/cu-manager/',
    headers: {
      Authorization: `bearer ${window.localStorage.getItem('token')}`
    }
  });
}


// Add student to the server
function postStudentData(studentObj) {
  // console.log('this is the obj to be sent', studentObj);
  return $.ajax({
    type: 'POST',
    url: '/cu-manager/',
    data: studentObj,
    headers: {
      Authorization: `bearer ${window.localStorage.getItem('token')}`
    }
  });
}


function deletestudentData(id) {
  return $.ajax({
    type: 'DELETE',
    url: `/cu-manager/${id}`,
    headers: {
      Authorization: `bearer ${window.localStorage.getItem('token')}`
    }
  });
}

function deletestudentProjectData(id, project) {
  return $.ajax({
    type: 'DELETE',
    url: `/cu-manager/student-curriculum-projects/${id}`,
    data: {'student_curriculum': project},
    headers: {
      Authorization: `bearer ${window.localStorage.getItem('token')}`
    }
  });
}



// Update and send student to the server
function updateStudent(studentObj, id) {
  // console.log('this is the obj to be sent', studentObj);
  return $.ajax({
    type: 'PUT',
    url: `/cu-manager/${id}`,
    data: studentObj,
    headers: {
      Authorization: `bearer ${window.localStorage.getItem('token')}`
    }
  });
}

// Listener for typing in the input search box for the student list
function studentSearchListener() {
  $('input#student_search').keydown(  
      $.debounce(500, sortResults)
    );
}


// sort results based on the value of the Select tag option on the student list using fuse.js library
function sortResults(event) {

  console.log('HERE====> ' + $('select#sort').val());

  var input = $('input#student_search').val();
  console.log('input entered');
  console.log(input);

  var options = {
    shouldSort: true,
    tokenize: true,
    matchAllTokens: true,
    threshold: 0.3,
    location: 0,
    distance: 20,
    maxPatternLength: 32,
    minMatchCharLength: 4,
    keys: [
      "first_name",
      "last_name",
      "parent_first_name",
      "parent_last_name",
      "email",
      "address.city",
      "address.state",
      "address.street_address",
      "address.zipcode",
      "student_lesson_time.weekday",
    ]
  };
  var fuse = new Fuse(state.student_records, options);
  var result = fuse.search(input);
  state.current_sort = result;
  console.log('state.current_sort', state.current_sort);
  console.log(result);
  console.log(Array.isArray(result));
  var arrayToSort = null;

  if (input === "") {
    arrayToSort = state.student_records;
  } else {
    arrayToSort = state.current_sort;
  }

  var arrayToDisplay = null;
  var selected = +($('select#sort').val());
  if (selected === 5) {
    arrayToDisplay = daySort(state.student_records);
  } else if (selected) {
    
    console.log(selected);
    arrayToDisplay = sortFields(arrayToSort,
            sortOptions[selected][0],
            sortOptions[selected][1]);
  }else {
    arrayToDisplay = arrayToSort;
  }
  $('.card_container').empty();
  renderStudentCard(arrayToDisplay);
}


// wrapper for .sort function to select various fields for sort
function sortFields (arr, field, descending = true ) {
  var sorted = arr.sort(function(a, b) {
    if (a[field] < b[field]) {
      if (descending === true) {
        return 1;
      } else {
        return -1;
      }
    }

    if (a[field] > b[field]) {
      if (descending === true) {
        return -1;
      } else {
        return 1;
      }
    }
    return 0;
  });

  console.log('returning sorted array', sorted);
  return sorted;
        
}


// Sorts on changes to the select tag
function studentListSortListener() {

  $('select#sort').change(sortResults);
}


// Sorts students according to the upcoming schedule when the Select tag is set to 'upcoming lessons'
function daySort(arr) {

  var daysArray = arr.map(function(element) {

    var dayElement = {
      weekday: element.student_lesson_time.weekday,
      id: element.id,
      startTime: moment(element.student_lesson_time.startTime).format('HH:mm')
    }; 
    return dayElement;
  });
  console.log(daysArray);

  var weekdays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ];

  var currentDay = weekdays.indexOf(moment().format('dddd'));

  var days = {};

  weekdays.forEach(function(day, i) {
    days[day] = (i + 7 - currentDay) % 7;
  });


  var currentDay = moment().format('dddd');
  console.log('days', days);

  daysArray.sort(function(a, b){
    return days[a.weekday] - days[b.weekday] 
  || parseInt(a.startTime.replace(':', '')) - parseInt(b.startTime.replace(':', ''));
  });

  var daySortedArray = daysArray.map(function(record) {
    var currentID = record.id;
    var foundRecord = state.student_records.find(function(student_record) {
      if (currentID === student_record.id) {
        return student_record;
      }
    });
    return foundRecord;


  });

  console.log('final sorted array', daySortedArray);
  console.log('daysArray',daysArray);  
  return daySortedArray;
}


// Listener for editing students on the add / edit student form
function editStudentFormListener() {
  // console.log('edit button listener starting');

  // remove any existing listeners
  $('button[name="edit_student"]').off();
  $('button[name="edit_student"]').click(function(event) {
  
    // console.log('edit student listener added');
    event.preventDefault();
  
    // remove existing errors on the radio button
    $('.radio_button_error, .radio_button_break').remove();

    // Check if the radio button is checked, return an error if it isn't
    if (! ($('input#edit_student').is(':checked'))) {
      var radiobuttonError = `<p class="error radio_button_error">The Edit Student radio button must be checked.</p><br class="radio_button_break">`;

      $('.mode_select').prepend(radiobuttonError);

      $(document).scrollTop(160);
      return;
    }

    // Collect the inputs
    var studentObj = {

      existing_first_name: $('input[name="existing_first_name"]').val(),
      existing_last_name: $('input[name="existing_last_name"]').val(),    
      existing_email: $('input[name="existing_email"]').val(),    
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

      // convert time/date fiels to ISO strings
    var rawstartTime = moment(studentObj.startTime, "hh:mm:A").format("HH:mm");
    var rawendTime = moment(studentObj.endTime, "hh:mm:A").format("HH:mm");
    var startDate = moment(studentObj.startDate, 'YYYY-MM-DD').toISOString();
    // console.log(rawendTime, rawstartTime);
    var startTime = moment(rawstartTime, "hh:mm").toISOString();
    var endTime = moment(rawendTime, "hh:mm").toISOString();
    studentObj.startTime = startTime;
    studentObj.startDate = startDate;
    studentObj.endTime = endTime;
    // console.log(studentObj.startDate);
    // console.log(startDate);
    // console.log('student form data for editing a student', studentObj);

    // Validate the student data
    var validatedStudent = validateNewStudent(studentObj);
    // console.log('Validated student for edit form', validatedStudent);

    // If the validated object has a success message, delete the message
    if ('message' in validatedStudent && validatedStudent.message === 'No errors found.') {
      delete validatedStudent.message;

      // verify that the record exists in the state
      var foundRecord = state.student_records.find(function(record) {
        // console.log(record.email, validatedStudent.existing_email, record.first_name, validatedStudent.existing_first_name, record.last_name, validatedStudent.existing_last_name);
      
        if (record.email === validatedStudent.existing_email && 
            record.first_name === validatedStudent.existing_first_name && 
            record.last_name === validatedStudent.existing_last_name) {        
          return record.id;
        }
      });

      // Receive the student index in the state for later updating the recording
      var recordIndex = foundRecord.order-1;

      // console.log('returned ID from search of edit student form', foundRecord.id);

      // Delete extra keys before sending the validated student to the server
      delete validatedStudent.existing_email;
      delete validatedStudent.existing_first_name;
      delete validatedStudent.existing_last_name;
      
      // Update the student
      updateStudent(validatedStudent, foundRecord.id)
          .then(function(updatedRecord) {
            // console.log('updatedRecord', updatedRecord);
            state.student_records[recordIndex] = updatedRecord.updated;
            // console.log(state.student_records[recordIndex]);
            var successMsg = `<p class="success">Student successfully updated!</p>`;
            $('.button_container').before(successMsg);

          })
          .catch(function(err) {
            // console.log('error', err);
            var failure = `<p class="error">Student was not found.<p>`;
            $('button_container').before(failure);
          });
    }

  });
}


// Listener for Adding students on the add / edit student form
function addStudentFormListener() {
  
  // remove any existing listeners
  $('button[name="add_student"]').off();
  $('button[name="add_student"]').click(function (event) {
    event.preventDefault();
  
    // remove any existing errors that have been printed
    $('.radio_button_error, .radio_button_break').remove();
    
    // Check if the radio button is checked, return an error if it isn't
    if (! ($('input#add_student').is(':checked'))) {
      var radiobuttonError = `<p class="error radio_button_error">The Add Student radio button must be checked.</p><br class="radio_button_break">`;

      $('.mode_select').prepend(radiobuttonError);

      $(document).scrollTop(160);
      return;
    }

    // collect the inputs
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

    // console.log(studentObj.startTime);
    // console.log(studentObj.endTime);

    // convert time/date fiels to ISO strings
    var rawstartTime = moment(studentObj.startTime, "hh:mm:A").format("HH:mm");
    var rawendTime = moment(studentObj.endTime, "hh:mm:A").format("HH:mm");
    var startDate = moment(studentObj.startDate, 'YYYY-MM-DD').toISOString();
    // console.log(rawendTime, rawstartTime);
    var startTime = moment(rawstartTime, "hh:mm").toISOString();
    var endTime = moment(rawendTime, "hh:mm").toISOString();
    studentObj.startTime = startTime;
    studentObj.startDate = startDate;
    studentObj.endTime = endTime;
    // console.log(studentObj.startDate);
    // console.log(startDate);
    // console.log('Student form data for adding a student', studentObj);

    // validate the student form
    var validatedStudent = validateNewStudent(studentObj);
    // console.log('validated student', validatedStudent);

    // if the returned object has a success message, delete the message then post the student
    if ('message' in validatedStudent && validatedStudent.message === 'No errors found.') {
      delete validatedStudent.message;
      postStudentData(validatedStudent)
        .then(function (data) {
          // console.log(data);
          state.student_records.push(data);
          var success = `
          <p class="success">Student successfully added!</p>
          `;
          $('div.button_container').before(success);

        })
        .catch(function (err) {
          // console.log('There was an error');
          // console.log(err);
          var failure = `
          <p class="error">This student already exists. If you wish to edit this student, please click the Edit Student button.</p>
          `;
          $('div.button_container').before(failure);
        });
    }

  });
}


// Validate main Student data both for add and edit student versions
function validateNewStudent(studentObj) {

  // remove previous errors
  $('.error, .errors').remove();

  // return borders to normal
  $('input').css('border', 'none');

  var errors = {};
  var formData = {};
  formData.address = {};
  formData.student_lesson_time = {};
  $('.error').remove();
  // console.log(studentObj);

  Object.keys(studentObj).forEach(function (field) {
    // console.log(studentObj[field]);
    // console.log(field);

    if (studentObj[field] === "" || studentObj[field] === null) {
      // If the following fields are empty, do nothing (they are optional)
      switch (field) {
      case 'parent_first_name':
      case 'parent_last_name':
      case 'apartment_number':
      case 'teacher_comments':
        break;
      default:
        errors[field] = `The ${field.replace('_', ' ')} field is empty.`;
      }
    
    // If the fields have values, then create custom error messages if they exist or add the fields to the formdata object as a success
    } else {
      switch (field) {

      case "first_name":
      case "last_name":
      case "parent_first_name":
      case "parent_last_name":
      case 'existing_first_name':
      case 'existing_last_name':
       
        if (studentObj[field].length > 35) {
          errors[field] = `The ${field.replace('_', ' ')} field must contain more than 35 characters.`;
        } else {
          formData[field] = studentObj[field];
        }
        break;

      case "email":
      case "existing_email":
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
        // console.log(startTime);
        // console.log('start time', startTimeN);
        // console.log(endTime);
        // console.log('end time', endTimeN);
        if (endTimeN < startTimeN) {
          errors[field] = `The ${field} cannot be before the start time.`;
        } else {
          formData.student_lesson_time[field] = studentObj[field];
        }
      }
    }
  });

  // If the error object has keys, render the error html.
  if (Object.keys(errors).length > 0) {

    // console.log(errors);

    var errorHtml = Object.keys(errors).map(function (elem, index) {
      var currentError = errors[elem];
      var errorMsg = `<p class="error" id="${elem}_error"> ${currentError}</p>`;
      // console.log(Object.keys(errors).length);

      $(`input[name="${elem}"]`).css('border', '0.3vw solid red');
      
      if (index === 0) {
        var errorDiv = `<div class="errors"><p class="error" id="${elem}_error"> ${currentError}</p>`;
        return (errorDiv);
      } else if (index === Object.keys(errors).length-1) {
        var closeErrDiv = `<p class="error" id="${elem}_error"> ${currentError}</p></div>`;
        return (closeErrDiv);
      } else {
        return errorMsg;
      }
            
    }).join("").replace(',', "");

    // console.log(errorHtml);
    $(`.mode_select`).after(errorHtml);
    // Scroll to start of form
    $(document).scrollTop(138.5);
    return errors;
  
  // If there are no errors, return the form data with a success message
  } else {
    formData.message = "No errors found.";
    // console.log(formData);
    return formData;
  }
}


// Listener for editing the student project form 
function editStudentProjectFormListener() {
  // Remove any existing listeners
  $('button#edit_student_project').off();

  $('button#edit_student_project').click(function (event) {

    // Remove previous radio button errors
    $('.radio_button_error').remove();
    
    // Check if the edit radio button is checked before collecting inputs
    if (! ($('input#edit_student_project').is(':checked'))) {
      var radiobuttonError = `<p class="error radio_button_error">The Edit Student radio button must be checked.</p><br class="radio_button_break">`;

      $('.mode_select').prepend(radiobuttonError);

      $(document).scrollTop(0);
      return;
    }
   
    event.preventDefault();

    // Collect form data
    $('input#project_date').val(moment().format('YYYY-MM-DD'));
    var student_curriculum = {
      project_number :$('input[name="project_number"]').val().trim(),
      first_name: $('input[name="student_first_name"]').val().trim(),
      last_name: $('input[name="student_last_name"]').val().trim(),
      email: $('input[name="email"]').val().trim(),
      project_date: $('input#project_date').val().trim(),
      project_name: $('input#project_name').val().trim(),
      project_description: $('input#project_description').val().trim(),
      teacher_project_comments: $('textarea#project_comments').val().trim()
    };

    // Validate the input and verify the 'no errors' message 
    var validatedProject = validateStudentProject(student_curriculum);

    // console.log(validatedProject);
    UpdateAndAddStudentProject(validatedProject, validatedProject.project_number, true);

  });
}


// Listener for adding student projects on the add student project form
function addStudentProjectFormListener() {
  // Remove any existing listeners
  $('button#add_student_project').off();

  $('button#add_student_project').click(function (event) {
    
    // Remove previous radio button errors
    $('.radio_button_error').remove();

    // Check if the add radio button is checked before collecting inputs
    if (! ($('input#add_student_project').is(':checked'))) {
      var radiobuttonError = `<p class="error radio_button_error">The Add Student radio button must be checked.</p><br class="radio_button_break">`;

      $('.mode_select').prepend(radiobuttonError);

      $(document).scrollTop(0);
      return;
    }

    event.preventDefault();
    
    // Collect form data
    $('input#project_date').val(moment().format('YYYY-MM-DD'));
    var student_curriculum = {
      first_name: $('input[name="student_first_name"]').val().trim(),
      last_name: $('input[name="student_last_name"]').val().trim(),
      email: $('input[name="email"]').val().trim(),
      project_date: $('input#project_date').val().trim(),
      project_name: $('input#project_name').val().trim(),
      project_description: $('input#project_description').val().trim(),
      teacher_project_comments: $('textarea#project_comments').val().trim()
    };

    // Validate the input and verify the 'no errors' message 
    var validatedProject = validateStudentProject(student_curriculum);

    // console.log(validatedProject);
    // Add the project with validated form data
    UpdateAndAddStudentProject(validatedProject);

    
  });
}

// Update a student project with validated form data
// If an index and boolean of true are provided, sets the state to update the project instead of adding a new one
function UpdateAndAddStudentProject (checkedProject, index = "", deleteProjectnumber = false) {
  
  // Check if the validated object has a success message, and if it does delete it
  if ('message' in checkedProject && checkedProject.message === 'No errors found.') {
    delete checkedProject.message;

      // Find the student record in the state, and append it's position in the array to the object for later processing 
    var searchResult = state.student_records.find(function (record) {
      if (record.first_name === checkedProject.first_name &&
          record.last_name === checkedProject.last_name &&
          record.email === checkedProject.email
        ) {
        return record;
      } else {
        return false;
      }

    });
    // IF the index provided to write to the curriculum is more than the curriculum array length, return an error
    if (searchResult.student_curriculum.length < parseInt(index) - 1) {
      var indexError = `<div class="errors">
                          <p class="error">The project number field may not be larger than the number of student projects.</p>
                        </div>`;
       
       
      $(`.mode_select`).after(indexError);
      // Scroll to start of form
      $(document).scrollTop(138.5);
      return;
    }
      // use the index of the student to update the returned item in the state if it is found

    var searchResultIndex = searchResult.order - 1;
    // console.log('Search result in state matching the student the project belongs to', searchResult);
      // If the result is found, build the object to send
      // for the update containing: student_curriculum (project date, project name, project description, project comments), the id
      // Delete the extra keys not needed in the object
    if (searchResult) {
      // if an index is provided, the project is
      if (index !== "") {
        index = parseInt(index) - 1;
        index = index.toString();
      } else {
        index = searchResult.student_curriculum.length.toString();
      }

    // If the submitted form contained the 'edit' version, delete the project_number field
      if (deleteProjectnumber === true) {
        delete checkedProject.project_number;
      }
      // Delete extra keys before sending to the api
      delete checkedProject.first_name;
      delete checkedProject.last_name;
      delete checkedProject.email;


      // Send the validated project data and then write the changes to the state
      sendStudentProject(checkedProject, searchResult.id, index)
          .then(function (student_record) {
            // console.log('the result was successful');
            // console.log('RETURNED STUDENT RECORD!', student_record);
            // write the change back to the state;

            var writeIndex = parseInt(index);

            // console.log('this is the index to write to', writeIndex);

            student_record.updated.student_curriculum.forEach(function(updated_record, index) {
              state.student_records[searchResultIndex].student_curriculum[index] = updated_record;
            });
            // console.log(state.student_records[searchResultIndex]);

            // Edit version of form: throw a different success depending on the argument
            if (deleteProjectnumber === true) {
              var success = `<p class="success">Project successfully edited!</p>`;
            } else {
              var success = `<p class="success">Project successfully added!</p>`;
            }

            $('.button_container').before(success);

            // console.log('Updated state:', state.student_records);
          })
          .catch(function (err) {
            // console.log(err);

            // Throw a different error if edit version
            if (deleteProjectnumber === true) {
              var failure = `<p class="error"> Project could not be edited.<p>`;
            } else {
              var failure = `<p class="error"> Project could not be added.<p>`;
            }

            // Display failure message
            $ ('.button_container').before(failure);
          });

    // If the matching student is not found in the state, throw an error
    } else {
      // console.log('the search result wasnt found');
      
      // Throw different error if edit version
      if (deleteProjectnumber === true) {
        var failure = `<p class="error"> Project could not be edited.<p>`;
      } else {
        var failure = `<p class="error">Project could not be added.<p>`;
      }
      $ ('.button_container').before(failure);
    }
  }
}

// Validate project form for both adding and editing
function validateStudentProject(curriculum) {

  // Return borders to normal
  $('input').css('border', 'none');
  
  // Remove previous errors
  $('.error, .errors').remove();
  
  // console.log(curriculum);
  var errors = {};
  var formdata = {};

  // Get keys of the provided object, and iterate through the object checking each field and producing custom errors 
  Object.keys(curriculum).forEach(function (field) {
    if (curriculum[field] === '') {
      errors[field] = `The ${field.replace(/_/g,' ')} field is empty.`;
    } else {
      switch (field) {

      case 'first_name':
      case 'last_name':
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

      case "project_number":
        if (parseInt(curriculum[field]) < 1) {
          errors[field] = `The ${field.replace('_', ' ')} field may not be less than 1.`;
        } else {
          formdata[field] = curriculum[field];
        }
        break;

      } // ends switch
    }
  });

  // Checks if the error object is empty, and if not, render the error html and return the errors
  if (Object.keys(errors).length > 0) {

    // console.log(errors);

    var errorHtml = Object.keys(errors).map(function (elem, index) {
      var currentError = errors[elem];
      var errorMsg = `<p class="error" id="${elem}_error"> ${currentError}</p>`;
      // console.log(Object.keys(errors).length);

      $(`input[name="${elem}"]`).css('border', '0.3vw solid red');
      
      if (index === 0) {
        var errorDiv = `<div class="errors"><p class="error" id="${elem}_error"> ${currentError}</p>`;
        return (errorDiv);
      } else if (index === Object.keys(errors).length-1) {
        var closeErrDiv = `<p class="error" id="${elem}_error"> ${currentError}</p></div>`;
        return (closeErrDiv);
      } else {
        return errorMsg;
      }
            
    }).join("").replace(',', "");

    // console.log(errorHtml);
    // Render the errors to the DOM
    $(`.mode_select`).after(errorHtml);
    // Scroll to start of form
    $(document).scrollTop(138.5);
    return errors;

  // If there are no errors, return the form data and append a message to indicate that
  } else {
    formdata.message = "No errors found.";
    // console.log(formdata);
    return formdata;
  }

}


// TODO make this function clear all forms and add those clears
// clear main student form
function clearForm() {
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
  $('textarea[name="teacher_comments"]').val('');
  $('input[name="project_number"]').val('');
  $('input[name="existing_first_name"]').val('');
  $('input[name="existing_last_name"]').val('');
  $('input[name="existing_email"]').val('');
  $('input[name="student_first_name"]').val('');
  $('input[name="student_last_name"]').val('');
  $('input[name="project_date"]').val('');
  $('input[name="project_name"]').val('');
  $('input[name="project_description"]').val('');
  $('textarea[name="project_comments"]').val('');
  
}

function clearformButtonListener () {
  $('button[name="clear_form"]').click(function(event) {
    event.preventDefault();
    clearForm();
  });
}

// Render welcome screen for students
function renderStudentWelcome(studentData) {
  var lesson_start_time = moment(studentData.student_record.student_lesson_time.startTime).format("hh:mm A");
  var lesson_end_time = moment(studentData.student_record.student_lesson_time.endTime).format("hh:mm A");
  var lesson_start_date = moment(studentData.student_record.student_lesson_time.startDate).format('dddd, MMMM Do YYYY');
  var studentDashHtml = `

    <div class="student_welcome popIn">
    <div class="curriculum_image"></div>
    <h1>Welcome ${state.student_first_name} ${state.student_last_name}, </h1>
    <h2 class="features F_one">Your teacher is <strong>${studentData.student_record.author.first_name} ${studentData.student_record.author.last_name}</strong>.
    <h2 class="features F_two">Your first lesson date was on <strong>${lesson_start_date}</strong></h2>
    <h2 class="features F_three">Your weekly lesson time is every <strong>${studentData.student_record.student_lesson_time.weekday}</strong> from <strong>${lesson_start_time}</strong> until <strong>${lesson_end_time}</strong> </h2>
    <h2 class="features F_four">Please click on <strong>Student Projects</strong> to view your latest assignments from your teacher.
    </div>
  `;

  $('div.background').html(studentDashHtml);

}


// Renders main student list
function renderStudentCard(state) {

  state.forEach(function (student_record, index) {
   
    var studentCard = `
    <div class="card flip" id=${student_record.id}>
      <div class="card_color">
        <button class="add_student_project">
        Add Student Project
        </button>
        <button class="student_info">
        Student info
        </button>
        <button class="delete_student">
        Delete Student
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
      $('.card_container').append(studentCard);
    }, 200 * index);

  });

}


// *Delegated - Listens for clicks on add student project button, and renders the form filled out with student data 
function addstudentProjectCardListener () {

  $('div.background').on('click', 'button.add_student_project', function (event) {
    event.preventDefault();

    // console.log('add student project clicked on card');

    // Get id from html and search for the matching record
    var id = $(this).closest('div.card').attr('id');
    // console.log(id);
    var student_record = state.student_records.find(function (record) {
      // console.log(id);
      if (record.id === id) {
        return record;
      }
      // console.log(student_record);
    });


    // 'Redirect' to student Project form
    setTimeout(function () {
        // console.log('scrolling up');
      $(this).scrollTop(0);

    }, 1);

    // Render Html
    $('div.background').empty();    
    $('div.background').html(state.templates.addStudentProject);
    
    // Set css classes for navbar state
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

      // Set Radio button to checked state
    $('input#add_student_project').prop('checked', true);

      // Write student values to form
    $('input#student_first_name').val(student_record.first_name);
    $('input#student_last_name').val(student_record.last_name);
    $('input#student_email').val(student_record.email);
    $('input#project_date').val(moment().format('YYYY-MM-DD'));
    
    // Add listeners to add project button on the form
    addStudentProjectFormListener();
    addEditStudentProjectFormRadioListener();
    editStudentProjectFormListener();

  });
}


// *Delegrated - Listens for clicks on the delete student button the student card
function deleteStudentCardButtonListener() {
  $('div.background').on('click', 'button.delete_student', function(event) {
    event.preventDefault();
    console.log('delete button clicked');

    var id = $(this).closest('div.card').attr('id');
    console.log(id);
    var background_color = $(this).closest('div.card_color').css('background-color');
    console.log( background_color);
    var recordToDelete = state.student_records.find(function (record) {
      if (id === record.id) {
        return record;
      }
    });

    console.log('record to delete', recordToDelete);
    renderDeleteConfirmation(recordToDelete, background_color);

  });
}


// Generates confirmation prompt
function renderDeleteProjectConfirmation(record, projectIndex, color) {
  var project = record.student_curriculum[projectIndex-1];
  console.log(project);
  var id = record.id;
  var projectPosition = projectIndex-1;
  var studentPosition = record.order-1;
  var deleteconfirmation = `
    <div class="delete_student_project_confirmation_container popIn">
      <div class="delete_project_color_strip">
        <p>Are you sure you want to delete the project # ${projectIndex} with the name: ${record.student_curriculum[projectIndex-1].project_name}?</p>
      </div>
      <button class="delete_student_project_confirmation">
      Delete Project
      </button>
      <button class="cancel_delete_student_project_confirmation">
      Cancel
      </button>
    <div>
  `;

  // disable click events
  $('button.exit_student_curriculum, button.add_student_curriculum_modal, button.edit_student_curriculum_modal, button.delete_student_curriculum_modal, .flex-next, .flex-prev, ol.flex-control-nav.flex-control-paging > a').css('pointer-events', "none");


  // Write html to dom
  $('body').append(deleteconfirmation);


  // Set css and colors according to the element clicked
  $('div.delete_project_color_strip, button.delete_student_project_confirmation, button.cancel_delete_student_project_confirmation').css('background-color', color);

  if ($('.delete_project_color_strip').css('background-color') === 'rgb(255, 193, 7)') {
    $('button.delete_student_project_confirmation, button.cancel_delete_student_project_confirmation').css('color', 'black');
  }

  $('button.delete_student_project_confirmation, button.cancel_delete_student_project_confirmation').hover(
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

  deleteStudentProjectCancelConfirmationListener();
  deleteStudentProjectConfirmationListener(id, project,projectPosition, studentPosition, color);

}


// Render function to render the confirmation box
function renderDeleteConfirmation(record, color) {
  var deleteconfirmation = `
    <div class="delete_student_confirmation_container popIn">
      <div class="delete_color_strip">
        <p>Are you sure you want to delete the student: <br> ${record.first_name} ${record.last_name}?</p>
      </div>
      <button class="delete_student_confirmation">
      Delete Student
      </button>
      <button class="cancel_delete_student_confirmation">
      Cancel
      </button>
    <div>
  `;

  // Stop scroll on main window
  $('html, body').css('overflow', 'hidden');
  // console.log('This is the student record inside the student info render', student_record);

  // disable bottom click events
  $('.nav li, button.student_info, button.add_student_project, button.delete_student').css('pointer-events', "none");

  // Write html to dom
  $('body').append(deleteconfirmation);
  
  // Set css and colors according to the element clicked
  $('div.delete_color_strip, button.delete_student_confirmation, button.cancel_delete_student_confirmation').css('background-color', color);

  if ($('.delete_color_strip').css('background-color') === 'rgb(255, 193, 7)') {
    $('button.delete_student_confirmation, button.cancel_delete_student_confirmation').css('color', 'black');
  }

  $('button.delete_student_confirmation, button.cancel_delete_student_confirmation').hover(
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

  deleteStudentConfirmationListener(record);
  deleteStudentCancelConfirmationListener();
}


// Listener for clicks on the delete student button in the student confirmation box
function deleteStudentConfirmationListener(record) {
  $('button.delete_student_confirmation').click(function(event) {
    event.preventDefault();
    console.log('delete student confirmation button clicked');
    deletestudentData(record.id)
      .then(function(result) {
        console.log('result', result);
        dismantleDeleteConfirmation();
        state.student_records.length = 0;
        saveStudentData(false);

        console.log(result);

      }).catch(function(err) {
        console.log('There was an error deleting the student');

      });
  });
}


// Listener for project delete confirmation button on modal
function deleteStudentProjectConfirmationListener(id, project, projectposition, studentPosition, color) {
  $('button.delete_student_project_confirmation').click(function(event) {
    event.preventDefault();
    console.log('delete student confirmation button clicked');
    deletestudentProjectData(id, project)
      .then(function(returned_record) {
        console.log(returned_record);


        state.student_records[studentPosition].student_curriculum.splice(projectposition, 1);
        
        dismantleDeleteProjectConfirmation();

        // Remove the student curriculum modal
        $('div.student_curriculum_container').remove();

        renderStudentCurriculum(state.student_records[studentPosition], color);
        exitStudentCurriculumListener();
        editStudentProjectModalButtonListener();
        addStudentProjectModalButtonListener();
        deleteStudentProjectModalButtonListener();


      })
      .catch(function(err) {
        console.log(err);
        console.log('Something went wrong');
      });

      
  });
}


// Listener for clicks on the cancel button in the student confirmation box
function deleteStudentCancelConfirmationListener() {

  $('button.cancel_delete_student_confirmation').click(function(event) {
    dismantleDeleteConfirmation();
  });
}


// Listener for cancel button the student project delete modal
function deleteStudentProjectCancelConfirmationListener() {

  $('button.cancel_delete_student_project_confirmation').click(function(event) {
    dismantleDeleteProjectConfirmation();
  });
}


// Removes the delete student confirmation box
function dismantleDeleteConfirmation() {
   // Re-allow scrolling on main page
  $('html, body').css('overflow', 'auto');

    // Re-allow clicks on the main page
  $('.nav li, button.student_info, button.add_student_project, button.delete_student').css('pointer-events', "auto");

    // Remove the modal
  $('div.delete_student_confirmation_container').fadeOut();
  setTimeout(function () {
    $('div.delete_student_confirmation_container').remove();

  }, 700);
}


// Removes the delete student project confirmation box
function dismantleDeleteProjectConfirmation () {
 
  // Re-allow click events
  $('button.exit_student_curriculum, button.add_student_curriculum_modal, button.edit_student_curriculum_modal, button.delete_student_curriculum_modal, .flex-next, .flex-prev, ol.flex-control-nav.flex-control-paging > a').css('pointer-events', "auto");

    // Remove the modal
  $('div.delete_student_project_confirmation_container').fadeOut();
  setTimeout(function () {
    $('div.delete_student_confirmation_container').remove();

  }, 700);
}


// Listens for events on the student info button, which renders the detailed student info
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


// Render the the detailed student info into a modal
function renderStudentInfo(student_record, color) {

  // Stop scroll on main window
  $('html, body').css('overflow', 'hidden');
  // console.log('This is the student record inside the student info render', student_record);

  // disable bottom click events
  $('.nav li, button.student_info, button.add_student_project, button.delete_student').css('pointer-events', "none");


  var lesson_duration = moment(student_record.student_lesson_time.endTime).diff(moment(student_record.student_lesson_time.startTime), 'minutes');
  var lesson_start_time = moment(student_record.student_lesson_time.startTime).format("hh:mm A");
  var lesson_end_time = moment(student_record.student_lesson_time.endTime).format("hh:mm A");
  // console.log(student_record.student_lesson_time.startTime);
  // console.log(student_record.student_lesson_time.endTime);
  // console.log(lesson_start_time);
  // console.log(lesson_end_time);

  // Create and Display main student info modal
  var apartment_number = "Apt. #" + student_record.address.apartment_number; 
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
          
          <p class="street_address">Address: <br><span id="street_address">${student_record.address.street_address} <span class="apartment_number"></span> </span></p>
          
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
  // console.log(studentHtml);
  $('body').prepend(studentHtml);

  if (student_record.address.apartment_number) {
    $('.apartment_number').text(apartment_number);
  }

  // Sets background color according to the underlying card clicked, adjusting css
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
  studentCardEditButtonListener();
  studentCurriculumListener(color);

}


// Listens for clicks to open project modal
function studentCurriculumListener(color) {
  $('button.student_curriculum ').click(function (event) {
    // console.log('student_curriculum listener');
    var id = $(this).closest('.student_main_info').attr('id');
    // console.log(id);


    var student_record = state.student_records.find( function(record) {
      if (record.id === id) {
        return record;
      }
    });

    renderStudentCurriculum(student_record, color);
    exitStudentCurriculumListener();
    editStudentProjectModalButtonListener();
    addStudentProjectModalButtonListener();
    deleteStudentProjectModalButtonListener();

  });
}


// Render the modal for student projects.
// The student version (when student_version = false), displays in window
// The teacher version displays as a 3rd depth layer modal
function renderStudentCurriculum (record, color=null, student_version=false) {
  // console.log('student_curriculum rendering');
  
  // Create Modal Html - flexslider plugin
  var studentCurriculumModal = `
  
  <div class="student_curriculum_container slowPopIn">

    <section class="slider">
      <div class="flexslider">

        <div class="flex-viewport">
          <ul class="slides">
          </ul>
        </div>


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
    Exit Project List
    </button>
    
    <button class="add_student_curriculum_modal">
    Add Project
    </button>
    
    <button class="edit_student_curriculum_modal">
    Edit Project
    </button>

    <button class="delete_student_curriculum_modal">
    Delete Project
    </button>
    

  </div>
    `;

  $('button.student_exit, button.edit_info, button.student_curriculum, .frame_bottom, .frame_top, .frame_left, .frame_right').css('pointer-events', "none");

  $('body').prepend(studentCurriculumModal);

  // Displays a student version of the modal if a student is logged in
  if (student_version === true) {
    $('.student_curriculum_container').addClass('student_version');
    $('.edit_student_curriculum_modal, .add_student_curriculum_modal, .delete_student_curriculum_modal').remove();
  }

  // console.log(record);

  // Create student curriculum html
  var studentCurriculumHtml = record.student_curriculum.map(function (project, index) {

    var projectHtml = `
        <div class="project_container" index="${index}" id ="${record.id}" draggable="false">
          <div class="project_number_container" id="${index+1}">
            <p class="project_number"># ${index+1} </p>
          </div>
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
  // console.log(studentCurriculumHtml);
  // console.log('inside student_curriculum function');
  
  // If there is student curriculum data, display it, if not display filler html
  if (record.student_curriculum.length !== 0 ) {
    $('ul.slides').html(studentCurriculumHtml);
  
  } else {
    var noProjects = `
      <li class="clone" aria-hidden="true">
      <p class="no_projects" id="${record.id}">No Projects were added.</p>
      </li>`;
    $('ul.slides').html(noProjects);
  }

  // In teacher version, set colors based on a specific background color
  if (color !== null) {
    $('.flexslider').css('background-color', color);

    $('button.exit_student_curriculum, button.edit_student_curriculum_modal, .add_student_curriculum_modal, .delete_student_curriculum_modal').css('background-color', color);


    if ($('div.flexslider').css('background-color') === 'rgb(255, 193, 7)') {
      $('div.student_curriculum_container p, button.exit_student_curriculum, button.edit_student_curriculum_modal, .add_student_curriculum_modal, .delete_student_curriculum_modal').css('color', 'black');
    }

    $('button.exit_student_curriculum, button.edit_student_curriculum_modal, button.add_student_curriculum_modal, button.delete_student_curriculum_modal').hover(
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
  }

  // Initialize the modal
  $('.flexslider').flexslider({
    animation: "slide",
    animationLoop: false,
    slideshow: false
  });

}


// Listener for click on the delete project button on the student project modal
function deleteStudentProjectModalButtonListener() {
  $('button.delete_student_curriculum_modal').click(function(event) {

    console.log('Delete Project button clicked');
    
    // Remove previous errors
    $('.errors, .error').remove();

    var studentID = $('.flex-active-slide > div.project_container').attr('id');
    console.log(studentID);
    var projectIndex = $('.flex-active-slide div.project_number_container').attr('id');
    console.log(projectIndex);

    var backgroundColor = $(".flexslider").css('background-color')

    // If no projects exist throw an error
    if (projectIndex === undefined) {
      var noProjectsToEdit = `
      <div class="error popIn">  
        <p class="errors">Error: No Projects to delete, please click the Add Project button to add a new project.</p>
      </div>
        `;
      $('li.flex-active-slide').append(noProjectsToEdit);
      return;
    }

    var student_record = state.student_records.find(function(record) {
      if (studentID === record.id) {
        return record;
      }
    });

    renderDeleteProjectConfirmation(student_record, projectIndex, backgroundColor );



  });
}

// Listener for the add student project button on the project modal
function addStudentProjectModalButtonListener() {
  $('button.add_student_curriculum_modal').click(function (event) {
    // Remove previous errors
    $('.errors, .error').remove();

    console.log('Edit project button clicked');

    // Get student data
    
    var studentID = $('.flex-active-slide > div.project_container').attr('id') || $('.flex-active-slide > .no_projects').attr('id');
    console.log('Student ID', studentID);
    

    var student = state.student_records.find(function(record) {
      if (studentID === record.id) {
        return record;
      }
    });

    console.log(student);

    // Re-allow scrolling on main page
    $('html, body').css('overflow', 'auto');

    // Remove scroll from the modal
    $('div.student_modal').css('overflow', 'auto');

    // Re-allow clicks on the main page
    $('.nav li, button.student_info, button.add_student_project').css('pointer-events', "auto");

    // Stagger fading out modals
    $('div.student_curriculum_container').fadeOut(400, function() {
      
      $('div.student_modal').fadeOut();
      setTimeout(function () {
        $('div.student_modal').remove();

      }, 700);
    });
  
    setTimeout(function () {
      $('div.student_curriculum_container').remove();

    }, 700);

    // Set html to student project form
    $('div.background').empty();
    $('div.background').html(state.templates.addStudentProject);

    // Add listeners
    addEditStudentProjectFormRadioListener();
    addStudentProjectFormListener();
    editStudentProjectFormListener();

    // Set css classes for navbar state
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

    // Scroll to top of page
    $(document).scrollTop(0);

    // Set Radio button to checked state
    $('input#add_student_project').prop('checked', true);

    // Add data to form Fields

    $('input[name="student_first_name"]').val(student.first_name);
    $('input[name="student_last_name"]').val(student.last_name);
    $('input[name="email"]').val(student.email);

  });

}


  // Listener for button to edit student projects on the project modal
function editStudentProjectModalButtonListener() {
  $('button.edit_student_curriculum_modal').click(function (event) {
    // Remove previous errors
    $('.errors, .error').remove();

    console.log('Edit project button clicked');

    // Get Project and student Ids and student data
    var projectIndex = $('.flex-active-slide div.project_number_container').attr('id');
    var studentID = $('.flex-active-slide > div.project_container').attr('id');
    console.log('Project Index: ',projectIndex);
    console.log('Student ID', studentID);

    // If no projects exist throw an error
    if (projectIndex === undefined) {
      var noProjectsToEdit = `
      <div class="error popIn">  
        <p class="errors">Error: No Projects to edit, please click the Add Project button to add a new project.</p>
      </div>
        `;
      $('li.flex-active-slide').append(noProjectsToEdit);
      return;
    }

    var student = state.student_records.find(function(record) {
      if (studentID === record.id) {
        return record;
      }
    });

    console.log(student);

    // Re-allow scrolling on main page
    $('html, body').css('overflow', 'auto');

    // Remove scroll from the modal
    $('div.student_modal').css('overflow', 'auto');

    // Re-allow clicks on the main page
    $('.nav li, button.student_info, button.add_student_project').css('pointer-events', "auto");

    // Stagger fading out modals
    $('div.student_curriculum_container').fadeOut(400, function() {
      
      $('div.student_modal').fadeOut();
      setTimeout(function () {
        $('div.student_modal').remove();

      }, 700);
    });
  
    setTimeout(function () {
      $('div.student_curriculum_container').remove();

    }, 700);

    // Set html to student project form
    $('div.background').empty();
    $('div.background').html(state.templates.addStudentProject);

    // Add listeners
    addEditStudentProjectFormRadioListener();
    addStudentProjectFormListener();
    editStudentProjectFormListener();

    // Set css classes for navbar state
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

    // Scroll to top of page
    $(document).scrollTop(0);

    // Set Radio button to checked state
    $('input#edit_student_project').prop('checked', true);
    
    // Append the html for the edit state
    var editNameFields = `
          <label for="project_number">Project Number</label>
          <input type="number" name="project_number" id="project_number">
          `;

    $('.mode_select').after(editNameFields);

    $('h1.add_student_project').text('Edit Student Project');

    // Add data to form Fields

    $('input[name="project_number"]').val(projectIndex);
    $('input[name="student_first_name"]').val(student.first_name);
    $('input[name="student_last_name"]').val(student.last_name);
    $('input[name="email"]').val(student.email);
    $('input#project_date').val(moment(student.student_curriculum[projectIndex-1].project_date).format('YYYY-MM-DD'));
    $('input#project_name').val(student.student_curriculum[projectIndex-1].project_name);
    $('input#project_description').val(student.student_curriculum[projectIndex-1].project_description);
    $('textarea#project_comments').val(student.student_curriculum[projectIndex-1].teacher_project_comments);

  });
}


// Exit the student project modal and returns to the student info modal
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


// Listener to change add / edit student project form and add listeners for adding or editing student projects
function addEditStudentProjectFormRadioListener () {
  $('input#add_student_project, input#edit_student_project').click(function(event) {
    
    // Remove previous errors on the form
    $('.error, .errors').remove();
    
    // Reset borders
    $('input').css('border', 'none');

    // If the Edit Student Project Radio is clicked
    if ($('input#edit_student_project').is(':checked')) {

       // Remove listener from adding student
      $('button[name="add_student_project"]').off('click').css({
        'pointer-events': 'none',
        'background-color': 'rgb(138, 138, 138)'
      });

      // Change edit project button to 'active state'
      $('button[name="edit_student_project"]').css({
        'pointer-events': 'auto',
        'background-color': 'rgb(178, 18, 18)'
      });

      // Remove the project number edit field
      $('label[for="project_number"], input#project_number').remove();

      var editNameFields = `
          <label for="project_number">Project Number</label>
          <input type="number" name="project_number" id="project_number">
          `;

      $('.mode_select').after(editNameFields);

      $('h1.add_student_project').text('Edit Student Project');

      //add the edit form listener
      editStudentProjectFormListener();
      
    // If the Add Student Project Radio is clicked
    } else if ($('input#add_student_project').is(':checked')) {


      // Remove Listener from Edit student project button
      $('button[name="edit_student_project"]').off().css({
        'pointer-events': 'none',
        'background-color': 'rgb(138, 138, 138)'
      });
      
      // Change add Student Project button to active state
      $('button[name="add_student_project"]').css({
        'pointer-events': 'auto',
        'background-color': 'rgb(178, 18, 18)'
      });

      // Remove the project number edit field
      $('label[for="project_number"], input#project_number').remove();


      $('h1.add_student_project').text('Add Student Project');
      addStudentProjectFormListener();
      
    }
  });

}


// Listener for changing the add / edit student form to either add or edit a student, adding appropriate listeners
function addEditStudentFormRadioListener() {

  $('input#add_student, input#edit_student').click(function (event) {
    

    // Remove previous errors on the form
    $('.error, .errors').remove();
    
    // Reset borders
    $('input').css('border', 'none');

    if ($('input#add_student').is(':checked')) {

      // change labels for adding a student
      $('.add_student_header').text('Add Student');
      $('label[for="first_name"]').text('First Name');
      $('label[for="last_name"]').text('Last Name');
      $('label[for="email"]').text('Email');
      
      $('button[name="edit_student"]').off().css({
        'pointer-events': 'none',
        'background-color': 'rgb(138, 138, 138)'
      });
      

      $('button[name="add_student"]').css({
        'pointer-events': 'auto',
        'background-color': 'rgb(178, 18, 18)'
      });

      // console.log('The add student radio button is checked');
      addStudentFormListener();

      // Remove the edit inputs if they exist
      $('label[for="existing_first_name"], label[for="existing_last_name"],label[for="existing_email"], input#existing_first_name, input#existing_last_name, input#existing_email, .edit_break').remove();


    } else if ($('input#edit_student').is(':checked')) {

      // change labels for editing a student
      $('.add_student_header').text('Edit Student');
      $('label[for="first_name"]').text('New First Name');
      $('label[for="last_name"]').text('New Last Name');
      $('label[for="email"]').text('New Email');

      // Remove the edit inputs if they exist
      $('label[for="existing_first_name"], label[for="existing_last_name"],label[for="existing_email"], input#existing_first_name, input#existing_last_name, input#existing_email, .edit_break').remove();

      // Remove listener from adding student
      $('button[name="add_student"]').off('click').css({
        'pointer-events': 'none',
        'background-color': 'rgb(138, 138, 138)'
      });

      $('button[name="edit_student"]').css({
        'pointer-events': 'auto',
        'background-color': 'rgb(178, 18, 18)'
      });

      // console.log('The edit student radio button is checked');
      editStudentFormListener();
      
      // Display additional edit fields for form
      var editNameFields = `
          <br class="edit_break">
          <label for="existing_first_name">Existing First Name</label>
          <input type="text" name="existing_first_name" id="existing_first_name">

          <label for="existing_last_name">Existing Last name</label>
          <input type="text" name="existing_last_name" id="existing_last_name">

          <label for="existing_email">Existing Email</label>
          <input type="text" name="existing_email" id="existing_email">


          `;
      $('.mode_select').after(editNameFields);
    }


  });
}


// listener for edit info button on student cards
function studentCardEditButtonListener() {
  $('button.edit_info').click(function(event) {
    event.preventDefault();
    // console.log('This is the edit info listener');

    var id = $(this).closest('.student_main_info').attr('id');
    // console.log(id);


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


    // Establish the radio listener and the state of the form
    // TODO ABSOLUTELY ADD THE EDIT LISTENER
    addEditStudentFormRadioListener();
    editStudentFormListener();
    
    $('input#edit_student').prop('checked', true);
    $('button[name="add_student"]').off('click').css({
      'pointer-events': 'none',
      'background-color': 'rgb(138, 138, 138)'
    });


    // Display proper labels
    $('.add_student_header').text('Edit Student');
    $('label[for="first_name"]').text('New First Name');
    $('label[for="last_name"]').text('New Last Name');
    $('label[for="email"]').text('New Email');

      // Remove listener from adding student
    $('button[name="add_student"]').off('click');
    // console.log('The edit student radio button is checked');
    var editNameFields = `
          <br class="edit_break">
          <label for="existing_first_name">Existing First Name</label>
          <input type="text" name="existing_first_name" id="existing_first_name">

          <label for="existing_last_name">Existing Last Name</label>
          <input type="text" name="existing_last_name" id="existing_last_name">

          <label for="existing_email">Existing Email</label>
          <input type="text" name="existing_email" id="existing_email">
          `;
    $('.mode_select').after(editNameFields);

    // Sets the form values for optional fields
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

    // Write the student data to the form
    $('input[name="existing_first_name"]').val(student_record.first_name);
    $('input[name="existing_last_name"]').val(student_record.last_name);
    $('input[name="existing_email"]').val(student_record.email);
    $('input[name="first_name"]').val(student_record.first_name);
    $('input[name="last_name"]').val(student_record.last_name);
    $('input[name="email"]').val(student_record.email);
    $('input[name="street_address"]').val(student_record.address.street_address);
    $('input[name="city"]').val(student_record.address.city);
    $('select#state').val(student_record.address.state);
    $('input[name="zipcode"]').val(student_record.address.zipcode);
    $('input[name="apartment_number"]').val(student_record.address.apartment_number);
    $('input[name="startDate"]').val(moment(student_record.student_lesson_time.startDate).format('YYYY-MM-DD'));
    $('select#weekday').val(student_record.student_lesson_time.weekday);
    $('input[name="startTime"]').val(moment(student_record.student_lesson_time.startTime).format('hh:DD A')); // 12:30
    $('input[name="endTime"]').val(moment(student_record.student_lesson_time.endTime).format('hh:DD A')); // 01:30

  }); 
}


// Listener for button to exit the student info screen
function studentInfoExitListener() {

  $('.frame_bottom, .frame_top, .frame_left, .frame_right, button.student_exit').click(function (event) {

    event.preventDefault();
    event.stopPropagation();

    if ($(this) === $('.student_main_info')) {
      // console.log('clicked');
      return false;
    }
    
    // Re-allow scrolling on main page
    $('html, body').css('overflow', 'auto');

    // Remove scroll from the modal
    $('div.student_modal').css('overflow', 'auto');

    // Re-allow clicks on the main page
    $('.nav li, button.student_info, button.add_student_project, button.delete_student').css('pointer-events', "auto");

    // Remove the modal
    $('div.student_modal').fadeOut();
    setTimeout(function () {
      $('div.student_modal').remove();

    }, 700);

  });
}


// Verify the token, and set application state based on the result
function authenticateResult() {
  authenticateToken()
    .then(function (result) {
      // console.log(result);
      if (redirectHome() === false) {
        // console.log(result.first_name);
        // console.log(result.last_name);
        
        state.role = result.role;
        // console.log(state.role);
        if (state.role === 'teacher') {
          state.teacher_first_name = result.first_name;
          state.teacher_last_name = result.last_name;
          saveStudentData(true);          
          displayNav();
          studentInfoListener();
          addstudentProjectCardListener();
          deleteStudentCardButtonListener();
        } else if (state.role === 'student') {
          state.student_first_name = result.first_name;
          state.student_last_name = result.last_name;
          displayStudentNav();
          getStudentData()
          .then(function(data) {
            state.current_student = data;
            // console.log('State.current_student', state.current_student);
            renderStudentWelcome(data);

            // console.log(data);
          })
          .catch(function(err) {
            // console.log(err);
            var serverError = `
              
              <div class="student_not_found popIn">
                <h1>Welcome ${state.student_first_name} ${state.student_last_name},</h1>
                <h2>Unfortunately, your teacher hasn't yet added you as a student. Please encourage them to sign up!</h2>
              </div> 
            `;

            $('div.background').html(serverError);
          });

        }
      } else {
        $('div.background').html(state.templates.unauthorized);
      }
    })
    .catch(function (err) {
      // console.log(err);
      $('div.background').html(state.templates.unauthorized);
      redirectHome(err);

    });
}


// Redirect the user to the log in screen if they are unauthorized
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


// Renders welcome screen for teachers
function renderWelcome () {
  
  var welcomeHTML = `
    <div class="curriculum_image">
    </div>
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


// Makes a GET request and saves the student list per teacher
function saveStudentData(initial = true) {
  getStudentData()
    .then(function (data) {
      // console.log(data);
      data.student_records.forEach(function (record, index) {
        record.order = index + 1;
        record.student_curriculum_length = record.student_curriculum.length;
        state.student_records.push(record);
      });
      if (initial === true) {
        renderWelcome();
      } else {
        $(document).scrollTop(0);
        $('div.card_container').empty();
        renderStudentCard(state.student_records);
      }
      // console.log('state.student_records', state.student_records);
      
    });
}

//-----------------Initialize the manager----------------//
//-------------------------------------------------------//
($(document).ready(function () {
  $(this).scrollTop(0);
  authenticateResult();
  
}));