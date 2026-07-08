const scheduleTable = document.querySelector('#schedule-table');
const search = document.createElement('input');
const download = document.createElement('button');
const timer = document.createElement('p');
const headings = document.querySelectorAll('thead th');
const rows = document.querySelectorAll('tbody tr');
const scheduleSection = document.querySelector('#schedule');

search.placeholder = 'Search schedule';
search.setAttribute('aria-label', 'Search schedule');
search.style.padding = '14px';
search.style.width = '100%';
search.style.marginBottom = '16px';
search.style.border = '1px solid #e2e8f0';
search.style.borderRadius = '999px';
search.style.fontSize = '1rem';

if (scheduleTable) {
  scheduleTable.prepend(search);
}

search.addEventListener('input', () => {
  const value = search.value.toLowerCase();
  rows.forEach((row) => {
    const text = row.textContent.toLowerCase();
    row.style.display = text.includes(value) ? 'table-row' : 'none';
  });
});

const today = new Date().getDay();
if (today >= 1 && today <= 3) {
  headings[today].style.background = '#c1121f';
  headings[today].style.color = '#ffffff';
}

download.textContent = 'Download schedule';
download.type = 'button';
download.style.padding = '12px 20px';
download.style.marginBottom = '16px';
download.style.border = 'none';
download.style.borderRadius = '999px';
download.style.background = 'linear-gradient(135deg, #c1121f, #ef4444)';
download.style.color = '#fff';
download.style.cursor = 'pointer';
download.style.fontWeight = '700';

if (scheduleTable) {
  scheduleTable.prepend(download);
}

download.addEventListener('click', () => {
  window.print();
});

timer.className = 'countdown';
timer.style.fontWeight = '700';
timer.style.color = '#c1121f';

if (scheduleSection) {
  scheduleSection.append(timer);
}

const festDate = new Date('2026-12-01');

setInterval(() => {
  const now = new Date();
  const diff = festDate - now;
  const days = Math.floor(diff / 86400000);
  timer.textContent = diff > 0 ? `Festival begins in ${days} day${days === 1 ? '' : 's'}.` : 'The festival is underway!';
}, 1000);