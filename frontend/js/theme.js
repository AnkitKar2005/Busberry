// BusBerry Theme Management

class ThemeManager {
    constructor() {
        this.currentTheme = this.getStoredTheme() || CONFIG.DEFAULTS.THEME;
        this.init();
    }
    
    init() {
        this.applyTheme(this.currentTheme);
        this.setupThemeToggle();
    }
    
    getStoredTheme() {
        return storage.get(CONFIG.STORAGE.THEME) || null;
    }
    
    setStoredTheme(theme) {
        storage.set(CONFIG.STORAGE.THEME, theme);
    }
    
    applyTheme(theme) {
        document.body.className = theme === 'dark' ? 'dark-mode' : 'light-mode';
        this.currentTheme = theme;
        this.setStoredTheme(theme);
        this.updateThemeToggleIcon(theme);
    }
    
    toggleTheme() {
        const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.applyTheme(newTheme);
    }
    
    setupThemeToggle() {
        const toggle = document.getElementById('themeToggle');
        if (toggle) {
            toggle.addEventListener('click', () => this.toggleTheme());
        }
    }
    
    updateThemeToggleIcon(theme) {
        const toggle = document.getElementById('themeToggle');
        if (toggle) {
            const icon = toggle.querySelector('i');
            if (icon) {
                icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
            }
        }
    }
}

// Initialize theme manager
const themeManager = new ThemeManager();

