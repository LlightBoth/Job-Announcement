function showAlert(message, type, containerId = 'alertContainer') {
    const alertContainer = document.getElementById(containerId);
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
    const otpForm = document.getElementById('otpForm');
    const otpInputs = document.querySelectorAll('.otp-input');
    const resendOTPBtn = document.getElementById('resendOTP');

    const resetEmail = sessionStorage.getItem('resetEmail');
    const resetOTP = sessionStorage.getItem('resetOTP');

    if (!resetEmail) {
        showAlert('No verification session found. Redirecting to reset request...', 'error');
        setTimeout(() => {
            window.location.href = 'forgot-password.html';
        }, 3000);
        return;
    }

    otpInputs.forEach((input, index) => {
        input.addEventListener('input', (e) => {
            const value = e.target.value;
            if (!/^[0-9]$/.test(value)) {
                e.target.value = '';
                return;
            }

            if (value && index < otpInputs.length - 1) {
                otpInputs[index + 1].focus();
            }
        });

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace') {
                if (input.value === '') {
                    if (index > 0) {
                        otpInputs[index - 1].focus();
                        otpInputs[index - 1].value = '';
                    }
                } else {
                    input.value = '';
                }
                e.preventDefault();
            } else if (e.key === 'ArrowLeft' && index > 0) {
                otpInputs[index - 1].focus();
            } else if (e.key === 'ArrowRight' && index < otpInputs.length - 1) {
                otpInputs[index + 1].focus();
            }
        });

        input.addEventListener('click', () => {
            input.select();
        });
    });

    if (otpForm) {
        otpForm.addEventListener('submit', (e) => {
            e.preventDefault();

            let enteredOTP = '';
            otpInputs.forEach(input => enteredOTP += input.value);

            if (enteredOTP.length < 6) {
                showAlert('Please enter all 6 digits of the code.', 'error');
                return;
            }

            const currentOTP = sessionStorage.getItem('resetOTP');

            if (enteredOTP === currentOTP) {
                showAlert('OTP Code verified successfully!', 'success');

                setTimeout(() => {
                    renderResetPasswordForm();
                }, 1000);
            } else {
                showAlert('Invalid code. Please check and try again.', 'error');
                otpInputs.forEach(input => {
                    input.style.borderColor = '#dc2626';
                    setTimeout(() => {
                        input.style.borderColor = '';
                    }, 2000);
                });
            }
        });
    }

    if (resendOTPBtn) {
        resendOTPBtn.addEventListener('click', (e) => {
            e.preventDefault();

            const newOTP = generateOTP();
            sessionStorage.setItem('resetOTP', newOTP);

            showAlert(`Simulated OTP Resent! Your new verification code is: <strong>${newOTP}</strong>`, 'info');

            otpInputs.forEach(input => input.value = '');
            otpInputs[0].focus();
        });
    }

    function renderResetPasswordForm() {
        const formContainer = document.querySelector('.form-container');
        if (!formContainer) return;

        formContainer.innerHTML = `
            <h2>Choose New Password</h2>
            <p class="form-description">
                Please enter a new secure password for account: <strong>${resetEmail}</strong>
            </p>
            
            <div id="resetAlertContainer" class="alert-container"></div>
            
            <form id="resetPasswordForm" method="post" action="">
                <div class="form-group">
                    <label for="new-password">New Password</label>
                    <input type="password" id="new-password" name="new-password" 
                           autocomplete="new-password" minlength="8" required>
                    <span class="password-hint">Minimum 8 characters</span>
                </div>

                <div class="form-group">
                    <label for="confirm-new-password">Confirm New Password</label>
                    <input type="password" id="confirm-new-password" name="confirm-new-password" 
                           autocomplete="new-password" required>
                </div>

                <button type="submit" class="btn-primary">Update Password</button>
            </form>
        `;

        const resetPasswordForm = document.getElementById('resetPasswordForm');
        if (resetPasswordForm) {
            resetPasswordForm.addEventListener('submit', (e) => {
                e.preventDefault();

                const newPassword = document.getElementById('new-password').value;
                const confirmNewPassword = document.getElementById('confirm-new-password').value;

                if (newPassword.length < 8) {
                    showAlert('Password must be at least 8 characters long.', 'error', 'resetAlertContainer');
                    return;
                }

                if (newPassword !== confirmNewPassword) {
                    showAlert('Passwords do not match.', 'error', 'resetAlertContainer');
                    return;
                }

                const users = JSON.parse(localStorage.getItem('users')) || [];
                const userIndex = users.findIndex(u => u.email.toLowerCase() === resetEmail.toLowerCase());

                if (userIndex !== -1) {
                    users[userIndex].password = newPassword;
                    localStorage.setItem('users', JSON.stringify(users));

                    showAlert('Password updated successfully! Redirecting to login...', 'success', 'resetAlertContainer');

                    sessionStorage.removeItem('resetEmail');
                    sessionStorage.removeItem('resetOTP');

                    const btn = resetPasswordForm.querySelector('.btn-primary');
                    if (btn) btn.disabled = true;

                    setTimeout(() => {
                        window.location.href = 'login.html';
                    }, 2000);
                } else {
                    showAlert('Error: Account not found. Please start over.', 'error', 'resetAlertContainer');
                }
            });
        }
    }
});
