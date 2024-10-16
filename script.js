document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get the form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Send the email using EmailJS
    emailjs.send(
    'service_z7ywxbv',  // Your service ID
    'template_e6cnynh', // Your template ID
    {
        from_name: name,
        from_email: email,
        message: message
    },
    'mlw1gOv3vSlu-5g1m' // Your public API key
)
.then(function(response) {
    console.log('SUCCESS!', response.status, response.text);
}, function(error) {
    console.log('FAILED...', error);
});
