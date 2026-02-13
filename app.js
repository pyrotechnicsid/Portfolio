/* ===================================================
   SIDDHANT BOSE — PORTFOLIO JS
   Theme toggle, scroll animations, navbar, mobile menu
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // Mark that JS is active
    document.documentElement.setAttribute('data-js', '');

    // ---------- THEME TOGGLE ----------
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const html = document.documentElement;

    function getSavedTheme() {
        try { return localStorage.getItem('theme'); } catch(e) { return null; }
    }

    function saveTheme(theme) {
        try { localStorage.setItem('theme', theme); } catch(e) {}
    }

    function applyTheme(theme) {
        html.setAttribute('data-theme', theme);
        document.body.setAttribute('data-theme', theme);
        updateIcon(theme);
    }

    // Load saved theme or default to dark
    const savedTheme = getSavedTheme() || 'dark';
    applyTheme(savedTheme);

    themeToggle.addEventListener('click', () => {
        const current = html.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        applyTheme(next);
        saveTheme(next);
    });

    function updateIcon(theme) {
        themeIcon.className = theme === 'dark'
            ? 'fa-solid fa-moon'
            : 'fa-solid fa-sun';
    }

    // ---------- MOBILE MENU ----------
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('open');
        mobileMenu.classList.toggle('open');
        document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle.classList.remove('open');
            mobileMenu.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    // ---------- NAVBAR SCROLL BEHAVIOR ----------
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const current = window.scrollY;
        if (current > 100) {
            navbar.style.boxShadow = 'var(--shadow-sm)';
        } else {
            navbar.style.boxShadow = 'none';
        }
        lastScroll = current;
    }, { passive: true });

    // ---------- ACTIVE NAV LINK ----------
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const observerNav = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                });
            }
        });
    }, {
        rootMargin: '-40% 0px -60% 0px'
    });

    sections.forEach(section => observerNav.observe(section));

    // ---------- SCROLL ANIMATIONS ----------
    const animElements = document.querySelectorAll('[data-anim]');

    if ('IntersectionObserver' in window) {
        const observerAnim = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observerAnim.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.05,
            rootMargin: '0px 0px 50px 0px'
        });

        animElements.forEach(el => observerAnim.observe(el));
    } else {
        // Fallback: just show everything
        animElements.forEach(el => el.classList.add('visible'));
    }

    // ---------- SMOOTH SCROLL for ALL ANCHORS ----------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ---------- CONTACT FORM (basic handler) ----------
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            btn.innerHTML = 'Message Sent! <i class="fa-solid fa-check"></i>';
            btn.disabled = true;
            btn.style.opacity = '0.7';
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.disabled = false;
                btn.style.opacity = '1';
                form.reset();
            }, 3000);
        });
    }
});
