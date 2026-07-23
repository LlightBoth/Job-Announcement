const root = document.documentElement;

// Get Theme mode from localstorage or fallback to light mode
const currentMode = localStorage.getItem('theme') || 
                    root.getAttribute('theme-mode') ||
                    'light';

root.setAttribute('theme-mode', currentMode);

function toggleTheme() {
    // Get theme-mode
    const mode = root.getAttribute('theme-mode');

    // Change mode
    const newMode = mode === 'dark' ? 'light' : 'dark';
    root.setAttribute('theme-mode', newMode);

    // Save to localstorage
    localStorage.setItem('theme', newMode);
}