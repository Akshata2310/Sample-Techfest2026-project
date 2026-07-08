const progressBar = document.querySelector('.progress-bar');
const revealItems = document.querySelectorAll('.reveal');
const searchInput = document.getElementById('eventSearch');
const filterButtons = document.querySelectorAll('.chip');
const eventCards = Array.from(document.querySelectorAll('.card--event'));
const counter = document.getElementById('eventCounter');
const modal = document.getElementById('eventModal');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('#navigation a');

const updateProgress = () => {
  const scrollTop = window.scrollY;
  const height = document.documentElement.scrollHeight - window.innerHeight;
  const progress = height > 0 ? (scrollTop / height) * 100 : 0;
  if (progressBar) progressBar.style.width = `${progress}%`;
};

window.addEventListener('scroll', updateProgress, { passive: true });
updateProgress();

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0,
  rootMargin: '0px 0px 50px 0px'
 });

revealItems.forEach((item) => observer.observe(item));

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

let activeFilter = 'all';
let activeQuery = '';

const applyFilters = () => {
  let visible = 0;
  eventCards.forEach((card) => {
    const parent = card.closest('li') || card;
    const category = card.dataset.category || '';
    const headingText = card.querySelector('h3')?.textContent.toLowerCase() || '';
    const paragraphText = card.querySelector('p')?.textContent.toLowerCase() || '';
    
    const matchesFilter = activeFilter === 'all' || category === activeFilter;
    const matchesQuery = headingText.includes(activeQuery) || paragraphText.includes(activeQuery);
    const shouldShow = matchesFilter && matchesQuery;

    if (shouldShow) {
      parent.classList.remove('is-hidden');
      parent.classList.add('is-visible');
      card.classList.add('is-visible');
      visible += 1;
    } else {
      parent.classList.add('is-hidden');
      parent.classList.remove('is-visible');
    }
  });
  if (counter) counter.textContent = `Showing ${visible} events`;
};

if (searchInput) {
  searchInput.addEventListener('input', (event) => {
    activeQuery = event.target.value.trim().toLowerCase();
    applyFilters();
  });
}

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((item) => item.classList.remove('is-active'));
    button.classList.add('is-active');
    activeFilter = button.dataset.filter || 'all';
    applyFilters();
  });
});

const quickViewButtons = document.querySelectorAll('[data-modal-open]');
quickViewButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const card = button.closest('.card--event');
    const title = card.querySelector('h3').textContent;
    const description = card.querySelector('p').textContent;
    modalTitle.textContent = title;
    modalDescription.textContent = description;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
  });
});

document.querySelector('[data-close-modal]')?.addEventListener('click', () => {
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
});

modal?.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
  }
});

const backLinks = document.querySelectorAll('.back-to-top');
backLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

applyFilters();