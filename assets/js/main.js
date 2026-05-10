/* ============================================================
   FitLife Pro - Main JavaScript
   ============================================================ */

// ---- Sticky Navbar Shadow ----
(function () {
  const navbar = document.getElementById('mainNavbar');
  if (!navbar) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
})();

// ---- Active Nav Link ----
(function () {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const links = document.querySelectorAll('.navbar-nav .nav-link');
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
})();

// ---- Scroll Reveal ----
(function () {
  const revealEls = document.querySelectorAll('.reveal');
  if (!revealEls.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => observer.observe(el));
})();

// ---- Counter Animation ----
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'), 10);
  const suffix = el.getAttribute('data-suffix') || '';
  const duration = 1800;
  const step = Math.ceil(target / (duration / 16));
  let current = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = current.toLocaleString() + suffix;
  }, 16);
}

(function () {
  const counters = document.querySelectorAll('[data-target]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
})();

// ---- Progress Bar Animation ----
(function () {
  const bars = document.querySelectorAll('.progress-fill[data-width]');
  if (!bars.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const width = entry.target.getAttribute('data-width');
        entry.target.style.width = width;
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  bars.forEach(bar => {
    bar.style.width = '0%';
    observer.observe(bar);
  });
})();

// ---- Filter Buttons ----
(function () {
  const filterGroups = document.querySelectorAll('[data-filter-group]');
  filterGroups.forEach(group => {
    const btns = group.querySelectorAll('.filter-btn');
    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        btns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterVal = btn.getAttribute('data-filter');
        const targetContainer = document.querySelector(group.getAttribute('data-filter-group'));
        if (!targetContainer) return;

        const items = targetContainer.querySelectorAll('[data-category]');
        items.forEach(item => {
          if (filterVal === 'all' || item.getAttribute('data-category') === filterVal) {
            item.style.display = '';
            item.style.animation = 'fadeUp 0.35s ease forwards';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  });
})();

// ---- Search Filter ----
(function () {
  const searchInputs = document.querySelectorAll('[data-search-input]');
  searchInputs.forEach(input => {
    const targetId = input.getAttribute('data-search-input');
    const container = document.getElementById(targetId);
    if (!container) return;

    input.addEventListener('input', () => {
      const query = input.value.toLowerCase().trim();
      const items = container.querySelectorAll('[data-search-title]');
      items.forEach(item => {
        const title = item.getAttribute('data-search-title').toLowerCase();
        item.closest('.col, [class*="col-"]').style.display = title.includes(query) ? '' : 'none';
      });
    });
  });
})();

// ---- FAQ Accordion ----
(function () {
  const faqBtns = document.querySelectorAll('.faq-question');
  faqBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const answer = btn.nextElementSibling;
      const isOpen = btn.classList.contains('open');

      // Close all
      document.querySelectorAll('.faq-question.open').forEach(b => {
        b.classList.remove('open');
        b.nextElementSibling.classList.remove('show');
        b.querySelector('.faq-icon').textContent = '+';
      });

      if (!isOpen) {
        btn.classList.add('open');
        answer.classList.add('show');
        btn.querySelector('.faq-icon').textContent = '×';
      }
    });
  });
})();

// ---- Contact Form Validation ----
(function () {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    const fields = form.querySelectorAll('[data-required]');
    fields.forEach(field => {
      const errEl = document.getElementById(field.id + 'Error');
      if (!field.value.trim()) {
        if (errEl) errEl.classList.add('show');
        field.style.borderColor = '#DC2626';
        valid = false;
      } else {
        if (errEl) errEl.classList.remove('show');
        field.style.borderColor = '';
      }
    });

    const emailField = form.querySelector('[data-email]');
    if (emailField && emailField.value.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const errEl = document.getElementById(emailField.id + 'Error');
      if (!emailRegex.test(emailField.value)) {
        if (errEl) { errEl.textContent = 'Please enter a valid email.'; errEl.classList.add('show'); }
        emailField.style.borderColor = '#DC2626';
        valid = false;
      }
    }

    if (valid) {
      const successMsg = document.getElementById('formSuccess');
      if (successMsg) {
        form.reset();
        successMsg.classList.add('show');
        setTimeout(() => successMsg.classList.remove('show'), 4000);
      }
    }
  });

  // Live validation
  form.querySelectorAll('[data-required], [data-email]').forEach(field => {
    field.addEventListener('input', () => {
      const errEl = document.getElementById(field.id + 'Error');
      if (field.value.trim()) {
        if (errEl) errEl.classList.remove('show');
        field.style.borderColor = '';
      }
    });
  });
})();

// ---- Newsletter Form ----
(function () {
  const nlForm = document.getElementById('newsletterForm');
  if (!nlForm) return;

  nlForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = nlForm.querySelector('input[type="email"]');
    const btn = nlForm.querySelector('button');
    if (emailInput && emailInput.value) {
      const orig = btn.textContent;
      btn.textContent = 'Subscribed!';
      btn.style.background = '#15803D';
      emailInput.value = '';
      setTimeout(() => {
        btn.textContent = orig;
        btn.style.background = '';
      }, 3000);
    }
  });
})();

// ---- Smooth Scroll for anchor links ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
