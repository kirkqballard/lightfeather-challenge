'use strict';

function enableDisableSignUp() {
  var empty = false;
  $('form input').each(function() {
    if ($(this).val() == '') {
      empty = true;
    }
  });

  if (empty || !validateEmail() || !confirmPassword()) {
    $('#signUp').attr('disabled', 'disabled');
  }
  else {
    $('#signUp').removeAttr('disabled');
  }
}

function validateEmail() {

  var email = document.getElementById('inEmail');
  var emailErr = document.getElementById('emailError');
  
  // Regular expression taken from https://stackoverflow.com/a/2049510 answer #5
  // The pattern searches for positive match, so a non-match means error
  var pattern = new RegExp(/^[a-z0-9!'#$%&*+\/=?^_`{|}~-]+(?:\.[a-z0-9!'#$%&*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-zA-Z]{2,}$/i);
  var badEmail = !pattern.test(email.value);
  if (email.value != '' && badEmail) { // Not an error if input is empty
	if (emailErr == null) {
      emailErr = createErrorElement("emailError", "Invalid email address!");
	  email.parentNode.appendChild(emailErr);
	}
	else {
	  // TODO: Flash or highlight the error
	}
	
	return false;
  }
  
  if (emailErr != null) {
    email.parentNode.removeChild(emailErr);
  }
  
  return true;
}

function confirmPassword() {

  var confPwd = document.getElementById('inConfirmPassword');
  var pwdErr = document.getElementById('passwordError');
  if (confPwd.value != '' && confPwd.value != document.getElementById('inPassword').value) { // Not an error if input is empty
	if (pwdErr == null) {
      pwdErr = createErrorElement("passwordError", "Passwords do not match!");
	  confPwd.parentNode.appendChild(pwdErr);
	}
	else {
	  // TODO: Flash or highlight the error
	}

	return false;
  }
  
  if (pwdErr != null) {
    confPwd.parentNode.removeChild(pwdErr);
  }
  
  return true;
}

function createErrorElement(id, message) {

  var errElement = document.createElement('p');
  errElement.setAttribute("id", id);
  errElement.setAttribute("style", "color:red;font-style:bold");
  errElement.innerHTML = 'Error: ' + message;
  return errElement;
}

function showPassword(element) {

 if (element.type === "password") {
    element.type = "text";
  } else {
    element.type = "password";
  }
}

function thankYou(userName) {

  alert("Thank you for signing up " + userName.value + "!");
}