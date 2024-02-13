let preloader = document.querySelector(".preloader");

window.addEventListener("load", () => {
	setTimeout(() => {
		preloader.animate([{ opacity: 1 }, { opacity: 0, display: "none" }], {
			duration: 1000,
			fill: "forwards",
		});
	}, 1000);

	// Parse the query string
});
let params = new URLSearchParams(window.location.search);

// Check if the 'name' and 'crush' parameters exist
if (params.has("name") && params.has("crush")) {
	// Get the values of the 'name' and 'crush' parameters
	let name = params.get("name");
	let crush = params.get("crush");

	// Display a popup
	alert(`${name} has asked you to be their Valentine, ${crush}!`);
}
let form = document.querySelector(".valentine-form");

form.addEventListener("submit", (e) => {
	e.preventDefault();
	let name = document.querySelector("#name").value;
	let crush = document.querySelector("#valentineName").value;

	if (name === "" || crush === "") {
		launch_toast("Please fill in all fields");
	} else {
		let data = {
			name,
			crush,
		};
		let params = new URLSearchParams({ name, crush });
		let url = window.location.href + "?" + params.toString();
		let linkArea = document.querySelector(".link-area a");

		linkArea.href = url;
		linkArea.textContent = url;
	}
});

function launch_toast(message) {
	var x = document.getElementById("toast");
	let descMessage = document.querySelector("#desc");
	x.className = "show";
	setTimeout(function () {
		x.className = x.className.replace("show", "");
		descMessage.textContent = message;
	}, 5000);
}
