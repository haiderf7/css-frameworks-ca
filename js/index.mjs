// JS -> INDEX

import { renderPosts } from "./ui/renderPosts.mjs";
import { searchPosts } from "./ui/searchPosts.mjs";
import { authFetch } from "./api/authFetch.mjs";
import { filterPosts } from "./ui/searchPosts.mjs";

const API_BASE_URL = "https://nf-api.onrender.com";

async function getPostContent() {
  const url = `${API_BASE_URL}/api/v1/social/posts`;
  const method = "GET";

  try {
    const response = await authFetch(url, method);
    const results = await response.json();

    renderPosts(results);
    searchPosts(results);
  } catch (error) {
    console.error(error);
  }
}

getPostContent();

const checkboxEvent = document.querySelector("#testfilter");

checkboxEvent.addEventListener("change", function () {
  getPostContent();
});
