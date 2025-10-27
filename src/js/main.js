import './amplify-config.js';
import { AuthService } from './auth.js';

class App {
  constructor() {
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.checkAuthState();
  }

  setupEventListeners() {
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navLinks = document.getElementById('navLinks');

    if (loginBtn) {
      loginBtn.addEventListener('click', () => this.showAuthModal('login'));
    }
    
    if (signupBtn) {
      signupBtn.addEventListener('click', () => this.showAuthModal('signup'));
    }
    
    if (mobileMenuToggle && navLinks) {
      mobileMenuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
      });
    }
  }

  async checkAuthState() {
    const result = await AuthService.getCurrentUser();
    if (result.success) {
      this.updateUIForLoggedInUser(result.user);
    }
  }

  showAuthModal(type) {
    // Redirect to dedicated auth pages or show modal
    window.location.href = `https://your-auth-domain.auth.us-east-1.amazoncognito.com/${type}`;
  }

  updateUIForLoggedInUser(user) {
    const authButtons = document.querySelector('.auth-buttons');
    if (authButtons) {
      authButtons.innerHTML = `
        <span>Welcome, ${user.username}</span>
        <button class="btn" id="logoutBtn">Logout</button>
      `;
      
      document.getElementById('logoutBtn').addEventListener('click', async () => {
        await AuthService.logout();
        location.reload();
      });
    }
  }
}

new App();