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

    if (user && user.email) {
        authSection.innerHTML = `<a href="#" id="profile-btn">Logged in as ${user.email}</a>`;
        attachRightClickMenu(); // Attach the right-click menu
    }
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
    
    // Logout functionality
    logoutOption.addEventListener('click', () => {
        localStorage.removeItem('user');
        window.location.href = 'loginform.html';
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
