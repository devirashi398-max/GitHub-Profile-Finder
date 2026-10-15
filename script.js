const usernameInput = document.querySelector("#usernameInput");
const searchBtn = document.querySelector("#searchBtn");

searchBtn.addEventListener("click", function () {
    const username = usernameInput.value.trim();

    if (username === "") {
        alert("Please enter a GitHub username");
        return;
    }

    window.location.href =
        `profile.html?username=${encodeURIComponent(username)}`;
});