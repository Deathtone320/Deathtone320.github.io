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

// Example function for login (replace with your actual login logic)
function loginUser(email) {
    localStorage.setItem('user', JSON.stringify({ email }));
    updateLoginState();
    window.location.href = "index.html"; // Redirect to homepage after login
}
