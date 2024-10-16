document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get the form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Send the email using EmailJS
    emailjs.send("service_z7ywxbv", "template_e6cnynh", templateParams, "mlw1gOv3vSlu-5g1m");{
        from_name: "Test Name,
        from_email: test@example.com,
        message: Test Message
        }).then(function(response) {
    console.log("SUCCESS", response.status, response.text);
    }, function(error) {
    console.log("FAILED", error);
    });
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
