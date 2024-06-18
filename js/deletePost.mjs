// DELETE

import { authFetch } from "./api/authFetch.mjs";

export default async function deletePost(event) {
  const postId = event.target.dataset.delete;
  const method = "DELETE";

  if (postId) {
    const url = `https://api.noroff.dev/api/v1/social/posts/${postId}`;

    try {
      const response = await authFetch(url, {
        method,
      });

      if (response.ok) {
        alert("Post deleted successfully!"); // Alert message for successful deletion
        location.href = "index.html"; // Redirect or update UI as needed
      } else {
        const json = await response.json();
        throw new Error(json.message || "Failed to delete post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      // Optionally handle errors or display error messages
    }
  }
}
