/* ══════════════════════════════════════════
   Delta Fitness Marathon 3.0 — Script
   ══════════════════════════════════════════ */

// Intersection Observer for fade-in animations
document.addEventListener('DOMContentLoaded', function () {
  var navToggle = document.querySelector('.navbar__toggle');
  var navLinks = document.querySelector('.navbar__links');
  var navLinkItems = document.querySelectorAll('.navbar__links a');
  var fadeEls = document.querySelectorAll('.fade-in');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      var isOpen = navLinks.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    navLinkItems.forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    fadeEls.forEach(function (el) { observer.observe(el); });
  } else {
    // Fallback: show everything
    fadeEls.forEach(function (el) { el.classList.add('visible'); });
  }
});
