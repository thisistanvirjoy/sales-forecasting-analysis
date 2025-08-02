// Dashboard Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize dashboard animations and interactions
    initializeAnimations();
    initializeInteractions();
    initializeScrollEffects();
    
    // Initialize metric counters with animation
    animateCounters();
});

// Animate metric counters on page load
function animateCounters() {
    const metricValues = document.querySelectorAll('.metric-value');
    
    metricValues.forEach(element => {
        const text = element.textContent;
        const hasNumber = text.match(/[\d,]+/);
        
        if (hasNumber) {
            const numericValue = parseFloat(hasNumber[0].replace(/,/g, ''));
            const isPercentage = text.includes('%');
            const isDollar = text.includes('$');
            const hasParentheses = text.includes('(');
            
            if (!isNaN(numericValue)) {
                animateValue(element, 0, numericValue, 1500, isDollar, isPercentage, hasParentheses, text);
            }
        }
    });
}

// Animate individual counter values
function animateValue(element, start, end, duration, isDollar, isPercentage, hasParentheses, originalText) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const currentValue = Math.floor(progress * (end - start) + start);
        
        let displayValue = '';
        if (isDollar) {
            displayValue = '$' + currentValue.toLocaleString();
        } else if (isPercentage) {
            displayValue = currentValue.toFixed(2) + '%';
        } else {
            displayValue = currentValue.toLocaleString();
        }
        
        // Handle special cases like orders with percentages
        if (hasParentheses && originalText.includes('(')) {
            const percentage = originalText.match(/\(([^)]+)\)/);
            if (percentage) {
                displayValue += ' ' + percentage[0];
            }
        }
        
        element.textContent = displayValue;
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Initialize scroll-based animations
function initializeScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe all analysis sections
    const sections = document.querySelectorAll('.analysis-section, .summary-section');
    sections.forEach(section => {
        section.classList.add('animate-ready');
        observer.observe(section);
    });
    
    // Add CSS for animations
    addScrollAnimationCSS();
}

// Add CSS for scroll animations
function addScrollAnimationCSS() {
    const style = document.createElement('style');
    style.textContent = `
        .animate-ready {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        
        .animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .metric-card {
            animation: fadeInUp 0.6s ease-out forwards;
        }
        
        .metric-card:nth-child(1) { animation-delay: 0.1s; }
        .metric-card:nth-child(2) { animation-delay: 0.2s; }
        .metric-card:nth-child(3) { animation-delay: 0.3s; }
        .metric-card:nth-child(4) { animation-delay: 0.4s; }
        .metric-card:nth-child(5) { animation-delay: 0.5s; }
        .metric-card:nth-child(6) { animation-delay: 0.6s; }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .chart-image {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .chart-image:hover {
            transform: scale(1.02);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }
    `;
    document.head.appendChild(style);
}

// Initialize general animations
function initializeAnimations() {
    // Add loading animation to chart images
    const chartImages = document.querySelectorAll('.chart-image');
    chartImages.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '0';
            this.style.transform = 'scale(0.95)';
            this.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            
            setTimeout(() => {
                this.style.opacity = '1';
                this.style.transform = 'scale(1)';
            }, 100);
        });
    });
}

// Initialize interactive features
function initializeInteractions() {
    // Add click handlers for metric cards
    const metricCards = document.querySelectorAll('.metric-card');
    metricCards.forEach(card => {
        card.addEventListener('click', function() {
            this.classList.add('clicked');
            setTimeout(() => {
                this.classList.remove('clicked');
            }, 200);
        });
    });
    
    // Add hover effects for region cards
    const regionCards = document.querySelectorAll('.region-card');
    regionCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
            this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
        });
    });
    
    // Add interactive effects for insight items
    const insightItems = document.querySelectorAll('.insight-item');
    insightItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(5deg)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
    
    // Add CSS for click effects
    addInteractionCSS();
}

// Add CSS for interactions
function addInteractionCSS() {
    const style = document.createElement('style');
    style.textContent = `
        .metric-card.clicked {
            transform: translateY(-2px) scale(0.98);
            transition: transform 0.1s ease;
        }
        
        .performance-table tr {
            transition: background-color 0.3s ease;
        }
        
        .performance-table tr:hover {
            background-color: var(--color-bg-1) !important;
        }
        
        .subcategory-item {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .subcategory-item:hover {
            transform: translateX(5px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        
        .discount-item {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .discount-item:hover {
            transform: translateY(-3px);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
        }
        
        .segment-item {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .segment-item:hover {
            transform: translateX(3px);
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }
    `;
    document.head.appendChild(style);
}

// Smooth scrolling for any internal links (if added in future)
function initializeSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Add loading state management
function showLoadingState() {
    const chartContainers = document.querySelectorAll('.chart-container');
    chartContainers.forEach(container => {
        const img = container.querySelector('.chart-image');
        if (img && !img.complete) {
            container.classList.add('loading');
            
            img.addEventListener('load', function() {
                container.classList.remove('loading');
            });
            
            img.addEventListener('error', function() {
                container.classList.remove('loading');
                container.classList.add('error');
            });
        }
    });
}

// Initialize data refresh functionality (placeholder for future enhancement)
function initializeDataRefresh() {
    // This function can be expanded to handle real-time data updates
    // For now, it's a placeholder for future enhancements
}

// Utility function to format numbers consistently
function formatNumber(number, type = 'default') {
    switch(type) {
        case 'currency':
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
            }).format(number);
        case 'percentage':
            return new Intl.NumberFormat('en-US', {
                style: 'percent',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }).format(number / 100);
        default:
            return new Intl.NumberFormat('en-US').format(number);
    }
}

// Error handling for images
document.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
        const container = e.target.closest('.chart-container');
        if (container) {
            container.innerHTML = `
                <div style="text-align: center; padding: 40px; color: var(--color-text-secondary);">
                    <i class="fas fa-chart-bar" style="font-size: 48px; margin-bottom: 16px; opacity: 0.5;"></i>
                    <p>Chart visualization unavailable</p>
                    <p style="font-size: 12px;">Please check your connection and refresh the page</p>
                </div>
            `;
        }
    }
}, true);

// Performance optimization: Lazy load images
function initializeLazyLoading() {
    const images = document.querySelectorAll('.chart-image');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.src; // Trigger actual loading
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// Initialize all features when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    showLoadingState();
    initializeLazyLoading();
    initializeSmoothScrolling();
    initializeDataRefresh();
});