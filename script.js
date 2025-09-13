// Mark that main script loaded
window.portfolioLoaded = true;

// Simplified Matrix Rain Effect
class SimpleMatrixRain {
    constructor() {
        this.canvas = document.getElementById('matrix-canvas');
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.characters = '01ABCDEF';
        this.fontSize = 14;
        this.columns = 0;
        this.drops = [];
        
        this.init();
    }
    
    init() {
        try {
            this.resize();
            this.animate();
            window.addEventListener('resize', () => this.resize());
        } catch (e) {
            console.warn('Matrix animation failed:', e);
        }
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.columns = Math.floor(this.canvas.width / this.fontSize);
        
        this.drops = [];
        for (let i = 0; i < this.columns; i++) {
            this.drops[i] = Math.random() * -100;
        }
    }
    
    animate() {
        try {
            this.ctx.fillStyle = 'rgba(10, 14, 39, 0.1)';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            
            this.ctx.fillStyle = '#00ff41';
            this.ctx.font = `${this.fontSize}px monospace`;
            
            for (let i = 0; i < this.drops.length; i++) {
                const char = this.characters.charAt(Math.floor(Math.random() * this.characters.length));
                const x = i * this.fontSize;
                const y = this.drops[i] * this.fontSize;
                
                this.ctx.fillText(char, x, y);
                
                if (y > this.canvas.height && Math.random() > 0.975) {
                    this.drops[i] = 0;
                }
                
                this.drops[i]++;
            }
            
            requestAnimationFrame(() => this.animate());
        } catch (e) {
            console.warn('Matrix animation error:', e);
        }
    }
}

// Simple Navigation
class SimpleNavigation {
    constructor() {
        this.init();
    }
    
    init() {
        try {
            // Smooth scrolling
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', (e) => {
                    e.preventDefault();
                    const target = document.querySelector(anchor.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth' });
                    }
                });
            });

            // Mobile menu toggle
            const hamburger = document.querySelector('.hamburger');
            const navMenu = document.querySelector('.nav-menu');
            
            if (hamburger && navMenu) {
                hamburger.addEventListener('click', () => {
                    hamburger.classList.toggle('active');
                    navMenu.classList.toggle('active');
                });
            }

            // Active link highlighting
            window.addEventListener('scroll', () => this.updateActiveLink());
            
        } catch (e) {
            console.warn('Navigation error:', e);
        }
    }
    
    updateActiveLink() {
        try {
            const sections = document.querySelectorAll('section');
            const scrollPos = window.scrollY + 100;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
                    const activeLink = document.querySelector(`a[href="#${sectionId}"]`);
                    if (activeLink) activeLink.classList.add('active');
                }
            });
        } catch (e) {
            console.warn('Active link update error:', e);
        }
    }
}

// Simple Typing Animation
class SimpleTyping {
    constructor() {
        this.element = document.querySelector('.typing-text');
        this.texts = ['$ whoami', '$ ls -la', '$ nmap -sS', '$ grep -r', '$ sudo su'];
        this.currentIndex = 0;
        this.init();
    }
    
    init() {
        if (!this.element) return;
        
        try {
            this.type();
        } catch (e) {
            console.warn('Typing animation error:', e);
        }
    }
    
    type() {
        try {
            const text = this.texts[this.currentIndex];
            this.element.textContent = text;
            
            setTimeout(() => {
                this.currentIndex = (this.currentIndex + 1) % this.texts.length;
                this.type();
            }, 3000);
        } catch (e) {
            console.warn('Typing error:', e);
        }
    }
}

// Simple Counter Animation
class SimpleCounter {
    constructor() {
        this.init();
    }
    
    init() {
        try {
            const counters = document.querySelectorAll('.stat-number');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.animateCounter(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            counters.forEach(counter => observer.observe(counter));
        } catch (e) {
            console.warn('Counter animation error:', e);
            // Fallback: just set the numbers
            document.querySelectorAll('.stat-number').forEach(counter => {
                counter.textContent = counter.dataset.target;
            });
        }
    }
    
    animateCounter(element) {
        try {
            const target = parseInt(element.dataset.target);
            const duration = 2000;
            const step = target / (duration / 50);
            let current = 0;
            
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    element.textContent = target;
                    clearInterval(timer);
                } else {
                    element.textContent = Math.floor(current);
                }
            }, 50);
        } catch (e) {
            console.warn('Counter animate error:', e);
            element.textContent = element.dataset.target;
        }
    }
}

// Simple Scroll Animations
class SimpleScrollAnimations {
    constructor() {
        this.init();
    }
    
    init() {
        try {
            const elements = document.querySelectorAll('.timeline-item, .cert-card, .project-card, .skill-category-card');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, { threshold: 0.1 });
            
            elements.forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(el);
            });
        } catch (e) {
            console.warn('Scroll animations error:', e);
        }
    }
}

// Simple Dashboard Animation
class SimpleDashboard {
    constructor() {
        this.init();
    }
    
    init() {
        try {
            const metrics = document.querySelectorAll('.metric-value');
            
            setInterval(() => {
                metrics.forEach(metric => {
                    if (metric.textContent.includes('%')) {
                        const currentValue = parseFloat(metric.textContent);
                        const variation = (Math.random() - 0.5) * 1; // Small variation
                        const newValue = Math.max(90, Math.min(100, currentValue + variation));
                        metric.textContent = newValue.toFixed(1) + '%';
                    }
                });
            }, 5000);
        } catch (e) {
            console.warn('Dashboard animation error:', e);
        }
    }
}

// Error Handler
function handleError(error, context = '') {
    console.warn(`Error in ${context}:`, error);
    // Don't let errors break the entire site
}

// Initialize everything safely
document.addEventListener('DOMContentLoaded', function() {
    try {
        console.log('🔒 Initializing Ashish Goraniya Portfolio...');
        
        // Initialize components with error handling
        setTimeout(() => {
            try { new SimpleMatrixRain(); } catch (e) { handleError(e, 'MatrixRain'); }
        }, 100);
        
        try { new SimpleNavigation(); } catch (e) { handleError(e, 'Navigation'); }
        
        setTimeout(() => {
            try { new SimpleTyping(); } catch (e) { handleError(e, 'Typing'); }
        }, 500);
        
        setTimeout(() => {
            try { new SimpleCounter(); } catch (e) { handleError(e, 'Counter'); }
        }, 1000);
        
        setTimeout(() => {
            try { new SimpleScrollAnimations(); } catch (e) { handleError(e, 'ScrollAnimations'); }
        }, 1500);
        
        setTimeout(() => {
            try { new SimpleDashboard(); } catch (e) { handleError(e, 'Dashboard'); }
        }, 2000);
        
        console.log('🚀 Portfolio initialized successfully!');
        
    } catch (e) {
        console.warn('Initialization error:', e);
        console.log('🔄 Portfolio loaded with basic functionality');
    }
});

// Backup initialization
window.addEventListener('load', function() {
    setTimeout(() => {
        if (!document.querySelector('.stat-number[data-animated]')) {
            // Fallback counter animation
            document.querySelectorAll('.stat-number').forEach(counter => {
                counter.textContent = counter.dataset.target;
                counter.setAttribute('data-animated', 'true');
            });
        }
    }, 3000);
});

console.log('✅ Script.js loaded successfully!');