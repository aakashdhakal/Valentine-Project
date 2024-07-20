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
let submitBtn = document.querySelector(".valentine-form button");

form.addEventListener("submit", (e) => {
	e.preventDefault();
	submitBtn.innerHTML =
		"<i class='fas fa-spinner fa-spin'></i> Creating Link...";
	let name = document.querySelector("#name").value;
	let crush = document.querySelector("#valentineName").value;
	let email = document.querySelector("#email").value;

	if (name === "" || email === "") {
		launch_toast("Please fill in all fields");
		submitBtn.innerHTML = "Create Link";
		return;
	} else if (crush === "") {
		launch_toast("Sem bro Sem - Developer");
		submitBtn.innerHTML = "Create Link";
		return;
	} else {
		let params = new URLSearchParams({ name, crush, email });
		let url = window.location.href + "?" + params.toString();

		shortenURL(url);
	}
});

function shortenURL(longUrl) {
	fetch("https://ulvis.net/API/write/post", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
		body: JSON.stringify({
			url: longUrl,
			type: "json",
		}),
	}).then((response) => {
		response.json().then((data) => {
			let linkArea = document.querySelector(".link-area a");
			linkArea.textContent = data.data.url;
			linkArea.href = data.data.url;
			launch_toast("Link created successfully");
			submitBtn.innerHTML = "Create Link";
		});
	});
}

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
	yesButton.innerHTML = "<i class='fas fa-spinner fa-spin'></i> ";
	sendEmail("yes");
	dialog.close();
	launch_toast("Response sent successfully");
});

noButton.addEventListener("click", () => {
	noButton.innerHTML = "<i class='fas fa-spinner fa-spin'></i> ";
	sendEmail("no");
	dialog.close();
	launch_toast("Response sent successfully ");
});

//send email
function sendEmail(status) {
	let params = new URLSearchParams(window.location.search);
	let email = params.get("email");
	let crush = params.get("crush");

	let body;
	if (status === "yes") {
		body = "Congratulations!! " + crush + " has accepted your proposal";
	} else {
		body = "Sorry!! " + crush + " has rejected your proposal";
	}
	Email.send({
		SecureToken: "0a991a3b-4cee-46ad-a1b9-bfb39f8cde71",
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

//91fbbdba-706a647d
