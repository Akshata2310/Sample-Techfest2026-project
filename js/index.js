const cards = document.querySelectorAll("section");
const visits = Number(localStorage.getItem("visits")) || 0;

localStorage.setItem("visits", visits + 1);

if (visits === 0) {
  alert("Welcome to TechFest 2026 🎉");
}

const visitor = document.createElement("p");
visitor.textContent = `Visits : ${visits + 1}`;
document.querySelector("footer").append(visitor);

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));

    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0px)";
    }
  });
}, {
  threshold: 0.2
});

cards.forEach((card) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(30px)";
  card.style.transition = "0.6s";
  observer.observe(card);
});

const year = new Date().getFullYear();
const p = document.createElement("p");
p.textContent = `© ${year} TechFest`;
document.querySelector("footer").append(p);
