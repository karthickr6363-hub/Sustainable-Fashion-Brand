// Sustainability Page JavaScript

document.addEventListener('DOMContentLoaded', function () {
    initInteractiveMap();
    initImpactCalculator();
    initCertificationInteractions();
    initTransparencyTools();
    initAnimations();
});

// Interactive Map
function initInteractiveMap() {
    const markers = document.querySelectorAll('.marker');

    markers.forEach(marker => {
        marker.addEventListener('click', function () {
            const location = this.dataset.location;
            showLocationDetails(location);
        });

        // Add hover effect
        marker.addEventListener('mouseenter', function () {
            this.querySelector('.marker-dot').style.transform = 'translate(-50%, -50%) scale(1.2)';
        });

        marker.addEventListener('mouseleave', function () {
            this.querySelector('.marker-dot').style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });
}

// Show Location Details
function showLocationDetails(location) {
    const locationData = {
        india: {
            name: 'India',
            title: 'Organic Cotton Farms',
            description: 'Partnering with 500+ small-scale farmers across Maharashtra and Gujarat to grow premium organic cotton using traditional farming methods.',
            stats: {
                farmers: '500+',
                acres: '10,000+',
                water: '88% less than conventional',
                income: '40% higher than average'
            },
            image: 'https://images.unsplash.com/photo-1627885237837-7f9172c918ee?q=80&w=2574&auto=format&fit=crop'
        },
        portugal: {
            name: 'Portugal',
            title: 'Textile Workshops',
            description: 'Traditional weaving workshops in northern Portugal where artisans create our signature fabrics using techniques passed down through generations.',
            stats: {
                artisans: '150+',
                techniques: '12 traditional methods',
                years: 'Average 25 years experience',
                production: '50,000+ meters/year'
            },
            image: 'https://images.unsplash.com/photo-1605333329107-1e5088f2441c?q=80&w=2670&auto=format&fit=crop'
        },
        mali: {
            name: 'Mali',
            title: 'Natural Dye Studios',
            description: 'Master dyers in Bamako create our vibrant colors using only botanical materials like indigo, madder root, and turmeric.',
            stats: {
                dyers: '25+',
                plants: '50+ botanical sources',
                colors: '200+ unique shades',
                process: 'Zero chemical waste'
            },
            image: 'https://images.unsplash.com/photo-1620799140408-ed5341cd2431?q=80&w=2672&auto=format&fit=crop'
        },
        turkey: {
            name: 'Turkey',
            title: 'Hemp Processing',
            description: 'Sustainable hemp processing facilities that use mechanical retting and closed-loop water systems.',
            stats: {
                facilities: '3',
                water: '90% recycled',
                energy: 'Solar powered',
                output: '5,000 tons/year'
            },
            image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=2574&auto=format&fit=crop'
        },
        peru: {
            name: 'Peru',
            title: 'Organic Wool',
            description: 'Free-range alpaca and sheep farms in the Andes where animals are treated ethically and graze on organic pastures.',
            stats: {
                farms: '20+',
                animals: '10,000+',
                elevation: '3,500+ meters',
                quality: 'Premium grade wool'
            },
            image: 'https://images.unsplash.com/photo-1484557985045-edf25e08da73?q=80&w=2673&auto=format&fit=crop'
        }
    };

    const data = locationData[location];
    if (!data) return;

    // Create modal
    const modal = createLocationModal(data);
    document.body.appendChild(modal);

    // Show modal with animation
    setTimeout(() => {
        modal.style.display = 'block';
        modal.style.opacity = '1';
    }, 100);
}

// Create Location Modal
function createLocationModal(data) {
    const modal = document.createElement('div');
    modal.className = 'location-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: none;
        opacity: 0;
        z-index: 2000;
        transition: opacity 0.3s ease-out;
    `;

    modal.innerHTML = `
        <div class="location-modal-content" style="
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
            <div class="location-modal-header" style="
                position: relative;
                height: 200px;
                overflow: hidden;
                border-radius: var(--radius-lg) var(--radius-lg) 0 0;
            ">
                <img src="${data.image}" alt="${data.name}" style="
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                ">
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
            <div class="location-modal-body" style="padding: 2rem;">
                <h2 style="color: var(--accent-color); margin-bottom: 0.5rem;">${data.name}</h2>
                <h3 style="color: var(--text-primary); margin-bottom: 1rem;">${data.title}</h3>
                <p style="color: var(--text-primary); line-height: 1.6; margin-bottom: 2rem;">${data.description}</p>
                
                <div class="location-stats" style="
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 1rem;
                ">
                    ${Object.entries(data.stats).map(([key, value]) => `
                        <div style="
                            background: rgba(201, 162, 77, 0.1);
                            padding: 1rem;
                            border-radius: var(--radius-md);
                            border: 1px solid rgba(201, 162, 77, 0.3);
                        ">
                            <div style="color: var(--accent-color); font-weight: 600; margin-bottom: 0.25rem;">
                                ${key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                            </div>
                            <div style="color: var(--text-primary); font-size: 1.1rem; font-weight: 700;">
                                ${value}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;

    // Add close functionality
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', () => {
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.remove();
        }, 300);
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.opacity = '0';
            setTimeout(() => {
                modal.remove();
            }, 300);
        }
    });

    return modal;
}

// Impact Calculator
function initImpactCalculator() {
    const calculateBtn = document.getElementById('calculate-impact');
    const shareBtn = document.getElementById('share-impact');

    if (calculateBtn) {
        calculateBtn.addEventListener('click', calculateImpact);
    }

    if (shareBtn) {
        shareBtn.addEventListener('click', shareImpact);
    }
}

// Calculate Impact
function calculateImpact() {
    const itemsPurchased = parseInt(document.getElementById('items-purchased').value) || 1;
    const materialType = document.getElementById('material-type').value;

    // Impact factors per item compared to conventional fashion
    const impactFactors = {
        'organic-cotton': {
            water: 2700,      // liters saved per item
            co2: 3.5,         // kg CO2 reduced per item
            chemicals: 150,   // grams avoided per item
            energy: 25        // kWh saved per item
        },
        'linen': {
            water: 2000,
            co2: 4.2,
            chemicals: 200,
            energy: 30
        },
        'hemp': {
            water: 3000,
            co2: 5.0,
            chemicals: 250,
            energy: 35
        },
        'recycled': {
            water: 1800,
            co2: 6.0,
            chemicals: 300,
            energy: 45
        }
    };

    const factors = impactFactors[materialType];

    // Calculate totals
    const waterSaved = factors.water * itemsPurchased;
    const co2Reduced = factors.co2 * itemsPurchased;
    const chemicalsAvoided = factors.chemicals * itemsPurchased;
    const energySaved = factors.energy * itemsPurchased;

    // Update display with animation
    updateImpactDisplay('water-saved', waterSaved);
    updateImpactDisplay('co2-reduced', co2Reduced);
    updateImpactDisplay('chemicals-avoided', chemicalsAvoided);
    updateImpactDisplay('energy-saved', energySaved);

    // Generate comparison text
    const comparisonText = generateComparison(waterSaved, co2Reduced, energySaved);
    document.getElementById('comparison-text').textContent = comparisonText;

    // Show results
    const resultsDiv = document.getElementById('impact-results');
    resultsDiv.style.display = 'block';

    // Scroll to results
    resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    // Show success message
    window.EcoLux.showSuccessToast('Impact calculated successfully!');
}

// Update Impact Display with Animation
function updateImpactDisplay(elementId, targetValue) {
    const element = document.getElementById(elementId);
    const duration = 2000;
    const steps = 60;
    const increment = targetValue / steps;
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= targetValue) {
            current = targetValue;
            clearInterval(timer);
        }

        if (elementId === 'co2-reduced') {
            element.textContent = current.toFixed(1);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, duration / steps);
}

// Generate Comparison Text
function generateComparison(waterSaved, co2Reduced, energySaved) {
    const comparisons = [];

    // Water comparisons
    if (waterSaved >= 10000) {
        comparisons.push(`Enough drinking water for ${Math.floor(waterSaved / 2000)} people for a year`);
    } else if (waterSaved >= 5000) {
        comparisons.push(`Enough water for ${Math.floor(waterSaved / 150)} showers`);
    } else {
        comparisons.push(`Enough water to fill ${Math.floor(waterSaved / 200)} bathtubs`);
    }

    // CO2 comparisons
    if (co2Reduced >= 20) {
        comparisons.push(`Equivalent to planting ${Math.floor(co2Reduced / 10)} trees`);
    } else if (co2Reduced >= 10) {
        comparisons.push(`Equivalent to ${Math.floor(co2Reduced / 0.2)} miles not driven`);
    } else {
        comparisons.push(`Equivalent to ${Math.floor(co2Reduced / 0.005)} smartphone charges`);
    }

    // Energy comparisons
    if (energySaved >= 100) {
        comparisons.push(`Enough energy to power ${Math.floor(energySaved / 30)} homes for a month`);
    } else if (energySaved >= 50) {
        comparisons.push(`Enough energy to run a laptop for ${Math.floor(energySaved / 0.05)} hours`);
    } else {
        comparisons.push(`Enough energy to watch ${Math.floor(energySaved / 0.1)} hours of TV`);
    }

    return comparisons.join(' | ');
}

// Share Impact
function shareImpact() {
    const itemsPurchased = document.getElementById('items-purchased').value;
    const materialType = document.getElementById('material-type').value;
    const waterSaved = document.getElementById('water-saved').textContent;
    const co2Reduced = document.getElementById('co2-reduced').textContent;

    const shareText = `I just calculated my sustainable fashion impact! By choosing ${itemsPurchased} ${materialType.replace('-', ' ')} items from EcoLux, I'm saving ${waterSaved} liters of water and reducing ${co2Reduced} kg of CO₂. 🌍♻️`;

    // Create share modal
    const shareModal = createShareModal(shareText);
    document.body.appendChild(shareModal);

    setTimeout(() => {
        shareModal.style.display = 'block';
    }, 100);
}

// Create Share Modal
function createShareModal(shareText) {
    const modal = document.createElement('div');
    modal.className = 'share-modal';
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
        <div class="share-modal-content" style="
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--primary-bg);
            border-radius: var(--radius-lg);
            padding: 2rem;
            max-width: 500px;
            width: 90%;
            border: 2px solid var(--accent-color);
        ">
            <h3 style="color: var(--accent-color); margin-bottom: 1rem;">Share Your Impact</h3>
            <p style="color: var(--text-primary); margin-bottom: 1.5rem;">Share your sustainable fashion impact with friends!</p>
            
            <div style="
                background: rgba(244, 241, 236, 0.1);
                padding: 1rem;
                border-radius: var(--radius-md);
                margin-bottom: 1.5rem;
                border: 1px solid rgba(201, 162, 77, 0.3);
            ">
                <p style="color: var(--text-primary); font-size: 0.9rem; line-height: 1.4;">${shareText}</p>
            </div>
            
            <div style="display: flex; gap: 1rem; margin-bottom: 1.5rem;">
                <button class="share-btn" data-platform="twitter" style="
                    flex: 1;
                    background: #1DA1F2;
                    color: white;
                    border: none;
                    padding: 0.75rem;
                    border-radius: var(--radius-md);
                    cursor: pointer;
                    font-weight: 600;
                ">Twitter</button>
                <button class="share-btn" data-platform="facebook" style="
                    flex: 1;
                    background: #4267B2;
                    color: white;
                    border: none;
                    padding: 0.75rem;
                    border-radius: var(--radius-md);
                    cursor: pointer;
                    font-weight: 600;
                ">Facebook</button>
                <button class="copy-btn" style="
                    flex: 1;
                    background: var(--accent-color);
                    color: var(--primary-bg);
                    border: none;
                    padding: 0.75rem;
                    border-radius: var(--radius-md);
                    cursor: pointer;
                    font-weight: 600;
                ">Copy Link</button>
            </div>
            
            <button class="modal-close" style="
                width: 100%;
                background: transparent;
                color: var(--text-primary);
                border: 1px solid var(--text-primary);
                padding: 0.75rem;
                border-radius: var(--radius-md);
                cursor: pointer;
            ">Close</button>
        </div>
    `;

    // Add event listeners
    const closeBtn = modal.querySelector('.modal-close');
    const copyBtn = modal.querySelector('.copy-btn');

    closeBtn.addEventListener('click', () => {
        modal.remove();
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });

    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(shareText).then(() => {
            window.EcoLux.showSuccessToast('Text copied to clipboard!');
            modal.remove();
        });
    });

    return modal;
}

// Certification Interactions
function initCertificationInteractions() {
    const certCards = document.querySelectorAll('.certification-card');

    certCards.forEach(card => {
        card.addEventListener('click', function () {
            const certName = this.querySelector('h3').textContent;
            showCertificationDetails(certName);
        });

        // Add hover effect
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Show Certification Details
function showCertificationDetails(certName) {
    const certDetails = {
        'Global Organic Textile Standard': {
            description: 'GOTS is the worldwide leading textile processing standard for organic fibers, including ecological and social criteria.',
            benefits: ['Ensures organic fibers', 'Prohibits toxic chemicals', 'Guarantees fair working conditions'],
            process: 'Annual audits by independent certifiers',
            valid: 'Valid for 3 years with annual checks'
        },
        'Fair Trade Certified': {
            description: 'Fair Trade empowers farmers and workers to fight poverty and improve their communities.',
            benefits: ['Fair prices for producers', 'Community development funds', 'Environmental standards'],
            process: 'Regular audits and community verification',
            valid: 'Annual certification with ongoing monitoring'
        }
        // Add more certification details as needed
    };

    const details = certDetails[certName];
    if (!details) return;

    window.EcoLux.showSuccessToast(`${certName}: ${details.description}`);
}

// Transparency Tools
function initTransparencyTools() {
    const toolButtons = document.querySelectorAll('.tool-card .btn');

    toolButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            const toolName = this.closest('.tool-card').querySelector('h3').textContent;

            switch (toolName) {
                case 'QR Code Tracking':
                    showQRTrackingDemo();
                    break;
                case 'Blockchain Verification':
                    showBlockchainInfo();
                    break;
                case 'Live Factory Cameras':
                    showFactoryCameras();
                    break;
                default:
                    window.EcoLux.showSuccessToast(`${toolName} coming soon!`);
            }
        });
    });
}

// Show QR Tracking Demo
function showQRTrackingDemo() {
    const modal = document.createElement('div');
    modal.className = 'qr-demo-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
    `;

    modal.innerHTML = `
        <div style="
            background: var(--primary-bg);
            border-radius: var(--radius-lg);
            padding: 2rem;
            max-width: 400px;
            width: 90%;
            text-align: center;
            border: 2px solid var(--accent-color);
        ">
            <h3 style="color: var(--accent-color); margin-bottom: 1rem;">QR Code Demo</h3>
            <div style="
                width: 200px;
                height: 200px;
                background: var(--text-primary);
                margin: 0 auto 1rem;
                border-radius: var(--radius-md);
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 0.8rem;
                color: var(--primary-bg);
            ">QR Code</div>
            <p style="color: var(--text-primary); margin-bottom: 1.5rem;">
                Scan this code to see the complete journey of your garment from farm to closet.
            </p>
            <button class="modal-close" style="
                background: var(--accent-color);
                color: var(--primary-bg);
                border: none;
                padding: 0.75rem 2rem;
                border-radius: var(--radius-md);
                cursor: pointer;
                font-weight: 600;
            ">Close</button>
        </div>
    `;

    document.body.appendChild(modal);

    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', () => modal.remove());

    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
}

// Show Blockchain Info
function showBlockchainInfo() {
    window.EcoLux.showSuccessToast('Blockchain verification ensures immutable transparency in our supply chain!');
}

// Show Factory Cameras
function showFactoryCameras() {
    window.EcoLux.showSuccessToast('Live factory cameras coming soon! Watch our ethical production in real-time.');
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
    document.querySelectorAll('.material-card, .chain-step, .tool-card, .certification-card').forEach(element => {
        element.classList.add('scroll-reveal');
        observer.observe(element);
    });
}

// Export functions
window.EcoLuxSustainability = {
    showLocationDetails,
    calculateImpact,
    shareImpact,
    showCertificationDetails
};
