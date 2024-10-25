// Load the header and nav from the external file
fetch('header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('header-container').innerHTML = data;
        updateLoginState(); // Call the function after loading the header
    })
    .catch(error => console.error('Error loading header:', error));

// Function to load user profile data
function loadProfile() {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.email) {
        document.getElementById('profile-info').innerText = `Logged in as: ${user.email}`;
    } else {
        document.getElementById('profile-info').innerText = "You are not logged in.";
        window.location.href = "loginform.html"; // Redirect to login if not logged in
    }
}

// Function to update login state
function updateLoginState() {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.email) {
        const authSection = document.getElementById('auth-section');
        authSection.innerHTML = `<a href="profile.html" id="profile-btn">Logged in as ${user.email}</a>`;
    }
}

// Handle logout
document.getElementById('logout-btn').addEventListener('click', function() {
    localStorage.removeItem('user'); // Remove user data
    window.location.href = "index.html"; // Redirect to home
});

// Call the function to load profile data
loadProfile();
