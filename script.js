document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get the form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Send the email using EmailJS
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
        from_name: name,
        from_email: email,
        message: message
    })
    .then(function(response) {
        // Show success message
        document.getElementById('success-message').style.display = 'block';
        document.getElementById('error-message').style.display = 'none';
        document.getElementById('contact-form').reset();
    }, function(error) {
        // Show error message
        document.getElementById('error-message').style.display = 'block';
        document.getElementById('success-message').style.display = 'none';
    });
});
