// CREATE POST

import { API_BASE_URL } from "./api/constants.mjs";
import { authFetch } from "./api/authFetch.mjs";
import { validateTitle, validateBody, validateTags } from "./validation.mjs";
import { renderPosts } from "./ui/renderPosts.mjs";

const form = document.querySelector("#form");
const title = document.querySelector("#titleId");
const body = document.querySelector("#bodyId");
const tags = document.querySelector("#tagsId");
const titleError = document.querySelector("#titleError");
const bodyError = document.querySelector("#bodyError");
const tagsError = document.querySelector("#tagsError");
const searchInput = document.querySelector(".search");
const sortCheckbox = document.querySelector("#testfilter");

const method = "post";

export async function createPost(title, body, tags, createdPosts) {
  const createPostsUrl = API_BASE_URL + "/social/posts";
  const token = localStorage.getItem("token");

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

    if (response.status === 200) {
      const data = await response.json();
      createdPosts.push(data);
      alert("Post created successfully"); // Alert on successful post creation
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

  let isValid = true;

  if (validateTitle(title.value)) {
    titleError.style.display = "none";
  } else {
    titleError.style.display = "block";
    isValid = false;
  }

  if (validateBody(body.value)) {
    bodyError.style.display = "none";
  } else {
    bodyError.style.display = "block";
    isValid = false;
  }

  if (validateTags(tags.value)) {
    tagsError.style.display = "none";
  } else {
    tagsError.style.display = "block";
    isValid = false;
  }

  if (isValid) {
    createPost(title.value, body.value, tags.value, createdPosts)
      .then((newPost) => {
        if (newPost) {
          renderPosts(createdPosts);
        }
      });
  }
}

form.addEventListener("submit", validatePost);

const createdPosts = [];

searchInput.addEventListener("input", handleSearchAndSort);
sortCheckbox.addEventListener("change", handleSearchAndSort);

// Function to handle search and sort
function handleSearchAndSort() {
  const searchValue = searchInput.value.trim().toLowerCase();
  let filteredPosts = createdPosts.filter((post) => post.title.toLowerCase().includes(searchValue));

  if (sortCheckbox.checked) {
    filteredPosts.sort((a, b) => a.title.localeCompare(b.title));
  }

  renderPosts(filteredPosts);
}
