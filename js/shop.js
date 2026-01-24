// Shop Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initShopFilters();
    initProductInteractions();
    initQuickViewModal();
    initPagination();
    initSorting();
    initPriceSlider();
});

// Shop Filters
function initShopFilters() {
    const filterCheckboxes = document.querySelectorAll('.filter-label input[type="checkbox"]');
    const resetButton = document.querySelector('.filter-reset');
    
    // Handle filter changes
    filterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            applyFilters();
        });
    });
    
    // Handle reset filters
    if (resetButton) {
        resetButton.addEventListener('click', function() {
            filterCheckboxes.forEach(checkbox => {
                checkbox.checked = false;
            });
            
            // Reset price slider
            const priceSlider = document.querySelector('.price-slider');
            const priceValue = document.getElementById('price-value');
            if (priceSlider && priceValue) {
                priceSlider.value = 250;
                priceValue.textContent = '$250';
            }
            
            applyFilters();
        });
    }
}

// Apply Filters
function applyFilters() {
    const activeFilters = getActiveFilters();
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        const product = extractProductData(card);
        const isVisible = isProductVisible(product, activeFilters);
        
        if (isVisible) {
            card.style.display = 'block';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
            }, 50);
        } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.9)';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
    
    updateResultsCount();
}

// Get Active Filters
function getActiveFilters() {
    const filters = {
        materials: [],
        sizes: [],
        impactScores: [],
        maxPrice: 500
    };
    
    // Material filters
    document.querySelectorAll('input[name="material"]:checked').forEach(checkbox => {
        filters.materials.push(checkbox.value);
    });
    
    // Size filters
    document.querySelectorAll('input[name="size"]:checked').forEach(checkbox => {
        filters.sizes.push(checkbox.value);
    });
    
    // Impact score filters
    document.querySelectorAll('input[name="impact"]:checked').forEach(checkbox => {
        filters.impactScores.push(parseInt(checkbox.value));
    });
    
    // Price filter
    const priceSlider = document.querySelector('.price-slider');
    if (priceSlider) {
        filters.maxPrice = parseInt(priceSlider.value);
    }
    
    return filters;
}

// Extract Product Data
function extractProductData(card) {
    const material = card.querySelector('.product-material')?.textContent || '';
    const priceText = card.querySelector('.product-price')?.textContent || '$0';
    const price = parseInt(priceText.replace('$', '').replace(',', ''));
    const impactScoreElement = card.querySelector('.impact-score');
    const impactScore = impactScoreElement ? 
        (impactScoreElement.textContent.match(/⭐/g) || []).length : 3;
    
    return {
        material: material.toLowerCase(),
        price: price,
        impactScore: impactScore
    };
}

// Check if Product Should Be Visible
function isProductVisible(product, filters) {
    // Material filter
    if (filters.materials.length > 0) {
        const materialMatch = filters.materials.some(material => 
            product.material.includes(material.replace('-', ' '))
        );
        if (!materialMatch) return false;
    }
    
    // Price filter
    if (product.price > filters.maxPrice) {
        return false;
    }
    
    // Impact score filter
    if (filters.impactScores.length > 0) {
        if (!filters.impactScores.includes(product.impactScore)) {
            return false;
        }
    }
    
    return true;
}

// Update Results Count
function updateResultsCount() {
    const visibleProducts = document.querySelectorAll('.product-card:not([style*="display: none"])');
    const resultsInfo = document.querySelector('.results-info span');
    
    if (resultsInfo) {
        resultsInfo.textContent = `Showing ${visibleProducts.length} of 156 products`;
    }
}

// Product Interactions
function initProductInteractions() {
    // Quick add buttons
    document.querySelectorAll('.btn-quick-add').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            
            // Add leaf animation
            createLeafAnimation(e.pageX, e.pageY);
            
            // Show success toast
            window.EcoLux.showSuccessToast(`${productName} added to cart!`);
            
            // Update cart count (if cart element exists)
            updateCartCount();
        });
    });
    
    // Wishlist buttons
    document.querySelectorAll('.btn-wishlist').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            
            // Toggle wishlist state
            this.classList.toggle('active');
            this.textContent = this.classList.contains('active') ? '♥' : '♡';
            
            const message = this.classList.contains('active') ? 
                `${productName} added to wishlist!` : 
                `${productName} removed from wishlist`;
            
            window.EcoLux.showSuccessToast(message);
        });
    });
    
    // Quick view buttons
    document.querySelectorAll('.btn-quick-view').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const productCard = this.closest('.product-card');
            openQuickViewModal(productCard);
        });
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
function updateCartCount() {
    const cartCountElement = document.querySelector('.cart-count');
    if (cartCountElement) {
        const currentCount = parseInt(cartCountElement.textContent) || 0;
        cartCountElement.textContent = currentCount + 1;
        
        // Add pulse animation
        cartCountElement.style.animation = 'none';
        setTimeout(() => {
            cartCountElement.style.animation = 'impactPulse 0.5s ease-out';
        }, 10);
    }
}

// Quick View Modal
function initQuickViewModal() {
    const modal = document.getElementById('quick-view-modal');
    const modalClose = document.querySelector('.modal-close');
    
    // Close modal on X click
    if (modalClose) {
        modalClose.addEventListener('click', closeQuickViewModal);
    }
    
    // Close modal on outside click
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeQuickViewModal();
            }
        });
    }
    
    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && modal.style.display === 'block') {
            closeQuickViewModal();
        }
    });
}

// Open Quick View Modal
function openQuickViewModal(productCard) {
    const modal = document.getElementById('quick-view-modal');
    const productImage = productCard.querySelector('.product-image img').src;
    const productTitle = productCard.querySelector('h3').textContent;
    const productMaterial = productCard.querySelector('.product-material').textContent;
    const productPrice = productCard.querySelector('.product-price').textContent;
    const productImpact = productCard.querySelector('.product-impact').innerHTML;
    
    // Update modal content
    document.getElementById('modal-product-image').src = productImage;
    document.getElementById('modal-product-title').textContent = productTitle;
    document.getElementById('modal-product-material').textContent = productMaterial;
    document.getElementById('modal-product-price').textContent = productPrice;
    document.getElementById('modal-product-impact').innerHTML = productImpact;
    
    // Show modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Initialize modal interactions
    initModalInteractions();
}

// Close Quick View Modal
function closeQuickViewModal() {
    const modal = document.getElementById('quick-view-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Initialize Modal Interactions
function initModalInteractions() {
    // Size selection
    const sizeOptions = document.querySelectorAll('.size-option');
    sizeOptions.forEach(option => {
        option.addEventListener('click', function() {
            sizeOptions.forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
        });
    });
    
    // Quantity controls
    const minusBtn = document.querySelector('.quantity-btn.minus');
    const plusBtn = document.querySelector('.quantity-btn.plus');
    const quantityInput = document.querySelector('.quantity-input');
    
    if (minusBtn && plusBtn && quantityInput) {
        minusBtn.addEventListener('click', function() {
            const currentValue = parseInt(quantityInput.value);
            if (currentValue > 1) {
                quantityInput.value = currentValue - 1;
            }
        });
        
        plusBtn.addEventListener('click', function() {
            const currentValue = parseInt(quantityInput.value);
            if (currentValue < 10) {
                quantityInput.value = currentValue + 1;
            }
        });
    }
    
    // Add to cart button
    const addToCartBtn = document.querySelector('.add-to-cart');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function() {
            const selectedSize = document.querySelector('.size-option.selected');
            const quantity = document.querySelector('.quantity-input').value;
            
            if (!selectedSize) {
                window.EcoLux.showSuccessToast('Please select a size');
                return;
            }
            
            const productName = document.getElementById('modal-product-title').textContent;
            window.EcoLux.showSuccessToast(`${quantity} x ${productName} (Size ${selectedSize.textContent}) added to cart!`);
            
            updateCartCount();
            closeQuickViewModal();
        });
    }
    
    // Add to wishlist button
    const addToWishlistBtn = document.querySelector('.add-to-wishlist');
    if (addToWishlistBtn) {
        addToWishlistBtn.addEventListener('click', function() {
            const productName = document.getElementById('modal-product-title').textContent;
            window.EcoLux.showSuccessToast(`${productName} added to wishlist!`);
            closeQuickViewModal();
        });
    }
}

// Pagination
function initPagination() {
    const pageNumbers = document.querySelectorAll('.page-number');
    const prevButton = document.querySelector('.pagination button:first-child');
    const nextButton = document.querySelector('.pagination button:last-child');
    
    pageNumbers.forEach(pageNumber => {
        pageNumber.addEventListener('click', function() {
            // Remove active class from all pages
            pageNumbers.forEach(page => page.classList.remove('active'));
            
            // Add active class to clicked page
            this.classList.add('active');
            
            // Update prev/next button states
            updatePaginationButtons();
            
            // Scroll to top of shop content
            document.querySelector('.shop-content').scrollIntoView({ 
                behavior: 'smooth' 
            });
            
            // In a real application, this would load new products
            window.EcoLux.showSuccessToast(`Loading page ${this.textContent}...`);
        });
    });
    
    if (prevButton) {
        prevButton.addEventListener('click', function() {
            const activePage = document.querySelector('.page-number.active');
            const prevPage = activePage.previousElementSibling;
            
            if (prevPage && prevPage.classList.contains('page-number')) {
                prevPage.click();
            }
        });
    }
    
    if (nextButton) {
        nextButton.addEventListener('click', function() {
            const activePage = document.querySelector('.page-number.active');
            const nextPage = activePage.nextElementSibling;
            
            if (nextPage && nextPage.classList.contains('page-number')) {
                nextPage.click();
            }
        });
    }
}

// Update Pagination Buttons
function updatePaginationButtons() {
    const activePage = document.querySelector('.page-number.active');
    const prevButton = document.querySelector('.pagination button:first-child');
    const nextButton = document.querySelector('.pagination button:last-child');
    
    if (prevButton && nextButton) {
        const isFirstPage = activePage.textContent === '1';
        const isLastPage = activePage.textContent === '13';
        
        prevButton.disabled = isFirstPage;
        nextButton.disabled = isLastPage;
    }
}

// Sorting
function initSorting() {
    const sortSelect = document.querySelector('.sort-select');
    
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            const sortValue = this.value;
            sortProducts(sortValue);
        });
    }
}

// Sort Products
function sortProducts(sortBy) {
    const productGrid = document.querySelector('.product-grid');
    const productCards = Array.from(productGrid.querySelectorAll('.product-card'));
    
    productCards.sort((a, b) => {
        switch (sortBy) {
            case 'price-low':
                return getPriceFromCard(a) - getPriceFromCard(b);
            case 'price-high':
                return getPriceFromCard(b) - getPriceFromCard(a);
            case 'impact':
                return getImpactScoreFromCard(b) - getImpactScoreFromCard(a);
            case 'newest':
                return getNewnessScore(b) - getNewnessScore(a);
            default: // featured
                return 0;
        }
    });
    
    // Re-append sorted products
    productCards.forEach(card => {
        productGrid.appendChild(card);
    });
    
    // Animate products back in
    productCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 50);
    });
}

// Helper Functions for Sorting
function getPriceFromCard(card) {
    const priceText = card.querySelector('.product-price')?.textContent || '$0';
    return parseInt(priceText.replace('$', '').replace(',', ''));
}

function getImpactScoreFromCard(card) {
    const impactElement = card.querySelector('.impact-score');
    return impactElement ? (impactElement.textContent.match(/⭐/g) || []).length : 3;
}

function getNewnessScore(card) {
    if (card.querySelector('.new-badge')) return 1;
    if (card.querySelector('.limited-badge')) return 0.5;
    return 0;
}

// Price Slider
function initPriceSlider() {
    const priceSlider = document.querySelector('.price-slider');
    const priceValue = document.getElementById('price-value');
    
    if (priceSlider && priceValue) {
        priceSlider.addEventListener('input', function() {
            priceValue.textContent = `$${this.value}`;
            applyFilters();
        });
    }
}

// Export shop functions
window.EcoLuxShop = {
    applyFilters,
    openQuickViewModal,
    closeQuickViewModal,
    sortProducts
};
