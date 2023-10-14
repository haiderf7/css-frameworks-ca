// SEARCH AND SORT POSTS

import { renderPosts } from "./renderPosts.mjs";

export function searchAndSortPosts(posts, searchInput, sortCheckbox) {
  searchInput.addEventListener("input", handleSearchAndSort);
  sortCheckbox.addEventListener("change", handleSearchAndSort);

  function handleSearchAndSort() {
    const searchValue = searchInput.value.trim().toLowerCase();
    let filteredPosts = posts.filter((post) => post.title.toLowerCase().includes(searchValue));

    if (sortCheckbox.checked) {
      filteredPosts.sort((a, b) => a.title.localeCompare(b.title));
    }

    renderPosts(filteredPosts);
  }
}