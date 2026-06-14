/* ==========================================================================
   AMAN PATEL — PORTFOLIO SCRIPTS
   Table of Contents:
   1. Navbar Scroll Effect
   2. Active Section Highlight
   3. Mobile Nav Auto-Close
   4. Scroll Reveal (Fade-in) Animations
   5. Skill Progress Bar Animation
   6. Back to Top Button
   7. Contact Form Handling
   8. Footer Year
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* ------------------------------------------------------------------ */
  /* 1. NAVBAR SCROLL EFFECT                                              */
  /* Adds a stronger background + shadow once the page is scrolled.      */
  /* ------------------------------------------------------------------ */
  const navbar = document.getElementById('mainNav');

  function handleNavbarScroll() {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  handleNavbarScroll();
  window.addEventListener('scroll', handleNavbarScroll);


  /* ------------------------------------------------------------------ */
  /* 2. ACTIVE SECTION HIGHLIGHT                                          */
  /* Highlights the nav link that matches the section in view.           */
  /* ------------------------------------------------------------------ */
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link[href^="#"]');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');

        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, {
    rootMargin: '-45% 0px -45% 0px', // Trigger when section is near vertical center
    threshold: 0
  });

  sections.forEach((section) => sectionObserver.observe(section));


  /* ------------------------------------------------------------------ */
  /* 3. MOBILE NAV AUTO-CLOSE                                             */
  /* Closes the collapsed navbar after a link is tapped on mobile.       */
  /* ------------------------------------------------------------------ */
  const navMenu = document.getElementById('navMenu');

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getOrCreateInstance(navMenu);
        bsCollapse.hide();
      }
    });
  });


  /* ------------------------------------------------------------------ */
  /* 4. SCROLL REVEAL (FADE-IN) ANIMATIONS                                */
  /* Elements with the .fade-in class animate into view once visible.    */
  /* ------------------------------------------------------------------ */
  const fadeElements = document.querySelectorAll('.fade-in');

  const fadeObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15
  });

  fadeElements.forEach((el) => fadeObserver.observe(el));


  /* ------------------------------------------------------------------ */
  /* 5. SKILL PROGRESS BAR ANIMATION                                      */
  /* Animates each skill bar to its target width when scrolled into view.*/
  /* ------------------------------------------------------------------ */
  const progressBars = document.querySelectorAll('.skill-progress .progress-bar');

  const progressObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const targetWidth = bar.getAttribute('data-width') || 0;
        // Slight delay for a smoother staggered feel
        requestAnimationFrame(() => {
          bar.style.width = `${targetWidth}%`;
        });
        observer.unobserve(bar);
      }
    });
  }, {
    threshold: 0.4
  });

  progressBars.forEach((bar) => progressObserver.observe(bar));


  /* ------------------------------------------------------------------ */
  /* 6. BACK TO TOP BUTTON                                                */
  /* Shows the button after scrolling down and scrolls smoothly to top.  */
  /* ------------------------------------------------------------------ */
  const backToTopBtn = document.getElementById('backToTop');

  function handleBackToTopVisibility() {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }

  handleBackToTopVisibility();
  window.addEventListener('scroll', handleBackToTopVisibility);

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });


  /* ------------------------------------------------------------------ */
  /* 7. CONTACT FORM HANDLING                                             */
  /* Performs simple client-side validation and shows a status message.  */
  /* Replace this with a real submission (e.g. fetch to your backend or  */
  /* a service like Formspree) when connecting the form to a server.     */
  /* ------------------------------------------------------------------ */
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();

      if (!name || !email || !message) {
        formStatus.textContent = 'Please fill in all fields before sending.';
        formStatus.className = 'form-status error mt-3';
        return;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        formStatus.textContent = 'Please enter a valid email address.';
        formStatus.className = 'form-status error mt-3';
        return;
      }

      // Simulate a successful submission.
      formStatus.textContent = `Thanks, ${name}! Your message has been received — I'll get back to you soon.`;
      formStatus.className = 'form-status success mt-3';

      contactForm.reset();
    });
  }


  /* ------------------------------------------------------------------ */
  /* 8. FOOTER YEAR                                                       */
  /* Keeps the copyright year up to date automatically.                  */
  /* ------------------------------------------------------------------ */
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

});