const main = document.getElementById('main-content');

// Check authentiction
const current_user_session = localStorage.getItem('save_user') || null;

// ==========================
//      Main Content
// ==========================
main.innerHTML = (`
    <div class="card" onclick="window.location.href='./profile.html'" style="cursor: pointer;">
        <div class="card_body">
            <div class="card_header">
                <span class="badge badge--fulltime">Profile</span>
                <img src="../../../Assets/images/profile.png" alt="Profile" style="width: 100%; height: 100%; object-fit: cover;">        
            </div>
            <h2 class="text-heading">Personal Information</h2>
            <p class="text-muted">
                Update your personal details, email address, contact information, and manage your uploaded resumes.
            </p>
        </div>
    </div>

    <div class="card" onclick="toggleTheme()" style="cursor: pointer;">
        <div class="card_body">
            <div class="card_header">
                <span class="badge badge--fulltime">Interface</span>
                <img src="../../../Assets/images/mode.png" alt="Mode" style="width: 100%; height: 100%; object-fit: cover;">        
            </div>
            
            <h2 class="text-heading">Display Mode</h2>
            <p class="text-muted">
                Switch seamlessly between light and dark themes to optimize your viewing comfort.
            </p>
        </div>
    </div>

    ${current_user_session && current_user_session.is_role === 1 ? 
        `<div class="card" onclick="window.location.href='../employee/dashboard.html'" style="cursor: pointer;">
            <div class="card_body">
                <div class="card_header">
                    <span class="badge badge--fulltime">Workspace</span>
                    <img src="../../../Assets/images/employee.png" alt="Employee" style="width: 100%; height: 100%; object-fit: cover;">        
                </div>
                <h2 class="text-heading">Employee Portal</h2>
                <p class="text-muted">
                    Access your workspace, view professional assignments, and explore internal layout controls.
                </p>
            </div>
        </div>` : ``
    } 

    ${current_user_session ? 
        `<div class="card logout" id="logoutLink" style="cursor: pointer;">
            <div class="card_body">
                <div class="card_header">
                    <span class="badge badge--fulltime">Session</span>
                    <img src="../../../Assets/images/logout.png" alt="Logout" style="width: 100%; height: 100%; object-fit: cover;">        
                </div>
                
                <h2 class="text-heading">Sign Out</h2>
                <p class="text-muted">
                    Logout safely from your account session.
                </p>
            </div>
        </div>` : 
        `<div class="card" onclick="window.location.href='../auth/login.html'" style="cursor: pointer;">
            <div class="card_body">
                <div class="card_header">
                    <span class="badge badge--fulltime">Session</span>
                    <img src="../../../Assets/images/login.png" alt="Logout" style="width: 100%; height: 100%; object-fit: cover;">        
                </div>
                
                <h2 class="text-heading">Sign In</h2>
                <p class="text-muted">
                    Login to your account.
                </p>
            </div>
        </div>`
    }
`)