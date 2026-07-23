document.addEventListener('DOMContentLoaded', () => {
    // if (localStorage.getItem('currentUser')) {
    //     window.location.href = '../client/index.html';
    //     return;
    // }

    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const togglePassword = document.getElementById('togglePassword');

    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', () => {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            togglePassword.textContent = type === 'password' ? 'Show' : 'Hide';
        });
    }

    // const local_user = JSON.parse(localStorage.getItem('save_user'));    
    
    // if (local_user) {
    //     emailInput.value = local_user;
    // }

    if (loginForm) {
        loginForm.addEventListener('submit', async(e) => {
            e.preventDefault();

            const email = emailInput.value.trim();
            const password = passwordInput.value;

            if (!email || !password) {
                showAlert('Please fill in all fields.', 'error');
                return;
            }
            await loginUser(email, password);

            const submitBtn = loginForm.querySelector('.btn-primary');
            if (submitBtn) submitBtn.disabled = true;

        });
    }
});



async function loginUser(email, password) {
    try {
        // Fetch auth from login backend
        const user_res = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        });
        const user_data = await user_res.json();

        // If response then save user
        if (user_res.ok) {
            localStorage.setItem("save_user", user_data.data);
            localStorage.setItem("user_token", user_data.token);
            
            if (user_data.message === "Login successfully") {
                showAlert(user_data.message, "success");
            } else {
                showAlert(user_data.message, "error");
            }
            setTimeout(() => {
                window.location.href = user_data.route;
            }, 1000);
        } else {
            showAlert(user_data.message, "error");
        }
    } catch (error) {
        console.error(error);
        showAlert("Server error.", "error");
    }
}


function showAlert(message, type) {
    const alertContainer = document.getElementById('alertContainer');
    if (!alertContainer) return;

    alertContainer.innerHTML = `
        <div class="alert-box alert-${type}">
            <span>${message}</span>
        </div>
    `;
}
