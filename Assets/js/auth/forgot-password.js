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

document.addEventListener('DOMContentLoaded', () => {
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    const emailInput = document.getElementById('email');

    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const email = emailInput.value.trim().toLowerCase();

            if (!email) {
                showAlert('Please enter your email address.', 'error');
                return;
            }

            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(u => u.email.toLowerCase() === email);

            if (!user) {
                showAlert('No account registered with this email address.', 'error');
                return;
            }

            const otp = generateOTP();

            sessionStorage.setItem('resetEmail', email);
            sessionStorage.setItem('resetOTP', otp);

            showAlert(`Simulated OTP Sent! Your 6-digit verification code is: <strong>${otp}</strong>`, 'info');

            const submitBtn = forgotPasswordForm.querySelector('.btn-primary');
            if (submitBtn) submitBtn.disabled = true;

            setTimeout(() => {
                window.location.href = 'verify-dop.html';
            }, 3000);
        });
    }
});
