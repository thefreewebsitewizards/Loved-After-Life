// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive components
    initializeNavigation();
    initializeFAQ();
    initializeExperienceTabs();
    initializeContactForm();
    initializeScrollEffects();
    initializeCTAButtons();
});

// Navigation functionality
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const navOverlay = document.querySelector('.nav-overlay');
    const mobileNavLinks = document.querySelectorAll('.mobile-menu-nav a');
    const desktopNavLinks = document.querySelectorAll('.desktop-nav-menu a');
    const closeButton = document.querySelector('.mobile-menu-close');

    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            navOverlay.classList.toggle('active');
        });
    }

    // Close menu when clicking close button
    if (closeButton) {
        closeButton.addEventListener('click', function() {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            navOverlay.classList.remove('active');
        });
    }

    // Close menu when clicking overlay
    if (navOverlay) {
        navOverlay.addEventListener('click', function() {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            navOverlay.classList.remove('active');
        });
    }

    // Smooth scrolling for mobile navigation links
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }

            // Close mobile menu if open
            if (mobileMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
                navOverlay.classList.remove('active');
            }
        });
    });
    
    // Smooth scrolling for desktop navigation links
    desktopNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(248, 247, 245, 0.98)';
        } else {
            navbar.style.background = 'rgba(248, 247, 245, 0.95)';
        }
    });
}

// FAQ Accordion functionality
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// Experience Modes Tab functionality
function initializeExperienceTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and panels
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));
            
            // Add active class to clicked button and corresponding panel
            this.classList.add('active');
            const targetPanel = document.getElementById(targetTab);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });
}

// Contact Form functionality
function initializeContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Validate required fields
            const requiredFields = ['name', 'email', 'relationship'];
            let isValid = true;
            
            requiredFields.forEach(field => {
                const input = this.querySelector(`[name="${field}"]`);
                if (!formObject[field] || formObject[field].trim() === '') {
                    isValid = false;
                    input.style.borderColor = '#B33A3A';
                     input.style.boxShadow = '0 0 5px rgba(179, 58, 58, 0.3)';
                 } else {
                     input.style.borderColor = '#E5E5E5';
                     input.style.boxShadow = 'none';
                 }
            });
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const emailInput = this.querySelector('[name="email"]');
            if (formObject.email && !emailRegex.test(formObject.email)) {
                isValid = false;
                emailInput.style.borderColor = '#B33A3A';
                emailInput.style.boxShadow = '0 0 5px rgba(179, 58, 58, 0.3)';
            }
            
            if (isValid) {
                // Show success message
                showFormMessage('Thank you for reaching out. We\'ll be in touch soon to help you begin this journey.', 'success');
                
                // Reset form
                this.reset();
                
                // In a real application, you would send the data to a server
                console.log('Form submitted:', formObject);
            } else {
                showFormMessage('Please fill in all required fields correctly.', 'error');
            }
        });
    }
}

// Show form message
function showFormMessage(message, type) {
    // Remove existing message
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.textContent = message;
    
    // Style the message
    messageDiv.style.cssText = `
        padding: 1rem;
        margin-top: 1rem;
        border-radius: 10px;
        font-weight: 600;
        text-align: center;
        ${type === 'success' 
            ? 'background: #d4edda; color: #155724; border: 1px solid #c3e6cb;' 
            : 'background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;'
        }
    `;
    
    // Insert message after form
    const contactForm = document.querySelector('.contact-form');
    contactForm.appendChild(messageDiv);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.remove();
        }
    }, 5000);
}

// Scroll effects and animations
function initializeScrollEffects() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.step-card, .feature-card, .about-content, .faq-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// CTA Button functionality
function initializeCTAButtons() {
    const ctaButtons = document.querySelectorAll('.cta-button');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            this.appendChild(ripple);
            
            // Style the ripple
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            // Position the ripple
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (rect.width / 2 - size / 2) + 'px';
            ripple.style.top = (rect.height / 2 - size / 2) + 'px';
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            // Scroll to contact form if not already there
            if (!this.closest('.contact-form')) {
                const contactSection = document.querySelector('#contact');
                if (contactSection) {
                    const offsetTop = contactSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .cta-button {
        position: relative;
        overflow: hidden;
    }
    
    /* Enhanced Mobile Navigation Styles */
    @media (max-width: 768px) {
        .mobile-menu.active {
            animation: slideInFromRight 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .mobile-menu-nav a {
            margin: 0.5rem 0;
            opacity: 0;
            transform: translateX(20px);
            animation: fadeInSlide 0.3s ease forwards;
        }
        
        .mobile-menu.active .mobile-menu-nav a:nth-child(1) { animation-delay: 0.1s; }
        .mobile-menu.active .mobile-menu-nav a:nth-child(2) { animation-delay: 0.15s; }
        .mobile-menu.active .mobile-menu-nav a:nth-child(3) { animation-delay: 0.2s; }
        .mobile-menu.active .mobile-menu-nav a:nth-child(4) { animation-delay: 0.25s; }
        .mobile-menu.active .mobile-menu-nav a:nth-child(5) { animation-delay: 0.3s; }
        .mobile-menu.active .mobile-menu-nav a:nth-child(6) { animation-delay: 0.35s; }
        
        .hamburger {
            transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .hamburger:hover {
            transform: scale(1.1);
        }
        
        .hamburger span {
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            transform-origin: center;
        }
        
        .hamburger.active {
            transform: rotate(180deg);
        }
        
        .hamburger.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
            background: var(--heart-red);
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
            transform: scale(0);
        }
        
        .hamburger.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
            background: var(--heart-red);
        }
    }
    
    @keyframes slideInFromRight {
        from {
            right: -100%;
            opacity: 0;
        }
        to {
            right: 0;
            opacity: 1;
        }
    }
    
    @keyframes fadeInSlide {
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;
document.head.appendChild(style);

// Smooth scrolling polyfill for older browsers
if (!('scrollBehavior' in document.documentElement.style)) {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/gh/iamdustan/smoothscroll@master/src/smoothscroll.js';
    document.head.appendChild(script);
}

// Performance optimization: Debounce scroll events
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

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(248, 247, 245, 0.98)';
    } else {
        navbar.style.background = 'rgba(248, 247, 245, 0.95)';
    }
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);