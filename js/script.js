/* ==========================================================================
   DOM ELEMENTS
   ========================================================================== */
   const header = document.getElementById('header');
   const navMenu = document.getElementById('nav-menu');
   const navToggle = document.getElementById('nav-toggle');
   const navLinks = document.querySelectorAll('.nav-link');
   const themeToggle = document.getElementById('theme-toggle');
   const backToTopBtn = document.getElementById('back-to-top');
   const contactForm = document.getElementById('contact-form');
   const toast = document.getElementById('toast');
   const typingText = document.querySelector('.typing-text');
   
   /* ==========================================================================
      THEME MANAGEMENT (DARK / LIGHT MODE)
      ========================================================================== */
   // Check local storage for theme preference
   const savedTheme = localStorage.getItem('portfolio-theme');
   if (savedTheme) {
       document.documentElement.setAttribute('data-theme', savedTheme);
       updateThemeIcon(savedTheme);
   }
   
   themeToggle.addEventListener('click', () => {
       const currentTheme = document.documentElement.getAttribute('data-theme');
       const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
       
       document.documentElement.setAttribute('data-theme', newTheme);
       localStorage.setItem('portfolio-theme', newTheme);
       updateThemeIcon(newTheme);
   });
   
   function updateThemeIcon(theme) {
       const icon = themeToggle.querySelector('i');
       if (theme === 'light') {
           icon.classList.remove('fa-moon');
           icon.classList.add('fa-sun');
       } else {
           icon.classList.remove('fa-sun');
           icon.classList.add('fa-moon');
       }
   }
   
   /* ==========================================================================
      MOBILE NAVIGATION
      ========================================================================== */
   navToggle.addEventListener('click', () => {
       navMenu.classList.toggle('show-menu');
       const icon = navToggle.querySelector('i');
       if (navMenu.classList.contains('show-menu')) {
           icon.classList.remove('fa-bars');
           icon.classList.add('fa-xmark');
       } else {
           icon.classList.remove('fa-xmark');
           icon.classList.add('fa-bars');
       }
   });
   
   // Close menu when a link is clicked
   navLinks.forEach(link => {
       link.addEventListener('click', () => {
           navMenu.classList.remove('show-menu');
           navToggle.querySelector('i').classList.remove('fa-xmark');
           navToggle.querySelector('i').classList.add('fa-bars');
       });
   });
   
   /* ==========================================================================
      STICKY HEADER & BACK TO TOP BUTTON
      ========================================================================== */
   window.addEventListener('scroll', () => {
       // Header background
       if (window.scrollY >= 50) {
           header.classList.add('scrolled');
       } else {
           header.classList.remove('scrolled');
       }
       
       // Back to top button
       if (window.scrollY >= 500) {
           backToTopBtn.classList.add('show');
       } else {
           backToTopBtn.classList.remove('show');
       }
   });
   
   /* ==========================================================================
      SCROLLSPY (ACTIVE NAV LINKS)
      ========================================================================== */
   const sections = document.querySelectorAll('section[id]');
   
   function scrollActive() {
       const scrollY = window.pageYOffset;
   
       sections.forEach(current => {
           const sectionHeight = current.offsetHeight;
           const sectionTop = current.offsetTop - 100; // Offset for fixed header
           const sectionId = current.getAttribute('id');
           const navLink = document.querySelector(`.nav-menu a[href*=${sectionId}]`);
   
           if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
               if(navLink) navLink.classList.add('active');
           } else {
               if(navLink) navLink.classList.remove('active');
           }
       });
   }
   window.addEventListener('scroll', scrollActive);
   
   /* ==========================================================================
      TYPING EFFECT
      ========================================================================== */
   const textArray = [
       "AI & Data Science Student", 
       "Machine Learning Enthusiast", 
       "Data Analyst", 
       "Python Developer"
   ];
   
   let textIndex = 0;
   let charIndex = 0;
   let isDeleting = false;
   let typingDelay = 100;
   
   function type() {
       const currentText = textArray[textIndex];
       
       if (isDeleting) {
           typingText.textContent = currentText.substring(0, charIndex - 1);
           charIndex--;
           typingDelay = 50; // Faster delete
       } else {
           typingText.textContent = currentText.substring(0, charIndex + 1);
           charIndex++;
           typingDelay = 100;
       }
       
       if (!isDeleting && charIndex === currentText.length) {
           isDeleting = true;
           typingDelay = 2000; // Pause at end of text
       } else if (isDeleting && charIndex === 0) {
           isDeleting = false;
           textIndex = (textIndex + 1) % textArray.length;
           typingDelay = 500; // Pause before typing new text
       }
       
       setTimeout(type, typingDelay);
   }
   
   // Start typing effect on load
   if(typingText) {
       document.addEventListener("DOMContentLoaded", () => {
           setTimeout(type, 1000);
       });
   }
   
   /* ==========================================================================
      SCROLL REVEAL ANIMATIONS
      ========================================================================== */
   const revealElements = document.querySelectorAll('.reveal');
   
   const revealOptions = {
       threshold: 0.15, // Trigger when 15% visible
       rootMargin: "0px 0px -50px 0px"
   };
   
   const revealOnScroll = new IntersectionObserver(function(entries, observer) {
       entries.forEach(entry => {
           if (entry.isIntersecting) {
               entry.target.classList.add('active');
               // Optional: Stop observing once revealed
               // observer.unobserve(entry.target);
           }
       });
   }, revealOptions);
   
   revealElements.forEach(el => {
       revealOnScroll.observe(el);
   });
   
   /* ==========================================================================
      CONTACT FORM HANDLING
      ========================================================================== */
   if (contactForm) {
       contactForm.addEventListener('submit', function(e) {
           e.preventDefault(); // Prevent default submission
           
           const btn = this.querySelector('button[type="submit"]');
           const originalText = btn.innerHTML;
           
           // Loading state
           btn.innerHTML = 'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';
           btn.disabled = true;
           
           // Simulate API call (No backend required per instructions)
           setTimeout(() => {
               // Reset form
               contactForm.reset();
               
               // Restore button
               btn.innerHTML = originalText;
               btn.disabled = false;
               
               // Show toast notification
               toast.classList.add('show');
               
               // Hide toast after 3 seconds
               setTimeout(() => {
                   toast.classList.remove('show');
               }, 3000);
               
           }, 1500);
       });
   }
