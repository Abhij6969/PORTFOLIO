document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navList = document.querySelector('.nav-list');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navList.classList.toggle('active');
    });

    // Close mobile menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navList.classList.contains('active')) {
                hamburger.classList.remove('active');
                navList.classList.remove('active');
            }
        });
    });

    // Sticky Header on Scroll
    const header = document.getElementById('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Active Navigation Link on Scroll
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 300) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Back to Top Button
    const backToTopBtn = document.querySelector('.back-to-top');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });

    // Smooth Scrolling for all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animate elements on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.hero-text, .hero-image, .about-image, .about-text, .education-item, .skill-category, .contact-info, .contact-form');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Initialize elements with opacity 0 for animation
    document.querySelectorAll('.hero-text, .hero-image, .about-image, .about-text, .education-item, .skill-category, .contact-info, .contact-form').forEach(element => {
        element.style.opacity = '0';
        if (element.classList.contains('hero-text') || element.classList.contains('about-text') || element.classList.contains('contact-info')) {
            element.style.transform = 'translateX(-50px)';
        } else if (element.classList.contains('hero-image') || element.classList.contains('about-image') || element.classList.contains('contact-form')) {
            element.style.transform = 'translateX(50px)';
        } else {
            element.style.transform = 'translateY(50px)';
        }
        element.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
    });

    // Show initial elements
    setTimeout(() => {
        document.querySelector('.hero-text').style.opacity = '1';
        document.querySelector('.hero-text').style.transform = 'translateX(0)';
        document.querySelector('.hero-image').style.opacity = '1';
        document.querySelector('.hero-image').style.transform = 'translateX(0)';
    }, 100);

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load

    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Here you would typically send the form data to a server
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });
    }

    // Animate skill bars on scroll
    const skillBars = document.querySelectorAll('.progress');
    const animateSkillBars = function() {
        skillBars.forEach(bar => {
            const barPosition = bar.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (barPosition < windowHeight - 100) {
                const width = bar.parentElement.previousElementSibling.querySelector('.skill-percent').textContent;
                bar.style.width = width;
            }
        });
    };

    window.addEventListener('scroll', animateSkillBars);
    animateSkillBars(); // Run once on load

    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();
});