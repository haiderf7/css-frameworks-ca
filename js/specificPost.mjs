import { authFetch } from "./api/authFetch.mjs";
import deletePost from "./deletePost.mjs";

const params = new URLSearchParams(document.location.search);
const id = params.get("id");
if (!id) location.href = "index.html";

const url = "https://api.noroff.dev/api/v1/social/posts/" + id;
const container = document.querySelector(".post-specific-container");
const h1 = document.querySelector("h1");

(async function getPost() {
  const method = "GET";

  try {
    const response = await authFetch(url, method);
    const json = await response.json();

    h1.innerHTML = `${json.title}`;

    container.innerHTML = `
        <p>${json.body}</p>
        <p>${json.tags}</p>

        <button type="button" id="delete" data-delete="${json.id}" class="btn btn-primary btn-sm mt-3">
        Delete
      </button>

      <a href="update_post.html?id=${json.id}" class="btn btn-primary btn-sm mt-3">
        Update Post
      </a>
      `;

    const deleteButton = document.querySelector("#delete");
    deleteButton.addEventListener("click", deletePost);
  } catch (error) {
    console.error(error);
  }
})();

// Display logged in message
const userName = localStorage.getItem("userName");
if (userName) {
  const userMessage = document.createElement("p");
  userMessage.textContent = "You are logged in";
  userMessage.style.color = "green";
  userMessage.style.fontWeight = "bold";
  document.body.prepend(userMessage); // Adjust as necessary to place the message in the desired location
}
