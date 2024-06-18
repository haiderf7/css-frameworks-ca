import { displayMessage } from "./ui/displayMessage.mjs";

const API_BASE_URL = "https://api.noroff.dev/api/v1";

const form = document.querySelector("form");

async function loginUser(event) {
	event.preventDefault();
	const form = event.target;
	const formData = new FormData(form);
	const profile = Object.fromEntries(formData.entries());

	const loginUrl = `${API_BASE_URL}/social/auth/login`;

	try {
		const postData = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(profile),
		};
		const response = await fetch(loginUrl, postData);

		const json = await response.json();

		if (response.ok) {
			const token = json.accessToken;
			const userName = profile.name; // Assuming 'name' is a part of the login form data

			localStorage.setItem("token", token);
			localStorage.setItem("userName", userName);

			alert("Login is successful");
			location.href = "index.html";
			return;
		}

		displayMessage("danger", json.errors[0].message, "#message");
	} catch (error) {
		displayMessage("danger", "There was a server error", "#message");
	}
}

form.addEventListener("submit", loginUser);
