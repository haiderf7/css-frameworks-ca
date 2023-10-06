import { authFetch } from "./api/authFetch.mjs";
import deletePost from "./deletePost.mjs";

const params = new URLSearchParams(document.location.search);
const id = params.get("id");
if (!id) location.href = "index.html";

const url = "https://nf-api.onrender.com/api/v1/social/posts/" + id;
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
