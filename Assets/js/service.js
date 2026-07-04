const main = document.getElementById('main-content');

// ==========================
//      Main Content
// ==========================
main.innerHTML = (`
    <div class="card" onclick="window.location.href='./about.html'" style="cursor: pointer;">
        <div class="card_body">
            <h2 class="text-heading">About</h2>
            <p class="text-muted">
                Learn more about the platform, its purpose, features, and how it helps connect job seekers with employers.
            </p>
        </div>
    </div>

    <div class="card" onclick="window.location.href='./privacy.html'" style="cursor: pointer;">
        <div class="card_body">
            <h2 class="text-heading">Privacy</h2>
            <p class="text-muted">
                Review how your personal information is collected, used, stored, and protected while using the platform.
            </p>
        </div>
    </div>`
)