// BusBerry Search Functionality

class SearchManager {
    constructor() {
        this.fromInput = document.getElementById('fromCity');
        this.toInput = document.getElementById('toCity');
        this.travelDate = document.getElementById('travelDate');
        this.searchForm = document.getElementById('searchForm');
        this.filterToggle = document.getElementById('filterToggle');
        this.advancedFilters = document.getElementById('advancedFilters');
        this.swapBtn = document.getElementById('swapCities');
        
        this.init();
    }
    
    init() {
        this.setupDateInput();
        this.setupCityInputs();
        this.setupFormSubmission();
        this.setupFilters();
        this.setupSwap();
        this.loadAISuggestions();
    }
    
    setupDateInput() {
        if (this.travelDate) {
            // Set minimum date to today
            const today = new Date().toISOString().split('T')[0];
            this.travelDate.setAttribute('min', today);
            
            // Set default to tomorrow
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            this.travelDate.value = tomorrow.toISOString().split('T')[0];
        }
    }
    
    setupCityInputs() {
        if (this.fromInput) {
            this.fromInput.addEventListener('input', debounce((e) => {
                this.handleCityInput(e.target, 'from');
            }, 300));
            
            this.fromInput.addEventListener('focus', () => {
                this.showSuggestions(this.fromInput, 'from');
            });
        }
        
        if (this.toInput) {
            this.toInput.addEventListener('input', debounce((e) => {
                this.handleCityInput(e.target, 'to');
            }, 300));
            
            this.toInput.addEventListener('focus', () => {
                this.showSuggestions(this.toInput, 'to');
            });
        }
        
        // Auto-detect location
        this.autoDetectLocation();
    }
    
    async autoDetectLocation() {
        try {
            const location = await getCurrentLocation();
            // In production, reverse geocode to get city name
            // For now, just show a message
            console.log('Location detected:', location);
        } catch (error) {
            console.log('Location detection failed:', error);
        }
    }
    
    async handleCityInput(input, type) {
        const query = input.value.trim();
        if (query.length < 2) {
            this.hideSuggestions(type);
            return;
        }
        
        try {
            const suggestions = await this.getCitySuggestions(query);
            this.displaySuggestions(suggestions, type);
        } catch (error) {
            console.error('Error fetching suggestions:', error);
        }
    }
    
    async getCitySuggestions(query) {
        // Mock suggestions - replace with actual API call
        const cities = CONFIG.POPULAR_CITIES.filter(city => 
            city.toLowerCase().includes(query.toLowerCase())
        );
        
        return cities.map(city => ({
            name: city,
            state: 'Maharashtra', // Mock data
            code: city.substring(0, 3).toUpperCase()
        }));
    }
    
    displaySuggestions(suggestions, type) {
        const suggestionsEl = document.getElementById(`${type}Suggestions`);
        if (!suggestionsEl) return;
        
        if (suggestions.length === 0) {
            suggestionsEl.innerHTML = '<div class="suggestion-item">No cities found</div>';
        } else {
            suggestionsEl.innerHTML = suggestions.map(city => `
                <div class="suggestion-item" onclick="searchManager.selectCity('${city.name}', '${type}')">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${city.name}, ${city.state}</span>
                </div>
            `).join('');
        }
        
        suggestionsEl.classList.add('show');
    }
    
    selectCity(cityName, type) {
        const input = type === 'from' ? this.fromInput : this.toInput;
        if (input) {
            input.value = cityName;
            this.hideSuggestions(type);
        }
    }
    
    hideSuggestions(type) {
        const suggestionsEl = document.getElementById(`${type}Suggestions`);
        if (suggestionsEl) {
            suggestionsEl.classList.remove('show');
        }
    }
    
    showSuggestions(input, type) {
        if (input.value.trim().length >= 2) {
            this.handleCityInput(input, type);
        }
    }
    
    setupFormSubmission() {
        if (this.searchForm) {
            this.searchForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                await this.performSearch();
            });
        }
    }
    
    async performSearch() {
        const formData = {
            from: this.fromInput?.value || '',
            to: this.toInput?.value || '',
            date: this.travelDate?.value || '',
            passengers: document.getElementById('passengers')?.value || '1',
            filters: this.getFilters()
        };
        
        // Validate
        if (!formData.from || !formData.to || !formData.date) {
            showToast('Please fill all required fields', 'error');
            return;
        }
        
        // Store search data
        storage.set('last_search', formData);
        
        // Redirect to search results page
        const params = new URLSearchParams({
            from: formData.from,
            to: formData.to,
            date: formData.date,
            passengers: formData.passengers
        });
        
        window.location.href = `pages/search-results.html?${params.toString()}`;
    }
    
    getFilters() {
        const filters = {
            seatType: [],
            features: [],
            maxPrice: document.getElementById('priceRange')?.value || 5000
        };
        
        // Get seat type filters
        document.querySelectorAll('input[type="checkbox"][value="sleeper"], input[type="checkbox"][value="semi-sleeper"], input[type="checkbox"][value="seater"]')
            .forEach(cb => {
                if (cb.checked) filters.seatType.push(cb.value);
            });
        
        // Get feature filters
        document.querySelectorAll('input[type="checkbox"][value="ladies-seat"], input[type="checkbox"][value="silent-cabin"], input[type="checkbox"][value="eco-friendly"], input[type="checkbox"][value="upper-berth"], input[type="checkbox"][value="lower-berth"]')
            .forEach(cb => {
                if (cb.checked) filters.features.push(cb.value);
            });
        
        return filters;
    }
    
    setupFilters() {
        if (this.filterToggle && this.advancedFilters) {
            this.filterToggle.addEventListener('click', () => {
                const isVisible = this.advancedFilters.style.display !== 'none';
                this.advancedFilters.style.display = isVisible ? 'none' : 'block';
            });
        }
        
        // Update price display
        const priceRange = document.getElementById('priceRange');
        const maxPrice = document.getElementById('maxPrice');
        if (priceRange && maxPrice) {
            priceRange.addEventListener('input', (e) => {
                maxPrice.textContent = formatCurrency(e.target.value);
            });
        }
    }
    
    setupSwap() {
        if (this.swapBtn) {
            this.swapBtn.addEventListener('click', () => {
                const fromValue = this.fromInput?.value || '';
                const toValue = this.toInput?.value || '';
                
                if (this.fromInput) this.fromInput.value = toValue;
                if (this.toInput) this.toInput.value = fromValue;
            });
        }
    }
    
    async loadAISuggestions() {
        // Mock AI suggestions - replace with actual API call
        const suggestions = [
            { icon: 'fa-star', text: 'Best buses available today' },
            { icon: 'fa-clock', text: 'Fastest route for your destination' },
            { icon: 'fa-couch', text: 'Most comfortable options tonight' }
        ];
        
        const container = document.getElementById('suggestionItems');
        if (container) {
            // Suggestions are already in HTML, but we can update them dynamically
        }
    }
}

// Initialize search manager
const searchManager = new SearchManager();

// Close suggestions when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-field')) {
        document.querySelectorAll('.suggestions').forEach(el => {
            el.classList.remove('show');
        });
    }
});

