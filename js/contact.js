const form = document.querySelector('form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageBox = document.getElementById('message');
const submit = document.querySelector('input[type="submit"]');
const counter = document.createElement('small');

if (messageBox) {
  counter.style.display = 'block';
  counter.style.marginTop = '10px';
  counter.style.color = '#64748b';
  messageBox.after(counter);
  counter.textContent = '0/500';

  messageBox.addEventListener('input', () => {
    counter.textContent = `${messageBox.value.length}/500`;

    if (messageBox.value.length > 500) {
      messageBox.value = messageBox.value.slice(0, 500);
    }
  });
}

if (nameInput) {
  nameInput.addEventListener('input', () => {
    nameInput.value = nameInput.value.replace(/[^a-zA-Z\s]/g, '');
  });
}

if (emailInput) {
  emailInput.addEventListener('blur', () => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailInput.value !== '' && !pattern.test(emailInput.value)) {
      alert('Invalid email');
    }
  });
}

if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const feedback = {
      name: nameInput.value,
      email: emailInput.value,
      message: messageBox.value,
      date: new Date().toLocaleString()
    };

    const list = JSON.parse(localStorage.getItem('feedback')) || [];
    list.push(feedback);
    localStorage.setItem('feedback', JSON.stringify(list));

    submit.value = 'Submitting...';
    submit.disabled = true;

    setTimeout(() => {
      alert('Feedback submitted successfully');
      form.reset();
      counter.textContent = '0/500';
      submit.value = 'Submit Feedback';
      submit.disabled = false;
    }, 1200);
  });
}

const faqs = document.querySelectorAll('details');

faqs.forEach((item) => {
  item.addEventListener('toggle', () => {
    if (item.open) {
      faqs.forEach((other) => {
        if (other !== item) {
          other.open = false;
        }
      });
    }
  });
});