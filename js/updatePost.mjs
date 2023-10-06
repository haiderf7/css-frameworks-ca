// UPDATE POST
import { authFetch } from "./api/authFetch.mjs";

const form = document.querySelector("#form");
const title = document.querySelector("#titleId");
const body = document.querySelector("#bodyId");
const tags = document.querySelector("#tagsId");
const idInput = document.querySelector("#id");

const params = new URLSearchParams(document.location.search);
const id = params.get("id");
if (!id) location.href = "index.html";

const url = "https://nf-api.onrender.com/api/v1/social/posts/" + id;

//Setter inn data og id i form'et
(async function () {
  const method = "GET";
  try {
    const response = await authFetch(url, method);
    const json = await response.json();

    //før '=' er inputene du henter med querySelector i toppen her.
    //Etter '=' setter de verdiene til å være det du får fra fetch'en.
    title.value = json.title;
    body.value = json.body;
    tags.value = json.tags;
    idInput.value = json.id;
  } catch (error) {
    console.log(error);
  }
})();

form.onsubmit = function (event) {
  event.preventDefault();

  const titleValue = title.value;
  const bodyValue = body.value;
  const tagsValue = tags.value;
  const idValue = idInput.value;

  //Her kan du gjøre if sjekk for å validere inputene

  updatePost(titleValue, bodyValue, tagsValue, idValue);
};

async function updatePost(title, body, tags, id) {
  const url = "https://nf-api.onrender.com/api/v1/social/posts/" + id;
  const method = "PUT";

  const data = {
    title: title,
    body: body,
    tags: tags,
  };

  try {
    const response = await authFetch(url, {
      method,
      body: JSON.stringify(data),
    });

    const json = await response.json();
  } catch (error) {
    console.log(error);
  }
}
