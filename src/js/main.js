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
    const platformButtons = document.querySelectorAll('[data-platform]');

    if (loginBtn) {
      loginBtn.addEventListener('click', () => this.redirectToAdmin('login'));
    }
    
    if (signupBtn) {
      signupBtn.addEventListener('click', () => this.redirectToAdmin('signup'));
    }
    
    if (mobileMenuToggle && navLinks) {
      mobileMenuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
      });
    }

    platformButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const platform = e.target.dataset.platform;
        localStorage.setItem('selectedPlatform', platform);
        this.redirectToAdmin('signup', platform);
      });
    });
  }

  async checkAuthState() {
    const result = await AuthService.getCurrentUser();
    if (result.success) {
      this.updateUIForLoggedInUser(result.user);
    }
  }

  redirectToAdmin(action, platform = null) {
    const baseUrl = 'https://admin.slyyfoxxmedia.com';
    const platformParam = platform ? `?platform=${platform}` : '';
    window.location.href = `${baseUrl}/${action}${platformParam}`;
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