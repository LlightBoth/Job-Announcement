document.addEventListener('DOMContentLoaded', async() => {
    const registerForm = document.getElementById('registerForm');
    const fullnameInput = document.getElementById('fullname');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const termsCheckbox = document.getElementById('terms');

    if (registerForm) {
        registerForm.addEventListener('submit', async(e) => {
            e.preventDefault();

            const fullname = fullnameInput.value.trim();
            const email = emailInput.value.trim().toLowerCase();
            const phone = phoneInput.value.trim();
            const password = passwordInput.value;
            const confirmPassword = confirmPasswordInput.value;
            const agreeTerms = termsCheckbox.checked;

            if (!fullname || !email || !phone || !password || !confirmPassword) {
                showAlert('Please fill in all fields.', 'error');
                return;
            }

            if (password.length < 8) {
                showAlert('Password must be at least 8 characters long.', 'error');
                return;
            }
            
            if (password !== confirmPassword) {
                showAlert('Passwords do not match.', 'error');
                return;
            }

            if (!agreeTerms) {
                showAlert('You must agree to the Terms and Conditions.', 'error');
                return;
            }

            // Load and check JSON database
            await registerUser(email, password, fullname, phone);
            
            const submitBtn = registerForm.querySelector('.btn-primary');
            if (submitBtn) submitBtn.disabled = true;
            
        });
    }
});


async function registerUser(email, password, fullname, phone) {
    try {
        // Fetch auth from login backend
        const user_res = await fetch('http://localhost:3000/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password, fullname, phone})
        });
        const user_data = await user_res.json();
        
        // If response then sewnd data
        if (user_res.ok) {

            if (user_data.message === "Register successfully") {
                showAlert(user_data.message, "success");
            } else {
                showAlert(user_data.message, "error");
            }

            window.location.href = user_data.route;

        } else {
            showAlert("Login failed!", "error");
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

