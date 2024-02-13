let preloader = document.querySelector(".preloader");

window.addEventListener("load", () => {
	setTimeout(() => {
		preloader.animate([{ opacity: 1 }, { opacity: 0, display: "none" }], {
			duration: 1000,
			fill: "forwards",
		});
	}, 1000);
});
