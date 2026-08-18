/**
 * Sudarsan Das - Professional Portfolio
 * Vanilla JavaScript Implementation
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavbar();
  initMobileMenu();
  initScrollSpy();
  initScrollReveal();
  initSkillFilters();
  initContactForm();
  initCopyActions();
  initBackToTop();
  initYear();
});

/* -------------------------------------------------------------------------- */
/* Theme Toggle (Dark / Light Mode)                                           */
/* -------------------------------------------------------------------------- */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  if (!themeToggleBtn) return;

  const currentTheme = localStorage.getItem('sd_portfolio_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  themeToggleBtn.addEventListener('click', () => {
    const activeTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = activeTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('sd_portfolio_theme', newTheme);
    updateThemeIcon(newTheme);
  });
}

function updateThemeIcon(theme) {
  const sunIcon = document.getElementById('theme-icon-sun');
  const moonIcon = document.getElementById('theme-icon-moon');
  if (!sunIcon || !moonIcon) return;

  if (theme === 'light') {
    sunIcon.style.display = 'none';
    moonIcon.style.display = 'block';
  } else {
    sunIcon.style.display = 'block';
    moonIcon.style.display = 'none';
  }
}

/* -------------------------------------------------------------------------- */
/* Sticky Navbar Blur & Shadow on Scroll                                     */
/* -------------------------------------------------------------------------- */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });
}

/* -------------------------------------------------------------------------- */
/* Mobile Menu Drawer                                                        */
/* -------------------------------------------------------------------------- */
function initMobileMenu() {
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileLinks = document.querySelectorAll('.mobile-nav .nav-link');

  if (!mobileToggle || !mobileNav) return;

  function toggleMenu() {
    const isOpen = mobileNav.classList.contains('open');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  function openMenu() {
    mobileNav.classList.add('open');
    mobileToggle.classList.add('open');
    mobileToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    mobileNav.classList.remove('open');
    mobileToggle.classList.remove('open');
    mobileToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  mobileToggle.addEventListener('click', toggleMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (mobileNav.classList.contains('open') && 
        !mobileNav.contains(e.target) && 
        !mobileToggle.contains(e.target)) {
      closeMenu();
    }
  });
}

/* -------------------------------------------------------------------------- */
/* Active Navigation Highlighting (Scroll Spy)                               */
/* -------------------------------------------------------------------------- */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-menu .nav-link');
  const mobileLinks = document.querySelectorAll('.mobile-nav .nav-link');

  if (!sections.length) return;

  function highlightNav() {
    const scrollPosition = window.scrollY + 160;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPosition >= top && scrollPosition < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });

        mobileLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNav, { passive: true });
  highlightNav();
}

/* -------------------------------------------------------------------------- */
/* Scroll Reveal Animations                                                  */
/* -------------------------------------------------------------------------- */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  if (!revealElements.length) return;

  function markRevealed(el) {
    el.classList.add('revealed');
    el.classList.add('active');
  }

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          markRevealed(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '50px 0px 50px 0px',
      threshold: 0.05
    });

    revealElements.forEach(el => {
      observer.observe(el);
      // Immediately reveal anything already near the viewport
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight + 100) {
        markRevealed(el);
      }
    });
  } else {
    // Fallback if observer not supported
    revealElements.forEach(markRevealed);
  }
}

/* -------------------------------------------------------------------------- */
/* Interactive Skill Filtering                                               */
/* -------------------------------------------------------------------------- */
function initSkillFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  if (!filterButtons.length || !skillCards.length) return;

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-filter');

      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      skillCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (category === 'all' || cardCategory?.includes(category)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* -------------------------------------------------------------------------- */
/* Contact Form Validation & Submission Handling                             */
/* -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const subjectInput = document.getElementById('subject');
  const messageInput = document.getElementById('message');
  const formStatus = document.getElementById('form-status');

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  function setFeedback(element, message, isError = true) {
    const feedbackEl = element.parentElement.querySelector('.form-feedback');
    if (!feedbackEl) return;
    
    if (message) {
      feedbackEl.textContent = message;
      feedbackEl.className = isError ? 'form-feedback error' : 'form-feedback success';
      element.style.borderColor = isError ? '#ef4444' : 'var(--accent-emerald)';
    } else {
      feedbackEl.textContent = '';
      feedbackEl.className = 'form-feedback';
      element.style.borderColor = '';
    }
  }

  // Live input validation
  nameInput?.addEventListener('input', () => {
    if (nameInput.value.trim().length < 2) {
      setFeedback(nameInput, 'Please enter your name (at least 2 characters)');
    } else {
      setFeedback(nameInput, '');
    }
  });

  emailInput?.addEventListener('input', () => {
    if (!validateEmail(emailInput.value.trim())) {
      setFeedback(emailInput, 'Please enter a valid email address');
    } else {
      setFeedback(emailInput, '');
    }
  });

  subjectInput?.addEventListener('input', () => {
    if (subjectInput.value.trim().length < 3) {
      setFeedback(subjectInput, 'Please enter a subject (at least 3 characters)');
    } else {
      setFeedback(subjectInput, '');
    }
  });

  messageInput?.addEventListener('input', () => {
    if (messageInput.value.trim().length < 10) {
      setFeedback(messageInput, 'Please enter your message (at least 10 characters)');
    } else {
      setFeedback(messageInput, '');
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;

    if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
      setFeedback(nameInput, 'Please enter your full name');
      isValid = false;
    }

    if (!emailInput.value.trim() || !validateEmail(emailInput.value.trim())) {
      setFeedback(emailInput, 'Please provide a valid email address');
      isValid = false;
    }

    if (!subjectInput.value.trim() || subjectInput.value.trim().length < 3) {
      setFeedback(subjectInput, 'Please provide a subject');
      isValid = false;
    }

    if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
      setFeedback(messageInput, 'Please write your message (at least 10 characters)');
      isValid = false;
    }

    if (!isValid) return;

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = `<span>Sending...</span>`;
    submitBtn.disabled = true;

    // Simulate sending & trigger toast notification
    setTimeout(() => {
      showToast('Thank you! Your message has been prepared. Sudarsan will get back to you shortly.');
      form.reset();
      
      [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
        setFeedback(input, '');
      });

      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }, 800);
  });
}

/* -------------------------------------------------------------------------- */
/* Copy to Clipboard Actions                                                 */
/* -------------------------------------------------------------------------- */
function initCopyActions() {
  const copyButtons = document.querySelectorAll('[data-copy]');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied "${textToCopy}" to clipboard!`);
        }).catch(() => {
          fallbackCopy(textToCopy);
        });
      } else {
        fallbackCopy(textToCopy);
      }
    });
  });
}

function fallbackCopy(text) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-999999px';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand('copy');
    showToast(`Copied "${text}" to clipboard!`);
  } catch (err) {
    showToast(`Text: ${text}`);
  }
  document.body.removeChild(textArea);
}

/* -------------------------------------------------------------------------- */
/* Toast Notification Utility                                                */
/* -------------------------------------------------------------------------- */
function showToast(message) {
  let toast = document.getElementById('toast-notification');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-notification';
    toast.className = 'toast-notification';
    toast.innerHTML = `
      <svg class="toast-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
      <span class="toast-message"></span>
    `;
    document.body.appendChild(toast);
  }

  const msgSpan = toast.querySelector('.toast-message');
  if (msgSpan) msgSpan.textContent = message;

  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

/* -------------------------------------------------------------------------- */
/* Back To Top Button                                                        */
/* -------------------------------------------------------------------------- */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }, { passive: true });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* -------------------------------------------------------------------------- */
/* Dynamic Year                                                              */
/* -------------------------------------------------------------------------- */
function initYear() {
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
}
