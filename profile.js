const profile = document.querySelector("#profile");
const backBtn = document.querySelector("#backBtn");

backBtn.addEventListener("click", function () {
    window.location.href = "index.html";
});

async function getProfile() {
    const params = new URLSearchParams(window.location.search);
    const username = params.get("username");

    if (!username) {
        profile.textContent = "No username provided.";
        return;
    }

    profile.textContent = "Loading profile...";

    try {
        const url = `https://api.github.com/users/${encodeURIComponent(username)}`;
        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
            profile.textContent =
                response.status === 404
                    ? "User not found. Try another username."
                    : "Unable to load profile. Please try again.";
            return;
        }

        // Profile picture
        const avatar = document.createElement("img");
        avatar.src = data.avatar_url;
        avatar.alt = "GitHub profile picture";

        // Name
        const name = document.createElement("h2");
        name.textContent = data.name || data.login;

        // Clickable username
        const usernameText = document.createElement("a");
        usernameText.href = data.html_url;
        usernameText.textContent = `@${data.login}`;
        usernameText.target = "_blank";
        usernameText.rel = "noopener noreferrer";

        // Bio
        const bio = document.createElement("p");
        bio.textContent = data.bio || "No bio available";

        // Stats container
        const stats = document.createElement("div");
        stats.className = "stats";

        // Followers card
        const followers = document.createElement("div");
        followers.className = "stat-card";

        const followersCount = document.createElement("h3");
        followersCount.textContent = data.followers;

        const followersLabel = document.createElement("p");
        followersLabel.textContent = "Followers";

        followers.append(followersCount, followersLabel);

        // Repositories count card
        const repos = document.createElement("div");
        repos.className = "stat-card";

        const reposCount = document.createElement("h3");
        reposCount.textContent = data.public_repos;

        const reposLabel = document.createElement("p");
        reposLabel.textContent = "Public Repositories";

        repos.append(reposCount, reposLabel);

        // Add both cards
        stats.append(followers, repos);

        // Display profile
        profile.replaceChildren(
            avatar,
            name,
            usernameText,
            bio,
            stats
        );

    } catch (error) {
        console.error("Error:", error);
        profile.textContent =
            "Something went wrong. Please try again.";
    }
}

getProfile();
usernameInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        searchBtn.click();
    }
});