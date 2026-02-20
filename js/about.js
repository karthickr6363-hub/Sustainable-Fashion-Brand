// About Page JavaScript

document.addEventListener('DOMContentLoaded', function () {
    initStoryAnimations();
    initTeamInteractions();
    initImpactCounters();
    initJoinUsActions();
    initScrollAnimations();
});

// Story Animations
function initStoryAnimations() {
    // Animate story metrics on scroll
    const metrics = document.querySelectorAll('.metric');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                animateMetric(entry.target);
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.5 });

    metrics.forEach(metric => {
        observer.observe(metric);
    });

    // Add hover effects to story elements
    const storyImage = document.querySelector('.story-image');
    if (storyImage) {
        storyImage.addEventListener('mouseenter', function () {
            this.style.transform = 'scale(1.02)';
        });

        storyImage.addEventListener('mouseleave', function () {
            this.style.transform = 'scale(1)';
        });
    }
}

// Animate Metric
function animateMetric(metricElement) {
    const numberElement = metricElement.querySelector('.metric-number');
    const targetText = numberElement.textContent;
    const target = parseFloat(targetText.replace(/[^0-9.]/g, '')) || 0;

    let current = 0;
    const increment = target / 50;
    const duration = 2000;
    const stepTime = duration / 50;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }

        // Format the number based on original format
        const suffix = targetText.replace(/[0-9.]/g, '');
        const decimals = targetText.includes('.') ? 1 : 0;
        numberElement.textContent = current.toFixed(decimals) + suffix;
    }, stepTime);
}

// Team Interactions
function initTeamInteractions() {
    const teamMembers = document.querySelectorAll('.team-member');

    teamMembers.forEach(member => {
        member.addEventListener('click', function () {
            const memberData = extractMemberData(this);
            showMemberModal(memberData);
        });

        // Add enhanced hover effects
        member.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(201, 162, 77, 0.3)';
        });

        member.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(-5px) scale(1)';
            this.style.boxShadow = '0 15px 35px rgba(201, 162, 77, 0.2)';
        });
    });
}

// Extract Member Data
function extractMemberData(memberElement) {
    const name = memberElement.querySelector('h3').textContent;
    const title = memberElement.querySelector('.member-title').textContent;
    const bio = memberElement.querySelector('.member-bio').textContent;
    const image = memberElement.querySelector('.member-photo img').src;
    const socialLinks = Array.from(memberElement.querySelectorAll('.member-social a')).map(link => ({
        platform: link.textContent,
        url: link.href
    }));

    return {
        name,
        title,
        bio,
        image,
        socialLinks,
        achievements: generateMemberAchievements(name)
    };
}

// Generate Member Achievements
function generateMemberAchievements(name) {
    const achievements = {
        'Sarah Chen': [
            'Forbes 30 Under 30 in Fashion',
            'Sustainable Fashion Leader Award 2023',
            'TED Speaker on Circular Fashion',
            'Published Author: "Luxury Redefined"'
        ],
        'Marcus Johnson': [
            'Environmental Excellence Award 2022',
            'UN Climate Action Champion',
            'Sustainable Business Council Member',
            '15+ Years in Corporate Sustainability'
        ],
        'Elena Rodriguez': [
            'International Design Award Winner',
            'Vogue Sustainable Fashion Pioneer',
            'CFDA/Vogue Fashion Fund Finalist',
            'Featured in Architectural Digest'
        ],
        'David Kim': [
            'Supply Chain Innovation Award',
            'Ethical Sourcing Certification',
            'Global Logistics Expert',
            'Fair Trade Advocate'
        ]
    };

    return achievements[name] || [
        'Industry Recognition',
        'Sustainability Champion',
        'Innovation Leader',
        'Community Impact Award'
    ];
}

// Show Member Modal
function showMemberModal(memberData) {
    // Remove existing modal if present
    const existingModal = document.querySelector('.member-modal');
    if (existingModal) {
        existingModal.remove();
    }

    // Create modal
    const modal = document.createElement('div');
    modal.className = 'member-modal';
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
        <div class="member-modal-content" style="
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
            <div class="member-modal-header" style="
                position: relative;
                height: 200px;
                overflow: hidden;
                border-radius: var(--radius-lg) var(--radius-lg) 0 0;
            ">
                <img src="${memberData.image}" alt="${memberData.name}" style="
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
            <div class="member-modal-body" style="padding: 2rem;">
                <h2 style="color: var(--accent-color); margin-bottom: 0.5rem;">${memberData.name}</h2>
                <p style="color: var(--text-primary); font-weight: 600; margin-bottom: 1.5rem;">${memberData.title}</p>
                
                <div style="margin-bottom: 2rem;">
                    <h3 style="color: var(--accent-color); margin-bottom: 1rem;">About</h3>
                    <p style="color: var(--text-primary); line-height: 1.6;">${memberData.bio}</p>
                </div>
                
                <div style="margin-bottom: 2rem;">
                    <h3 style="color: var(--accent-color); margin-bottom: 1rem;">Achievements</h3>
                    <ul style="color: var(--text-primary); line-height: 1.6; padding-left: 1.5rem;">
                        ${memberData.achievements.map(achievement => `<li style="margin-bottom: 0.5rem;">${achievement}</li>`).join('')}
                    </ul>
                </div>
                
                <div style="margin-bottom: 2rem;">
                    <h3 style="color: var(--accent-color); margin-bottom: 1rem;">Connect</h3>
                    <div style="display: flex; gap: 1rem;">
                        ${memberData.socialLinks.map(link => `
                            <a href="${link.url}" target="_blank" style="
                                background: rgba(201, 162, 77, 0.1);
                                color: var(--accent-color);
                                padding: 0.5rem 1rem;
                                border-radius: var(--radius-sm);
                                text-decoration: none;
                                border: 1px solid rgba(201, 162, 77, 0.3);
                                transition: all 0.3s ease-out;
                            ">${link.platform}</a>
                        `).join('')}
                    </div>
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
        </div>
    `;

    document.body.appendChild(modal);

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

    // Show modal with animation
    setTimeout(() => {
        modal.style.display = 'block';
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.style.opacity = '1';
            modal.style.transition = 'opacity 0.3s ease-out';
        }, 10);
    }, 100);
}

// Impact Counters
function initImpactCounters() {
    const statCards = document.querySelectorAll('.stat-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                animateStatCard(entry.target);
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.5 });

    statCards.forEach(card => {
        observer.observe(card);
    });
}

// Animate Stat Card
function animateStatCard(statCard) {
    const numberElement = statCard.querySelector('.stat-number');
    const targetText = numberElement.textContent;

    // Add glow effect during animation
    statCard.style.boxShadow = '0 0 30px rgba(201, 162, 77, 0.5)';

    let current = 0;
    const target = parseFloat(targetText.replace(/[^0-9.]/g, '')) || 0;
    const increment = target / 60;
    const duration = 2000;
    const stepTime = duration / 60;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);

            // Remove glow effect
            setTimeout(() => {
                statCard.style.boxShadow = '';
            }, 500);
        }

        // Format based on original format
        const suffix = targetText.replace(/[0-9,.]/g, '');
        const decimals = targetText.includes('.') ? 1 : 0;

        if (suffix.includes('%') || suffix.includes('+') || suffix.includes('M') || suffix.includes('K')) {
            numberElement.textContent = current.toFixed(decimals) + suffix;
        } else {
            numberElement.textContent = Math.floor(current).toLocaleString() + suffix;
        }
    }, stepTime);
}

// Join Us Actions
function initJoinUsActions() {
    const joinOptions = document.querySelectorAll('.join-option');

    joinOptions.forEach(option => {
        option.addEventListener('click', function () {
            const button = this.querySelector('a');
            if (button) {
                // Create ripple effect
                createRippleEffect(this, event);

                // Handle button click
                setTimeout(() => {
                    if (button.href.includes('shop.html')) {
                        window.EcoLux.showSuccessToast('Redirecting to shop...');
                    } else if (button.href.includes('journal.html')) {
                        window.EcoLux.showSuccessToast('Redirecting to journal...');
                    } else {
                        showContactModal();
                    }
                }, 300);
            }
        });
    });
}

// Create Ripple Effect
function createRippleEffect(element, event) {
    const ripple = document.createElement('div');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: rgba(201, 162, 77, 0.3);
        left: ${x}px;
        top: ${y}px;
        pointer-events: none;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
    `;

    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);

    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Show Contact Modal
function showContactModal() {
    const modal = document.createElement('div');
    modal.className = 'contact-modal';
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
        <div class="contact-modal-content" style="
            background: var(--primary-bg);
            border-radius: var(--radius-lg);
            max-width: 500px;
            width: 90%;
            padding: 2rem;
            border: 2px solid var(--accent-color);
        ">
            <h2 style="color: var(--accent-color); margin-bottom: 1rem;">Partner With Us</h2>
            <p style="color: var(--text-primary); margin-bottom: 2rem;">We're always looking for like-minded partners to advance sustainable fashion.</p>
            
            <form style="display: flex; flex-direction: column; gap: 1rem;">
                <input type="text" placeholder="Your Name" style="
                    background: rgba(244, 241, 236, 0.1);
                    border: 1px solid rgba(201, 162, 77, 0.3);
                    color: var(--text-primary);
                    padding: 1rem;
                    border-radius: var(--radius-md);
                    font-family: var(--font-secondary);
                ">
                <input type="email" placeholder="Your Email" style="
                    background: rgba(244, 241, 236, 0.1);
                    border: 1px solid rgba(201, 162, 77, 0.3);
                    color: var(--text-primary);
                    padding: 1rem;
                    border-radius: var(--radius-md);
                    font-family: var(--font-secondary);
                ">
                <select style="
                    background: rgba(244, 241, 236, 0.1);
                    border: 1px solid rgba(201, 162, 77, 0.3);
                    color: var(--text-primary);
                    padding: 1rem;
                    border-radius: var(--radius-md);
                    font-family: var(--font-secondary);
                ">
                    <option value="">Partnership Type</option>
                    <option value="retail">Retail Partnership</option>
                    <option value="supply">Supply Chain</option>
                    <option value="marketing">Marketing Collaboration</option>
                    <option value="other">Other</option>
                </select>
                <textarea placeholder="Tell us about your partnership idea" rows="4" style="
                    background: rgba(244, 241, 236, 0.1);
                    border: 1px solid rgba(201, 162, 77, 0.3);
                    color: var(--text-primary);
                    padding: 1rem;
                    border-radius: var(--radius-md);
                    font-family: var(--font-secondary);
                    resize: vertical;
                "></textarea>
                <button type="submit" class="btn btn-primary">Send Partnership Inquiry</button>
            </form>
            
            <button class="modal-close" style="
                width: 100%;
                background: transparent;
                color: var(--text-primary);
                border: 1px solid var(--text-primary);
                padding: 0.75rem;
                border-radius: var(--radius-md);
                cursor: pointer;
                margin-top: 1rem;
            ">Close</button>
        </div>
    `;

    document.body.appendChild(modal);

    // Add event listeners
    const form = modal.querySelector('form');
    const closeBtn = modal.querySelector('.modal-close');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Simulate form submission
        setTimeout(() => {
            submitBtn.textContent = 'Sent ✓';
            submitBtn.style.backgroundColor = '#27ae60';

            window.EcoLux.showSuccessToast('Partnership inquiry sent successfully!');

            // Reset and close
            setTimeout(() => {
                modal.remove();
            }, 2000);
        }, 1500);
    });

    closeBtn.addEventListener('click', () => {
        modal.remove();
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Scroll Animations
function initScrollAnimations() {
    // Add CSS for ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

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
    document.querySelectorAll('.pillar, .value-card, .highlight').forEach(element => {
        element.classList.add('scroll-reveal');
        observer.observe(element);
    });
}

// Export functions
window.EcoLuxAbout = {
    showMemberModal,
    animateMetric,
    animateStatCard,
    showContactModal
};
