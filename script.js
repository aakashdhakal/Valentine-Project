let preloader = document.querySelector(".preloader");
let dialog = document.querySelector("#invitation");

window.addEventListener("load", () => {
	setTimeout(() => {
		preloader.animate([{ opacity: 1 }, { opacity: 0, display: "none" }], {
			duration: 1000,
			fill: "forwards",
		});
	}, 1000);
	let params = new URLSearchParams(window.location.search);
	setTimeout(
		() => {
			if (Array.from(params).length > 0) {
				openDialog();
			}
		},

		2000
	);

	// Parse the query string
});

let form = document.querySelector(".valentine-form");

form.addEventListener("submit", (e) => {
	e.preventDefault();
	let name = document.querySelector("#name").value;
	let crush = document.querySelector("#valentineName").value;
	let email = document.querySelector("#email").value;

	if (name === "" || email === "") {
		launch_toast("Please fill in all fields");
		return;
	} else if (crush === "") {
		launch_toast("Sem bro Sem - Developer");
		return;
	} else {
		let params = new URLSearchParams({ name, crush, email });
		let url = window.location.href + "?" + params.toString();
		let linkArea = document.querySelector(".link-area a");

		linkArea.href = url;
		linkArea.textContent = url;
	}
});

function launch_toast(message) {
	var x = document.getElementById("toast");
	let descMessage = document.querySelector("#desc");
	descMessage.textContent = message;

	x.className = "show";
	setTimeout(function () {
		x.className = x.className.replace("show", "");
	}, 5000);
}

let copyToClipboard = document.querySelector(".link-area button");

copyToClipboard.addEventListener("click", () => {
	let linkArea = document.querySelector(".link-area a");
	let linkText = linkArea.textContent;

	navigator.clipboard
		.writeText(linkText)
		.then(() => {
			launch_toast("Link copied to clipboard");
		})
		.catch((err) => {
			console.error("Could not copy text: ", err);
		});
});

function openDialog() {
	let params = new URLSearchParams(window.location.search);
	let crushName = document.querySelectorAll(".crush");
	let creatorName = document.querySelector(".creator");

	// Check if the 'name' and 'crush' parameters exist
	if (params.has("name") && params.has("crush")) {
		// Get the values of the 'name' and 'crush' parameters
		let creator = params.get("name");
		let crush = params.get("crush");
		crushName.forEach((name) => {
			name.textContent = crush;
		});
		creatorName.textContent = creator;
	}

	dialog.showModal();
}

let yesButton = document.querySelector("#yes");
let noButton = document.querySelector("#no");

yesButton.addEventListener("click", () => {
	sendEmail("yes");
	dialog.close();
	launch_toast("Response sent to sender's email");
});

noButton.addEventListener("click", () => {
	sendEmail("no");
	dialog.close();
	launch_toast("Response sent to sender's email");
});

//send email
function sendEmail(status) {
	let params = new URLSearchParams(window.location.search);
	let email = params.get("email");
	let body;
	if (status === "yes") {
		body = "Congratulations!! Your crush has accepted your proposal";
	} else {
		body = "Sorry!! Your crush has rejected your proposal";
	}
	Email.send({
		SecureToken: "6d1db3bb-4ea5-4cfc-a306-9c0d621bdc21",
		// Host: "smtp.elasticemail.com",
		// Username: "anoother@gmail.com",
		// Password: "EC86DDD5696188D7CE2E5E14ADD8BAED82AC",
		To: email,
		From: "noreply@aakashdhakal.com.np",
		Subject: "Your crush has sent you response",
		Body: body,
	}).then(function (message) {
		console.log("mail sent successfully" + message);
	});
}

function closeDialog() {
	dialog.close();
}
