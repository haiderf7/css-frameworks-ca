// CREATE POST

import { API_BASE_URL } from "./api/constants.mjs";
import { authFetch } from "./api/authFetch.mjs";
import { validateTitle, validateBody, validateTags } from "./validation.mjs";
import { renderPosts } from "./ui/renderPosts.mjs"; // Import the renderPosts function

const form = document.querySelector("#form");
const title = document.querySelector("#titleId");
const body = document.querySelector("#bodyId");
const tags = document.querySelector("#tagsId");
const titleError = document.querySelector("#titleError");
const bodyError = document.querySelector("#bodyError");
const tagsError = document.querySelector("#tagsError");
const action = "/posts";
const method = "post";

let createdPosts = []; // Array to store created posts

export async function createPost(title, body, tags) {
  const createPostsUrl = API_BASE_URL + "/social/posts";
  const token = localStorage.getItem("token");

  console.log("createPostsUrl:", createPostsUrl);
  console.log("Token:", token);

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

    console.log("Response status:", response.status);

    if (response.status === 200) {
      const data = await response.json();
      console.log("Post created successfully:", data);
      createdPosts.push(data); // Add the new post to the array
      return data;
    } else {
      console.error("Failed to create post:", response.statusText);
      return null;
    }
  } catch (error) {
    console.error("Error creating post:", error);
    return null;
  }
}

function validatePost(e) {
  e.preventDefault();
  if (validateTitle(title.value) && validateBody(body.value) && validateTags(tags.value)) {
    titleError.style.display = "none";
    bodyError.style.display = "none";
    tagsError.style.display = "none";

    createPost(title.value, body.value, tags.value)
      .then((newPost) => {
        if (newPost) {
          renderPosts(createdPosts); // Render all created posts
        }
      });
  } else {
    titleError.style.display = "block";
    bodyError.style.display = "block";
    tagsError.style.display = "block";
  }
}

form.addEventListener("submit", validatePost);
