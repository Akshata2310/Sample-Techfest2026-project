const table = document.querySelector("table");
const search = document.createElement("input");

search.placeholder = "Search Schedule";
search.style.padding = "14px";
search.style.width = "100%";
search.style.marginBottom = "20px";
document.querySelector("#schedule-table").prepend(search);

search.addEventListener("input", () => {
  const value = search.value.toLowerCase();
  const rows = document.querySelectorAll("tbody tr");

  rows.forEach((row) => {
    const text = row.textContent.toLowerCase();
    row.style.display = text.includes(value) ? "table-row" : "none";
  });
});

const today = new Date().getDay();
const headings = document.querySelectorAll("thead th");

if (today === 1) {
  headings[1].style.background = "#c1121f";
}

if (today === 2) {
  headings[2].style.background = "#c1121f";
}

if (today === 3) {
  headings[3].style.background = "#c1121f";
}

const download = document.createElement("button");
download.textContent = "Download Schedule";
download.style.padding = "12px 20px";
download.style.marginBottom = "20px";
document.querySelector("#schedule-table").prepend(download);

download.addEventListener("click", () => {
  window.print();
});

const timer = document.createElement("h3");
document.querySelector("#schedule").append(timer);

const festDate = new Date("2026-12-01");

setInterval(() => {
  const now = new Date();
  const diff = festDate - now;
  const days = Math.floor(diff / 86400000);
  timer.textContent = `Festival starts in ${days} days`;
}, 1000);