// Load the header and nav from the external file
fetch('header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('header-container').innerHTML = data;
        initializeFirebase();
        updateLoginState(); // Call the function after loading the header
    })
    .catch(error => console.error('Error loading header:', error));

// Initialize Firebase
function initializeFirebase() {
    var firebaseConfig = {
        apiKey: "YOUR_API_KEY",
        authDomain: "YOUR_AUTH_DOMAIN",
        projectId: "YOUR_PROJECT_ID",
        storageBucket: "YOUR_STORAGE_BUCKET",
        messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
        appId: "YOUR_APP_ID"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
}

// Function to update login state using Firebase
function updateLoginState() {
    firebase.auth().onAuthStateChanged(user => {
        const authSection = document.getElementById('auth-section');

        if (authSection) {
            if (user) {
                authSection.innerHTML = `<a href="#" id="profile-btn">Logged in as ${user.email}</a>`;
                attachRightClickMenu(); // Attach the right-click menu
            } else {
                authSection.innerHTML = '<a href="loginform.html" id="login-btn">Log In</a>';
            }
        }
    });
}

// Right-click menu for logout
function attachRightClickMenu() {
    const profileBtn = document.getElementById('profile-btn');
    const contextMenu = document.createElement('div');
    
    contextMenu.id = 'profile-context-menu';
    contextMenu.style.position = 'absolute';
    contextMenu.style.display = 'none';
    contextMenu.style.backgroundColor = '#444';
    contextMenu.style.padding = '10px';
    contextMenu.style.color = '#fff';
    contextMenu.style.borderRadius = '5px';
    contextMenu.style.boxShadow = '0 0 10px rgba(0,0,0,0.5)';

    const logoutOption = document.createElement('div');
    logoutOption.textContent = 'Logout';
    logoutOption.style.cursor = 'pointer';
    
    // Logout functionality with Firebase
    logoutOption.addEventListener('click', () => {
        firebase.auth().signOut().then(() => {
            console.log('Logged out!');
            updateLoginState(); // Update the UI state after logout
        }).catch(error => {
            console.error('Logout failed:', error);
        });
    });

    contextMenu.appendChild(logoutOption);
    document.body.appendChild(contextMenu);

    // Right-click event on profile button
    profileBtn.addEventListener('contextmenu', (e) => {
        e.preventDefault(); // Prevent the default context menu
        contextMenu.style.display = 'block';
        contextMenu.style.top = `${e.pageY}px`;
        contextMenu.style.left = `${e.pageX}px`;
    });

    // Click anywhere else to close the menu
    document.addEventListener('click', (e) => {
        if (!contextMenu.contains(e.target) && e.target !== profileBtn) {
            contextMenu.style.display = 'none';
        }
    });
}
