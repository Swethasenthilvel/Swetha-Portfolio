const form = document.querySelector('.contact-form');
const successMessage = document.getElementById('success-message');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(form);

  fetch(form.action, {
    method: 'POST',
    body: formData,
    headers: {
      'Accept': 'application/json'
    }
  })
  .then((response) => {
    if (response.ok) {
      successMessage.style.display = 'block';
      successMessage.classList.add('show');
      successMessage.innerText = 'Message sent successfully!';
      form.reset();

      // Optionally hide the message after 5 seconds
      setTimeout(() => {
        successMessage.classList.remove('show');
        successMessage.style.display = 'none';
      }, 5000);
    } else {
      return response.json().then(data => {
        throw new Error(data.message || 'Form submission failed.');
      });
    }
  })
  .catch((error) => {
    console.error(error);
    successMessage.style.display = 'block';
    successMessage.classList.add('show');
    successMessage.innerText = 'Something went wrong. Please try again later.';
    successMessage.style.color = 'red';
  });
});