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

// Function to fetch and display user's heroes and monsters
function fetchAndDisplayUserData(userId) {
    // Fetch and display saved heroes
    firebase.firestore().collection('users').doc(userId).collection('heroes').get()
        .then((querySnapshot) => {
            const heroesList = document.getElementById('heroes-list');
            heroesList.innerHTML = ''; // Clear existing content
            querySnapshot.forEach((doc) => {
                const hero = doc.data();
                heroesList.innerHTML += `<li>${hero.name} - ${hero.race}</li>`;
            });
        });

    // Fetch and display saved monsters
    firebase.firestore().collection('users').doc(userId).collection('monsters').get()
        .then((querySnapshot) => {
            const monstersList = document.getElementById('monsters-list');
            monstersList.innerHTML = ''; // Clear existing content
            querySnapshot.forEach((doc) => {
                const monster = doc.data();
                monstersList.innerHTML += `<li>${monster.name} - ${monster.type}</li>`;
            });
        });
}

document.addEventListener('DOMContentLoaded', () => {
    // Any additional homeforge logic here
    console.log("Homeforge Loaded");
});
