const form = document.querySelector("form");
const name = document.getElementById("name");
const email = document.getElementById("email");
const messageBox = document.getElementById("message");
const submit = document.querySelector('input[type="submit"]');
const counter = document.createElement("small");

counter.style.display = "block";
counter.style.marginTop = "10px";
counter.style.color = "#64748b";
messageBox.after(counter);
counter.textContent = "0/500";

messageBox.addEventListener("input", () => {
  counter.textContent = `${messageBox.value.length}/500`;

  if (messageBox.value.length > 500) {
    messageBox.value = messageBox.value.slice(0, 500);
  }
});

name.addEventListener("input", () => {
  name.value = name.value.replace(/[^a-zA-Z\s]/g, "");
});

email.addEventListener("blur", () => {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (email.value !== "" && !pattern.test(email.value)) {
    alert("Invalid Email");
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const feedback = {
    name: name.value,
    email: email.value,
    message: messageBox.value,
    date: new Date().toLocaleString()
  };

  let list = JSON.parse(localStorage.getItem("feedback")) || [];
  list.push(feedback);
  localStorage.setItem("feedback", JSON.stringify(list));

  submit.value = "Submitting...";
  submit.disabled = true;

  setTimeout(() => {
    alert("Feedback Submitted Successfully");
    form.reset();
    counter.textContent = "0/500";
    submit.value = "Submit Feedback";
    submit.disabled = false;
  }, 1200);
});

const faqs = document.querySelectorAll("details");

faqs.forEach((item) => {
  item.addEventListener("toggle", () => {
    if (item.open) {
      faqs.forEach((other) => {
        if (other !== item) {
          other.open = false;
        }
      });
    }
  });
});