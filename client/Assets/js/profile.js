const profileInfo = document.getElementById("profile_info");
const formInfo = document.getElementById("form_info");

// ==========================================
//          1. FETCH PROFILE DATA
// ==========================================
const Get_All_Profiles = async () => {
    try {
        // Get data from localstorage
        const current_user = localStorage.getItem('save_user');
        if (!current_user) {
            // redirect to login
            window.location.href = "../auth/login.html";
            return;
        }

        // Fetch from backend
        const user_res = await fetch("http://localhost:3000/user");
        if (!user_res.ok) {
            throw new Error("Failed to fetch data.");
        }
        const user_data = await user_res.json();
        const find_user = await user_data.find(u => u.email === current_user);

        renderProfiles(find_user);
    } catch (error) {
        console.error("Failed to fetch profiles:", error);
    }
};

// ==========================================
//          2. RENDER FUNCTION
// ==========================================
function renderProfiles(current_user) {
    profileInfo.innerHTML = "";
    
    if (!current_user) {
        profileInfo.innerHTML = "<p>No profile found.</p>";
        return;
    }
    if (current_user) {
        profileInfo.innerHTML = `
            <div class="profile-avatar-wrapper mb-1">
                <div class="profile-avatar">${current_user.fullname[0].toUpperCase()}</div>
            </div>
            <h2 class="text-heading mb-1" style="font-size: 1.5rem;">${current_user.fullname.toUpperCase()}</h2>
            <p class="text-muted mb-1" style="font-weight: 600; color: var(--brand-primary);">Full-Stack Web Developer</p>
            
            <hr style="border: 0; border-top: 1px solid var(--border-color); width: 100%; margin: 1.5rem 0;">
            
            <div class="profile-meta w-full" style="text-align: left;">
                <p class="text-muted mb-2"><i class="bi bi-envelope px-2"></i> ${current_user.email}</p>
                <p class="text-muted mb-2"><i class="bi bi-geo-alt-fill px-2"></i> ${current_user.address || 'Unknown'}</p>
                <p class="text-muted mb-0"><i class="bi bi-file-person px-2"></i> portfolio.dev/${current_user.fullname}</p>
            </div>
        `;

        formInfo.innerHTML = `
            <form id="update_user" enctype="multipart/form-data">
                
                <!-- Fullname -->
                <div class="mb-1">
                    <label for="fullname" class="form-label">Full Name</label>
                    <input type="text" class="form-control" name="fullname" id="fullname" value="${current_user.fullname || 'Unknown'}" placeholder="Your fullname">
                </div>

                <!-- Phone -->
                <div class="mb-1">
                    <label for="phone" class="form-label">Phone</label>
                    <input type="text" class="form-control" name="phone" id="phone" value="${current_user.phone || 'Unknown'}" placeholder="+855 123-456-789">
                </div>

                <!-- Email -->
                <div class="mb-1">
                    <label for="email" class="form-label">Email</label>
                    <!-- Changed type to email -->
                    <input type="email" class="form-control" name="email" id="email" value="${current_user.email || 'Unknown'}" placeholder="finn@gmail.com" disabled>
                </div>

                <!-- Address -->
                <div class="mb-1">
                    <label for="address" class="form-label">Address</label>
                    <input type="text" class="form-control" name="address" id="address" value="${current_user.address || 'Unknown'}" placeholder="st. 102, New York">
                </div>

                <!-- Status -->
                <div class="mb-1">
                    <label for="status" class="form-label">Status</label>
                    <!-- Fixed: Changed section to select -->
                    <select class="form-select" id="status" name="status">
                        <option value="student" ${current_user.status === "student" ? "selected" : ""}>
                            Student
                        </option>
                        <option value="teacher" ${current_user.status === "teacher" ? "selected" : ""}>
                            Teacher
                        </option>
                    </select>
                </div><br>
                
                <!-- Action Button -->
                <button type="submit" class="btn btn-primary py-4">Update Profile</button>
            </form>
        `;

        //update User Info
        const updateUser = document.getElementById("update_user");

        updateUser.addEventListener("submit", async function(e) {
            e.preventDefault();

            current_user.fullname = document.getElementById("fullname").value;
            current_user.email = document.getElementById("email").value;
            current_user.phone = document.getElementById("phone").value;
            current_user.address = document.getElementById("address").value;
            current_user.status = document.getElementById("status").value;

            try {
                // Fetch token from localstorage
                const token = localStorage.getItem('user_token');

                const response = await fetch('http://localhost:3000/user/edit', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        fullname: current_user.fullname,
                        email: current_user.email,
                        phone: current_user.phone,
                        address: current_user.address,
                        status: current_user.status
                    })
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch data.");
                }
                
                const data = await response.json();
                renderProfiles(current_user);

                alert(data.message);

            } catch (error) {
                console.error("Failed to fetch companies:", error);
            }
        });
        return;
    }

}

// ==========================================
//          INITIALIZE 
// ==========================================
Get_All_Profiles();