function showAlert(message, type) {
    const alertContainer = document.getElementById('alertContainer');
    if (!alertContainer) return;

    alertContainer.innerHTML = `
        <div class="alert-box alert-${type}">
            <span>${message}</span>
        </div>
    `;
}

function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

document.addEventListener('DOMContentLoaded', async() => {
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    const emailInput = document.getElementById('email');

    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', async(e) => {
            e.preventDefault();

            const email = emailInput.value.trim().toLowerCase();

            if (!email) {
                showAlert('Please enter your email address.', 'error');
                return;
            }

            // Call function 
            const found = await findUser(email);

            if (!found) {
                return;
            }

            // Called OTP
            const otp = generateOTP();

            sessionStorage.setItem('resetEmail', email);
            sessionStorage.setItem('resetOTP', otp);

            showAlert(`Simulated OTP Sent! Your 6-digit verification code is: <strong>${otp}</strong>`, 'info');

            const submitBtn = forgotPasswordForm.querySelector('.btn-primary');
            if (submitBtn) submitBtn.disabled = true;

            setTimeout(() => {
                localStorage.setItem('save_user', email)
                window.location.href = 'verify-dop.html';
            }, 3000);
        });
    }
});



async function findUser(email) {
    try {
        const user_res = await fetch('http://localhost:3000/user');

        if (!user_res.ok) {
            showAlert("Error failed.", "error");
            return false;
        }

        const user_data = await user_res.json();

        const find_user = user_data.find(
            u => u.email.toLowerCase() === email
        );

        if (!find_user) {
            showAlert('No account registered with this email address.', 'error');
            return false;
        }

        return true;

    } catch (error) {
        console.error(error);
        showAlert("Server error.", "error");
        return false;
    }
}