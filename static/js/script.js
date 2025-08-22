/**
 * Get Dev - Dark Retro Cartoon Theme JavaScript
 * Interactive elements and animations
 */

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeScrollEffects();
    initializeInteractiveElements();
    initializeFormHandling();
    initializeNavigation();
});

// Initialize scroll-triggered animations
function initializeAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                // Add stagger effect for children
                const children = entry.target.querySelectorAll('.service-card, .benefit-card, .feature-card, .process-step');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });
    }, observerOptions);

    // Observe sections for animations
    const sections = document.querySelectorAll('section, .hero-section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Initialize card hover animations
    const cards = document.querySelectorAll('.service-card, .benefit-card, .feature-card, .portfolio-card');
    cards.forEach(card => {
        // Set initial state for animation
        card.style.transform = 'translateY(20px)';
        card.style.opacity = '0';
        card.style.transition = 'all 0.6s ease';
    });
}

// Scroll effects and navbar behavior
function initializeScrollEffects() {
    let lastScrollTop = 0;
    const navbar = document.querySelector('.retro-nav');
    const heroSection = document.querySelector('.hero-section');

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Navbar scroll behavior
        if (navbar) {
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                // Scrolling down
                navbar.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up
                navbar.style.transform = 'translateY(0)';
            }
            
            // Add background opacity based on scroll
            const opacity = Math.min(scrollTop / 200, 0.95);
            navbar.style.background = `rgba(26, 26, 46, ${opacity})`;
        }
        
        // Parallax effect for hero section
        if (heroSection) {
            const parallaxSpeed = 0.5;
            const yPos = scrollTop * parallaxSpeed;
            heroSection.style.transform = `translateY(${yPos}px)`;
        }

        // Update progress indicator
        updateScrollProgress();
        
        lastScrollTop = scrollTop;
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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

// Initialize interactive elements
function initializeInteractiveElements() {
    // Typing animation for hero text
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        const text = typingElement.textContent;
        const speed = 150;
        let i = 0;
        
        typingElement.textContent = '';
        
        function typeWriter() {
            if (i < text.length) {
                typingElement.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, speed);
            } else {
                // Add blinking cursor animation
                typingElement.style.borderRight = '3px solid #00ffff';
                setInterval(() => {
                    typingElement.style.borderRight = 
                        typingElement.style.borderRight === '3px solid #00ffff' 
                        ? '3px solid transparent' 
                        : '3px solid #00ffff';
                }, 1000);
            }
        }
        
        // Start typing animation after page load
        setTimeout(typeWriter, 1000);
    }

    // Interactive stats counter
    const statsElements = document.querySelectorAll('.stat-item h3, .success-stats h3');
    const observerStats = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statsElements.forEach(stat => {
        observerStats.observe(stat);
    });

    // Portfolio filter functionality
    initializePortfolioFilter();

    // Interactive hover effects
    initializeHoverEffects();

    // Glitch effect for special elements
    initializeGlitchEffect();
}

// Counter animation for statistics
function animateCounter(element) {
    const target = parseInt(element.textContent.replace(/[^0-9]/g, ''));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        const suffix = element.textContent.replace(/[0-9]/g, '').replace('+', '');
        element.textContent = Math.floor(current) + suffix;
    }, 16);
}

// Portfolio filtering
function initializePortfolioFilter() {
    const filterButtons = document.querySelectorAll('.btn-filter');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (filterButtons.length === 0) return;

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter items with animation
            portfolioItems.forEach((item, index) => {
                setTimeout(() => {
                    if (filter === 'all' || item.classList.contains(filter)) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1) translateY(0)';
                        }, 50);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8) translateY(20px)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                }, index * 50);
            });
        });
    });
}

// Enhanced hover effects
function initializeHoverEffects() {
    // Service cards tilt effect
    const cards = document.querySelectorAll('.service-card, .benefit-card, .portfolio-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
        });
    });

    // Button ripple effect
    const buttons = document.querySelectorAll('.btn-retro, .btn-outline-retro');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Glitch effect for special elements
function initializeGlitchEffect() {
    const glitchElements = document.querySelectorAll('.brand-text, .ai-link');
    
    glitchElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.animation = 'glitch 0.3s ease-in-out';
        });
        
        element.addEventListener('animationend', function() {
            this.style.animation = '';
        });
    });

    // Add glitch keyframes if not present
    if (!document.querySelector('#glitch-keyframes')) {
        const style = document.createElement('style');
        style.id = 'glitch-keyframes';
        style.textContent = `
            @keyframes glitch {
                0% { transform: translateX(0); }
                20% { transform: translateX(-2px); }
                40% { transform: translateX(2px); }
                60% { transform: translateX(-2px); }
                80% { transform: translateX(2px); }
                100% { transform: translateX(0); }
            }
            .ripple {
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                transform: scale(0);
                animation: ripple-animation 0.6s ease-out;
                pointer-events: none;
            }
            @keyframes ripple-animation {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Form handling and validation
function initializeFormHandling() {
    const contactForm = document.querySelector('.contact-form');
    if (!contactForm) return;

    const inputs = contactForm.querySelectorAll('.retro-input');
    
    // Enhanced input focus effects
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
            this.style.borderColor = '#00ffff';
            this.style.boxShadow = '0 0 20px rgba(0, 255, 255, 0.3)';
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
            this.style.borderColor = '#333333';
            this.style.boxShadow = 'none';
        });

        // Real-time validation
        input.addEventListener('input', function() {
            validateField(this);
        });
    });

    // Form submission with loading animation
    contactForm.addEventListener('submit', function(e) {
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        submitBtn.style.background = 'linear-gradient(45deg, #666, #888)';
        
        // Add timeout to restore button if needed (for demo purposes)
        setTimeout(() => {
            if (submitBtn.disabled) {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
            }
        }, 10000);
    });
}

// Field validation
function validateField(field) {
    const value = field.value.trim();
    const type = field.type;
    let isValid = true;
    
    // Remove previous error styling
    field.style.borderColor = '#333333';
    
    if (field.required && !value) {
        isValid = false;
    } else if (type === 'email' && value && !isValidEmail(value)) {
        isValid = false;
    }
    
    // Apply validation styling
    if (!isValid) {
        field.style.borderColor = '#ff4444';
        field.style.boxShadow = '0 0 10px rgba(255, 68, 68, 0.3)';
    } else if (value) {
        field.style.borderColor = '#00ff00';
        field.style.boxShadow = '0 0 10px rgba(0, 255, 0, 0.2)';
    }
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Navigation enhancements
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.retro-link');
    const currentPage = window.location.pathname;
    
    // Highlight current page in navigation
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.style.borderColor = '#00ffff';
            link.style.boxShadow = 'inset 0 0 20px rgba(0, 255, 255, 0.2)';
        }
    });

    // Mobile menu enhancement
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener('click', function() {
            setTimeout(() => {
                if (navbarCollapse.classList.contains('show')) {
                    navbarCollapse.style.background = 'rgba(26, 26, 46, 0.95)';
                    navbarCollapse.style.borderTop = '2px solid #00ffff';
                }
            }, 100);
        });
    }
}

// Scroll progress indicator
function updateScrollProgress() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    
    // Create progress bar if it doesn't exist
    let progressBar = document.querySelector('.scroll-progress');
    if (!progressBar) {
        progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(45deg, #00ffff, #ff00ff);
            z-index: 9999;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);
    }
    
    progressBar.style.width = scrolled + '%';
}

// Utility functions
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

// Performance optimized scroll handler
const optimizedScrollHandler = debounce(function() {
    updateScrollProgress();
}, 10);

window.addEventListener('scroll', optimizedScrollHandler, { passive: true });

// Initialize particles effect for special sections
function initializeParticles() {
    const heroSection = document.querySelector('.hero-section');
    if (!heroSection) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1';
    heroSection.style.position = 'relative';
    heroSection.appendChild(canvas);

    let particles = [];
    const particleCount = 50;

    function resizeCanvas() {
        canvas.width = heroSection.offsetWidth;
        canvas.height = heroSection.offsetHeight;
    }

    function createParticle() {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 3 + 1,
            speedX: (Math.random() - 0.5) * 2,
            speedY: (Math.random() - 0.5) * 2,
            opacity: Math.random() * 0.5 + 0.2,
            color: Math.random() > 0.5 ? '#00ffff' : '#ff00ff'
        };
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
            
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.globalAlpha = particle.opacity;
            ctx.fill();
        });
        
        requestAnimationFrame(animateParticles);
    }

    // Initialize particles
    resizeCanvas();
    for (let i = 0; i < particleCount; i++) {
        particles.push(createParticle());
    }
    animateParticles();

    window.addEventListener('resize', resizeCanvas);
}

// Initialize particles on load
document.addEventListener('DOMContentLoaded', initializeParticles);

// Easter egg - Konami code
(function() {
    const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    let konamiIndex = 0;

    document.addEventListener('keydown', function(e) {
        if (e.keyCode === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                // Activate special retro mode
                document.body.style.filter = 'contrast(1.5) saturate(2) hue-rotate(45deg)';
                document.body.style.animation = 'glitch 0.5s ease-in-out infinite';
                
                setTimeout(() => {
                    document.body.style.filter = '';
                    document.body.style.animation = '';
                }, 5000);
                
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
})();

// Console greeting
console.log(`
 ██████╗ ███████╗████████╗    ██████╗ ███████╗██╗   ██╗
██╔════╝ ██╔════╝╚══██╔══╝    ██╔══██╗██╔════╝██║   ██║
██║  ███╗█████╗     ██║       ██║  ██║█████╗  ██║   ██║
██║   ██║██╔══╝     ██║       ██║  ██║██╔══╝  ╚██╗ ██╔╝
╚██████╔╝███████╗   ██║       ██████╔╝███████╗ ╚████╔╝ 
 ╚═════╝ ╚══════╝   ╚═╝       ╚═════╝ ╚══════╝  ╚═══╝  

Welcome to Get Dev - AI-Powered Development Agency!
🚀 Built with cutting-edge technology and retro style
`);
