// RENDER POSTS

export function renderPosts(postsToRender) {
  const postContent = document.querySelector(".postContent");
  const testfilter = document.querySelector("#testfilter");

  if (testfilter.checked) {
    postsToRender.sort(function (a, b) {
      if (a.title < b.title) {
        return -1;
      }
      if (a.title > b.title) {
        return 1;
      }
      return 0;
    });
  }

  postContent.innerHTML = "";

  postsToRender.forEach(function (post) {
    postContent.innerHTML += `<a class="card-content-action" href="post-specific.html?id=${post.id}">
    <div class="cardStyle">
      <h5 class="card-title">${post.title}</h5>
      <p class="card-text created">${post.created}</p>
      <p class="card-text id">${post.id}</p>
    </div>
  </a>`;
  });
}
