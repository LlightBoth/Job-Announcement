document.addEventListener('click', (e) => {
    const logout = e.target.closest('#logoutLink');

    if (logout) {
        localStorage.clear(); // logout

        window.location.href = '../auth/login.html'; // redirect AFTER clearing
    }
});