

document.addEventListener('DOMContentLoaded', () => {
    // ===================================================================
    //  ELEMENT SELECTION (CACHE DOM ELEMENTS FOR PERFORMANCE)
    // ===================================================================
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuToggle = document.querySelector('.menu-toggle');
    const backToTopBtn = document.getElementById('backToTop');

    // ===================================================================
    //  PERFORMANCE UTILITIES
    // ===================================================================
    function throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // ===================================================================
    //  MAIN INITIALIZATION
    // ===================================================================
    function init() {
        initializeEventListeners();
        initializeSmoothScroll();
        initializeAnimationsNoVanish();
        initializeParticles();
        initializeTypingEffect();
        initializeCounters();
        initializeSkillBars();
        initializeProjectFiltersNoVanish();
        initializeContactForm();
        initializeMouseEffect();

        console.log('%c🚀 Welcome to Toghrul Niyazli\'s Portfolio!', 'font-size: 20px; font-weight: bold; color: #0066ff;');
        console.log('%c💡 Interested in the code? Let\'s connect and discuss!', 'font-size: 14px; color: #00d4ff;');
        console.log('%c📧 Email: toghrulniyazli1@gmail.com', 'font-size: 12px; color: #94a3b8;');
    }

    // ===================================================================
    //  EVENT LISTENERS
    // ===================================================================
    function initializeEventListeners() {
        if (menuToggle) menuToggle.addEventListener('click', toggleMobileMenu);
        document.querySelectorAll('.mobile-nav-links a').forEach(link => {
            link.addEventListener('click', () => { 
                if (mobileMenu.classList.contains('active')) toggleMobileMenu(); 
            });
        });
        if (backToTopBtn) backToTopBtn.addEventListener('click', scrollToTop);
        window.addEventListener('scroll', throttle(handleScroll, 100));
        window.addEventListener('resize', throttle(handleResize, 250));
        document.addEventListener('keydown', handleKeyDown);
        window.addEventListener('load', () => {
            document.body.classList.add('loaded');
            const heroElements = document.querySelectorAll('.hero-badge, .hero-title, .hero-subtitle, .hero-description, .hero-stats, .hero-cta');
            heroElements.forEach((element, index) => {
                setTimeout(() => { 
                    element.style.opacity = '1'; 
                    element.style.transform = 'translateY(0)'; 
                }, index * 100);
            });
        });
    }

    // ===================================================================
    //  SCROLL & RESIZE HANDLERS - NO VANISHING
    // ===================================================================
    function handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // ENSURE NAVBAR IS ALWAYS VISIBLE - NO HIDING
        if (navbar) {
            navbar.classList.remove('navbar--hidden');
            navbar.style.display = '';
            navbar.style.opacity = '1';
            navbar.style.visibility = 'visible';
            navbar.style.transform = 'translateY(0)';
        }

        // Add shadow effect when scrolled
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        updateActiveNavLink();
        handleBackToTopButton();
    }
    
    function handleResize() {
        if (window.innerWidth > 768 && mobileMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
    }

    // ===================================================================
    //  NAVIGATION & UI HELPERS
    // ===================================================================
    function toggleMobileMenu() {
        menuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    }

    function updateActiveNavLink() {
        let currentSection = '';
        const navbarHeight = navbar ? navbar.offsetHeight : 80;
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbarHeight - 20;
            if (window.pageYOffset >= sectionTop) {
                currentSection = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === currentSection) {
                link.classList.add('active');
            }
        });
    }

    function handleBackToTopButton() {
        if (backToTopBtn) {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }
    }

    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function initializeSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    const navbarHeight = navbar ? navbar.offsetHeight : 80;
                    const offsetTop = targetSection.offsetTop - (navbarHeight - 20);
                    window.scrollTo({ top: offsetTop, behavior: 'smooth' });
                }
            });
        });
    }

    // ===================================================================
    //  KEYBOARD NAVIGATION
    // ===================================================================
    function handleKeyDown(e) {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
    }

    // ===================================================================
    //  PARTICLES ANIMATION
    // ===================================================================
    function initializeParticles() {
        const canvas = document.getElementById('particle-canvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        let particles = [];
        let animationId;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.5;
                this.speedX = Math.random() * 0.5 - 0.25;
                this.speedY = Math.random() * 0.5 - 0.25;
                this.opacity = Math.random() * 0.5 + 0.2;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
                if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
            }

            draw() {
                ctx.fillStyle = `rgba(0, 212, 255, ${this.opacity})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const createParticles = () => {
            const particleCount = Math.min(100, window.innerWidth / 10);
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(p => {
                p.update();
                p.draw();
            });

            particles.forEach((a, i) => {
                particles.slice(i + 1).forEach(b => {
                    const dx = a.x - b.x;
                    const dy = a.y - b.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < 100) {
                        ctx.strokeStyle = `rgba(0, 212, 255, ${0.1 * (1 - distance / 100)})`;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                        ctx.stroke();
                    }
                });
            });

            animationId = requestAnimationFrame(animate);
        };

        createParticles();
        animate();

        window.addEventListener('resize', createParticles);
        window.addEventListener('beforeunload', () => {
            cancelAnimationFrame(animationId);
        });
    }

    // ===================================================================
    //  TYPING EFFECT
    // ===================================================================
    function initializeTypingEffect() {
        const typingElement = document.querySelector('.typing-text');
        if (!typingElement) return;

        const texts = [
            'Data Analytics Expert',
            'Process Automation Specialist',
            'Business Intelligence Developer',
            'Cross-functional Leader'
        ];
        
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentText = texts[textIndex];
            let typeSpeed = 100;

            if (isDeleting) {
                typingElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 50;
            } else {
                typingElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }

            if (!isDeleting && charIndex === currentText.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typeSpeed = 500;
            }

            setTimeout(type, typeSpeed);
        }

        type();
    }

    // ===================================================================
    //  COUNTER ANIMATION
    // ===================================================================
    function initializeCounters() {
        const counters = document.querySelectorAll('.stat-number[data-count]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    const element = entry.target;
                    const target = parseInt(element.getAttribute('data-count'));
                    let current = 0;
                    const increment = target / 100;

                    const updateCounter = () => {
                        if (current < target) {
                            current += increment;
                            element.textContent = Math.ceil(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            element.textContent = target;
                        }
                    };

                    updateCounter();
                    element.classList.add('counted');
                }
            });
        }, { threshold: 0.8 });

        counters.forEach(counter => observer.observe(counter));
    }

    // ===================================================================
    //  SKILL BARS ANIMATION
    // ===================================================================
    function initializeSkillBars() {
        const skillItems = document.querySelectorAll('.skill-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                    const proficiency = entry.target.getAttribute('data-proficiency');
                    const progressBar = entry.target.querySelector('.skill-progress');
                    
                    if (progressBar) {
                        progressBar.style.width = proficiency + '%';
                    }
                    
                    entry.target.classList.add('animated');
                }
            });
        }, { threshold: 0.5 });

        skillItems.forEach(item => observer.observe(item));
    }

    // ===================================================================
    //  PROJECT FILTERS - NO VANISHING
    // ===================================================================
    function initializeProjectFiltersNoVanish() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');
        
        if (!filterButtons.length) return;

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const category = button.getAttribute('data-category');

                projectCards.forEach(card => {
                    // KEEP ALL CARDS VISIBLE - NO HIDING
                    if (category === 'all' || card.getAttribute('data-category') === category) {
                        card.style.display = 'block';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                        card.style.visibility = 'visible';
                    } else {
                        // Still show filtered items, just with reduced opacity for context
                        card.style.display = 'block';
                        card.style.opacity = '0.3';
                        card.style.transform = 'scale(0.95)';
                        card.style.visibility = 'visible';
                    }
                });
            });
        });

        const defaultFilter = document.querySelector('.filter-btn[data-category="all"]');
        if (defaultFilter) defaultFilter.click();
    }

    // ===================================================================
    //  CONTACT FORM
    // ===================================================================
    function initializeContactForm() {
        const form = document.getElementById('contactForm');
        if (!form) return;

        const formGroups = form.querySelectorAll('.form-group');

        formGroups.forEach(group => {
            const input = group.querySelector('input, textarea');
            const label = group.querySelector('label');

            if (input && label) {
                input.addEventListener('focus', () => label.classList.add('active'));
                input.addEventListener('blur', () => {
                    if (!input.value) label.classList.remove('active');
                });
                if (input.value) label.classList.add('active');
            }
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = form.querySelector('.btn-submit');
            const originalText = submitBtn.innerHTML;

            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';

                form.reset();
                formGroups.forEach(group => {
                    const label = group.querySelector('label');
                    if (label) label.classList.remove('active');
                });

                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                }, 3000);
            }, 1500);
        });
    }

    // ===================================================================
    //  SCROLL ANIMATIONS - NO VANISHING
    // ===================================================================
    function initializeAnimationsNoVanish() {
        const animatedElements = document.querySelectorAll(
            '.project-card, .timeline-item, .about-highlights .highlight-item, .section-header'
        );

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add animation class
                    entry.target.classList.add('animate-in');

                } else {


            });
        }, { 
            threshold: 0.1, 
            rootMargin: '0px 0px -50px 0px' 
        });

        animatedElements.forEach(element => {
            // Ensure elements are visible by default
            element.style.opacity = '1';
            element.style.visibility = 'visible';
            observer.observe(element);
        });
    }

    // ===================================================================
    //  MOUSE PARALLAX EFFECT
    // ===================================================================
    function initializeMouseEffect() {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        let mouseX = 0, mouseY = 0, currentX = 0, currentY = 0;

        hero.addEventListener('mousemove', (e) => {
            const rect = hero.getBoundingClientRect();
            mouseX = (e.clientX - rect.left - rect.width / 2) / 50;
            mouseY = (e.clientY - rect.top - rect.height / 2) / 50;
        });

        function animate() {
            currentX += (mouseX - currentX) * 0.1;
            currentY += (mouseY - currentY) * 0.1;

            const elementToAnimate = hero.querySelector('.code-window') || hero;
            elementToAnimate.style.transform = `perspective(1000px) rotateY(${currentX}deg) rotateX(${-currentY}deg)`;

            requestAnimationFrame(animate);
        }

        animate();
    }


    init();

});
