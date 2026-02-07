/**
 * ProxiGate - Main JavaScript
 * Mobile menu, smooth scroll, header scroll effect, spec toggles, scroll animations
 */

(function () {
  'use strict';

  // ── Mobile Menu Toggle ──────────────────────────────────────────
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const iconOpen = document.getElementById('menu-icon-open');
  const iconClose = document.getElementById('menu-icon-close');

  function toggleMenu() {
    const isOpen = !mobileMenu.classList.contains('hidden');
    mobileMenu.classList.toggle('hidden');
    iconOpen.classList.toggle('hidden');
    iconClose.classList.toggle('hidden');
    menuBtn.setAttribute('aria-expanded', !isOpen);
  }

  menuBtn.addEventListener('click', toggleMenu);

  // Close mobile menu on nav link click
  mobileMenu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      if (!mobileMenu.classList.contains('hidden')) {
        toggleMenu();
      }
    });
  });

  // ── Header Scroll Effect ────────────────────────────────────────
  const header = document.getElementById('header');
  let lastScrollY = 0;

  function onScroll() {
    const scrollY = window.scrollY;

    if (scrollY > 50) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }

    lastScrollY = scrollY;
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load

  // ── Tech Specs Toggle ───────────────────────────────────────────
  document.querySelectorAll('.spec-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var targetId = btn.getAttribute('data-target');
      var content = document.getElementById(targetId);
      var chevron = btn.querySelector('.spec-chevron');
      var isOpen = !content.classList.contains('hidden');

      if (isOpen) {
        content.classList.add('hidden');
        chevron.classList.remove('rotate-180');
      } else {
        content.classList.remove('hidden');
        chevron.classList.add('rotate-180');
      }
    });
  });

  // ── Scroll Reveal Animations (IntersectionObserver) ─────────────
  var revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    revealElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: just show everything
    revealElements.forEach(function (el) {
      el.classList.add('revealed');
    });
  }
})();
