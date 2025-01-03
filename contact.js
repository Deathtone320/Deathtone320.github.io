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

    if (user && user.email) {
        const authSection = document.getElementById('auth-section');
        authSection.innerHTML = `<a href="profile.html" id="profile-btn">Logged in as ${user.email}</a>`;
    }
}

// Initialize EmailJS
(function () {
    emailjs.init("mlw1gOv3vSlu-5g1m"); // Replace with your actual EmailJS user ID
})();

// Listen for form submission
document.getElementById('contact-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submit behavior

    // Collect form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Send the form data via EmailJS
    emailjs.send("service_z7ywxbv", "template_e6cnynh", {
        user_name: name,
        user_email: email,
        message: message
    })
    .then(function (response) {
        alert('Message sent successfully!', response.status, response.text);
    }, function (error) {
        alert('Failed to send message. Please try again.', error);
    });
});
