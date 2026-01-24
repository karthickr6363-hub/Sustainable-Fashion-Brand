// Main JavaScript for EcoLux Fashion Website

document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initScrollAnimations();
    initProductInteractions();
    initFormValidation();
    initLazyLoading();
    initPerformanceOptimizations();
});

// Navigation System with Dropdown Support
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Active link highlighting
    const currentPath = window.location.pathname;
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath || 
            (currentPath === '/' && link.getAttribute('href') === 'index.html')) {
            link.classList.add('active');
        }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.main-nav') && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.nav-dropdown')) {
            closeAllDropdowns();
        }
    });
}

// Dropdown Toggle Function
function toggleDropdown(button) {
    const dropdownMenu = button.nextElementSibling;
    const allDropdowns = document.querySelectorAll('.dropdown-menu');
    const allToggles = document.querySelectorAll('.dropdown-toggle');
    
    // Close all other dropdowns
    allDropdowns.forEach(menu => {
        if (menu !== dropdownMenu) {
            menu.classList.remove('show');
        }
    });
    
    allToggles.forEach(toggle => {
        if (toggle !== button) {
            toggle.classList.remove('active');
        }
    });
    
    // Toggle current dropdown
    dropdownMenu.classList.toggle('show');
    button.classList.toggle('active');
}

// Close All Dropdowns
function closeAllDropdowns() {
    const allDropdowns = document.querySelectorAll('.dropdown-menu');
    const allToggles = document.querySelectorAll('.dropdown-toggle');
    
    allDropdowns.forEach(menu => {
        menu.classList.remove('show');
    });
    
    allToggles.forEach(toggle => {
        toggle.classList.remove('active');
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, observerOptions);

    // Observe all scroll-reveal elements
    document.querySelectorAll('.scroll-reveal').forEach(el => {
        observer.observe(el);
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax-element');
        
        parallaxElements.forEach(el => {
            const speed = el.dataset.speed || 0.5;
            el.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Product Interactions
function initProductInteractions() {
    // Quick add to cart
    document.querySelectorAll('.btn-quick-add').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            
            // Add leaf animation
            this.classList.add('leaf-animation');
            
            // Show success toast
            showSuccessToast(`${productName} added to cart!`);
            
            // Remove animation class after animation completes
            setTimeout(() => {
                this.classList.remove('leaf-animation');
            }, 1000);
        });
    });

    // Product hover effects
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('hover-lift');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('hover-lift');
        });
    });
}

// Form Validation
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                    showFieldError(field, 'This field is required');
                } else {
                    field.classList.remove('error');
                    removeFieldError(field);
                }
            });
            
            if (isValid) {
                submitForm(form);
            }
        });
        
        // Remove error on input
        form.querySelectorAll('input, textarea, select').forEach(field => {
            field.addEventListener('input', function() {
                this.classList.remove('error');
                removeFieldError(this);
            });
        });
    });
}

// Success Toast Notifications
function showSuccessToast(message) {
    const toast = document.createElement('div');
    toast.className = 'success-toast';
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        toast.classList.add('hiding');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// Form Error Handling
function showFieldError(field, message) {
    removeFieldError(field);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.color = 'var(--accent-color)';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '0.25rem';
    
    field.parentNode.appendChild(errorDiv);
}

function removeFieldError(field) {
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        field.parentNode.removeChild(existingError);
    }
}

// Form Submission
function submitForm(form) {
    const formData = new FormData(form);
    const submitButton = form.querySelector('button[type="submit"]');
    
    // Show loading state
    submitButton.disabled = true;
    submitButton.textContent = 'Processing...';
    submitButton.classList.add('loading');
    
    // Simulate API call
    setTimeout(() => {
        submitButton.disabled = false;
        submitButton.textContent = 'Success!';
        submitButton.classList.remove('loading');
        
        showSuccessToast('Form submitted successfully!');
        
        // Reset form
        setTimeout(() => {
            form.reset();
            submitButton.textContent = 'Submit';
        }, 2000);
    }, 1500);
}

// Lazy Loading for Images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// Performance Optimizations
function initPerformanceOptimizations() {
    // Add GPU acceleration to animated elements
    document.querySelectorAll('.hover-lift, .collection-card, .product-card').forEach(el => {
        el.classList.add('gpu-accelerated');
    });
    
    // Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        
        scrollTimeout = window.requestAnimationFrame(function() {
            // Handle scroll-based animations
            handleScrollAnimations();
        });
    });
    
    // Optimize images
    document.querySelectorAll('img').forEach(img => {
        img.loading = 'lazy';
    });
}

// Handle Scroll-based Animations
function handleScrollAnimations() {
    const scrolled = window.pageYOffset;
    const windowHeight = window.innerHeight;
    
    // Update navigation background
    const nav = document.querySelector('.main-nav');
    if (scrolled > 100) {
        nav.style.backgroundColor = 'rgba(15, 42, 29, 0.98)';
    } else {
        nav.style.backgroundColor = 'rgba(15, 42, 29, 0.95)';
    }
}

// Impact Counter Animation
function animateImpactCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        element.textContent = Math.floor(current).toLocaleString();
    }, 16);
}

// Initialize impact counters when visible
function initImpactCounters() {
    const counters = document.querySelectorAll('.impact-counter');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                const target = parseInt(entry.target.dataset.target);
                animateImpactCounter(entry.target, target);
                entry.target.classList.add('animated');
            }
        });
    });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Search Functionality
function initSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchResults = document.querySelector('.search-results');
    
    if (searchInput) {
        let searchTimeout;
        
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            const query = this.value.trim();
            
            if (query.length < 2) {
                searchResults.style.display = 'none';
                return;
            }
            
            searchTimeout = setTimeout(() => {
                performSearch(query);
            }, 300);
        });
    }
}

function performSearch(query) {
    // Simulate search API call
    setTimeout(() => {
        const searchResults = document.querySelector('.search-results');
        // Display search results
        searchResults.style.display = 'block';
    }, 500);
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Initialize additional features
document.addEventListener('DOMContentLoaded', function() {
    initSearch();
    initImpactCounters();
});

// Export functions for use in other scripts
window.EcoLux = {
    showSuccessToast,
    animateImpactCounter,
    debounce,
    throttle
};
