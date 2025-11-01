// Account Dashboard JavaScript
class AccountDashboard {
    constructor() {
        this.adminPanelAPI = 'YOUR_ADMIN_PANEL_API_URL';
        this.init();
    }

    async init() {
        await this.loadUserData();
        await this.loadSubscriptions();
        await this.loadAvailableApps();
        this.setupEventListeners();
    }

    async loadUserData() {
        try {
            // Call admin panel API for user info
            const response = await fetch(`${this.adminPanelAPI}/user/profile`, {
                headers: {
                    'Authorization': `Bearer ${this.getToken()}`
                }
            });
            
            if (response.ok) {
                const userData = await response.json();
                this.displayUserInfo(userData);
            }
        } catch (error) {
            console.error('Failed to load user data:', error);
        }
    }

    async loadSubscriptions() {
        try {
            const response = await fetch(`${this.adminPanelAPI}/user/subscriptions`, {
                headers: {
                    'Authorization': `Bearer ${this.getToken()}`
                }
            });
            
            if (response.ok) {
                const subscriptions = await response.json();
                this.displaySubscriptions(subscriptions);
            }
        } catch (error) {
            console.error('Failed to load subscriptions:', error);
        }
    }

    async loadAvailableApps() {
        try {
            const response = await fetch(`${this.adminPanelAPI}/apps/available`);
            
            if (response.ok) {
                const apps = await response.json();
                this.displayAvailableApps(apps);
            }
        } catch (error) {
            console.error('Failed to load available apps:', error);
        }
    }

    displayUserInfo(userData) {
        document.getElementById('user-name').textContent = userData.name || 'User';
        document.getElementById('user-id').textContent = `User ID: ${userData.cognitoId || 'N/A'}`;
        document.getElementById('member-since').textContent = `Member since: ${new Date(userData.createdAt).toLocaleDateString()}`;
    }

    displaySubscriptions(subscriptions) {
        const container = document.getElementById('active-subscriptions');
        
        if (subscriptions.length === 0) {
            container.innerHTML = '<p class="no-subscriptions">No active subscriptions</p>';
            return;
        }

        container.innerHTML = subscriptions.map(sub => `
            <div class="subscription-card">
                <h4>${sub.appName}</h4>
                <p class="plan">${sub.planName}</p>
                <p class="status ${sub.status}">${sub.status}</p>
                <button class="btn-primary" onclick="manageSubscription('${sub.id}')">Manage</button>
            </div>
        `).join('');
    }

    displayAvailableApps(apps) {
        const container = document.getElementById('available-apps');
        
        container.innerHTML = apps.map(app => `
            <div class="app-card">
                <h4>${app.name}</h4>
                <p>${app.description}</p>
                <button class="btn-secondary" onclick="learnMore('${app.id}')">Learn More</button>
            </div>
        `).join('');
    }

    getToken() {
        // Get token from localStorage or session
        return localStorage.getItem('authToken') || '';
    }

    setupEventListeners() {
        document.getElementById('logout-btn').addEventListener('click', this.logout.bind(this));
    }

    async logout() {
        try {
            await fetch(`${this.adminPanelAPI}/auth/logout`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.getToken()}`
                }
            });
            
            localStorage.removeItem('authToken');
            window.location.href = 'index.html';
        } catch (error) {
            console.error('Logout failed:', error);
        }
    }
}

// Global functions for button clicks
function manageSubscription(subscriptionId) {
    // Redirect to subscription management
    window.location.href = `manage-subscription.html?id=${subscriptionId}`;
}

function learnMore(appId) {
    // Redirect to app details or pricing
    window.location.href = `pricing.html#${appId}`;
}

function showSection(sectionName) {
    hideAllSections();
    document.getElementById(`${sectionName}-section`).style.display = 'block';
    document.querySelector('.subscriptions-section').style.display = 'none';
    document.querySelector('.available-apps').style.display = 'none';
}

function hideAllSections() {
    document.querySelectorAll('.settings-section').forEach(section => {
        section.style.display = 'none';
    });
    document.querySelector('.subscriptions-section').style.display = 'block';
    document.querySelector('.available-apps').style.display = 'block';
}

function saveNotifications() {
    // TODO: Send to admin panel API
    alert('Notification settings saved');
    hideAllSections();
}

// Form handlers
document.addEventListener('DOMContentLoaded', () => {
    new AccountDashboard();
    
    const profileForm = document.getElementById('profile-form');
    const supportForm = document.getElementById('support-form');
    
    if (profileForm) {
        profileForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            // TODO: Send to admin panel API
            alert('Profile updated');
            hideAllSections();
        });
    }
    
    if (supportForm) {
        supportForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            // TODO: Send to admin panel API
            alert('Support message sent');
            hideAllSections();
        });
    }
});