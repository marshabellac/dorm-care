document.addEventListener('DOMContentLoaded', function () {
  // Smooth scroll untuk link internal #
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');

      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        e.preventDefault();

        targetElement.scrollIntoView({
          behavior: 'smooth',
        });
      }
    });
  });

  // Counter animation
  const counters = document.querySelectorAll('.counter');

  const animateCounter = (el) => {
    const target = +el.getAttribute('data-target');
    const prefix = el.getAttribute('data-prefix') || '';
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 2000;
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = target / steps;

    let current = 0;

    const timer = setInterval(() => {
      current += increment;

      if (current >= target) {
        el.innerText = prefix + target.toLocaleString('id-ID') + suffix;
        clearInterval(timer);
      } else {
        el.innerText = prefix + Math.floor(current).toLocaleString('id-ID') + suffix;
      }
    }, stepTime);
  };

  if (counters.length > 0) {
    const counterObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 },
    );

    counters.forEach((counter) => counterObserver.observe(counter));
  }

  // Hover tambahan untuk feature card
  const featureCards = document.querySelectorAll('.feature-card');

  featureCards.forEach(function (card) {
    card.addEventListener('mouseenter', function () {
      card.classList.add('is-hovered');
    });

    card.addEventListener('mouseleave', function () {
      card.classList.remove('is-hovered');
    });
  });
});
