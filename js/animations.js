// Advanced Animations and Micro-interactions

document.addEventListener('DOMContentLoaded', function() {
    initAdvancedAnimations();
    initMicroInteractions();
    initDashboardAnimations();
    initStoryModeAnimations();
});

// Advanced Animation System
function initAdvancedAnimations() {
    // Staggered animations for collections
    animateCollections();
    
    // Product card entrance animations
    animateProductCards();
    
    // Feature cards with delay
    animateFeatureCards();
    
    // Hero video zoom effect
    animateHeroVideo();
}

function animateCollections() {
    const collectionCards = document.querySelectorAll('.collection-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 150);
            }
        });
    }, { threshold: 0.1 });
    
    collectionCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        observer.observe(card);
    });
}

function animateProductCards() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateX(-30px)';
        card.style.transition = `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`;
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateX(0)';
        }, 500 + (index * 100));
    });
}

function animateFeatureCards() {
    const featureCards = document.querySelectorAll('.feature-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'scale(1)';
                }, index * 200);
            }
        });
    }, { threshold: 0.2 });
    
    featureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.9)';
        card.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        observer.observe(card);
    });
}

function animateHeroVideo() {
    const heroVideo = document.querySelector('.hero-video');
    if (heroVideo) {
        heroVideo.style.transform = 'scale(1.1)';
        heroVideo.style.transition = 'transform 20s ease-out';
        
        setTimeout(() => {
            heroVideo.style.transform = 'scale(1)';
        }, 100);
    }
}

// Micro-interactions
function initMicroInteractions() {
    // Leaf animation on add to cart
    initLeafAnimations();
    
    // Impact counter pulse
    initImpactCounterPulse();
    
    // Button hover effects
    initButtonEffects();
    
    // Card hover states
    initCardHoverStates();
}

function initLeafAnimations() {
    document.querySelectorAll('.btn-quick-add').forEach(button => {
        button.addEventListener('click', function(e) {
            const leaf = document.createElement('div');
            leaf.className = 'leaf-particle';
            leaf.innerHTML = '🍃';
            leaf.style.cssText = `
                position: fixed;
                left: ${e.clientX}px;
                top: ${e.clientY}px;
                font-size: 1.5rem;
                z-index: 9999;
                pointer-events: none;
                animation: leafFloat 1s ease-out forwards;
            `;
            
            document.body.appendChild(leaf);
            
            setTimeout(() => {
                document.body.removeChild(leaf);
            }, 1000);
        });
    });
}

function initImpactCounterPulse() {
    const counters = document.querySelectorAll('.impact-counter');
    
    counters.forEach(counter => {
        setInterval(() => {
            counter.style.transform = 'scale(1.05)';
            counter.style.transition = 'transform 0.3s ease-out';
            
            setTimeout(() => {
                counter.style.transform = 'scale(1)';
            }, 300);
        }, 3000);
    });
}

function initButtonEffects() {
    document.querySelectorAll('.btn-primary').forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 8px 25px rgba(201, 162, 77, 0.4)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 4px 15px rgba(201, 162, 77, 0.2)';
        });
    });
}

function initCardHoverStates() {
    document.querySelectorAll('.collection-card, .product-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(201, 162, 77, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        });
    });
}

// Dashboard Animations
function initDashboardAnimations() {
    // Live metric glow
    animateLiveMetrics();
    
    // Card slide-in animations
    animateDashboardCards();
    
    // Skeleton loaders
    initSkeletonLoaders();
}

function animateLiveMetrics() {
    const metrics = document.querySelectorAll('.live-metric');
    
    metrics.forEach(metric => {
        setInterval(() => {
            metric.style.boxShadow = '0 0 20px rgba(201, 162, 77, 0.6)';
            metric.style.transition = 'box-shadow 0.5s ease-out';
            
            setTimeout(() => {
                metric.style.boxShadow = '0 0 10px rgba(201, 162, 77, 0.3)';
            }, 500);
        }, 2000);
    });
}

function animateDashboardCards() {
    const cards = document.querySelectorAll('.dashboard-card');
    
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`;
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 + (index * 100));
    });
}

function initSkeletonLoaders() {
    const skeletonElements = document.querySelectorAll('.skeleton-loader');
    
    skeletonElements.forEach(element => {
        element.style.background = 'linear-gradient(90deg, rgba(244, 241, 236, 0.1) 25%, rgba(201, 162, 77, 0.1) 50%, rgba(244, 241, 236, 0.1) 75%)';
        element.style.backgroundSize = '200% 100%';
        element.style.animation = 'skeletonShimmer 1.5s ease-in-out infinite';
    });
}

// Story Mode Animations (Home Page 2)
function initStoryModeAnimations() {
    // Timeline animations
    animateTimeline();
    
    // Scroll-driven story animations
    initScrollStory();
    
    // Artisan profile animations
    animateArtisanProfiles();
}

function animateTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('timeline-animate');
            }
        });
    }, { threshold: 0.5 });
    
    timelineItems.forEach(item => {
        observer.observe(item);
    });
}

function initScrollStory() {
    const storySections = document.querySelectorAll('.story-section');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        storySections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            const centerY = rect.top + rect.height / 2;
            const windowCenterY = window.innerHeight / 2;
            
            if (Math.abs(centerY - windowCenterY) < 100) {
                section.classList.add('story-active');
            } else {
                section.classList.remove('story-active');
            }
        });
    });
}

function animateArtisanProfiles() {
    const profiles = document.querySelectorAll('.artisan-profile');
    
    profiles.forEach((profile, index) => {
        profile.style.opacity = '0';
        profile.style.transform = 'translateX(-50px)';
        profile.style.transition = `opacity 0.8s ease-out ${index * 0.2}s, transform 0.8s ease-out ${index * 0.2}s`;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(profile);
    });
}

// Page Transition Effects
function initPageTransitions() {
    // Fade in page content
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-out';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Performance-optimized animations
function initOptimizedAnimations() {
    // Use requestAnimationFrame for smooth animations
    let ticking = false;
    
    function updateAnimations() {
        // Update scroll-based animations
        updateScrollAnimations();
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateAnimations);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
    window.addEventListener('resize', requestTick);
}

function updateScrollAnimations() {
    const scrolled = window.pageYOffset;
    const windowHeight = window.innerHeight;
    
    // Update parallax elements
    document.querySelectorAll('.parallax-element').forEach(element => {
        const speed = element.dataset.speed || 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
    
    // Update scroll-reveal elements
    document.querySelectorAll('.scroll-reveal').forEach(element => {
        const rect = element.getBoundingClientRect();
        
        if (rect.top < windowHeight * 0.8) {
            element.classList.add('revealed');
        }
    });
}

// Initialize all animations
document.addEventListener('DOMContentLoaded', function() {
    initPageTransitions();
    initOptimizedAnimations();
});

// Export animation functions
window.EcoLuxAnimations = {
    animateCollections,
    animateProductCards,
    animateFeatureCards,
    initLeafAnimations,
    initImpactCounterPulse,
    animateLiveMetrics,
    animateTimeline,
    initScrollStory
};
