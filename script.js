/* ══════════════════════════════════════════
   Delta Fitness Marathon 3.0 — Script
   ══════════════════════════════════════════ */

// Intersection Observer for fade-in animations
document.addEventListener('DOMContentLoaded', function () {
  var navToggle = document.querySelector('.navbar__toggle');
  var navLinks = document.querySelector('.navbar__links');
  var navLinkItems = document.querySelectorAll('.navbar__links a');
  var fadeEls = document.querySelectorAll('.fade-in');
  var countdownDays = document.getElementById('countdownDays');
  var countdownHours = document.getElementById('countdownHours');
  var countdownMinutes = document.getElementById('countdownMinutes');
  var heroCountdownDays = document.getElementById('heroCountdownDays');
  var heroCountdownHours = document.getElementById('heroCountdownHours');
  var heroCountdownMinutes = document.getElementById('heroCountdownMinutes');
  var sliderTrack = document.querySelector('.slider__track');
  var sliderPrev = document.getElementById('sliderPrev');
  var sliderNext = document.getElementById('sliderNext');
  var faqButtons = document.querySelectorAll('.faq__question');

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

  if (countdownDays && countdownHours && countdownMinutes) {
    // 27 Mar 2026, 18:00 IST = 27 Mar 2026, 12:30 UTC
    var closeDeadlineUtc = Date.UTC(2026, 2, 27, 12, 30, 0);

    function pad2(value) {
      return value < 10 ? '0' + value : String(value);
    }

    function updateCountdown() {
      var now = Date.now();
      var diffMs = closeDeadlineUtc - now;

      if (diffMs <= 0) {
        countdownDays.textContent = '00';
        countdownHours.textContent = '00';
        countdownMinutes.textContent = '00';
        return;
      }

      var totalMinutes = Math.floor(diffMs / 60000);
      var days = Math.floor(totalMinutes / (24 * 60));
      var hours = Math.floor((totalMinutes % (24 * 60)) / 60);
      var minutes = totalMinutes % 60;

      countdownDays.textContent = pad2(days);
      countdownHours.textContent = pad2(hours);
      countdownMinutes.textContent = pad2(minutes);

      if (heroCountdownDays && heroCountdownHours && heroCountdownMinutes) {
        heroCountdownDays.textContent = pad2(days);
        heroCountdownHours.textContent = pad2(hours);
        heroCountdownMinutes.textContent = pad2(minutes);
      }
    }

    updateCountdown();
    setInterval(updateCountdown, 30000);
  }

  if (sliderTrack && sliderPrev && sliderNext) {
    var slides = sliderTrack.querySelectorAll('.slider__img');
    var currentSlide = 0;

    function updateSlider() {
      sliderTrack.style.transform = 'translateX(' + (-currentSlide * 100) + '%)';
    }

    sliderPrev.addEventListener('click', function () {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      updateSlider();
    });

    sliderNext.addEventListener('click', function () {
      currentSlide = (currentSlide + 1) % slides.length;
      updateSlider();
    });

    setInterval(function () {
      currentSlide = (currentSlide + 1) % slides.length;
      updateSlider();
    }, 4000);
  }

  if (faqButtons.length > 0) {
    faqButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        var item = button.closest('.faq__item');
        var isOpen = item.classList.contains('is-open');

        faqButtons.forEach(function (btn) {
          btn.setAttribute('aria-expanded', 'false');
          btn.closest('.faq__item').classList.remove('is-open');
        });

        if (!isOpen) {
          item.classList.add('is-open');
          button.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }
});
