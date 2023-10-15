// SEARCH AND SORT POSTS


import { renderPosts } from "./renderPosts.mjs";
export function searchAndSortPosts(posts) {
  const searchInput = document.querySelector(".search");
  const sortCheckbox = document.querySelector("#testfilter");
  searchInput.addEventListener("input", handleSearchAndSort);
  sortCheckbox.addEventListener("change", handleSearchAndSort);
  function handleSearchAndSort() {
    const searchValue = searchInput.value.trim().toLowerCase();
    let filteredPosts = posts?.filter((post) => post.title.toLowerCase().includes(searchValue.toLowerCase())) ?? [];
    if (sortCheckbox.checked) {
      filteredPosts.sort((a, b) => a.title.localeCompare(b.title, "en", {sensitivity: 'base'}));
    }
    renderPosts(filteredPosts);
  }
}