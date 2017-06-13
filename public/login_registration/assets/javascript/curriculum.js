/*global $ */

var state = {
  templates: {
    register: `<div class="signupbox popIn">

      <form class="signup">
        <fieldset>
          <legend for="Username and password"></legend>
          <h1>Curriculum Manager Registration</h1>
          
  		  <label for="Username">Username</label>
          <input placeholder="Username!1%" type="text" name="username" id="register_username" required>

          <div class="tooltip">?
            <span class="tooltiptext">Password must be 8 to 20 characters, and contain one uppercase letter, one lowercase letter, one number, and one special character.</span>
          </div>
  
  		  <label for="Password">Password</label>
          <input placeholder="1234passw0rd" type="password" name="password" id="register_password" required>

          <label for="First_Name">First Name</label>
          <input type="text" name="first_name" id="register_first_name" required>
  
  			<label for="Last_Name">Last Name</label>
          <input type="text" name="last_name" id="register_last_name" required>

          
		<div class="teacher_student_select">
          <label for="teacher" id="teacher_label">Teacher</label>            
          <input type="radio" name="radSize" id="teacher" value="teacher" checked="checked">
          <label for="student" id="student_label">Student</label>
          <input type="radio" name="radSize" id="student" value="student">
    </div>

          <div class="button_container">	
          <button id="register_button" type="submit" name="signup">Sign Up</button>
  </div> 
        </fieldset>
        
      </form>
    </div>`,

    login: `<div class="signupbox popIn">

      <form class="login">
        <fieldset>
          <legend for="Username and password"></legend>
          <h1>Curriculum Manager Log in</h1>
          <label for="Username">Username</label>
          <input placeholder="Username!1%" type="text" name="username" id="username">

          <label for="Password">Password</label>
          <input placeholder="1234passw0rd" type="password" name="password" id="password">
          <div class="button_container">
            <button id="login_button" name="signup">Login</button>
          </div>

      </form>
    </div>`,
    home: `
    
    <div class="curriculum_image">

    </div>
    <h1 class="landing_heading popIn">Curriculum Manager</h1>
    <h2 class="features F_one">Manage and view your students' personal data</h2>
    <h2 class="features F_two">Add student projects</h2>
    <h2 class="features F_three">Keep track of lesson times</h2>
    <h2 class="features F_four">Students can view their latest project and lesson data</h2>
    <div class="button_container">
      <button class="try_it_out">
      Try the app
      </button>
    </div>
    `,
  }
};

// Listener for clicks on the navbar
function navbarListener() {

  $('nav li').click(function (event) {

    if ($(this).text() === 'Home') {
      $('div.background').empty();
      $(this).scrollTop(0);
      $('div.background').html(state.templates.home);
      $(this).toggleClass('selected');
      $('div.nav li').not($(this)).removeClass('selected');

    }

    if ($(this).text() === 'Register') {
      $('div.background').empty();
      $(this).scrollTop(0);
      $('div.background').html(state.templates.register);
      $(this).toggleClass('selected');
      $('div.nav li').not($(this)).removeClass('selected');
      registerSubmitListener();
    }

    if ($(this).text() === 'Login') {
      $('div.background').empty();
      $(this).scrollTop(0);
      $('div.background').html(state.templates.login);
      loginSubmitListener();
      $(this).toggleClass('selected');
      $('div.nav li').not($(this)).removeClass('selected');
    }

    if ($(this).text() === 'Dashboard') {
      // console.log(window.localStorage);
      authenticateDashboard()
      .then(function(response){
        // console.log(response);
        $(this).toggleClass('selected');
        $('div.nav li').not($(this)).removeClass('selected');
        window.location = window.localStorage.getItem('dashboard_url');
        // setTimeout(function() {

        // }, 10000)
      });
    }

    if ($(this).attr('id') === 'logged_in') {
      // console.log('clearing token');
      window.localStorage.setItem('token', '');
      window.localStorage.setItem('current_user', '');
      window.localStorage.setItem('dashboard_url', '');
      appendLoggedinNav();

    }
  });
}



// Listens for clicks on the register button and initiates submission of registration data
function registerSubmitListener() {

  $('button#register_button').click(function (event) {
    event.preventDefault();

    var role = $('input[name="radSize"]:checked').val();
    // console.log(role);
    var username = $('input#register_username').val();
    var password = $('input#register_password').val();
    var first_name = $('input#register_first_name').val();
    var last_name = $('input#register_last_name').val();
    // console.log(username);
    // console.log(password);
    // console.log(first_name);
    // console.log(last_name);
    var validatedData = validateRegistrationData(password, username, first_name, last_name);
    validatedData.role = role;
    // console.log(validatedData);

    if (validatedData.message && validatedData.message === "No errors found.") {
      delete validatedData.message;
      register(validatedData)
        .then(function (data) {
          // console.log(data);
          $('div.button_container').before('<p class="success">Registration Successful!</p>');
        })
        .catch(function (err) {
          // console.log(err);
        });
    }

  });

}

function testButtonListener() {

  $('div.background').on('click', 'button.try_it_out', function(event) {
    event.preventDefault();
    var loginData = {
      username: "EliseR",
      password: "myGreatestHope!1"
    };

    login(loginData)
      .then(function (userdata) {
        console.log(userdata);
        setToken(userdata.token);
        window.localStorage.setItem('dashboard_url', userdata.url);
        window.localStorage.setItem('current_user', userdata.username);
        appendLoggedinNav();
        window.location = window.localStorage.getItem('dashboard_url');
      })
        .catch(function (err) {
          console.log(err);
        });
  });
}


// Listens for clicks on Login and initiates submission of login data
function loginSubmitListener() {

  $('button#login_button').click(function (event) {
    event.preventDefault();
    // console.log('button clicked');
    var username = $('input#username').val();
    var password = $('input#password').val();
    // console.log(username);
    // console.log(password);
    var validatedFormData = validateLoginData(password, username);
    // console.log(validatedFormData);
    if (validatedFormData.message && validatedFormData.message === "No errors found.") {
      delete validatedFormData.message;
      login(validatedFormData)
        .then(function (userdata) {
          // console.log(userdata.token);
          setToken(userdata.token);
          window.localStorage.setItem('dashboard_url', userdata.url);
          window.localStorage.setItem('current_user', userdata.username);
          appendLoggedinNav();
          window.location = window.localStorage.getItem('dashboard_url');
        })
        .catch(function (err) {
          // console.log(err.responseJSON);
          var errormsg = `<p class="error">${err.responseJSON.error}</p>`;
          // console.log(errormsg);
          $('.button_container').before(errormsg);
        });
    }
  });
}


// Ajax submits login data
function login(loginObj) {
  return $.ajax({
    type: 'POST',
    url: '/auth/login',
    data: loginObj,
  });
}


// Ajax submits registration data
function register(loginObj) {
  return $.ajax({
    type: 'POST',
    url: '/auth/register',
    data: loginObj,
    headers: {
      Authorization: `bearer ${window.localStorage.getItem('token')}`
    }
  });
}


// Validates login data before submit
function validateLoginData(password, username) {
  var errors = {};
  var formdata = {};
  // console.log("inside validate login data");
  // console.log('username:', username);
  // console.log('password:', password);
  $('.error').remove();
  if (password === "") {
    errors.password = "The Password field is empty.";
  } else if (password !== "") {
    formdata.password = password;
  }

  if (username === "") {
    errors.username = "The Username field is empty.";
  } else if (username !== "") {
    formdata.username = username;
  }
  // console.log(errors);
  if (Object.keys(errors).length > 0) {
    Object.keys(errors).forEach(function (elem) {
      var currentError = errors[elem];
      var errorMsg = `<p class="error" id="${elem}_error"> ${currentError}</p>`;
      // console.log(errorMsg);
      // console.log(errors.elem);
      // console.log(currentError);
      $(`input[name="${elem}"]`).after(errorMsg);
      return errors;
    });
  } else {
    formdata.message = "No errors found.";
    return formdata;
  }
}


// Validates Registration data before submit
function validateRegistrationData(password, username, first_name, last_name) {
  var errors = {};
  var formData = {};
  $('.error').remove();

  // Testing if password is valid
  if (password) {
    var passValid = new RegExp(/(?=.*\d+)(?=.*[A-Z]+)(?=.*[a-z]+)(?=.{8,20})(?=.*[^\w\d]+)/);
    if (passValid.test(password) === false) {
      errors.password = "Password must be 8 to 20 characters, and contain one uppercase letter, one lowercase letter, one number, and one special character.";
    } else {
      formData.password = password;
    }
  } else if (password === "") {
    errors.password = "The Password field is empty.";
  }

  // Testing if username is valid
  if (username) {
    var usernameValid = new RegExp(/^\w{4,}$/);
    if (usernameValid.test(username) === false) {
      errors.username = "Username must be alphanumeric and contain at least 4 characters.";
    } else {
      formData.username = username;
    }
  } else if (username === "") {
    errors.username = "The Username field is empty.";
  }

  // Testing if first name is valid  
  var nameValid = new RegExp(/^([ \u00c0-\u01ffa-zA-Z'\-]{1,20})+$/);

  if (first_name) {
    if (nameValid.test(first_name) === false) {
      errors.first_name = "First name must be 1 to 20 characters in length and contain only UTF-8 letters and a hyphen.";
    } else {
      formData.first_name = first_name;
    }
  } else if (first_name === "") {
    errors.first_name = "The First name field is empty.";
  }

  // Testing if last_name is valid

  if (last_name) {
    if (nameValid.test(last_name) === false || last_name.length < 2 || last_name.length > 20) {
      errors.last_name = "Last name must be between 2 and 20 characters in length and contain only UTF-8 letters and a hyphen.";
    } else {
      formData.last_name = last_name;
    }
  } else if (last_name === "") {
    errors.last_name = "The Last name field is empty.";
  }

  // render to the DOM
  if (Object.keys(errors).length > 0) {
    Object.keys(errors).forEach(function (elem) {
      // console.log(elem);
      // console.log(errors);
      var currentError = errors[elem];
      // console.log(currentError);
      var errorMsg = `<p class="error" id="${elem}_error"> ${currentError}</p>`;
      // console.log(errorMsg);
      $(`input[name="${elem}"]`).after(errorMsg);
    });
    return errors;
  } else {
    formData.message = "No errors found.";
    return formData;
  }
}


// Submits token to authenticate endpoint, checking if it exists
function authenticateToken() {
  return $.ajax({
    type: 'POST',
    url: '/auth/authenticate',
    headers: {
      Authorization: `bearer ${window.localStorage.getItem('token')}`
    }
  });
}


// Verifies token when accessing dashboard
function authenticateDashboard() {
  return $.ajax({
    type: 'GET',
    url: `/welcome/dashboard${window.localStorage.getItem('current_user')}`,
    headers: {
      Authorization: `bearer ${window.localStorage.getItem('token')}`
    }
  });
}


// Checks token and if it exists appends the nav
function checkTokenAndAppendNav() {
  if (window.localStorage.getItem('token')) {
    authenticateToken().
    then(function (userdata) {
      // console.log(userdata.url);
      window.localStorage.setItem('current_user', userdata.username);
      window.localStorage.setItem('dashboard_url', userdata.url);

      appendLoggedinNav();
    })
      .catch(function (err) {
        // console.log(err);
      });

  }
}


// If user is logged in, changes nav to include new options
function appendLoggedinNav() {
  if (window.localStorage.getItem('token')) {

    var loggedIn = `
              <li>Home</li>
              <li>Register</li>
              <li>Login</li>
              <li>Dashboard</li>
              <li id="logged_in">
              Not <span>${window.localStorage.getItem('current_user')}?</span class="logged_user"><br><span>Log out</span></li>`;

    $('div.nav').html(loggedIn);
    navbarListener();

  } else {

    var loggedOut = `
              <li>Home</li>
              <li>Register</li>
              <li>Login</li>`;

    $('div.nav').html(loggedOut);
    navbarListener();
  }

}


// Writes received token to local storage;
function setToken(token) {
  // console.log(token);
  window.localStorage.setItem('token', token);
  var tokenInStorage = window.localStorage.getItem('token');
  // console.log("The token has been written to storage", tokenInStorage);
}


// Test for the token being sent
function testDashboard() {
  // console.log('token to be sent', window.localStorage.getItem('token'));

  return $.ajax({
    type: 'GET',
    url: `/welcome/dashboard${window.localStorage.getItem('current_user')}`,
    data: {token: `{window.localStorage.getItem('token')}`
    }
  })
  .then(function(token) {
    // console.log('request was sent)');
    // console.log(token);
  });
}


// Initialize the welcome screen //
//-------------------------------//
($(document).ready(function () {
  $( "html" ).removeClass( "loading" );
  navbarListener();
  testButtonListener();
  checkTokenAndAppendNav();
  $(this).scrollTop(0);
  testDashboard();


}));