document.addEventListener("DOMContentLoaded", function () {
    const username = "aaldayarova";
    const url = `https://api.github.com/users/${username}/repos`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const repoList = document.getElementById("repo-list");
            repoList.innerHTML = "";

            const starred = data.filter(repo => repo.stargazers_count > 0);

            if (starred.length == 0) {
                repoList.innerHTML = "<li>No starred repos found.</li>";
                return;
            }
            starred.forEach(repo => {
                const listItem = document.createElement("li");
                listItem.innerHTML = `<strong>${repo.name}</strong> created on ${new Date(repo.created_at).toLocaleDateString()} - ${repo.description || ""}`;
                repoList.appendChild(listItem);
            });
        })
        .catch(error => console.error("Error fetching GitHub repos: ", error));
});