// BusBerry Configuration
const CONFIG = {
    API_BASE_URL: 'http://localhost:8080/api',
    WS_URL: 'ws://localhost:8080/ws',
    
    // Feature Flags
    FEATURES: {
        AI_ENABLED: true,
        GPS_TRACKING: true,
        DARK_MODE: true,
        OFFLINE_MODE: true,
        MULTILINGUAL: false,
        AR_PREVIEW: false,
        BLOCKCHAIN: false
    },
    
    // API Endpoints
    ENDPOINTS: {
        AUTH: {
            LOGIN: '/auth/login',
            REGISTER: '/auth/register',
            REFRESH: '/auth/refresh',
            OTP_SEND: '/auth/otp/send',
            OTP_VERIFY: '/auth/otp/verify',
            LOGOUT: '/auth/logout'
        },
        SEARCH: {
            BUSES: '/search/buses',
            ROUTES: '/search/routes',
            SUGGESTIONS: '/search/suggestions',
            POPULAR: '/search/popular'
        },
        BOOKING: {
            CREATE: '/booking/create',
            DETAILS: '/booking',
            CANCEL: '/booking/cancel',
            HISTORY: '/booking/history'
        },
        USER: {
            PROFILE: '/user/profile',
            WALLET: '/user/wallet',
            LOYALTY: '/user/loyalty',
            REFERRALS: '/user/referrals'
        },
        OPERATOR: {
            DASHBOARD: '/operator/dashboard',
            BUSES: '/operator/buses',
            BOOKINGS: '/operator/bookings',
            EARNINGS: '/operator/earnings'
        },
        ADMIN: {
            DASHBOARD: '/admin/dashboard',
            USERS: '/admin/users',
            OPERATORS: '/admin/operators',
            ANALYTICS: '/admin/analytics'
        }
    },
    
    // Local Storage Keys
    STORAGE: {
        THEME: 'busberry_theme',
        TOKEN: 'busberry_token',
        REFRESH_TOKEN: 'busberry_refresh_token',
        USER: 'busberry_user',
        CART: 'busberry_cart'
    },
    
    // Default Values
    DEFAULTS: {
        THEME: 'light',
        LANGUAGE: 'en',
        CURRENCY: 'INR',
        DATE_FORMAT: 'DD/MM/YYYY'
    },
    
    // Limits
    LIMITS: {
        MAX_PASSENGERS: 10,
        SEARCH_RESULTS: 50,
        BOOKING_TIMEOUT: 15 * 60 * 1000, // 15 minutes
        SESSION_TIMEOUT: 24 * 60 * 60 * 1000 // 24 hours
    },
    
    // Cities (Popular routes)
    POPULAR_CITIES: [
        'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai',
        'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Surat',
        'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 'Thane'
    ],
    
    // Payment Gateways
    PAYMENT_GATEWAYS: {
        RAZORPAY: 'razorpay',
        PAYTM: 'paytm',
        PHONEPE: 'phonepe',
        UPI: 'upi'
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}

