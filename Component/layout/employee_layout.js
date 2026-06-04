const header = document.querySelector('.header');
const footer = document.querySelector('.footer-content');


// ==========================
//      Header Content
// ==========================
header.innerHTML = (
    `<nav>
        <ul>
        <li><a href="./home.html">Home</a></li>
        <li><a href="./jobs.html">Browse Jobs</a></li>

        <li class="dropdown">
            <a href="./category.html" class="dropbtn">
                Job Categories ▾
            </a>

            <div class="dropdown-content">
                <a href="category_detail.html?category_id=1">Technology</a>
                <a href="category_detail.html?category_id=2">Design & Creative</a>
                <a href="category_detail.html?category_id=3">Marketing</a>
                <a href="category_detail.html?category_id=4">Human Resources</a>
                <a href="category_detail.html?category_id=5">Analytics</a>
                <hr>
                <a href="category.html?category_id=6">More ...</a>
            </div>
        </li>

        <li><a href="./company.html">Companies</a></li>

        <li class="dropdown">
            <a href="javascript:void(0)" class="dropbtn">Services ▾</a>
            <div class="dropdown-content">
                <a href="about.html">About Us</a>
                <a href="./privacy.html">Privacy & Policy</a>
            </div>
        </li>

        <li class="dropdown theme-toggle">
            <a href="#" class="dropbtn">Setting ▾</a>
            <div class="dropdown-content">
                <a href="./profile.html">Profile</a>
                <a onclick="toggleTheme()">Mode 🌓</a>
                <a href="#logout">Logout</a>
            </div>
        </li>
        </ul>
    </nav>`
);

// ==========================
//      Footer Content
// ==========================
footer.innerHTML = (
    `
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.13.1/font/bootstrap-icons.min.css">
        <div class="row">
            <div class="col-1">
                <img src="../Assets/images/qr_code_app.png" alt="qr">
            </div>
            <div class="col-2">
                <h3>Loyalty & Membership</h3>
                <ul>
                    <li><p>Discount</p></li>
                    <li><p>Subscription</p></li>
                </ul>
            </div>
            <div class="col-3">
                <h3>Social Media</h3>
                <a href="#" class="py-1">
                    <i class="bi bi-facebook px-2">Facebook</i>
                </a>
                <a href="#" class="py-1">
                    <i class="bi bi-linkedin px-2">LinkIn</i>
                </a>
                
                <a href="#" class="py-1">
                    <i class="bi bi-tiktok px-2">TikTok</i>
                </a>
                
            </div>
            <div class="col-3">
                <h3>Subscription Letter</h3>
                <form action="#" method="post">
                    <label for="email" class="pb-1">Email: </label><br>
                    <input type="email" name="email" class="form-control" id="email" placeholder="finn@gmail.com" required><br>
                    <button type="submit">Subscription</button>
                </form>
            </div>
            <div class="col-2 ">
                <h3>More About Us</h3>
                <h4>Email: </h3>
                <p>Llightboth@gmail.com</p><br>
                <h4>Contact-Us: </h3>
                <p> 012-345-678</p>
            </div>
        </div>
    `
);