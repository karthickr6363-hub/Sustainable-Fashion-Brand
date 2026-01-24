// Collections Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initSeasonTabs();
    initCountdownTimer();
    initLimitedEditionInteractions();
    initCapsuleWardrobe();
    initAnimations();
});

// Season Tabs
function initSeasonTabs() {
    const seasonTabs = document.querySelectorAll('.season-tab');
    const seasonContents = document.querySelectorAll('.season-content');
    
    seasonTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetSeason = this.dataset.season;
            
            // Remove active class from all tabs and contents
            seasonTabs.forEach(t => t.classList.remove('active'));
            seasonContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            
            const targetContent = document.getElementById(targetSeason);
            if (targetContent) {
                targetContent.classList.add('active');
            }
            
            // Load season-specific content if needed
            loadSeasonContent(targetSeason);
        });
    });
}

// Load Season Content
function loadSeasonContent(season) {
    // In a real application, this would fetch data from an API
    console.log(`Loading ${season} content...`);
    
    // Show loading state
    const seasonContent = document.getElementById(season);
    if (seasonContent) {
        const existingContent = seasonContent.querySelector('.season-grid');
        if (existingContent) {
            // Add loading animation
            existingContent.style.opacity = '0.5';
            
            // Simulate content loading
            setTimeout(() => {
                existingContent.style.opacity = '1';
                window.EcoLux.showSuccessToast(`${season.charAt(0).toUpperCase() + season.slice(1)} collection loaded!`);
            }, 500);
        }
    }
}

// Countdown Timer
function initCountdownTimer() {
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

function updateCountdown() {
    const timerElements = {
        days: document.querySelector('.days'),
        hours: document.querySelector('.hours'),
        minutes: document.querySelector('.minutes'),
        seconds: document.querySelector('.seconds')
    };
    
    // Set end date (2 days from now for demo)
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 2);
    endDate.setHours(endDate.getHours() + 14);
    endDate.setMinutes(endDate.getMinutes() + 37);
    endDate.setSeconds(endDate.getSeconds() + 22);
    
    const now = new Date();
    const timeLeft = endDate - now;
    
    if (timeLeft > 0) {
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        
        if (timerElements.days) timerElements.days.textContent = String(days).padStart(2, '0');
        if (timerElements.hours) timerElements.hours.textContent = String(hours).padStart(2, '0');
        if (timerElements.minutes) timerElements.minutes.textContent = String(minutes).padStart(2, '0');
        if (timerElements.seconds) timerElements.seconds.textContent = String(seconds).padStart(2, '0');
    } else {
        // Timer expired
        if (timerElements.days) timerElements.days.textContent = '00';
        if (timerElements.hours) timerElements.hours.textContent = '00';
        if (timerElements.minutes) timerElements.minutes.textContent = '00';
        if (timerElements.seconds) timerElements.seconds.textContent = '00';
    }
}

// Limited Edition Interactions
function initLimitedEditionInteractions() {
    const reserveButtons = document.querySelectorAll('.limited-card .btn-primary');
    const viewButtons = document.querySelectorAll('.limited-card .btn-secondary');
    
    reserveButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const card = this.closest('.limited-card');
            const itemName = card.querySelector('h3').textContent;
            
            // Create leaf animation
            createLeafAnimation(e.pageX, e.pageY);
            
            // Show success message
            window.EcoLux.showSuccessToast(`${itemName} reserved successfully!`);
            
            // Update button state
            this.textContent = 'Reserved ✓';
            this.disabled = true;
            this.style.backgroundColor = '#27ae60';
        });
    });
    
    viewButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const card = this.closest('.limited-card');
            const itemName = card.querySelector('h3').textContent;
            
            // Open quick view modal (reuse shop modal functionality)
            openLimitedEditionModal(card);
        });
    });
    
    // Add hover effects to limited cards
    const limitedCards = document.querySelectorAll('.limited-card');
    limitedCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('hover-lift');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('hover-lift');
        });
    });
}

// Open Limited Edition Modal
function openLimitedEditionModal(card) {
    // Create modal if it doesn't exist
    let modal = document.getElementById('limited-modal');
    if (!modal) {
        modal = createLimitedEditionModal();
    }
    
    // Populate modal content
    const itemName = card.querySelector('h3').textContent;
    const artisanName = card.querySelector('.artisan-name').textContent;
    const description = card.querySelector('.description').textContent;
    const price = card.querySelector('.limited-price .price').textContent;
    const image = card.querySelector('.limited-image img').src;
    
    modal.querySelector('#limited-item-name').textContent = itemName;
    modal.querySelector('#limited-artisan-name').textContent = artisanName;
    modal.querySelector('#limited-description').textContent = description;
    modal.querySelector('#limited-price').textContent = price;
    modal.querySelector('#limited-image').src = image;
    
    // Show modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Create Limited Edition Modal
function createLimitedEditionModal() {
    const modal = document.createElement('div');
    modal.id = 'limited-modal';
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="modal-close">&times;</span>
            <div class="limited-modal-content">
                <div class="limited-modal-image">
                    <img id="limited-image" src="" alt="">
                </div>
                <div class="limited-modal-info">
                    <h2 id="limited-item-name"></h2>
                    <p id="limited-artisan-name" class="artisan-name"></p>
                    <p id="limited-description" class="description"></p>
                    <div class="limited-modal-features">
                        <span>✨ Limited Edition</span>
                        <span>📜 Certificate Included</span>
                        <span>🚚 Free Shipping</span>
                    </div>
                    <div class="limited-modal-price">
                        <span id="limited-price" class="price"></span>
                    </div>
                    <div class="limited-modal-actions">
                        <button class="btn btn-primary reserve-limited">Reserve Now</button>
                        <button class="btn btn-secondary add-to-wishlist">Add to Wishlist</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add event listeners
    const closeBtn = modal.querySelector('.modal-close');
    const reserveBtn = modal.querySelector('.reserve-limited');
    const wishlistBtn = modal.querySelector('.add-to-wishlist');
    
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    reserveBtn.addEventListener('click', () => {
        const itemName = document.getElementById('limited-item-name').textContent;
        createLeafAnimation(window.innerWidth / 2, window.innerHeight / 2);
        window.EcoLux.showSuccessToast(`${itemName} reserved successfully!`);
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    wishlistBtn.addEventListener('click', () => {
        const itemName = document.getElementById('limited-item-name').textContent;
        window.EcoLux.showSuccessToast(`${itemName} added to wishlist!`);
    });
    
    return modal;
}

// Capsule Wardrobe
function initCapsuleWardrobe() {
    const capsuleItems = document.querySelectorAll('.capsule-item');
    const shopFullCapsuleBtn = document.querySelector('.capsule-cta .btn-primary');
    
    capsuleItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            const itemName = this.querySelector('h4').textContent;
            const price = this.querySelector('.price').textContent;
            
            // Show item details
            showCapsuleItemDetails(itemName, price, index + 1);
        });
        
        // Add staggered animation on scroll
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`;
        
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 500 + (index * 100));
    });
    
    if (shopFullCapsuleBtn) {
        shopFullCapsuleBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add all capsule items to cart
            let totalItems = 0;
            capsuleItems.forEach(item => {
                const itemName = item.querySelector('h4').textContent;
                createLeafAnimation(window.innerWidth / 2, window.innerHeight / 2);
                totalItems++;
            });
            
            window.EcoLux.showSuccessToast(`All ${totalItems} capsule items added to cart! Total: $1,200`);
            
            // Update cart count
            updateCartCount(totalItems);
        });
    }
}

// Show Capsule Item Details
function showCapsuleItemDetails(itemName, price, itemNumber) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="modal-close">&times;</span>
            <div class="capsule-item-modal">
                <h2>Item ${itemNumber}: ${itemName}</h2>
                <p class="price">${price}</p>
                <div class="item-description">
                    <h3>Why This Piece?</h3>
                    <p>This essential piece forms the foundation of a sustainable wardrobe. Versatile, timeless, and crafted with eco-conscious materials.</p>
                    
                    <h3>Styling Options</h3>
                    <ul>
                        <li>Can be styled in 5+ different ways</li>
                        <li>Pairs with 8+ other capsule items</li>
                        <li>Perfect for all seasons</li>
                    </ul>
                    
                    <h3>Sustainability Impact</h3>
                    <ul>
                        <li>70% less water than conventional</li>
                        <li>Carbon neutral production</li>
                        <li>Recyclable at end of life</li>
                    </ul>
                </div>
                <div class="modal-actions">
                    <button class="btn btn-primary add-to-cart">Add to Cart</button>
                    <button class="btn btn-secondary view-outfits">View Outfit Ideas</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Add event listeners
    const closeBtn = modal.querySelector('.modal-close');
    const addToCartBtn = modal.querySelector('.add-to-cart');
    const viewOutfitsBtn = modal.querySelector('.view-outfits');
    
    closeBtn.addEventListener('click', () => {
        modal.remove();
        document.body.style.overflow = 'auto';
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
            document.body.style.overflow = 'auto';
        }
    });
    
    addToCartBtn.addEventListener('click', () => {
        createLeafAnimation(window.innerWidth / 2, window.innerHeight / 2);
        window.EcoLux.showSuccessToast(`${itemName} added to cart!`);
        updateCartCount(1);
        modal.remove();
        document.body.style.overflow = 'auto';
    });
    
    viewOutfitsBtn.addEventListener('click', () => {
        window.EcoLux.showSuccessToast('Loading outfit ideas...');
    });
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

// Update Cart Count
function updateCartCount(items = 1) {
    const cartCountElement = document.querySelector('.cart-count');
    if (cartCountElement) {
        const currentCount = parseInt(cartCountElement.textContent) || 0;
        cartCountElement.textContent = currentCount + items;
        
        // Add pulse animation
        cartCountElement.style.animation = 'none';
        setTimeout(() => {
            cartCountElement.style.animation = 'impactPulse 0.5s ease-out';
        }, 10);
    }
}

// Initialize Animations
function initAnimations() {
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
    document.querySelectorAll('.seasonal-drops, .limited-editions, .capsule-wardrobe').forEach(section => {
        section.classList.add('scroll-reveal');
        observer.observe(section);
    });
    
    // Add hover effects to buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 8px 25px rgba(201, 162, 77, 0.3)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
}

// Export functions
window.EcoLuxCollections = {
    loadSeasonContent,
    openLimitedEditionModal,
    showCapsuleItemDetails
};
