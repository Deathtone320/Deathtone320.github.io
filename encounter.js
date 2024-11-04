// Load the header and nav from the external file
fetch('header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('header-container').innerHTML = data;
        updateLoginState(); // Call the function after loading the header
    })
    .catch(error => console.error('Error loading header:', error));

// JavaScript for Encounter Builder functionality
document.addEventListener('DOMContentLoaded', function () {
    const encounterList = document.getElementById('encounter-list');
    const popup = document.getElementById('popup');
    const popupHero = document.getElementById('popup-hero');
    const popupContent = document.getElementById('popup-content');
    const popupHeroContent = document.getElementById('popup-hero-content');
    const contextMenu = document.getElementById('context-menu');
    let selectedItem = null;
    let showingFront = true;

    // Ensure Firebase is available before attempting to use it
    if (typeof firebase !== 'undefined') {
        // Firebase auth check
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // User is logged in, show custom checkboxes
                const customHeroesCheckbox = document.getElementById('custom-heroes-checkbox');
                const customMonstersCheckbox = document.getElementById('custom-monsters-checkbox');

                if (customHeroesCheckbox && customMonstersCheckbox) {
                    customHeroesCheckbox.style.display = 'inline';
                    customMonstersCheckbox.style.display = 'inline';

                    const userId = user.uid;

                    // Event listener for the custom heroes checkbox
                    customHeroesCheckbox.addEventListener('change', function() {
                        if (this.checked) {
                            fetchCustomHeroes(userId);
                        } else {
                            showDefaultHeroes();
                        }
                    });

                    // Event listener for the custom monsters checkbox
                    customMonstersCheckbox.addEventListener('change', function() {
                        if (this.checked) {
                            fetchCustomMonsters(userId);
                        } else {
                            showDefaultMonsters();
                        }
                    });
                } else {
                    console.error('Custom hero and monster checkboxes are missing.');
                }
            } else {
                // No user logged in, hide custom checkboxes if present
                const customHeroesCheckbox = document.getElementById('custom-heroes-checkbox');
                const customMonstersCheckbox = document.getElementById('custom-monsters-checkbox');

                if (customHeroesCheckbox) customHeroesCheckbox.style.display = 'none';
                if (customMonstersCheckbox) customMonstersCheckbox.style.display = 'none';
            }
        });
    } else {
        console.error("Firebase is not defined. Ensure Firebase is properly initialized before running this script.");
    }

    // Check if all required elements are present before adding event listeners
    if (!encounterList || !popup || !popupHero || !contextMenu) {
        console.error('Some required DOM elements are missing. Aborting.');
        return;
    }

    // Close popup for monsters
    const popupCloseBtn = document.getElementById('popup-close');
    if (popupCloseBtn) {
        popupCloseBtn.addEventListener('click', function () {
            popup.style.display = 'none';
        });
    }

    // Close popup for heroes
    const popupHeroCloseBtn = document.getElementById('popup-hero-close');
    if (popupHeroCloseBtn) {
        popupHeroCloseBtn.addEventListener('click', function () {
            popupHero.style.display = 'none';
        });
    }

    // Reset button functionality with confirmation popup
    const resetBtn = document.getElementById('reset-btn');
    if (resetBtn) {
        resetBtn.addEventListener('click', function () {
            if (confirm("Are you sure you want to reset the encounter list?")) {
                const items = Array.from(encounterList.children);
                items.forEach(item => {
                    item.classList.add('fade-out');
                    setTimeout(() => item.remove(), 500);
                });
            }
        });
    }
});
	
	// Images for Heroes and Monsters
const images = {
    Berserker: {
        front: 'https://raw.githubusercontent.com/Deathtone320/Deathtone320.github.io/refs/heads/main/images/Heroes/Berserker%20v3%20Front-TGC-Rotated.png',
        back: 'https://raw.githubusercontent.com/Deathtone320/Deathtone320.github.io/refs/heads/main/images/Heroes/heroback%20New-TGC-Rotated.png'
    },
    Druid: {
        front: 'https://raw.githubusercontent.com/Deathtone320/Deathtone320.github.io/refs/heads/main/images/Heroes/Druid%20v3%20Front-TGC-Rotated.png',
        back: 'https://raw.githubusercontent.com/Deathtone320/Deathtone320.github.io/refs/heads/main/images/Heroes/heroback%20New-TGC-Rotated.png'
    },
    Researcher: {
        front: 'https://raw.githubusercontent.com/Deathtone320/Deathtone320.github.io/refs/heads/main/images/Heroes/Researcher%20v3%20Front-TGC-Rotated.png',
        back: 'https://raw.githubusercontent.com/Deathtone320/Deathtone320.github.io/refs/heads/main/images/Heroes/heroback%20New-TGC-Rotated.png'
    },
    Thief: {
        front: 'https://raw.githubusercontent.com/Deathtone320/Deathtone320.github.io/refs/heads/main/images/Heroes/Thief%20v3%20Front-TGC-Rotated.png',
        back: 'https://raw.githubusercontent.com/Deathtone320/Deathtone320.github.io/refs/heads/main/images/Heroes/heroback%20New-TGC-Rotated.png'
    },
    Blacksmith: {
        front: 'https://raw.githubusercontent.com/Deathtone320/Deathtone320.github.io/refs/heads/main/images/Heroes/Blacksmith%20v3%20Front-TGC-Rotated.png',
        back: 'https://raw.githubusercontent.com/Deathtone320/Deathtone320.github.io/refs/heads/main/images/Heroes/heroback%20New-TGC-Rotated.png'
    },
    Bladeward: {
        front: 'https://raw.githubusercontent.com/Deathtone320/Deathtone320.github.io/refs/heads/main/images/Heroes/Bladeward%20v3%20Front-TGC-Rotated.png',
        back: 'https://raw.githubusercontent.com/Deathtone320/Deathtone320.github.io/refs/heads/main/images/Heroes/heroback%20New-TGC-Rotated.png'
    },
    Blademaster: {
        front: 'https://raw.githubusercontent.com/Deathtone320/Deathtone320.github.io/refs/heads/main/images/Heroes/Blademaster%20v3%20Front-TGC-Rotated.png',
        back: 'https://raw.githubusercontent.com/Deathtone320/Deathtone320.github.io/refs/heads/main/images/Heroes/heroback%20New-TGC-Rotated.png'
    },
    Engineer: {
        front: 'https://raw.githubusercontent.com/Deathtone320/Deathtone320.github.io/refs/heads/main/images/Heroes/Engineer%20v3%20Front-TGC-Rotated.png',
        back: 'https://raw.githubusercontent.com/Deathtone320/Deathtone320.github.io/refs/heads/main/images/Heroes/heroback%20New-TGC-Rotated.png'
    },
    Hunter: {
        front: 'https://raw.githubusercontent.com/Deathtone320/Deathtone320.github.io/refs/heads/main/images/Heroes/Hunter%20v3%20Front-TGC-Rotated.png',
        back: 'https://raw.githubusercontent.com/Deathtone320/Deathtone320.github.io/refs/heads/main/images/Heroes/heroback%20New-TGC-Rotated.png'
    },
    Mage: {
        front: 'https://raw.githubusercontent.com/Deathtone320/Deathtone320.github.io/refs/heads/main/images/Heroes/Mage%20v3%20Front-TGC-Rotated.png',
        back: 'https://raw.githubusercontent.com/Deathtone320/Deathtone320.github.io/refs/heads/main/images/Heroes/heroback%20New-TGC-Rotated.png'
    },
    Merchant: {
        front: 'https://raw.githubusercontent.com/Deathtone320/Deathtone320.github.io/refs/heads/main/images/Heroes/Merchant%20v3%20Front-TGC-Rotated.png',
        back: 'https://raw.githubusercontent.com/Deathtone320/Deathtone320.github.io/refs/heads/main/images/Heroes/heroback%20New-TGC-Rotated.png'
    },
    Rogue: {
        front: 'https://raw.githubusercontent.com/Deathtone320/Deathtone320.github.io/refs/heads/main/images/Heroes/Rogue%20v3%20Front-TGC-Rotated.png',
        back: 'https://raw.githubusercontent.com/Deathtone320/Deathtone320.github.io/refs/heads/main/images/Heroes/heroback%20New-TGC-Rotated.png'
    },
    Shaman: {
        front: 'https://raw.githubusercontent.com/Deathtone320/Deathtone320.github.io/refs/heads/main/images/Heroes/Shaman%20v3%20Front-TGC-Rotated.png',
        back: 'https://raw.githubusercontent.com/Deathtone320/Deathtone320.github.io/refs/heads/main/images/Heroes/heroback%20New-TGC-Rotated.png'
    },
    Stonewall: {
        front: 'https://raw.githubusercontent.com/Deathtone320/Deathtone320.github.io/refs/heads/main/images/Heroes/Stonewall%20v3%20Front-TGC-Rotated.png',
        back: 'https://raw.githubusercontent.com/Deathtone320/Deathtone320.github.io/refs/heads/main/images/Heroes/heroback%20New-TGC-Rotated.png'
    },
    Commander: {
        front: 'https://raw.githubusercontent.com/Deathtone320/Deathtone320.github.io/refs/heads/main/images/Heroes/Commander%20v3%20Front-TGC-Rotated.png',
        back: 'https://raw.githubusercontent.com/Deathtone320/Deathtone320.github.io/refs/heads/main/images/Heroes/heroback%20New-TGC-Rotated.png'
    },
    Goblin: {
        front: 'https://raw.githubusercontent.com/Deathtone320/Deathtone320.github.io/refs/heads/main/images/Monster/Goblin/Monster%20Card%20Goblin%20Front%20V2%20TGC.png',
        back: 'https://raw.githubusercontent.com/Deathtone320/Deathtone320.github.io/refs/heads/main/images/Monster/Goblin/Monster%20Card%20Goblin%20Back%20TGC.png'
    },
    Orc: {
        front: 'https://raw.githubusercontent.com/Deathtone320/Deathtone320.github.io/refs/heads/main/images/Monster/Orc/Monster%20Card%20Orc%20Front%20V2%20TGC.png',
        back: 'https://raw.githubusercontent.com/Deathtone320/Deathtone320.github.io/refs/heads/main/images/Monster/Orc/Monster%20Card%20Orc%20Back%20TGC.png'
    },
    Abomination: {
        front: 'https://raw.githubusercontent.com/Deathtone320/Deathtone320.github.io/refs/heads/main/images/Monster/Abomination/Monster%20Card%20Abomination%20Front%20V2%20TGC.png',
        back: 'https://raw.githubusercontent.com/Deathtone320/Deathtone320.github.io/refs/heads/main/images/Monster/Abomination/Monster%20Card%20Abomination%20Back%20TGC.png'
    },
    DreadWarrior: {
        front: 'https://raw.githubusercontent.com/Deathtone320/Deathtone320.github.io/refs/heads/main/images/Monster/Dread%20Warrior/Monster%20Card%20Dread%20Warrior%20Front%20V2%20TGC.png',
        back: 'https://raw.githubusercontent.com/Deathtone320/Deathtone320.github.io/refs/heads/main/images/Monster/Dread%20Warrior/Monster%20Card%20Dread%20Warrior%20Back%20TGC.png'
    },
    Gargoyle: {
        front: 'https://raw.githubusercontent.com/Deathtone320/Deathtone320.github.io/refs/heads/main/images/Monster/Gargoyle/Monster%20Card%20Gargoyle%20Front%20V2%20TGC.png',
        back: 'https://raw.githubusercontent.com/Deathtone320/Deathtone320.github.io/refs/heads/main/images/Monster/Gargoyle/Monster%20Card%20Gargoyle%20Back%20TGC.png'
    },
    Mummy: {
        front: 'https://raw.githubusercontent.com/Deathtone320/Deathtone320.github.io/refs/heads/main/images/Monster/Mummy/Monster%20Card%20Mummy%20Front%20V2%20TGC.png',
        back: 'https://raw.githubusercontent.com/Deathtone320/Deathtone320.github.io/refs/heads/main/images/Monster/Mummy/Monster%20Card%20Mummy%20Back%20TGC.png'
    },
    Skeleton: {
        front: 'https://raw.githubusercontent.com/Deathtone320/Deathtone320.github.io/refs/heads/main/images/Monster/Skeleton/Monster%20Card%20Skeleton%20Front%20V2%20TGC.png',
        back: 'https://raw.githubusercontent.com/Deathtone320/Deathtone320.github.io/refs/heads/main/images/Monster/Skeleton/Monster%20Card%20Skeleton%20Back%20TGC.png'
    },
    Zombie: {
        front: 'https://raw.githubusercontent.com/Deathtone320/Deathtone320.github.io/refs/heads/main/images/Monster/Zombie/Monster%20Card%20Zombie%20Front%20V2%20TGC.png',
        back: 'https://raw.githubusercontent.com/Deathtone320/Deathtone320.github.io/refs/heads/main/images/Monster/Zombie/Monster%20Card%20Zombie%20Back%20TGC.png'
    },
    DarkWizard: {
        front: 'https://raw.githubusercontent.com/Deathtone320/Deathtone320.github.io/refs/heads/main/images/Monster/Dark%20Wizard/Monster%20Card%20Dark%20Wizard%20Front%20TGC.png',
        back: 'https://raw.githubusercontent.com/Deathtone320/Deathtone320.github.io/refs/heads/main/images/Monster/Dark%20Wizard/Monster%20Card%20Dark%20Wizard%20Back%20TGC.png'
    },
    EarthElemental: {
        front: 'https://raw.githubusercontent.com/Deathtone320/Deathtone320.github.io/refs/heads/main/images/Monster/Earth%20Elemental/Summon-Card-Earth-Elemental-Front-TGC.png',
        back: 'https://raw.githubusercontent.com/Deathtone320/Deathtone320.github.io/refs/heads/main/images/Monster/Earth%20Elemental/Summon-Card-Earth-Elemental-Back-TGC.png'
    },
    FireElemental: {
        front: 'https://raw.githubusercontent.com/Deathtone320/Deathtone320.github.io/refs/heads/main/images/Monster/Fire%20Elemental/Summon-Card-Fire-Elemental-Front-TGC.png',
        back: 'https://raw.githubusercontent.com/Deathtone320/Deathtone320.github.io/refs/heads/main/images/Monster/Fire%20Elemental/Summon-Card-Fire-Elemental-Back-TGC.png'
    },
    GiantWolf: {
        front: 'https://raw.githubusercontent.com/Deathtone320/Deathtone320.github.io/refs/heads/main/images/Monster/Giant%20Wolf/Summon-Card-Giant-Wolf-Front-TGC.png',
        back: 'https://raw.githubusercontent.com/Deathtone320/Deathtone320.github.io/refs/heads/main/images/Monster/Giant%20Wolf/Summon-Card-Giant-Wolf-Back-TGC.png'
    },
    MechanicalGolem: {
        front: 'https://raw.githubusercontent.com/Deathtone320/Deathtone320.github.io/refs/heads/main/images/Monster/Mechanical%20Golem/Summon-Card-Mechanical-Golem-Front-TGC.png',
        back: 'https://raw.githubusercontent.com/Deathtone320/Deathtone320.github.io/refs/heads/main/images/Monster/Mechanical%20Golem/Summon-Card-Mechanical-Golem-Back-TGC.png'
    },
    WaterElemental: {
        front: 'https://raw.githubusercontent.com/Deathtone320/Deathtone320.github.io/refs/heads/main/images/Monster/Water%20Elemental/Summon-Card-Water-Elemental-Front-TGC.png',
        back: 'https://raw.githubusercontent.com/Deathtone320/Deathtone320.github.io/refs/heads/main/images/Monster/Water%20Elemental/Summon-Card-Water-Elemental-Back-TGC.png'
    }
};

// Global reference card images
const referenceCard = {
    front: 'https://raw.githubusercontent.com/Deathtone320/Deathtone320.github.io/refs/heads/main/images/Monster/Referance%20Card/MonstercardRulesFrontTGCRotated.png',
    back: 'https://raw.githubusercontent.com/Deathtone320/Deathtone320.github.io/refs/heads/main/images/Monster/Referance%20Card/MonstercardRulesBackTGCRotated.png'
};

    // Add hero or monster to the encounter list
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function () {
            const name = this.innerText;
            const type = this.getAttribute('data-type');
            const roll = rollD20();
            const li = document.createElement('li');
            li.textContent = `${name} (Roll: ${roll})`;
            li.setAttribute('data-roll', roll);
            li.setAttribute('data-type', type);
            encounterList.appendChild(li);

            // Sort the list after adding
            sortEncounterList();
        });
    });

    // Right-click (context menu) functionality
    encounterList.addEventListener('contextmenu', function (e) {
        e.preventDefault();
        const target = e.target;

        if (target.tagName === 'LI') {
            selectedItem = target;
            contextMenu.style.display = 'block';
            contextMenu.style.left = `${e.pageX}px`;
            contextMenu.style.top = `${e.pageY}px`;
        }
    });

    // Handle clicks outside of context menu to hide it
    document.addEventListener('click', function (e) {
        if (!contextMenu.contains(e.target)) {
            contextMenu.style.display = 'none';
        }
    });

    // Handle context menu options
    contextMenu.addEventListener('click', function (e) {
        const action = e.target.id;

        if (action === 'view') {
            viewDetails(selectedItem);
        } else if (action === 'reference-card') {
            viewReferenceCard();
        } else if (action === 'mark-dead') {
            selectedItem.classList.add('dead');
        } else if (action === 'mark-alive') {
            selectedItem.classList.remove('dead');
        } else if (action === 'remove') {
            selectedItem.classList.add('fade-out');
            setTimeout(() => selectedItem.remove(), 500);
        }
        contextMenu.style.display = 'none';
    });

    // Function to fetch custom heroes for the logged-in user
    function fetchCustomHeroes(userId) {
        const heroListElement = document.getElementById('hero-list');
        heroListElement.innerHTML = ''; // Clear current list

        // Fetch custom heroes from Firebase for the user
        firebase.firestore().collection('heroes').where('userId', '==', userId).get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    const hero = doc.data();
                    const heroItem = document.createElement('button');
                    heroItem.innerText = hero.name;
                    heroItem.classList.add('btn');
                    heroItem.setAttribute('data-type', 'hero');
                    heroListElement.appendChild(heroItem);
                });
            })
            .catch((error) => {
                console.error('Error fetching custom heroes:', error);
            });
    }

    // Function to fetch custom monsters for the logged-in user
    function fetchCustomMonsters(userId) {
        const monsterListElement = document.getElementById('monster-list');
        monsterListElement.innerHTML = ''; // Clear current list

        // Fetch custom monsters from Firebase for the user
        firebase.firestore().collection('monsters').where('userId', '==', userId).get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    const monster = doc.data();
                    const monsterItem = document.createElement('button');
                    monsterItem.innerText = monster.name;
                    monsterItem.classList.add('btn');
                    monsterItem.setAttribute('data-type', 'monster');
                    monsterListElement.appendChild(monsterItem);
                });
            })
            .catch((error) => {
                console.error('Error fetching custom monsters:', error);
            });
    }

    // Function to show default heroes
    function showDefaultHeroes() {
        const heroListElement = document.getElementById('hero-list');
        heroListElement.innerHTML = ''; // Clear current list

        const defaultHeroes = ['Berserker', 'Druid', 'Researcher', 'Thief', 'Blacksmith', 'Bladeward', 'Blademaster', 'Engineer', 'Hunter', 'Mage', 'Merchant', 'Rogue', 'Shaman', 'Stonewall', 'Commander']; // Add more as needed
        defaultHeroes.forEach(hero => {
            const heroItem = document.createElement('button');
            heroItem.innerText = hero;
            heroItem.classList.add('btn');
            heroItem.setAttribute('data-type', 'hero');
            heroListElement.appendChild(heroItem);
        });
    }

    // Function to show default monsters
    function showDefaultMonsters() {
        const monsterListElement = document.getElementById('monster-list');
        monsterListElement.innerHTML = ''; // Clear current list

        const defaultMonsters = ['Goblin', 'Orc', 'DreadWarrior', 'Abomination', 'Gargoyle',  'Mummy', 'Skeleton', 'Zombie', 'DarkWizard', 'EarthElemental', 'FireElemental', 'GiantWolf', 'MechanicalGolem', 'WaterElemental']; // Add more as needed
        defaultMonsters.forEach(monster => {
            const monsterItem = document.createElement('button');
            monsterItem.innerText = monster;
            monsterItem.classList.add('btn');
            monsterItem.setAttribute('data-type', 'monster');
            monsterListElement.appendChild(monsterItem);
        });
    }

    // View details popup with front/back image toggle
    function viewDetails(item) {
        const name = item.textContent.split(' ')[0];
        const details = images[name] || { front: '[Front Image]', back: '[Back Image]' };
        showingFront = true;

        // Check if it's a hero or monster
        if (item.getAttribute('data-type') === 'hero') {
            popupHeroContent.innerHTML = `<h3>${name} Details</h3><img src="${details.front}" alt="${name} Front">`;
            popupHero.style.display = 'block';
            popupHeroContent.querySelector('img').addEventListener('click', function () {
                this.src = showingFront ? details.back : details.front;
                showingFront = !showingFront;
            });
        } else {
            popupContent.innerHTML = `<h3>${name} Details</h3><img src="${details.front}" alt="${name} Front">`;
            popup.style.display = 'block';
            popupContent.querySelector('img').addEventListener('click', function () {
                this.src = showingFront ? details.back : details.front;
                showingFront = !showingFront;
            });
        }
    }

    // View reference card
    function viewReferenceCard() {
        showingFront = true;
        popupHeroContent.innerHTML = `<h3>Reference Card</h3><img src="${referenceCard.front}" alt="Reference Front">`;
        popupHero.style.display = 'block';

        popupHeroContent.querySelector('img').addEventListener('click', function () {
            this.src = showingFront ? referenceCard.back : referenceCard.front;
            showingFront = !showingFront;
        });
    }

    // Utility function to roll a 1d20
    function rollD20() {
        return Math.floor(Math.random() * 20) + 1;
    }

    // Function to update login state
    function updateLoginState() {
        try {
            const user = JSON.parse(localStorage.getItem('user')); // Assuming user data is stored in localStorage
            if (user && user.email) {
                const authSection = document.getElementById('auth-section');
                if (authSection) {
                    authSection.innerHTML = `<a href="profile.html" id="profile-btn">Logged in as ${user.email}</a>`;
                }
            }
        } catch (error) {
            console.error('Error parsing user from localStorage', error);
        }
    }

    // Sort encounter list by roll value (descending)
    function sortEncounterList() {
        const items = Array.from(encounterList.children);
        items.sort((a, b) => b.getAttribute('data-roll') - a.getAttribute('data-roll'));
        items.forEach(item => encounterList.appendChild(item));
    }
});
