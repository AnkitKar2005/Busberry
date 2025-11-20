// BusBerry AI Chatbot

class Chatbot {
    constructor() {
        this.toggle = document.getElementById('chatbotToggle');
        this.window = document.getElementById('chatbotWindow');
        this.close = document.getElementById('chatbotClose');
        this.messages = document.getElementById('chatbotMessages');
        this.input = document.getElementById('chatbotInput');
        this.send = document.getElementById('chatbotSend');
        
        this.isOpen = false;
        this.init();
    }
    
    init() {
        if (this.toggle) {
            this.toggle.addEventListener('click', () => this.toggleWindow());
        }
        
        if (this.close) {
            this.close.addEventListener('click', () => this.closeWindow());
        }
        
        if (this.send) {
            this.send.addEventListener('click', () => this.sendMessage());
        }
        
        if (this.input) {
            this.input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.sendMessage();
                }
            });
        }
    }
    
    toggleWindow() {
        if (this.isOpen) {
            this.closeWindow();
        } else {
            this.openWindow();
        }
    }
    
    openWindow() {
        if (this.window) {
            this.window.style.display = 'flex';
            this.isOpen = true;
            if (this.input) {
                this.input.focus();
            }
        }
    }
    
    closeWindow() {
        if (this.window) {
            this.window.style.display = 'none';
            this.isOpen = false;
        }
    }
    
    async sendMessage() {
        const message = this.input?.value.trim();
        if (!message) return;
        
        // Add user message
        this.addMessage(message, 'user');
        
        // Clear input
        if (this.input) {
            this.input.value = '';
        }
        
        // Show typing indicator
        const typingId = this.addTypingIndicator();
        
        // Get AI response
        try {
            const response = await this.getAIResponse(message);
            this.removeTypingIndicator(typingId);
            this.addMessage(response, 'bot');
        } catch (error) {
            this.removeTypingIndicator(typingId);
            this.addMessage('Sorry, I encountered an error. Please try again.', 'bot');
        }
    }
    
    addMessage(text, type) {
        if (!this.messages) return;
        
        const messageEl = document.createElement('div');
        messageEl.className = `chatbot-message ${type}`;
        messageEl.innerHTML = `<p>${this.escapeHtml(text)}</p>`;
        
        this.messages.appendChild(messageEl);
        this.messages.scrollTop = this.messages.scrollHeight;
    }
    
    addTypingIndicator() {
        if (!this.messages) return null;
        
        const typingEl = document.createElement('div');
        typingEl.className = 'chatbot-message bot typing';
        typingEl.id = 'typing-indicator';
        typingEl.innerHTML = '<p><span class="typing-dots"><span>.</span><span>.</span><span>.</span></span></p>';
        
        this.messages.appendChild(typingEl);
        this.messages.scrollTop = this.messages.scrollHeight;
        
        return 'typing-indicator';
    }
    
    removeTypingIndicator(id) {
        const indicator = document.getElementById(id);
        if (indicator) {
            indicator.remove();
        }
    }
    
    async getAIResponse(message) {
        // Mock AI responses - replace with actual API call
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
            return 'Hello! I\'m BusBerry AI assistant. How can I help you with your bus booking today?';
        }
        
        if (lowerMessage.includes('book') || lowerMessage.includes('bus')) {
            return 'I can help you find and book buses! Please use the search bar above to find buses for your route.';
        }
        
        if (lowerMessage.includes('cancel') || lowerMessage.includes('refund')) {
            return 'You can cancel your booking from the "My Bookings" section. Refunds are processed according to our cancellation policy.';
        }
        
        if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
            return 'Bus prices vary based on route, date, and bus type. Use our search to see real-time pricing for your journey.';
        }
        
        if (lowerMessage.includes('track') || lowerMessage.includes('location')) {
            return 'You can track your bus in real-time from the booking details page. GPS tracking is available for all active bookings.';
        }
        
        // Default response
        return 'I understand you\'re asking about: "' + message + '". For specific booking assistance, please use the search feature or contact our support team.';
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize chatbot
const chatbot = new Chatbot();

