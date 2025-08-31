/**
 * Get Dev - Dark Retro Cartoon Theme JavaScript
 * Interactive elements and animations
 */

// Initialize all interactive elements when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log(`
 ██████╗ ███████╗████████╗    ██████╗ ███████╗██╗   ██╗
██╔════╝ ██╔════╝╚══██╔══╝    ██╔══██╗██╔════╝██║   ██║
██║  ███╗█████╗     ██║       ██║  ██║█████╗  ██║   ██║
██║   ██║██╔══╝     ██║       ██║  ██║██╔══╝  ╚██╗ ██╔╝
╚██████╔╝███████╗   ██║       ██████╔╝███████╗ ╚████╔╝ 
 ╚═════╝ ╚══════╝   ╚═╝       ╚═════╝ ╚══════╝  ╚═══╝  

Welcome to Get Dev - AI-Powered Development Agency!
🚀 Built with cutting-edge technology and retro style
💻 Enhanced with smooth animations and responsive design
`, 'color: #00ffff; font-family: monospace; font-weight: bold;', 'color: #ff00ff; font-family: monospace; font-size: 14px;');

    const startTime = performance.now();

    initializeNavigation();
    initializeInteractiveElements();
    initializeParticles();
    initializeFormHandling();
    initializeScrollAnimations();

    const endTime = performance.now();
    console.log(`%c⚡ Site loaded in ${Math.round(endTime - startTime)}ms`, 'color: #00ff00; font-weight: bold;');
});

function initializeNavigation() {
    // Mobile menu toggle
    const navToggler = document.querySelector('.navbar-toggler');
    const navCollapse = document.querySelector('.navbar-collapse');

    if (navToggler && navCollapse) {
        navToggler.addEventListener('click', function() {
            navCollapse.classList.toggle('show');
        });
    }

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

function initializeInteractiveElements() {
    // Typing animation for hero text
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        const originalText = 'GET DEV';
        const speed = 150;
        let i = 0;

        typingElement.textContent = '';

        function typeWriter() {
            if (i < originalText.length) {
                typingElement.textContent += originalText.charAt(i);
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
}

function animateCounter(element) {
    if (element.dataset.animated) return;
    element.dataset.animated = 'true';

    const text = element.textContent;
    const number = parseInt(text.replace(/[^\d]/g, '')) || 0;
    const suffix = text.replace(/[\d]/g, '');
    const duration = 2000;
    const step = number / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += step;
        if (current >= number) {
            current = number;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + suffix;
    }, 16);
}

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

            ctx.globalAlpha = particle.opacity;
            ctx.fillStyle = particle.color;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();
        });

        requestAnimationFrame(animateParticles);
    }

    resizeCanvas();
    for (let i = 0; i < particleCount; i++) {
        particles.push(createParticle());
    }
    animateParticles();

    window.addEventListener('resize', resizeCanvas);
}

function initializeFormHandling() {
    // Newsletter form animation
    const newsletterForms = document.querySelectorAll('.newsletter-form, .newsletter-quick-form');

    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn) {
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
                submitBtn.disabled = true;

                // Re-enable button after submission (whether success or failure)
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 3000);
            }
        });
    });

    // Contact form enhancement
    const contactForm = document.querySelector('#contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            if (submitBtn) {
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;

                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 3000);
            }
        });
    }
}

function initializeScrollAnimations() {
    // Scroll-triggered animations
    const animatedElements = document.querySelectorAll('.service-card, .benefit-card, .feature-card, .testimonial-card, .tech-card');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroCharacter = document.querySelector('.hero-character');
        if (heroCharacter) {
            heroCharacter.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });
}

// Utility functions
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Performance monitoring
function logPerformance() {
    if (window.performance && window.performance.timing) {
        const timing = window.performance.timing;
        const loadTime = timing.loadEventEnd - timing.navigationStart;
        console.log(`%c⚡ Page load time: ${loadTime}ms`, 'color: #00ff00; font-weight: bold;');
    }
}

// Call performance monitoring after page load
window.addEventListener('load', logPerformance);

// Add Easter egg
const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
let konamiIndex = 0;

document.addEventListener('keydown', function(e) {
    if (e.keyCode === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            document.body.style.filter = 'hue-rotate(180deg)';
            setTimeout(() => {
                document.body.style.filter = 'none';
            }, 3000);
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});