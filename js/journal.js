// Journal Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initCategoryFilters();
    initArticleInteractions();
    initNewsletterForm();
    initArticleModal();
    initLoadMore();
    initAnimations();
});

// Category Filters
function initCategoryFilters() {
    const filterTabs = document.querySelectorAll('.filter-tab');
    const articleCards = document.querySelectorAll('.article-card');
    
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const category = this.dataset.category;
            
            // Update active tab
            filterTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Filter articles
            filterArticles(category);
        });
    });
}

// Filter Articles
function filterArticles(category) {
    const articleCards = document.querySelectorAll('.article-card');
    
    articleCards.forEach(card => {
        const cardCategory = card.dataset.category;
        
        if (category === 'all' || cardCategory === category) {
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
    
    // Update load more button visibility
    updateLoadMoreButton(category);
}

// Article Interactions
function initArticleInteractions() {
    const articleCards = document.querySelectorAll('.article-card');
    const featuredReadBtn = document.querySelector('.read-featured');
    
    // Article card clicks
    articleCards.forEach(card => {
        card.addEventListener('click', function() {
            const articleData = extractArticleData(this);
            openArticleModal(articleData);
        });
        
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-5px) scale(1)';
        });
    });
    
    // Featured article read button
    if (featuredReadBtn) {
        featuredReadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const featuredData = extractFeaturedArticleData();
            openArticleModal(featuredData);
        });
    }
}

// Extract Article Data
function extractArticleData(articleCard) {
    const title = articleCard.querySelector('h3').textContent;
    const category = articleCard.querySelector('.category').textContent;
    const date = articleCard.querySelector('.date').textContent;
    const readTime = articleCard.querySelector('.read-time').textContent;
    const excerpt = articleCard.querySelector('p').textContent;
    const authorName = articleCard.querySelector('.author-name').textContent;
    const authorImage = articleCard.querySelector('.article-author img').src;
    const image = articleCard.querySelector('.article-image img').src;
    
    return {
        title,
        category,
        date,
        readTime,
        excerpt,
        authorName,
        authorImage,
        image,
        content: generateArticleContent(title, category)
    };
}

// Extract Featured Article Data
function extractFeaturedArticleData() {
    const title = document.querySelector('.featured-text h2').textContent;
    const category = document.querySelector('.featured-text .category').textContent;
    const date = document.querySelector('.featured-text .date').textContent;
    const readTime = document.querySelector('.featured-text .read-time').textContent;
    const excerpt = document.querySelector('.article-excerpt p').textContent;
    const authorName = document.querySelector('.featured-text .author-name').textContent;
    const authorTitle = document.querySelector('.featured-text .author-title').textContent;
    const authorImage = document.querySelector('.featured-text .article-author img').src;
    const image = document.querySelector('.featured-image img').src;
    
    return {
        title,
        category,
        date,
        readTime,
        excerpt,
        authorName,
        authorTitle,
        authorImage,
        image,
        content: generateArticleContent(title, category)
    };
}

// Generate Article Content
function generateArticleContent(title, category) {
    const contentTemplates = {
        'Sustainability': `
            <h2>The Environmental Impact of Fashion</h2>
            <p>The fashion industry is one of the most polluting industries in the world, responsible for 10% of global carbon emissions and nearly 20% of wastewater. Fast fashion, with its rapid production cycles and disposable mindset, has exacerbated this problem over the past two decades.</p>
            
            <blockquote>"Sustainable fashion is not just about the environment; it's about creating a system that works for everyone involved in the supply chain."</blockquote>
            
            <h3>Water Consumption</h3>
            <p>It takes approximately 2,700 liters of water to produce one cotton t-shirt – enough water for one person to drink for 900 days. This staggering statistic highlights the urgent need for more sustainable practices in textile production.</p>
            
            <h3>Chemical Pollution</h3>
            <p>Conventional cotton farming uses 16% of the world's insecticides and 7% of pesticides. These chemicals not only harm the environment but also pose serious health risks to farmers and their communities.</p>
            
            <h3>The Solution: Organic and Sustainable Materials</h3>
            <p>Organic cotton uses 88% less water and 62% less energy than conventional cotton. Materials like linen, hemp, and recycled fibers offer even more sustainable alternatives with minimal environmental impact.</p>
            
            <h2>What Can Consumers Do?</h2>
            <p>As consumers, we have the power to drive change through our purchasing decisions. Choosing sustainable brands, buying less but better quality, and caring for our clothes properly can significantly reduce our fashion footprint.</p>
            
            <p>The future of fashion lies in circular economy models, where clothes are designed to be reused, recycled, or composted at the end of their life. This shift requires collaboration between brands, consumers, and policymakers to create a truly sustainable fashion industry.</p>
        `,
        'Styling Guides': `
            <h2>Building Your Sustainable Wardrobe</h2>
            <p>Creating a sustainable wardrobe is about more than just buying eco-friendly clothes – it's about developing a mindset of conscious consumption and timeless style. A well-curated wardrobe not only reduces your environmental impact but also saves time and reduces decision fatigue.</p>
            
            <h3>The 30-Wear Rule</h3>
            <p>Before making any purchase, ask yourself: "Will I wear this at least 30 times?" This simple question helps eliminate impulse buys and ensures every piece in your wardrobe has purpose and longevity.</p>
            
            <h3>Investment Pieces vs. Trend Items</h3>
            <blockquote>Quality over quantity should be your mantra when building a sustainable wardrobe.</blockquote>
            
            <p>Investment pieces are timeless, well-made items that will last for years. These include classic coats, quality denim, versatile dresses, and comfortable shoes. Trend items, while fun, should be purchased sparingly and preferably from sustainable sources or second-hand.</p>
            
            <h3>Color Coordination</h3>
            <p>Choose a color palette that works for your lifestyle and skin tone. A cohesive color palette makes mixing and matching easier, maximizing the number of outfits you can create with fewer pieces.</p>
            
            <h3>Care and Maintenance</h3>
            <p>Proper care can extend the life of your clothes significantly. Wash clothes in cold water, air dry when possible, and learn basic mending skills. Store clothes properly to prevent damage, and rotate your wardrobe to ensure even wear.</p>
            
            <h2>Seasonal Transition Tips</h2>
            <p>Mastering seasonal transitions allows you to wear your favorite pieces year-round. Layering is key – lightweight pieces can be worn under heavier items in winter, while summer pieces can be adapted for cooler weather with the right accessories.</p>
            
            <p>Remember, sustainable fashion is a journey, not a destination. Start small, be mindful of your choices, and celebrate the progress you make toward a more conscious wardrobe.</p>
        `,
        'Artisan Stories': `
            <h2>The Hands Behind Your Clothes</h2>
            <p>Behind every piece of sustainable fashion are skilled artisans who have honed their craft over generations. These craftspeople are the heart of the slow fashion movement, preserving traditional techniques while creating beautiful, meaningful pieces.</p>
            
            <h3>The Portuguese Weavers</h3>
            <p>In the northern regions of Portugal, families have been weaving textiles for centuries using traditional wooden looms. These artisans create fabrics of exceptional quality that modern machines cannot replicate. Each piece tells a story of heritage, skill, and dedication.</p>
            
            <blockquote>When you buy handmade, you're not just buying a product – you're supporting a legacy.</blockquote>
            
            <h3>Indian Cotton Farmers</h3>
            <p>Organic cotton farming in India is more than just agriculture – it's a way of life that respects nature and community. These farmers use traditional methods that have been passed down through generations, avoiding harmful pesticides and chemicals that damage both the environment and human health.</p>
            
            <h3>Malian Natural Dyers</h3>
            <p>In Mali, master dyers create vibrant colors using only natural materials. Indigo leaves, madder root, and various barks and flowers produce a stunning palette that synthetic dyes cannot match. The process is time-consuming and requires immense skill, but the results are extraordinary.</p>
            
            <h3>The Impact of Your Purchase</h3>
            <p>When you choose artisan-made products, you're supporting fair wages, preserving cultural heritage, and promoting sustainable practices. You're investing in quality that lasts and in the people who create your clothes.</p>
            
            <h2>Connecting with Artisans</h2>
            <p>Many sustainable brands now offer transparency about their artisan partnerships. Some even facilitate direct connections between consumers and makers, creating a deeper understanding and appreciation for the craft behind your clothes.</p>
            
            <p>Remember that every handmade piece carries the energy, skill, and story of its maker. By choosing artisan fashion, you become part of a global community that values craftsmanship, sustainability, and human connection.</p>
        `,
        'Industry News': `
            <h2>The Changing Face of Fashion</h2>
            <p>The fashion industry is undergoing a transformation unlike anything we've seen before. Driven by consumer demand for transparency and sustainability, brands are reimagining everything from sourcing to production to end-of-life solutions.</p>
            
            <h3>Sustainable Fashion Week</h3>
            <p>Fashion weeks around the world are embracing sustainability as the new luxury. From carbon-neutral shows to models wearing upcycled and vintage pieces, the industry is showcasing that sustainability and high fashion can go hand in hand.</p>
            
            <blockquote>The future of fashion is circular, transparent, and conscious.</blockquote>
            
            <h3>Technology and Innovation</h3>
            <p>New technologies are revolutionizing sustainable fashion. Lab-grown leather, recycled fabric innovations, and waterless dyeing processes are making it easier for brands to reduce their environmental impact without compromising on style or quality.</p>
            
            <h3>Policy and Regulation</h3>
            <p>Governments worldwide are introducing regulations to make fashion more sustainable. From extended producer responsibility laws to greenwashing regulations, policymakers are creating frameworks that hold brands accountable for their environmental and social impacts.</p>
            
            <h3>The Rise of Resale</h3>
            <p>The secondhand market is growing rapidly, with projections showing it will be twice the size of fast fashion by 2030. This shift toward circular fashion is changing how we think about clothing ownership and value.</p>
            
            <h2>What's Next?</h2>
            <p>The future of fashion lies in collaboration between brands, consumers, innovators, and policymakers. As technology advances and consumer awareness grows, we're moving toward a more sustainable, equitable, and beautiful fashion industry.</p>
            
            <p>Stay informed, support sustainable brands, and remember that every purchase is a vote for the kind of fashion industry you want to see in the world.</p>
        `,
        'Lifestyle': `
            <h2>Beyond Fashion: Sustainable Living</h2>
            <p>Sustainable fashion is just one piece of the larger puzzle of conscious living. When we embrace sustainability in our wardrobe, it often inspires us to examine other areas of our lives and make more mindful choices.</p>
            
            <h3>The Mindset of Enough</h3>
            <p>At its core, sustainable living is about recognizing when we have enough. This mindset shift from scarcity to abundance, from always wanting more to appreciating what we have, is transformative for both our wellbeing and the planet.</p>
            
            <blockquote>Simplicity is the ultimate sophistication.</blockquote>
            
            <h3>Mindful Consumption</h3>
            <p>Beyond clothing, mindful consumption extends to everything we buy and use. Choosing quality over quantity, supporting local businesses, and considering the lifecycle of products are all ways to reduce our environmental impact.</p>
            
            <h3>The Joy of Less</h3>
            <p>Many people discover that having fewer possessions actually brings more joy. Less stuff means less maintenance, less stress, and more time and energy for what truly matters – relationships, experiences, and personal growth.</p>
            
            <h3>Connecting with Nature</h3>
            <p>Sustainable living often deepens our connection to the natural world. When we understand the impact of our choices on the environment, we develop a greater appreciation for the beauty and fragility of our planet.</p>
            
            <h2>Practical Tips for Sustainable Living</h2>
            <p>Start small and build momentum. Choose one area to focus on – whether it's reducing single-use plastics, composting, or supporting local farmers. Small changes, when consistent, lead to significant impact over time.</p>
            
            <p>Remember that sustainable living isn't about perfection. It's about progress, intention, and making the best choices we can with the resources and knowledge we have. Every conscious choice, no matter how small, contributes to a more sustainable future.</p>
        `
    };
    
    // Default content if category not found
    const defaultContent = `
        <h2>${title}</h2>
        <p>This article explores the fascinating world of sustainable fashion and its impact on our planet and communities. Through thoughtful analysis and inspiring stories, we discover how conscious choices in clothing can create positive change.</p>
        
        <h3>The Journey Toward Sustainability</h3>
        <p>The path to sustainable fashion is both personal and collective. It involves reimagining our relationship with clothing, understanding the impact of our choices, and embracing alternatives that honor both people and planet.</p>
        
        <blockquote>Every sustainable choice is a vote for the future we want to create.</blockquote>
        
        <h3>Looking Forward</h3>
        <p>As we continue to learn and grow in our understanding of sustainable fashion, we become part of a global movement that's transforming the industry. Together, we're creating a fashion system that's not only beautiful but also just, equitable, and environmentally responsible.</p>
        
        <p>Thank you for joining us on this journey toward a more sustainable future, one conscious choice at a time.</p>
    `;
    
    return contentTemplates[category] || defaultContent;
}

// Article Modal
function initArticleModal() {
    const modal = document.getElementById('article-modal');
    const closeBtn = modal.querySelector('.modal-close');
    
    closeBtn.addEventListener('click', closeArticleModal);
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeArticleModal();
        }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeArticleModal();
        }
    });
}

// Open Article Modal
function openArticleModal(articleData) {
    const modal = document.getElementById('article-modal');
    
    // Update modal content
    document.getElementById('modal-category').textContent = articleData.category;
    document.getElementById('modal-date').textContent = articleData.date;
    document.getElementById('modal-read-time').textContent = articleData.readTime;
    document.getElementById('modal-title').textContent = articleData.title;
    document.getElementById('modal-author-name').textContent = articleData.authorName;
    document.getElementById('modal-author-image').src = articleData.authorImage;
    document.getElementById('modal-hero-image').src = articleData.image;
    document.getElementById('modal-content').innerHTML = articleData.content;
    
    // Add author title if available
    if (articleData.authorTitle) {
        const authorTitleElement = document.getElementById('modal-author-title');
        if (authorTitleElement) {
            authorTitleElement.textContent = articleData.authorTitle;
            authorTitleElement.style.display = 'block';
        }
    }
    
    // Show modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Scroll to top of modal
    modal.scrollTop = 0;
    
    // Initialize article actions
    initArticleActions();
}

// Close Article Modal
function closeArticleModal() {
    const modal = document.getElementById('article-modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Article Actions
function initArticleActions() {
    const shareBtn = document.querySelector('.share-article');
    const bookmarkBtn = document.querySelector('.bookmark-article');
    
    if (shareBtn) {
        shareBtn.onclick = function() {
            shareArticle();
        };
    }
    
    if (bookmarkBtn) {
        bookmarkBtn.onclick = function() {
            toggleBookmark(this);
        };
    }
}

// Share Article
function shareArticle() {
    const title = document.getElementById('modal-title').textContent;
    const url = window.location.href;
    const shareText = `Read "${title}" on EcoLux Fashion Journal - inspiring stories about sustainable fashion and conscious living.`;
    
    if (navigator.share) {
        navigator.share({
            title: title,
            text: shareText,
            url: url
        });
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(`${shareText} ${url}`).then(() => {
            window.EcoLux.showSuccessToast('Article link copied to clipboard!');
        });
    }
}

// Toggle Bookmark
function toggleBookmark(button) {
    button.classList.toggle('bookmarked');
    
    if (button.classList.contains('bookmarked')) {
        button.textContent = 'Bookmarked ✓';
        button.style.backgroundColor = '#27ae60';
        window.EcoLux.showSuccessToast('Article bookmarked!');
    } else {
        button.textContent = 'Bookmark';
        button.style.backgroundColor = '';
        window.EcoLux.showSuccessToast('Bookmark removed');
    }
}

// Newsletter Form
function initNewsletterForm() {
    const form = document.querySelector('.newsletter-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            
            if (email) {
                // Show loading state
                const button = this.querySelector('button');
                const originalText = button.textContent;
                button.textContent = 'Subscribing...';
                button.disabled = true;
                
                // Simulate subscription
                setTimeout(() => {
                    button.textContent = 'Subscribed ✓';
                    button.style.backgroundColor = '#27ae60';
                    
                    window.EcoLux.showSuccessToast('Successfully subscribed to newsletter!');
                    
                    // Reset form
                    this.reset();
                    
                    // Reset button after 3 seconds
                    setTimeout(() => {
                        button.textContent = originalText;
                        button.disabled = false;
                        button.style.backgroundColor = '';
                    }, 3000);
                }, 1500);
            }
        });
    }
}

// Load More Articles
function initLoadMore() {
    const loadMoreBtn = document.querySelector('.load-more');
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            loadMoreArticles();
        });
    }
}

// Load More Articles
function loadMoreArticles() {
    const button = document.querySelector('.load-more');
    const container = document.querySelector('.articles-container');
    
    // Show loading state
    button.textContent = 'Loading...';
    button.disabled = true;
    
    // Simulate loading more articles
    setTimeout(() => {
        const newArticles = generateMockArticles(3);
        
        newArticles.forEach((article, index) => {
            const articleElement = createArticleElement(article);
            articleElement.style.opacity = '0';
            articleElement.style.transform = 'translateY(20px)';
            
            container.appendChild(articleElement);
            
            // Animate in
            setTimeout(() => {
                articleElement.style.opacity = '1';
                articleElement.style.transform = 'translateY(0)';
            }, 100 * index);
        });
        
        // Reset button
        button.textContent = 'Load More Articles';
        button.disabled = false;
        
        // Reinitialize article interactions for new articles
        initNewArticleInteractions();
        
        window.EcoLux.showSuccessToast('3 more articles loaded!');
    }, 1000);
}

// Generate Mock Articles
function generateMockArticles(count) {
    const titles = [
        'The Hidden Cost of Fast Fashion',
        'How to Build a Zero-Waste Wardrobe',
        'Meet the Change Makers in Sustainable Fashion',
        'The Psychology of Consumer Behavior',
        'Sustainable Fashion on a Budget',
        'The Future of Textile Innovation'
    ];
    
    const categories = ['sustainability', 'styling', 'industry', 'lifestyle', 'artisan'];
    
    const articles = [];
    for (let i = 0; i < count; i++) {
        articles.push({
            title: titles[i % titles.length],
            category: categories[i % categories.length],
            date: 'February ' + (28 - i) + ', 2024',
            readTime: (Math.floor(Math.random() * 5) + 3) + ' min read',
            excerpt: 'Discover the latest insights and trends in sustainable fashion that are shaping the industry.',
            authorName: 'Guest Writer',
            image: `assets/article-${(i + 7) % 6 + 1}.jpg`
        });
    }
    
    return articles;
}

// Create Article Element
function createArticleElement(article) {
    const articleDiv = document.createElement('article');
    articleDiv.className = 'article-card';
    articleDiv.dataset.category = article.category;
    
    articleDiv.innerHTML = `
        <div class="article-image">
            <img src="${article.image}" alt="${article.title}">
            <div class="article-overlay">
                <span class="read-time">${article.readTime}</span>
            </div>
        </div>
        <div class="article-content">
            <div class="article-meta">
                <span class="category">${article.category.charAt(0).toUpperCase() + article.category.slice(1)}</span>
                <span class="date">${article.date}</span>
            </div>
            <h3>${article.title}</h3>
            <p>${article.excerpt}</p>
            <div class="article-author">
                <img src="assets/author-default.jpg" alt="Author">
                <span class="author-name">${article.authorName}</span>
            </div>
        </div>
    `;
    
    articleDiv.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';
    
    return articleDiv;
}

// Initialize New Article Interactions
function initNewArticleInteractions() {
    const newArticles = document.querySelectorAll('.article-card:not(.initialized)');
    
    newArticles.forEach(card => {
        card.classList.add('initialized');
        
        card.addEventListener('click', function() {
            const articleData = extractArticleData(this);
            openArticleModal(articleData);
        });
        
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-5px) scale(1)';
        });
    });
}

// Update Load More Button
function updateLoadMoreButton(category) {
    const button = document.querySelector('.load-more');
    const visibleArticles = document.querySelectorAll('.article-card:not([style*="display: none"])');
    
    // Hide load more if all articles are shown or if category is specific
    if (category !== 'all' || visibleArticles.length >= 9) {
        button.style.display = 'none';
    } else {
        button.style.display = 'inline-block';
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
    document.querySelectorAll('.article-card, .featured-content').forEach(element => {
        element.classList.add('scroll-reveal');
        observer.observe(element);
    });
}

// Export functions
window.EcoLuxJournal = {
    filterArticles,
    openArticleModal,
    shareArticle,
    loadMoreArticles
};
