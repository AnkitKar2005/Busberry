// BusBerry Main Application Script

document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

function initApp() {
    initNavigation();
    initStats();
    loadPopularRoutes();
    loadOffers();
    initScrollAnimations();
    setupTabSwitching();
}

// Navigation
function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
    
    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu) {
                navMenu.classList.remove('active');
            }
        });
    });
    
    // Navbar scroll effect
    let lastScroll = 0;
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (navbar) {
            if (currentScroll > 100) {
                navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.boxShadow = 'none';
            }
        }
        
        lastScroll = currentScroll;
    });
}

// Animate stats on scroll
function initStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateNumber(entry.target, target);
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => observer.observe(stat));
}

// Load popular routes
async function loadPopularRoutes() {
    const routesGrid = document.getElementById('routesGrid');
    if (!routesGrid) return;
    
    // Mock data - replace with API call
    const routes = [
        { from: 'Mumbai', to: 'Pune', price: 500, duration: '3h 30m', buses: 45 },
        { from: 'Delhi', to: 'Jaipur', price: 600, duration: '5h', buses: 32 },
        { from: 'Bangalore', to: 'Chennai', price: 800, duration: '6h', buses: 28 },
        { from: 'Mumbai', to: 'Goa', price: 1200, duration: '12h', buses: 15 },
        { from: 'Delhi', to: 'Agra', price: 400, duration: '3h', buses: 50 },
        { from: 'Hyderabad', to: 'Bangalore', price: 900, duration: '8h', buses: 20 }
    ];
    
    routesGrid.innerHTML = routes.map(route => `
        <div class="route-card fade-in-on-scroll" onclick="window.location.href='pages/search-results.html?from=${route.from}&to=${route.to}'">
            <div class="card-header">
                <h3 class="card-title">${route.from} → ${route.to}</h3>
                <span class="badge badge-primary">${route.buses} buses</span>
            </div>
            <div class="card-body">
                <p><i class="fas fa-clock"></i> ${route.duration}</p>
                <p class="stat-number" style="font-size: 1.5rem; margin-top: 0.5rem;">
                    ${formatCurrency(route.price)}
                </p>
            </div>
        </div>
    `).join('');
}

// Load offers
async function loadOffers() {
    const offersGrid = document.getElementById('offersGrid');
    if (!offersGrid) return;
    
    // Mock data - replace with API call
    const offers = [
        { code: 'FIRST50', discount: 50, description: 'Get ₹50 off on your first booking' },
        { code: 'WEEKEND20', discount: 20, description: '20% off on weekend travels' },
        { code: 'GROUP15', discount: 15, description: '15% off for group bookings (5+ passengers)' }
    ];
    
    offersGrid.innerHTML = offers.map(offer => `
        <div class="offer-card fade-in-on-scroll">
            <h3>${offer.code}</h3>
            <p>${offer.description}</p>
            <button class="btn-primary" style="margin-top: 1rem;" onclick="copyToClipboard('${offer.code}')">
                Copy Code
            </button>
        </div>
    `).join('');
}

// Tab switching
function setupTabSwitching() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all tabs
            tabButtons.forEach(b => b.classList.remove('active'));
            // Add active class to clicked tab
            btn.classList.add('active');
            
            // Handle tab-specific logic
            const tab = btn.getAttribute('data-tab');
            if (tab === 'round-trip') {
                // Show return date field
                console.log('Round trip selected');
            } else {
                // Hide return date field
                console.log('One way selected');
            }
        });
    });
}

// Handle page visibility
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        console.log('Page hidden');
    } else {
        console.log('Page visible');
    }
});

// Service Worker registration (for offline support)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Service worker registration would go here
        console.log('Service Worker support detected');
    });
}

