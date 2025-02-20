document.addEventListener("DOMContentLoaded", function () {
    const username = "aaldayarova";
    const url = `https://api.github.com/users/${username}/repos`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const repoList = document.getElementById("repo-list");
            repoList.innerHTML = "";

            const starred = data.filter(repo => repo.stargazers_count > 0).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

            if (starred.length == 0) {
                repoList.innerHTML = "<li>No starred repos found.</li>";
                return;
            }
            starred.forEach(repo => {
                const listItem = document.createElement("li");
                listItem.innerHTML = `
                    <div class="repo-header">
                        <a href="${repo.html_url}" target="_blank" class="repo-name"><strong class="repo-name">${repo.name}</strong></a>
                        <span class="repo-date"> &mdash; created on ${new Date(repo.created_at).toLocaleDateString()}</span> 
                    </div>
                    <div class="repo-description">
                        ${repo.description}
                    </div>
                    `;
                repoList.appendChild(listItem);
            });
        })
        .catch(error => console.error("Error fetching GitHub repos: ", error));
});