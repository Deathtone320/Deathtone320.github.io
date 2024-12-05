// Load the header and nav from the external file
fetch('header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('header-container').innerHTML = data;
        updateLoginState(); // Call the function after loading the header
    })
    .catch(error => console.error('Error loading header:', error));

// Function to update login state
function updateLoginState() {
    const user = JSON.parse(localStorage.getItem('user')); // Assuming user data is stored in localStorage

    const authSection = document.getElementById('auth-section');
    if (authSection) {
        if (user && user.email) {
            authSection.innerHTML = `<a href="profile.html" id="profile-btn" aria-label="View your profile">Logged in as ${user.email}</a>`;
        } else {
            authSection.innerHTML = '<a href="login.html" id="login-btn" aria-label="Log in">Log In</a>';
        }
    }
}

// Initialize EmailJS
(function() {
    emailjs.init("mlw1gOv3vSlu-5g1m"); // Replace with your actual EmailJS user ID
})();

// Helper function for email validation
function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return emailRegex.test(email);
}

// Listen for form submission
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submit behavior

    let isValid = true;

    // Cache DOM elements for better performance
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    // Clear previous error messages
    const errors = ['nameError', 'emailError', 'messageError'];
    errors.forEach(id => {
        const errorElement = document.getElementById(id);
        if (errorElement) errorElement.innerHTML = '';
    });

    // Validation
    if (nameInput.value.trim() === '') {
        const nameError = document.getElementById('nameError');
        if (nameError) nameError.innerHTML = 'Name is required.';
        isValid = false;
    }

    if (!validateEmail(emailInput.value)) {
        const emailError = document.getElementById('emailError');
        if (emailError) emailError.innerHTML = 'Please enter a valid email address.';
        isValid = false;
    }

    if (messageInput.value.trim() === '' || messageInput.value.length > 500) {
        const messageError = document.getElementById('messageError');
        if (messageError) messageError.innerHTML = 'Message must be between 1 and 500 characters.';
        isValid = false;
    }

    // If validation passed, send the form data via EmailJS
    if (isValid) {
        console.log('Sending email with:', {
            user_name: nameInput.value,
            user_email: emailInput.value,
            message: messageInput.value
        });

        emailjs.send("service_z7ywywv", "template_e6cnynh", {
            user_name: nameInput.value,
            user_email: emailInput.value,
            message: messageInput.value
        })
        .then(function(response) {
            console.log('EmailJS response:', response);
            alert('Message sent successfully!');
            // Optionally, reset the form here or show a success message on the page
            this.reset(); // Reset the form
        }.bind(this), function(error) {
            console.error('EmailJS error:', error);
            alert('Failed to send message. Please try again.', error);
        });
    } else {
        console.log('Form validation failed. Not sending email.');
    }
});
