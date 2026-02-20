// Impact Page JavaScript

document.addEventListener('DOMContentLoaded', function () {
    initLiveMetrics();
    initImpactCounters();
    initReportDownloads();
    initNGOPartnerships();
    initPersonalImpactCalculator();
    initAnimations();
});

// Live Metrics Updates
function initLiveMetrics() {
    // Simulate real-time updates
    setInterval(updateLiveMetrics, 5000);

    // Add hover effects to metric cards
    const metricCards = document.querySelectorAll('.metric-card');
    metricCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(-5px) scale(1)';
        });
    });
}

// Update Live Metrics
function updateLiveMetrics() {
    const metrics = [
        { id: 'water-saved', increment: Math.floor(Math.random() * 100) + 50 },
        { id: 'co2-reduced', increment: Math.random() * 2 + 0.5 },
        { id: 'artisans-empowered', increment: Math.random() < 0.1 ? 1 : 0 },
        { id: 'organic-garments', increment: Math.floor(Math.random() * 20) + 10 },
        { id: 'items-recycled', increment: Math.floor(Math.random() * 10) + 5 }
    ];

    metrics.forEach(metric => {
        const element = document.querySelector(`[data-metric-id="${metric.id}"]`);
        if (element) {
            const currentValue = parseFloat(element.textContent.replace(/,/g, ''));
            const newValue = currentValue + metric.increment;

            // Animate the change
            animateValue(element, currentValue, newValue, 1000);

            // Update daily change indicator
            const card = element.closest('.metric-card');
            const changeElement = card.querySelector('.metric-change');
            if (changeElement && metric.id !== 'artisans-empowered') {
                const dailyChange = Math.floor(Math.random() * 100) + 10;
                changeElement.textContent = `+${dailyChange} today`;
            }
        }
    });
}

// Animate Value Changes
function animateValue(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            current = end;
            clearInterval(timer);
        }

        const decimals = (element.getAttribute('data-metric-id') === 'co2-reduced') ? 1 : 0;
        if (decimals > 0) {
            element.textContent = current.toFixed(decimals).toLocaleString();
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 16);
}

// Initialize Impact Counters
function initImpactCounters() {
    const counters = document.querySelectorAll('.impact-counter');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                const target = parseFloat(entry.target.dataset.target);
                animateCounter(entry.target, target);
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Animate Counter
function animateCounter(element, target) {
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }

        const decimals = (element.getAttribute('data-metric-id') === 'co2-reduced') ? 1 : 0;
        if (decimals > 0) {
            element.textContent = current.toFixed(decimals).toLocaleString();
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 16);
}

// Report Downloads
function initReportDownloads() {
    const downloadButtons = document.querySelectorAll('.download-report');

    downloadButtons.forEach(button => {
        button.addEventListener('click', function () {
            const reportType = this.dataset.report;
            downloadReport(reportType);
        });
    });
}

// Download Report
function downloadReport(reportType) {
    // Show loading state
    const button = document.querySelector(`[data-report="${reportType}"]`);
    const originalText = button.textContent;
    button.textContent = 'Downloading...';
    button.disabled = true;

    // Simulate download
    setTimeout(() => {
        // Create download link
        const link = document.createElement('a');
        link.href = '#'; // In real app, this would be actual PDF URL
        link.download = `${reportType}.pdf`;
        link.click();

        // Reset button
        button.textContent = 'Downloaded ✓';
        button.style.backgroundColor = '#27ae60';

        // Show success message
        window.EcoLux.showSuccessToast('Report downloaded successfully!');

        // Reset button after 3 seconds
        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
            button.style.backgroundColor = '';
        }, 3000);
    }, 1500);
}

// NGO Partnerships
function initNGOPartnerships() {
    const learnMoreButtons = document.querySelectorAll('.learn-more');

    learnMoreButtons.forEach(button => {
        button.addEventListener('click', function () {
            const ngoCard = this.closest('.ngo-card');
            const ngoName = ngoCard.querySelector('h3').textContent;
            showNGODetails(ngoName);
        });
    });

    // Add hover effects to NGO cards
    const ngoCards = document.querySelectorAll('.ngo-card');
    ngoCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(-5px) scale(1)';
        });
    });
}

// Show NGO Details
function showNGODetails(ngoName) {
    const ngoDetails = {
        'World Wildlife Fund': {
            description: 'WWF is the world\'s leading conservation organization, working in 100 countries to protect the planet\'s wildlife and habitats.',
            projects: [
                'Water conservation in Indian cotton farms',
                'Sustainable agriculture training programs',
                'Biodiversity protection in sourcing regions'
            ],
            impact: '50M liters water conserved, 10,000 trees planted',
            website: 'https://www.worldwildlife.org'
        },
        'Fair Trade International': {
            description: 'Fair Trade International works to share the benefits of trade more equally and equitably.',
            projects: [
                'Fair wage certification for artisans',
                'Community development programs',
                'Educational initiatives in artisan communities'
            ],
            impact: '40% higher wages, 5 schools built',
            website: 'https://www.fairtrade.net'
        },
        '1% for the Planet': {
            description: '1% for the Planet inspires businesses and individuals to support environmental solutions.',
            projects: [
                'Climate action initiatives',
                'Ocean conservation programs',
                'Renewable energy projects'
            ],
            impact: '$250K donated, 30 countries supported',
            website: 'https://www.onepercentfortheplanet.org'
        },
        'Water.org': {
            description: 'Water.org is a global nonprofit organization working to bring water and sanitation to the world.',
            projects: [
                'Clean water access in rural communities',
                'Sanitation facility construction',
                'Water management training'
            ],
            impact: '25 wells built, 5,000 people served',
            website: 'https://www.water.org'
        }
    };

    const details = ngoDetails[ngoName];
    if (!details) return;

    // Create modal
    const modal = createNGOModal(ngoName, details);
    document.body.appendChild(modal);

    // Show modal
    setTimeout(() => {
        modal.style.display = 'block';
    }, 100);
}

// Create NGO Modal
function createNGOModal(ngoName, details) {
    const modal = document.createElement('div');
    modal.className = 'ngo-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: none;
        z-index: 2000;
    `;

    modal.innerHTML = `
        <div class="ngo-modal-content" style="
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--primary-bg);
            border-radius: var(--radius-lg);
            max-width: 600px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            border: 2px solid var(--accent-color);
        ">
            <div class="ngo-modal-header" style="
                padding: 2rem;
                border-bottom: 1px solid rgba(201, 162, 77, 0.2);
            ">
                <h2 style="color: var(--accent-color); margin-bottom: 0.5rem;">${ngoName}</h2>
                <button class="modal-close" style="
                    position: absolute;
                    top: 1rem;
                    right: 1rem;
                    background: var(--accent-color);
                    color: var(--primary-bg);
                    border: none;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    cursor: pointer;
                    font-size: 1.5rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                ">&times;</button>
            </div>
            <div class="ngo-modal-body" style="padding: 2rem;">
                <p style="color: var(--text-primary); line-height: 1.6; margin-bottom: 2rem;">${details.description}</p>
                
                <h3 style="color: var(--accent-color); margin-bottom: 1rem;">Our Collaborative Projects</h3>
                <ul style="color: var(--text-primary); line-height: 1.6; margin-bottom: 2rem; padding-left: 1.5rem;">
                    ${details.projects.map(project => `<li style="margin-bottom: 0.5rem;">${project}</li>`).join('')}
                </ul>
                
                <div style="
                    background: rgba(201, 162, 77, 0.1);
                    padding: 1rem;
                    border-radius: var(--radius-md);
                    margin-bottom: 2rem;
                    border: 1px solid rgba(201, 162, 77, 0.3);
                ">
                    <strong style="color: var(--accent-color);">Combined Impact:</strong>
                    <span style="color: var(--text-primary); margin-left: 0.5rem;">${details.impact}</span>
                </div>
                
                <div style="display: flex; gap: 1rem;">
                    <a href="${details.website}" target="_blank" style="
                        flex: 1;
                        background: var(--accent-color);
                        color: var(--primary-bg);
                        text-align: center;
                        padding: 0.75rem;
                        border-radius: var(--radius-md);
                        text-decoration: none;
                        font-weight: 600;
                    ">Visit Website</a>
                    <button class="modal-close" style="
                        flex: 1;
                        background: transparent;
                        color: var(--text-primary);
                        border: 1px solid var(--text-primary);
                        padding: 0.75rem;
                        border-radius: var(--radius-md);
                        cursor: pointer;
                    ">Close</button>
                </div>
            </div>
        </div>
    `;

    // Add event listeners
    const closeButtons = modal.querySelectorAll('.modal-close');
    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            modal.remove();
        });
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });

    return modal;
}

// Personal Impact Calculator
function initPersonalImpactCalculator() {
    const calculateBtn = document.getElementById('calculate-personal-impact');
    const shareBtn = document.querySelector('.share-impact');
    const historyBtn = document.querySelector('.view-history');

    if (calculateBtn) {
        calculateBtn.addEventListener('click', calculatePersonalImpact);
    }

    if (shareBtn) {
        shareBtn.addEventListener('click', sharePersonalImpact);
    }

    if (historyBtn) {
        historyBtn.addEventListener('click', viewPurchaseHistory);
    }
}

// Calculate Personal Impact
function calculatePersonalImpact() {
    const email = document.getElementById('customer-email').value;

    if (!email) {
        window.EcoLux.showSuccessToast('Please enter your email address');
        return;
    }

    // Simulate fetching customer data
    const customerData = generateMockCustomerData(email);

    // Calculate impact based on mock data
    const waterSaved = customerData.totalSpent * 15; // 15 liters per $1 spent
    const co2Reduced = customerData.totalSpent * 0.05; // 0.05kg CO2 per $1 spent
    const treesEquivalent = Math.floor(co2Reduced / 21); // 21kg CO2 per tree

    // Update display with animation
    updatePersonalMetrics(waterSaved, co2Reduced, treesEquivalent);

    // Show results
    const resultsDiv = document.getElementById('personal-results');
    resultsDiv.style.display = 'block';

    // Scroll to results
    resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    // Show success message
    window.EcoLux.showSuccessToast('Your impact calculated successfully!');
}

// Generate Mock Customer Data
function generateMockCustomerData(email) {
    // Generate realistic mock data based on email
    const emailHash = email.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const totalSpent = (emailHash % 1000) + 100; // $100-$1100
    const orderCount = Math.floor(totalSpent / 150) + 1; // Average order $150

    return {
        email: email,
        totalSpent: totalSpent,
        orderCount: orderCount,
        joinDate: new Date(Date.now() - (emailHash % 365) * 24 * 60 * 60 * 1000).toLocaleDateString()
    };
}

// Update Personal Metrics
function updatePersonalMetrics(waterSaved, co2Reduced, treesEquivalent) {
    animateValue(document.getElementById('personal-water'), 0, waterSaved, 1500);
    animateValue(document.getElementById('personal-co2'), 0, co2Reduced, 1500);
    animateValue(document.getElementById('personal-trees'), 0, treesEquivalent, 1500);
}

// Share Personal Impact
function sharePersonalImpact() {
    const waterSaved = document.getElementById('personal-water').textContent;
    const co2Reduced = document.getElementById('personal-co2').textContent;
    const treesEquivalent = document.getElementById('personal-trees').textContent;

    const shareText = `My sustainable fashion choices with EcoLux have saved ${waterSaved} liters of water, reduced ${co2Reduced}kg of CO₂, and are equivalent to planting ${treesEquivalent} trees! 🌍♻️ #SustainableFashion #EcoLux`;

    // Create share modal
    const shareModal = createShareModal(shareText);
    document.body.appendChild(shareModal);

    setTimeout(() => {
        shareModal.style.display = 'block';
    }, 100);
}

// View Purchase History
function viewPurchaseHistory() {
    const email = document.getElementById('customer-email').value;

    if (!email) {
        window.EcoLux.showSuccessToast('Please enter your email first');
        return;
    }

    // Create purchase history modal
    const historyModal = createPurchaseHistoryModal(email);
    document.body.appendChild(historyModal);

    setTimeout(() => {
        historyModal.style.display = 'block';
    }, 100);
}

// Create Purchase History Modal
function createPurchaseHistoryModal(email) {
    const customerData = generateMockCustomerData(email);
    const orders = generateMockOrders(customerData.orderCount);

    const modal = document.createElement('div');
    modal.className = 'history-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: none;
        z-index: 2000;
    `;

    modal.innerHTML = `
        <div class="history-modal-content" style="
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--primary-bg);
            border-radius: var(--radius-lg);
            max-width: 700px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            border: 2px solid var(--accent-color);
        ">
            <div class="history-modal-header" style="
                padding: 2rem;
                border-bottom: 1px solid rgba(201, 162, 77, 0.2);
            ">
                <h2 style="color: var(--accent-color); margin-bottom: 0.5rem;">Purchase History</h2>
                <p style="color: var(--text-primary); margin: 0;">${email} • Member since ${customerData.joinDate}</p>
                <button class="modal-close" style="
                    position: absolute;
                    top: 1rem;
                    right: 1rem;
                    background: var(--accent-color);
                    color: var(--primary-bg);
                    border: none;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    cursor: pointer;
                    font-size: 1.5rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                ">&times;</button>
            </div>
            <div class="history-modal-body" style="padding: 2rem;">
                <div style="margin-bottom: 2rem;">
                    <h3 style="color: var(--accent-color); margin-bottom: 1rem;">Order Summary</h3>
                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;">
                        <div style="text-align: center; padding: 1rem; background: rgba(201, 162, 77, 0.1); border-radius: var(--radius-md);">
                            <div style="color: var(--accent-color); font-size: 1.5rem; font-weight: 700;">${customerData.orderCount}</div>
                            <div style="color: var(--text-primary); font-size: 0.9rem;">Total Orders</div>
                        </div>
                        <div style="text-align: center; padding: 1rem; background: rgba(201, 162, 77, 0.1); border-radius: var(--radius-md);">
                            <div style="color: var(--accent-color); font-size: 1.5rem; font-weight: 700;">$${customerData.totalSpent}</div>
                            <div style="color: var(--text-primary); font-size: 0.9rem;">Total Spent</div>
                        </div>
                        <div style="text-align: center; padding: 1rem; background: rgba(201, 162, 77, 0.1); border-radius: var(--radius-md);">
                            <div style="color: var(--accent-color); font-size: 1.5rem; font-weight: 700;">${Math.floor(customerData.totalSpent * 15).toLocaleString()}L</div>
                            <div style="color: var(--text-primary); font-size: 0.9rem;">Water Saved</div>
                        </div>
                    </div>
                </div>
                
                <h3 style="color: var(--accent-color); margin-bottom: 1rem;">Recent Orders</h3>
                <div style="display: flex; flex-direction: column; gap: 1rem;">
                    ${orders.map(order => `
                        <div style="
                            background: rgba(244, 241, 236, 0.1);
                            padding: 1rem;
                            border-radius: var(--radius-md);
                            border: 1px solid rgba(201, 162, 77, 0.3);
                        ">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                                <strong style="color: var(--text-primary);">Order #${order.id}</strong>
                                <span style="color: var(--accent-color); font-weight: 600;">$${order.total}</span>
                            </div>
                            <div style="color: var(--text-primary); font-size: 0.9rem; margin-bottom: 0.5rem;">${order.date}</div>
                            <div style="color: var(--text-primary); font-size: 0.9rem;">${order.items.join(', ')}</div>
                        </div>
                    `).join('')}
                </div>
                
                <button class="modal-close" style="
                    width: 100%;
                    background: transparent;
                    color: var(--text-primary);
                    border: 1px solid var(--text-primary);
                    padding: 0.75rem;
                    border-radius: var(--radius-md);
                    cursor: pointer;
                    margin-top: 2rem;
                ">Close</button>
            </div>
        </div>
    `;

    // Add event listeners
    const closeButtons = modal.querySelectorAll('.modal-close');
    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            modal.remove();
        });
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });

    return modal;
}

// Generate Mock Orders
function generateMockOrders(orderCount) {
    const items = [
        'Organic Cotton Dress',
        'Linen Blazer',
        'Recycled Silk Scarf',
        'Hemp Trousers',
        'Bamboo Lounge Set',
        'Handwoven Cotton Top'
    ];

    const orders = [];
    for (let i = 0; i < Math.min(orderCount, 5); i++) {
        const orderDate = new Date(Date.now() - (i * 30) * 24 * 60 * 60 * 1000);
        const itemCount = Math.floor(Math.random() * 3) + 1;
        const orderItems = [];

        for (let j = 0; j < itemCount; j++) {
            orderItems.push(items[Math.floor(Math.random() * items.length)]);
        }

        orders.push({
            id: 1000 + i,
            date: orderDate.toLocaleDateString(),
            items: orderItems,
            total: (itemCount * (Math.floor(Math.random() * 100) + 100)).toFixed(2)
        });
    }

    return orders;
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
    document.querySelectorAll('.metric-card, .highlight-card, .download-card, .ngo-card').forEach(element => {
        element.classList.add('scroll-reveal');
        observer.observe(element);
    });
}

// Export functions
window.EcoLuxImpact = {
    updateLiveMetrics,
    downloadReport,
    showNGODetails,
    calculatePersonalImpact,
    sharePersonalImpact
};
