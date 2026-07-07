const events = document.querySelectorAll(".card--event");
const search = document.createElement("input");

search.placeholder = "Search Events";
search.style.width = "100%";
search.style.padding = "15px";
search.style.marginBottom = "25px";

document.querySelector(".featured-events").prepend(search);

search.addEventListener("input", () => {
  const value = search.value.toLowerCase();

  events.forEach((event) => {
    const title = event.querySelector("h3").textContent.toLowerCase();
    event.parentElement.style.display = title.includes(value) ? "block" : "none";
  });
});

events.forEach((card) => {
  const button = document.createElement("button");
  button.textContent = "★ Favorite";
  button.style.marginTop = "15px";
  card.append(button);

  button.addEventListener("click", () => {
    localStorage.setItem("favorite", card.id);
    button.textContent = "✓ Saved";
  });
});

const fav = localStorage.getItem("favorite");

if (fav) {
  const saved = document.getElementById(fav);

  if (saved) {
    saved.style.border = "3px solid gold";
  }
}

const count = document.createElement("h3");
count.textContent = `Total Events : ${events.length}`;
document.querySelector(".featured-events").prepend(count);

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0px)";
    }
  });
});

events.forEach((card) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(40px)";
  card.style.transition = ".6s";
  observer.observe(card);
});
