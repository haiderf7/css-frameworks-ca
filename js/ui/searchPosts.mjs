import { renderPosts } from "./renderPosts.mjs";

export function searchAndSortPosts(posts) {
  const search = document.querySelector(".search");
  const sortCheckbox = document.querySelector("#testfilter");

  search.addEventListener("input", function () {
    const searchValue = search.value.trim().toLowerCase();

    const filteredPosts = posts.filter((post) => {
      return post.title.toLowerCase().includes(searchValue);
    });

    if (sortCheckbox.checked) {
      filteredPosts.sort((a, b) => a.title.localeCompare(b.title));
    }

    renderPosts(filteredPosts);
  });

  sortCheckbox.addEventListener("change", function () {
    let filteredPosts = posts.slice();

    if (sortCheckbox.checked) {
      filteredPosts.sort((a, b) => a.title.localeCompare(b.title));
    }

    search.dispatchEvent(new Event('input')); // Re-run the search when sorting changes
  });
}
