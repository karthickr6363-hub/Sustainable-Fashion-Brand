// Authentication Page JavaScript

document.addEventListener('DOMContentLoaded', function () {
    initAuthForms();
    initPasswordToggles();
    initFormValidation();
    initSocialLogin();
    initPasswordStrength();
    initAnimations();
});

// Auth Forms
function initAuthForms() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const switchToRegister = document.querySelector('.switch-to-register');
    const switchToLogin = document.querySelector('.switch-to-login');

    // Switch between forms
    if (switchToRegister) {
        switchToRegister.addEventListener('click', function (e) {
            e.preventDefault();
            showRegisterForm();
        });
    }

    if (switchToLogin) {
        switchToLogin.addEventListener('click', function (e) {
            e.preventDefault();
            showLoginForm();
        });
    }

    // Handle form submissions
    const loginFormElement = document.getElementById('loginFormElement');
    const registerFormElement = document.getElementById('registerFormElement');

    if (loginFormElement) {
        loginFormElement.addEventListener('submit', function (e) {
            e.preventDefault();
            handleLogin(this);
        });
    }

    if (registerFormElement) {
        registerFormElement.addEventListener('submit', function (e) {
            e.preventDefault();
            handleRegister(this);
        });
    }
}

// Show Register Form
function showRegisterForm() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    loginForm.style.display = 'none';
    registerForm.style.display = 'block';

    // Animate form appearance
    registerForm.style.opacity = '0';
    registerForm.style.transform = 'translateY(20px)';

    setTimeout(() => {
        registerForm.style.opacity = '1';
        registerForm.style.transform = 'translateY(0)';
        registerForm.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';
    }, 100);
}

// Show Login Form
function showLoginForm() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    registerForm.style.display = 'none';
    loginForm.style.display = 'block';

    // Animate form appearance
    loginForm.style.opacity = '0';
    loginForm.style.transform = 'translateY(20px)';

    setTimeout(() => {
        loginForm.style.opacity = '1';
        loginForm.style.transform = 'translateY(0)';
        loginForm.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';
    }, 100);
}

// Password Toggles
function initPasswordToggles() {
    const toggleButtons = document.querySelectorAll('.password-toggle');

    toggleButtons.forEach(button => {
        button.addEventListener('click', function () {
            const targetId = this.dataset.target;
            const input = document.getElementById(targetId);
            const eyeIcon = this.querySelector('.eye-icon');

            if (input.type === 'password') {
                input.type = 'text';
                eyeIcon.textContent = '👁️‍🗨️';
            } else {
                input.type = 'password';
                eyeIcon.textContent = '👁️';
            }
        });
    });
}

// Form Validation
function initFormValidation() {
    const inputs = document.querySelectorAll('.auth-form input[required]');

    inputs.forEach(input => {
        // Real-time validation
        input.addEventListener('blur', function () {
            validateField(this);
        });

        input.addEventListener('input', function () {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });
}

// Validate Field
function validateField(field) {
    const errorElement = field.parentElement.querySelector('.form-error');
    let isValid = true;

    // Remove previous error state
    field.classList.remove('error');
    if (errorElement) {
        errorElement.classList.remove('show');
    }

    // Email validation
    if (field.type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.value)) {
            isValid = false;
        }
    }

    // Password validation
    if (field.type === 'password') {
        if (field.value.length < 8) {
            isValid = false;
        }

        // Confirm password validation
        if (field.id === 'register-confirm') {
            const passwordField = document.getElementById('register-password');
            if (field.value !== passwordField.value) {
                isValid = false;
            }
        }
    }

    // Required field validation
    if (field.hasAttribute('required') && !field.value.trim()) {
        isValid = false;
    }

    // Show error if invalid
    if (!isValid && field.value) {
        field.classList.add('error');
        if (errorElement) {
            errorElement.classList.add('show');
        }
    }

    return isValid;
}

// Handle Login
function handleLogin(form) {
    const email = form.querySelector('#login-email').value;
    const password = form.querySelector('#login-password').value;
    const rememberMe = form.querySelector('#remember-me').checked;

    // Validate form
    const emailField = form.querySelector('#login-email');
    const passwordField = form.querySelector('#login-password');

    let isValid = true;

    if (!validateField(emailField)) isValid = false;
    if (!validateField(passwordField)) isValid = false;

    if (!isValid) {
        window.EcoLux.showSuccessToast('Please fix the errors in the form');
        return;
    }

    // Show loading state
    const submitBtn = form.querySelector('.auth-submit');
    const originalText = submitBtn.textContent;
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    // Simulate login process
    setTimeout(() => {
        // Store login state
        const userData = {
            email: email,
            name: email.split('@')[0],
            loginTime: new Date().toISOString(),
            rememberMe: rememberMe
        };

        if (rememberMe) {
            localStorage.setItem('ecolux_user', JSON.stringify(userData));
        } else {
            sessionStorage.setItem('ecolux_user', JSON.stringify(userData));
        }

        // Redirect immediately
        window.location.href = 'shop.html';

        // Reset form
        submitBtn.classList.remove('loading');
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        form.reset();

        // Create leaf animation
        createLeafAnimation(window.innerWidth / 2, window.innerHeight / 2);

    }, 2000);
}

// Handle Register
function handleRegister(form) {
    const firstname = form.querySelector('#register-firstname').value;
    const lastname = form.querySelector('#register-lastname').value;
    const email = form.querySelector('#register-email').value;
    const password = form.querySelector('#register-password').value;
    const confirm = form.querySelector('#register-confirm').value;
    const agreeTerms = form.querySelector('#agree-terms').checked;
    const newsletter = form.querySelector('#newsletter-subscribe').checked;

    // Validate form
    const fields = [
        form.querySelector('#register-firstname'),
        form.querySelector('#register-lastname'),
        form.querySelector('#register-email'),
        form.querySelector('#register-password'),
        form.querySelector('#register-confirm')
    ];

    let isValid = true;
    fields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });

    if (!agreeTerms) {
        window.EcoLux.showSuccessToast('Please agree to the Terms of Service and Privacy Policy');
        return;
    }

    if (!isValid) {
        window.EcoLux.showSuccessToast('Please fix the errors in the form');
        return;
    }

    // Show loading state
    const submitBtn = form.querySelector('.auth-submit');
    const originalText = submitBtn.textContent;
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    // Simulate registration process
    setTimeout(() => {
        // Store user data
        const userData = {
            firstname: firstname,
            lastname: lastname,
            email: email,
            name: `${firstname} ${lastname}`,
            registrationTime: new Date().toISOString(),
            newsletter: newsletter
        };

        localStorage.setItem('ecolux_user', JSON.stringify(userData));

        // Redirect immediately
        window.location.href = 'shop.html';

        // Reset form
        submitBtn.classList.remove('loading');
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        form.reset();

        // Reset password strength indicator
        const strengthFill = document.querySelector('.strength-fill');
        if (strengthFill) {
            strengthFill.className = 'strength-fill';
        }

        // Create leaf animation
        createLeafAnimation(window.innerWidth / 2, window.innerHeight / 2);

    }, 2000);
}

// Social Login
function initSocialLogin() {
    const socialButtons = document.querySelectorAll('.social-btn');

    socialButtons.forEach(button => {
        button.addEventListener('click', function () {
            const provider = this.classList.contains('google') ? 'Google' : 'Facebook';

            // Show loading state
            const originalHTML = this.innerHTML;
            this.innerHTML = '<span class="social-icon">⏳</span> Connecting...';
            this.disabled = true;

            // Simulate social login
            setTimeout(() => {
                const userData = {
                    name: `${provider} User`,
                    email: `user@${provider.toLowerCase()}.com`,
                    provider: provider,
                    loginTime: new Date().toISOString()
                };

                localStorage.setItem('ecolux_user', JSON.stringify(userData));

                // Redirect immediately
                window.location.href = 'shop.html';

                // Reset button
                this.innerHTML = originalHTML;
                this.disabled = false;

                // Create leaf animation
                createLeafAnimation(window.innerWidth / 2, window.innerHeight / 2);

            }, 1500);
        });
    });
}

// Password Strength
function initPasswordStrength() {
    const passwordInput = document.getElementById('register-password');
    const strengthFill = document.querySelector('.strength-fill');
    const strengthText = document.querySelector('.strength-text');

    if (passwordInput && strengthFill) {
        passwordInput.addEventListener('input', function () {
            const password = this.value;
            const strength = calculatePasswordStrength(password);

            strengthFill.className = 'strength-fill ' + strength.class;
            strengthFill.style.width = strength.width;

            if (strengthText) {
                strengthText.textContent = strength.text;
            }
        });
    }
}

// Calculate Password Strength
function calculatePasswordStrength(password) {
    let score = 0;

    // Length
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;

    // Complexity
    if (/[a-z]/.test(password)) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^a-zA-Z0-9]/.test(password)) score += 1;

    if (score <= 2) {
        return { class: 'weak', width: '33%', text: 'Weak password' };
    } else if (score <= 4) {
        return { class: 'medium', width: '66%', text: 'Medium strength' };
    } else {
        return { class: 'strong', width: '100%', text: 'Strong password' };
    }
}



// Create Leaf Animation
function createLeafAnimation(x, y) {
    const leaf = document.createElement('div');
    leaf.className = 'leaf-particle';
    leaf.innerHTML = '🍃';
    leaf.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        font-size: 1.5rem;
        z-index: 9999;
        pointer-events: none;
        animation: leafFloat 1s ease-out forwards;
    `;

    document.body.appendChild(leaf);

    setTimeout(() => {
        document.body.removeChild(leaf);
    }, 1000);
}

// Animations
function initAnimations() {
    // Add CSS for leaf animation if not already present
    if (!document.querySelector('#leaf-animation-style')) {
        const style = document.createElement('style');
        style.id = 'leaf-animation-style';
        style.textContent = `
            @keyframes leafFloat {
                0% {
                    transform: translateY(0) rotate(0deg);
                    opacity: 1;
                }
                100% {
                    transform: translateY(-50px) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, observerOptions);

    // Observe elements
    document.querySelectorAll('.feature-item, .testimonial').forEach(element => {
        element.classList.add('scroll-reveal');
        observer.observe(element);
    });
}

// Check if user is already logged in
function checkLoginStatus() {
    const userData = localStorage.getItem('ecolux_user') || sessionStorage.getItem('ecolux_user');

    if (userData) {
        const user = JSON.parse(userData);
        console.log('User already logged in:', user.name);

        // You could redirect to dashboard or show logged-in state
        // For demo purposes, we'll allow re-login
    }
}

// Initialize on page load
checkLoginStatus();

// Export functions
window.EcoLuxAuth = {
    showRegisterForm,
    showLoginForm,
    validateField,
    handleLogin,
    handleRegister
};
