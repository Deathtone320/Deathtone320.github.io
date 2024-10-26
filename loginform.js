// Load the header and nav from the external file
fetch('header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('header-container').innerHTML = data;
        updateLoginState(); // Call the function to check login state after loading the header
    })
    .catch(error => console.error('Error loading header:', error));

// Firebase Authentication Logic

// Handle email/password sign-up
document.getElementById('signup-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log('User signed up:', user);
            alert('User signed up successfully!');
            localStorage.setItem('user', JSON.stringify({ email: user.email })); // Save user info in localStorage
            window.location.href = "index.html"; // Redirect to homepage after sign-up
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error('Error signing up:', errorCode, errorMessage);
            alert(errorMessage);
        });
});

// Google Sign-In setup
const provider = new firebase.auth.GoogleAuthProvider();

document.getElementById('google-signin-btn').addEventListener('click', () => {
    firebase.auth().signInWithPopup(provider)
        .then((result) => {
            const user = result.user;
            console.log('Google sign-in successful:', user);
            alert('Google sign-in successful!');
            localStorage.setItem('user', JSON.stringify({ email: user.email })); // Save user info in localStorage
            window.location.href = "index.html"; // Redirect to homepage after Google sign-in
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error('Google sign-in error:', errorCode, errorMessage);
            alert(errorMessage);
        });
});
