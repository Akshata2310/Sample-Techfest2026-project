const progressBar = document.querySelector('.progress-bar');
const reveals = document.querySelectorAll('.reveal');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('#navigation a');
const statValues = document.querySelectorAll('.stat-value');
const countdownText = document.getElementById('countdownText');
const backLinks = document.querySelectorAll('.back-to-top');

const showToast = (message) => {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));
  window.setTimeout(() => {
    toast.classList.remove('show');
    window.setTimeout(() => toast.remove(), 250);
  }, 2200);
};

const updateProgress = () => {
  const scrollTop = window.scrollY;
  const height = document.documentElement.scrollHeight - window.innerHeight;
  const progress = height > 0 ? (scrollTop / height) * 100 : 0;
  if (progressBar) progressBar.style.width = `${progress}%`;
};

window.addEventListener('scroll', updateProgress, { passive: true });
updateProgress();

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.16 });

reveals.forEach((item) => revealObserver.observe(item));

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', open.toString());
  });
}

navItems.forEach((link) => {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const currentHref = link.getAttribute('href')?.split('/').pop();
  if (currentHref === currentPage) {
    link.classList.add('active');
  }
});

const targetDate = new Date('2026-12-01T00:00:00');
const updateCountdown = () => {
  if (!countdownText) return;
  const diff = targetDate - new Date();
  if (diff <= 0) {
    countdownText.textContent = 'Festival is live';
    return;
  }
  const days = Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
  const hours = Math.max(0, Math.floor((diff / (1000 * 60 * 60)) % 24));
  countdownText.textContent = `${days}d ${hours}h to go`;
};

updateCountdown();
window.setInterval(updateCountdown, 1000 * 60);

statValues.forEach((stat, index) => {
  const target = Number(stat.dataset.target || 0);
  const suffix = stat.dataset.suffix || '';
  const prefix = stat.dataset.prefix || '';
  let current = 0;
  const step = target / 40;
  const timer = window.setInterval(() => {
    current += step;
    if (current >= target) {
      stat.textContent = `${prefix}${target}${suffix}`;
      window.clearInterval(timer);
      return;
    }
    stat.textContent = `${prefix}${Math.round(current)}${suffix}`;
  }, 40 + index * 10);
});

backLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

const visits = Number(localStorage.getItem('techfestVisits') || 0) + 1;
localStorage.setItem('techfestVisits', visits);

if (visits === 1) {
  showToast('Welcome to TechFest 2026');
}
