// LOGIN USER

import { validateEmail, passwordValidation } from "./validation.mjs";

const API_BASE_URL = "https://nf-api.onrender.com";

const form = document.querySelector("#form");

const email = document.querySelector("#email");

const emailError = document.querySelector("#emailError");

const password = document.querySelector("#password");

const passwordError = document.querySelector("#passwordError");

async function loginUser() {
  const loginUrl = `${API_BASE_URL}/api/v1/social/auth/login`;
  try {
    const postData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email.value, password: password.value }),
    };
    const response = await fetch(loginUrl, postData);
    console.log(response);
    const json = await response.json();
    console.log(json);
    const accessToken = json.accessToken;
    localStorage.setItem("accessToken", accessToken);
    if (response.status === 200) location.href = "index.html";
    if (json.error) {
      validateForm();
    }
  } catch (error) {
    console.log(error);
  }
}

function validateLogin(submission) {
  submission.preventDefault();
  if (validateEmail(email.value) === true) {
    emailError.style.display = "none";
  } else {
    emailError.style.display = "block";
  }

  if (passwordValidation(password.value) === true) {
    passwordError.style.display = "none";
  } else {
    passwordError.style.display = "block";
  }
  if (validateEmail(email.value) && passwordValidation(password.value)) {
    loginUser();
  }
}

form.addEventListener("submit", validateLogin);
