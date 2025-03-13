function php_email_form_submit(thisForm, action, formData) {
  fetch(action, {
      method: 'POST',
      body: formData,
      headers: {'X-Requested-With': 'XMLHttpRequest'}
  })
  .then(response => {
      if( response.ok ) {
          return response.text();
      } else {
          throw new Error(`${response.status} ${response.statusText} ${response.url}`);
      }
  })
  .then(data => {
      thisForm.querySelector('.loading').classList.remove('d-block');
      if (data.trim() == 'OK') {
          thisForm.querySelector('.sent-message').classList.add('d-block');
          thisForm.reset();
          // Redirect to email
          window.location.href = "mailto:swethasksn@gmail.com?subject=New Form Submission";
      } else {
          throw new Error(data ? data : 'Form submission failed and no error message returned from: ' + action);
      }
  })
  .catch((error) => {
      displayError(thisForm, error);
  });
}
