const form = document.querySelector("form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const resume = document.getElementById("resume");
const eventBoxes = document.querySelectorAll('input[name="events"]');
const submitBtn = document.querySelector('input[type="submit"]');

function message(text, color) {
  let box = document.getElementById("msg");

  if (!box) {
    box = document.createElement("div");
    box.id = "msg";
    form.prepend(box);
  }

  box.textContent = text;
  box.style.padding = "15px";
  box.style.marginBottom = "20px";
  box.style.borderRadius = "10px";
  box.style.fontWeight = "600";
  box.style.background = color;
}

nameInput.addEventListener("input", () => {
  nameInput.value = nameInput.value.replace(/[^a-zA-Z\s]/g, "");
});

phoneInput.addEventListener("input", () => {
  phoneInput.value = phoneInput.value.replace(/\D/g, "");

  if (phoneInput.value.length > 10) {
    phoneInput.value = phoneInput.value.slice(0, 10);
  }
});

emailInput.addEventListener("blur", () => {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (emailInput.value !== "" && !pattern.test(emailInput.value)) {
    message("Invalid Email Address", "#fee2e2");
  }
});

resume.addEventListener("change", () => {
  const file = resume.files[0];

  if (file && file.size > 2097152) {
    message("Resume must be below 2MB", "#fee2e2");
    resume.value = "";
  }
});

eventBoxes.forEach((box) => {
  box.addEventListener("change", () => {
    const checked = document.querySelectorAll('input[name="events"]:checked');

    if (checked.length > 4) {
      box.checked = false;
      message("Maximum 4 events allowed", "#fee2e2");
    }
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const selected = document.querySelectorAll('input[name="events"]:checked');

  if (selected.length === 0) {
    message("Select at least one event", "#fee2e2");
    return;
  }

  const user = {
    name: nameInput.value,
    email: emailInput.value,
    phone: phoneInput.value,
    events: [...selected].map((e) => e.value),
    date: new Date().toLocaleString()
  };

  localStorage.setItem("registration", JSON.stringify(user));
  submitBtn.value = "Registering...";
  submitBtn.disabled = true;

  setTimeout(() => {
    message("Registration Successful 🎉", "#dcfce7");
    form.reset();
    submitBtn.disabled = false;
    submitBtn.value = "Register";
  }, 1500);
});

window.addEventListener("beforeunload", (e) => {
  const dirty = [...form.elements].some((i) => i.value !== "");

  if (dirty) {
    e.preventDefault();
    e.returnValue = "";
  }
});

const previous = JSON.parse(localStorage.getItem("registration"));

if (previous) {
  message(`Welcome back ${previous.name}`, "#dbeafe");
}
