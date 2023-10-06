// AUTH FETCH

import { load } from "./storage/index.mjs";

export function headers() {
  const token = localStorage.getItem("accessToken");

  return {
    "Content-type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export async function authFetch(url, options = {}) {
  return fetch(url, {
    ...options,
    headers: headers(),
  });
}
