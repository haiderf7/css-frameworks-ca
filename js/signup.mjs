//REGISTER USER

import {
  validateUsername,
  validateEmail,
  passwordValidation,
  newPasswordValidation,
} from "./validation.mjs";

const API_BASE_URL = "https://nf-api.onrender.com";

const form = document.querySelector("#register");

const username = document.querySelector("#username");

const userNameError = document.querySelector("#userNameError");

const emailAddress = document.querySelector("#emailAddress");

const emailError = document.querySelector("#emailError");

const password = document.querySelector("#password");

const passwordError = document.querySelector("#passwordError");

const newPassword = document.querySelector("#newPassword");

const newPasswordError = document.querySelector("#newPasswordError");

async function registerTheUser(username, email, password) {
  const url = API_BASE_URL + "/api/v1/social/auth/register";

  const options = {
    method: "POST",
    body: JSON.stringify({
      name: username,
      email: email,
      password: password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(url, options);
    console.log(response);
    const json = await response.json();
    console.log(json);
    if (json.error) {
      validateForm();
    }
  } catch (error) {
    console.log(error);
  }
}

export function registerSuccess(event) {
  event.preventDefault();

  if (validateUsername(username.value)) {
    userNameError.style.display = "none";
  } else {
    userNameError.style.display = "block";
  }

  if (validateEmail(emailAddress.value)) {
    emailError.style.display = "none";
  } else {
    emailError.style.display = "block";
  }

  if (passwordValidation(password.value)) {
    passwordError.style.display = "none";
  } else {
    passwordError.style.display = "block";
  }

  if (newPasswordValidation(newPassword.value)) {
    newPasswordError.style.display = "none";
  } else {
    newPasswordError.style.display = "block";
  }

  if (
    validateUsername(username.value) &&
    validateEmail(emailAddress.value) &&
    passwordValidation(password.value) &&
    newPasswordValidation(newPassword.value)
  ) {
    registerTheUser(username.value, emailAddress.value, password.value);
  }
}

form.addEventListener("submit", registerSuccess);
