// ===================================
// ANVPY WEBSITE - MAIN JAVASCRIPT
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavbar();
    initTypingAnimation();
    initScrollAnimations();
    initCodeDemo();
    initTerminalDemo();
    initForms();
    initSmoothScroll();
});

// ===================================
// NAVBAR FUNCTIONALITY
// ===================================
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// ===================================
// TYPING ANIMATION
// ===================================
function initTypingAnimation() {
    const typingElement = document.getElementById('typingText');
    if (!typingElement) return;
    
    const texts = [
        'Build Mobile Apps',
        'Build Games',
        'Build AI Applications',
        'Build Everything'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            // Pause at end
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500;
        }
        
        setTimeout(type, typingSpeed);
    }
    
    // Start typing animation
    setTimeout(type, 1000);
}

// ===================================
// SCROLL ANIMATIONS
// ===================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                // Optionally unobserve after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all elements with data-animate attribute
    const animatedElements = document.querySelectorAll('[data-animate]');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// ===================================
// CODE DEMO ANIMATION
// ===================================
function initCodeDemo() {
    const codeElement = document.getElementById('codeContent');
    if (!codeElement) return;
    
    const codeLines = [
        'from alloy import App',
        '',
        'class MyApp(App):',
        '    def __init__(self):',
        '        super().__init__("AnvPy App")',
        '    ',
        '    def on_create(self):',
        '        # Build your UI here',
        '        pass',
        '',
        'if __name__ == "__main__":',
        '    app = MyApp()',
        '    app.run()'
    ];
    
    let lineIndex = 0;
    let charIndex = 0;
    let currentLine = '';
    let displayedCode = [];
    
    function typeCode() {
        if (lineIndex < codeLines.length) {
            if (charIndex < codeLines[lineIndex].length) {
                currentLine += codeLines[lineIndex][charIndex];
                charIndex++;
                
                // Update display
                const tempCode = [...displayedCode, currentLine];
                codeElement.textContent = tempCode.join('\n');
                
                setTimeout(typeCode, 30);
            } else {
                // Line complete, move to next
                displayedCode.push(currentLine);
                currentLine = '';
                charIndex = 0;
                lineIndex++;
                setTimeout(typeCode, 100);
            }
        } else {
            // Animation complete, restart after delay
            setTimeout(() => {
                lineIndex = 0;
                charIndex = 0;
                currentLine = '';
                displayedCode = [];
                codeElement.textContent = '';
                typeCode();
            }, 3000);
        }
    }
    
    // Check if element is in viewport before starting
    const codeObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && displayedCode.length === 0) {
                typeCode();
                codeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    codeObserver.observe(codeElement);
}

// ===================================
// TERMINAL DEMO ANIMATION
// ===================================
function initTerminalDemo() {
    const terminalElement = document.getElementById('terminalContent');
    if (!terminalElement) return;
    
    const commands = [
        '$ anvpy init myproject',
        'Creating new AnvPy project...',
        'Project initialized successfully!',
        '',
        '$ cd myproject',
        '',
        '$ anvpy add package opencv',
        'Installing opencv...',
        'Package installed successfully!',
        '',
        '$ anvpy build apk',
        'Building APK...',
        'Build complete: myproject.apk',
        '',
        '$ anvpy deploy',
        'Deploying to device...',
        'Deployment successful! ✓'
    ];
    
    let commandIndex = 0;
    let displayedCommands = [];
    
    function typeTerminal() {
        if (commandIndex < commands.length) {
            displayedCommands.push(commands[commandIndex]);
            terminalElement.textContent = displayedCommands.join('\n');
            commandIndex++;
            
            // Variable delay based on content
            const delay = commands[commandIndex - 1].startsWith('$') ? 800 : 400;
            setTimeout(typeTerminal, delay);
        } else {
            // Restart after delay
            setTimeout(() => {
                commandIndex = 0;
                displayedCommands = [];
                terminalElement.textContent = '';
                typeTerminal();
            }, 3000);
        }
    }
    
    // Start when visible
    const terminalObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && displayedCommands.length === 0) {
                typeTerminal();
                terminalObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    terminalObserver.observe(terminalElement);
}

// ===================================
// FORM HANDLING
// ===================================
function initForms() {
    // Contact Form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Show success message (mock)
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }
    
    // Report Form
    const reportForm = document.getElementById('reportForm');
    if (reportForm) {
        reportForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(reportForm);
            const data = Object.fromEntries(formData);
            
            // Show success message (mock)
            alert('Thank you for your report! We will investigate this issue.');
            reportForm.reset();
        });
    }
    
    // Add focus animations to form inputs
    const formInputs = document.querySelectorAll('input, textarea, select');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });
}

// ===================================
// SMOOTH SCROLL
// ===================================
function initSmoothScroll() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if href is just "#"
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                
                const navHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===================================
// BUTTON INTERACTIONS
// ===================================
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
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
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// ===================================
// DOCS NAVIGATION
// ===================================
const docsNavLinks = document.querySelectorAll('.docs-nav-link');
if (docsNavLinks.length > 0) {
    // Highlight current section on scroll
    const docsSections = document.querySelectorAll('.doc-section');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        docsSections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });
        
        docsNavLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// ===================================
// PARALLAX EFFECT
// ===================================
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    
    // Parallax for hero glow
    const heroGlow = document.querySelector('.hero-glow');
    if (heroGlow) {
        heroGlow.style.transform = `translate(-50%, -50%) translateY(${scrolled * 0.5}px)`;
    }
});

// ===================================
// MOUSE CURSOR EFFECT (Optional Enhancement)
// ===================================
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Create subtle cursor glow effect
const cursorGlow = document.createElement('div');
cursorGlow.style.cssText = `
    position: fixed;
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba(0, 200, 255, 0.08) 0%, transparent 70%);
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%);
    transition: opacity 0.3s ease;
    opacity: 0;
`;
document.body.appendChild(cursorGlow);

let cursorTimeout;
document.addEventListener('mousemove', function(e) {
    clearTimeout(cursorTimeout);
    cursorGlow.style.opacity = '1';
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
    
    cursorTimeout = setTimeout(() => {
        cursorGlow.style.opacity = '0';
    }, 2000);
});

// ===================================
// PAGE LOAD ANIMATION
// ===================================
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// ===================================
// CARD HOVER EFFECTS
// ===================================
const cards = document.querySelectorAll('.ecosystem-card, .download-card, .showcase-app, .platform-card');
cards.forEach(card => {
    card.addEventListener('mouseenter', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        this.style.setProperty('--mouse-x', x + 'px');
        this.style.setProperty('--mouse-y', y + 'px');
    });
});

// ===================================
// CONSOLE MESSAGE
// ===================================
console.log('%cAnvPy Platform', 'color: #00c8ff; font-size: 24px; font-weight: bold;');
console.log('%cThe Complete Python Ecosystem for Android', 'color: #7c3aed; font-size: 14px;');
console.log('%cVisit: https://anvpy.dev', 'color: #9ca3af; font-size: 12px;');

// ===================================
// UTILITY FUNCTIONS
// ===================================

// Debounce function for performance
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

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ===================================
// PERFORMANCE OPTIMIZATIONS
// ===================================

// Optimize scroll events
let ticking = false;
window.addEventListener('scroll', function() {
    if (!ticking) {
        window.requestAnimationFrame(function() {
            // Scroll-dependent operations here
            ticking = false;
        });
        ticking = true;
    }
});

// Lazy load images (if needed in future)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    const lazyImages = document.querySelectorAll('img.lazy');
    lazyImages.forEach(img => imageObserver.observe(img));
}

// ===================================
// END OF MAIN.JS
// ===================================
