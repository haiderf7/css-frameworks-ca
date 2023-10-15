// JS -> INDEX

import { renderPosts } from "./ui/renderPosts.mjs";
import { searchAndSortPosts } from "./ui/searchPosts.mjs";
import { authFetch } from "./api/authFetch.mjs";
import preDefinedPosts from "./precreatedposts.mjs";

const API_BASE_URL = "https://api.noroff.dev/api/v1";

async function getPostContent() {
  const url = `${API_BASE_URL}/social/posts`;
  const method = "GET";
  try {
    const response = await authFetch(url, method);
    const results = await response.json();

    renderPosts(results?.errors ? [] : results);
    searchAndSortPosts(results);
  } catch (error) {
    console.error(error);
  }
}

getPostContent();

// Event listener for the "Logout" button
const logoutButton = document.querySelector("#logoutButton");
logoutButton.addEventListener("click", () => {
  // Clear local storage
  localStorage.clear();

  // Redirect the user to the login page (modify the URL as needed)
  window.location.href = "login.html";
});

function renderPredefinedPosts(filteredPosts) {
  const predefined_postsDiv = document.querySelector("#predefined_posts");
  predefined_postsDiv.innerHTML = "";
  filteredPosts.forEach(function (post) {
    predefined_postsDiv.innerHTML += `
    <div class="card-body p-4">
      <div class="d-flex flex-start">
        <img class="rounded-circle shadow-1-strong me-3" src=${post.img} alt="avatar" width="60" height="60">
        <div>
          <h6 class="fw-bold mb-1">${post.author}</h6>
          <div class="d-flex align-items-center mb-3">
            <p class="mb-0">
              ${post.date}
              <span class="badge bg-success">${post.state}</span>
            </p>
            <a href="#!" class="link-muted"><i class="fas fa-pencil-alt ms-2"></i></a>
            <a href="#!" class="text-success"><i class="fas fa-redo-alt ms-2"></i></a>
            <a href="#!" class="link-danger"><i class="fas fa-heart ms-2"></i></a>
          </div>
          <p class="mb-0">
            ${post.content}
          </p>
        </div>
      </div>
    </div>
    <hr class="my-0" style="height: 1px" />
  `;
  });
}

const searchInput = document.querySelector(".search");
const sortCheckbox = document.querySelector("#testfilter");

function handleSearchPredefinedPosts() {
  const searchValue = searchInput.value.trim().toLowerCase();
  let filteredPosts = preDefinedPosts.filter((post) =>
    post.content.toLowerCase().includes(searchValue?.toLowerCase()) ||
    post.author.toLowerCase().includes(searchValue?.toLowerCase())
  );
  let sortedPosts = filteredPosts;
  if (sortCheckbox.checked) {
    sortedPosts.sort((a, b) => a.content.localeCompare(b.content));
  }
  renderPredefinedPosts(sortedPosts);
}

searchInput.addEventListener("input", handleSearchPredefinedPosts);
sortCheckbox.addEventListener("change", handleSearchPredefinedPosts);

renderPredefinedPosts(preDefinedPosts);
