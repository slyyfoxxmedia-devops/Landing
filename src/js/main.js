// Removed Amplify imports - auth handled by admin panel

class App {
  constructor() {
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.checkAuthState();
  }

  setupEventListeners() {
    const signupBtn = document.getElementById('signupBtn');
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navLinks = document.getElementById('navLinks');
    const platformButtons = document.querySelectorAll('[data-platform]');

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

    // Products dropdown
    const productsToggle = document.getElementById('productsToggle');
    const productsMenu = document.getElementById('productsMenu');
    
    if (productsToggle && productsMenu) {
      productsToggle.addEventListener('click', (e) => {
        e.preventDefault();
        productsMenu.classList.toggle('show');
      });
      
      // Close dropdown when clicking outside
      document.addEventListener('click', (e) => {
        if (!productsToggle.contains(e.target) && !productsMenu.contains(e.target)) {
          productsMenu.classList.remove('show');
        }
      });
    }
  }

  async checkAuthState() {
    // Auth state will be checked via admin panel API
    // TODO: Implement admin panel auth check
  }

  redirectToAdmin(action, platform = null) {
    const baseUrl = 'https://admin.slyyfoxxmedia.com';
    const platformParam = platform ? `?platform=${platform}` : '';
    // Change 'signup' to whatever route name you use in admin panel
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
        // TODO: Implement admin panel logout
        location.reload();
      });
    }
  }
}

new App();