// DELETE

import { authFetch } from "./api/authFetch.mjs";

export default async function deletePost() {
  const id = this.dataset.delete;
  const method = "DELETE";

  if (id) {
    const url = "https://nf-api.onrender.com/api/v1/social/posts/" + id;

    try {
      const response = await authFetch(url, {
        method,
      });
      const json = await response.json();

      location.href = "index.html";
    } catch (error) {
      console.log("Error:", error);
    }
  }
}
