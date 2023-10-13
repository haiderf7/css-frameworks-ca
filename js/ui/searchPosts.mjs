// SEARCH POSTS

import { renderPosts } from "./renderPosts.mjs";

export function searchPosts(posts) {
  const search = document.querySelector(".search");

  search.onkeyup = function (event) {
    const searchValue = event.target.value.trim().toLowerCase();

    const filteredPosts = posts.filter((post) => {
      if (post.title.toLowerCase().includes(searchValue)) {
        return true;
      }
    });
    renderPosts(filteredPosts);
  };
}

export function filterPosts(posts) {
  search.onkeyup = function (event) {
    posts.sort(function (a, b) {
      if (a.firstname < b.firstname) {
        return -1;
      }
      if (a.firstname > b.firstname) {
        return 1;
      }
      return 0;
    });
    filterPosts(search);
  };
}
