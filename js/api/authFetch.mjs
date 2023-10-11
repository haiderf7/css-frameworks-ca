// AUTH FETCH

import { load } from "./storage/index.mjs";

export function headers() {
  const token = JSON.parse(localStorage.getItem)("token");

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
