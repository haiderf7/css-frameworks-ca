// CREATE POST

import { API_BASE_URL } from "./api/constants.mjs";

import { authFetch } from "./api/authFetch.mjs";

import { validateTitle, validateBody, validateTags } from "./validation.mjs";

const form = document.querySelector("#form");

const title = document.querySelector("#titleId");

const body = document.querySelector("#bodyId");

const tags = document.querySelector("#tagsId");

const titleError = document.querySelector("#titleError");

const bodyError = document.querySelector("#bodyError");

const tagsError = document.querySelector("#tagsError");

const action = "/posts";
const method = "post";

export async function createPost(title, body, tags) {
  const createPostsUrl = API_BASE_URL + "/social/posts";
  const token = JSON.parse (localStorage.getItem("token"));

  try {
    const response = await authFetch(createPostsUrl, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: title,
        body: body,
        tags: tags.split(","),
      }),
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}


function validatePost(e) {
  e.preventDefault();
  if (validateTitle(title.value)) {
    titleError.style.display = "none";
  } else {
    titleError.style.display = "block";
  }
  if (validateBody(body.value)) {
    bodyError.style.display = "none";
  } else {
    bodyError.style.display = "block";
  }
  if (validateTags(tags.value)) {
    tagsError.style.display = "none";
  } else {
    tagsError.style.display = "block";
  }
  return createPost(title.value, body.value, tags.value);
}

form.addEventListener("submit", validatePost);
