(function () {
  const nav = document.querySelector('.site-nav');
  const toggle = document.querySelector('.site-nav__toggle');
  const links = document.querySelectorAll('.site-nav__list a');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    links.forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const animated = document.querySelectorAll('[data-animate]');
  if ('IntersectionObserver' in window && animated.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    animated.forEach((el) => observer.observe(el));
  } else {
    animated.forEach((el) => el.classList.add('is-visible'));
  }
})();
