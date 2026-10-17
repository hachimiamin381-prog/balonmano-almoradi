(function () {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');
  const links = document.querySelectorAll('.site-nav a');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    links.forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Resalta la sección visible en la navegación
  const sections = Array.from(document.querySelectorAll('section[id], header[id]'));
  const navLinks = Array.from(document.querySelectorAll('.site-nav a[href^="#"]'));

  if ('IntersectionObserver' in window && sections.length) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          const id = entry.target.id;
          navLinks.forEach(function (l) {
            l.classList.toggle('active', l.getAttribute('href') === '#' + id);
          });
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach(function (s) { observer.observe(s); });
  }

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Logo flotante en la esquina: aparece al hacer scroll
  const cornerLogo = document.querySelector('.corner-logo');
  if (cornerLogo) {
    const toggleCorner = function () {
      cornerLogo.classList.toggle('visible', window.scrollY > 450);
    };
    window.addEventListener('scroll', toggleCorner, { passive: true });
    toggleCorner();
  }
})();
