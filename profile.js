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


// Load custom heroes and monsters for the current user
function loadCustomDataForProfile() {
    const user = firebase.auth().currentUser;
    if (user) {
        const uid = user.uid;

        // Load custom heroes
        const customHeroesRef = firebase.database().ref(`users/${uid}/heroes`);
        customHeroesRef.once('value', snapshot => {
            const heroes = snapshot.val();
            if (heroes) {
                displayCustomHeroesInProfile(heroes);
            }
        });

        // Load custom monsters
        const customMonstersRef = firebase.database().ref(`users/${uid}/monsters`);
        customMonstersRef.once('value', snapshot => {
            const monsters = snapshot.val();
            if (monsters) {
                displayCustomMonstersInProfile(monsters);
            }
        });
    }
}

// Function to display custom heroes in the profile
function displayCustomHeroesInProfile(heroes) {
    const customHeroList = document.getElementById('custom-hero-list');
    customHeroList.innerHTML = ''; // Clear the list

    for (const heroId in heroes) {
        const hero = heroes[heroId];
        const heroItem = document.createElement('li');
        heroItem.textContent = hero.name;
        heroItem.addEventListener('contextmenu', function (event) {
            event.preventDefault();
            showEditDeleteOptions('hero', heroId, hero);
        });
        customHeroList.appendChild(heroItem);
    }
}

// Function to display custom monsters in the profile
function displayCustomMonstersInProfile(monsters) {
    const customMonsterList = document.getElementById('custom-monster-list');
    customMonsterList.innerHTML = ''; // Clear the list

    for (const monsterId in monsters) {
        const monster = monsters[monsterId];
        const monsterItem = document.createElement('li');
        monsterItem.textContent = monster.name;
        monsterItem.addEventListener('contextmenu', function (event) {
            event.preventDefault();
            showEditDeleteOptions('monster', monsterId, monster);
        });
        customMonsterList.appendChild(monsterItem);
    }
}

// Show edit/delete options when right-clicking
function showEditDeleteOptions(type, id, data) {
    const action = confirm(`Would you like to edit or delete this ${type}?`);

    if (action) {
        // Proceed with editing
        localStorage.setItem(`${type}-edit`, JSON.stringify({ id, data }));
        window.location.href = `create${type}.html`; // Navigate to edit page
    } else {
        // Proceed with deleting
        deleteCustomItem(type, id);
    }
}

// Delete the custom hero or monster
function deleteCustomItem(type, id) {
    const user = firebase.auth().currentUser;
    if (user) {
        const uid = user.uid;
        const ref = firebase.database().ref(`users/${uid}/${type}s/${id}`);
        ref.remove()
            .then(() => alert(`${type.charAt(0).toUpperCase() + type.slice(1)} deleted successfully`))
            .catch(error => console.error(`Error deleting ${type}:`, error));
    }
}

// Load data when page is loaded
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        loadCustomDataForProfile();
    } else {
        window.location.href = 'loginform.html'; // Redirect if not logged in
    }
});
