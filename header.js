// Load the header and nav from the external file
fetch('header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('header-container').innerHTML = data;
        updateLoginState(); // Call the function after loading the header
        addHomeforgeRedirect(); // Call the function to handle the Homeforge redirect
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

// Function to add Homeforge redirect logic
function addHomeforgeRedirect() {
    const homeforgeLink = document.getElementById('homeforge-link'); // Assuming this ID is set on the Homeforge link
    const user = JSON.parse(localStorage.getItem('user'));

    if (homeforgeLink) {
        homeforgeLink.addEventListener('click', function (e) {
            if (!user || !user.email) {
                e.preventDefault(); // Stop the link's default action
                alert('You must be logged in to access this page.');
                window.location.href = 'loginform.html'; // Redirect to login page if not logged in
            } else {
                // Allow normal navigation to Homeforge if user is logged in
                window.location.href = 'homeforge.html';
            }
        });
    }
}

// Example function for login (replace with your actual login logic)
function loginUser(email) {
    localStorage.setItem('user', JSON.stringify({ email }));
    updateLoginState();
    window.location.href = "index.html"; // Redirect to homepage after login
}
