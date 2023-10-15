import { authFetch } from "./api/authFetch.mjs";

const form = document.querySelector("#form");
const title = document.querySelector("#titleId");
const body = document.querySelector("#bodyId");
const tags = document.querySelector("#tagsId");
const idInput = document.querySelector("#id");

const params = new URLSearchParams(document.location.search);
const id = params.get("id");
if (!id) location.href = "index.html";

const url = `https://api.noroff.dev/api/v1/social/posts/${id}`;

// Populate the form with post data
async function populateForm() {
  const method = "GET";
  try {
    const response = await authFetch(url, method); 
    const json = await response.json();

    title.value = json.title;
    body.value = json.body;
    tags.value = json.tags;
    idInput.value = json.id;
  } catch (error) {
    console.log(error);
  }
}

// Handle form submission
form.onsubmit = async function (event) {
  event.preventDefault();

  const titleValue = title.value;
  const bodyValue = body.value;
  const tagsValue = tags.value;

  // Here, you can add input validation checks

  try {
    await updatePost(titleValue, bodyValue, tagsValue, id);
    alert("Post updated successfully!"); 
  } catch (error) {
    console.log("Failed to update post:", error);
  }
};

// Function to update the post
async function updatePost(title, body, tags, id) {
  const url = `https://api.noroff.dev/api/v1/social/posts/${id}`;
  const method = "PUT";

  const data = {
    title: title,
    body: body,
    tags: tags.split(","), 
  };

  const token = localStorage.getItem("token");

  const response = await authFetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (response.status !== 200) {
    throw new Error(`Failed to update post: ${response.statusText}`);
  }
}


populateForm();


