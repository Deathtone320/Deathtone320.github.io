const bestiary = [
    { name: 'Goblin', img: '/images/goblin.png', stats: 'HP: 20, Attack: 5' },
    { name: 'Orc', img: '/images/orc.png', stats: 'HP: 40, Attack: 10' },
    { name: 'Zombie', img: '/images/zombie.png', stats: 'HP: 30, Attack: 6' },
    { name: 'Mummy', img: '/images/mummy.png', stats: 'HP: 50, Attack: 8' },
    { name: 'Dread Warrior', img: '/images/dread-warrior.png', stats: 'HP: 60, Attack: 12' },
    { name: 'Gargoyle', img: '/images/gargoyle.png', stats: 'HP: 80, Attack: 15' },
    { name: 'Skeleton', img: '/images/skeleton.png', stats: 'HP: 20, Attack: 7' },
    { name: 'Abomination', img: '/images/abomination.png', stats: 'HP: 70, Attack: 11' },
    { name: 'Dark Wizard', img: '/images/dark-wizard.png', stats: 'HP: 90, Attack: 18' }
];

const encounter = [];
const encounterList = document.getElementById('encounter-list');

// Populate bestiary
const bestiarySection = document.getElementById('bestiary');
bestiary.forEach((monster, index) => {
    const card = document.createElement('div');
    card.classList.add('monster-card');
    card.innerHTML = `
        <img src="${monster.img}" alt="${monster.name}">
        <p>${monster.name}</p>`;
    card.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        showContextMenu(monster, index, e);
    });
    bestiarySection.appendChild(card);
});

// Right-click context menu
function showContextMenu(monster, index, e) {
    const menuOptions = `Add ${monster.name} to Encounter or View Stats? Click 'Cancel' to view stats.`;
    const choice = confirm(menuOptions);
    if (choice) {
        addToEncounter(monster);
    } else {
        viewStats(monster);
    }
}

// Function to add monster to the encounter
function addToEncounter(monster) {
    const roll = Math.floor(Math.random() * 20) + 1;
    encounter.push({ ...monster, roll });
    encounter.sort((a, b) => b.roll - a.roll); // Sort by highest roll
    updateEncounterList();
}

// Function to update encounter list
function updateEncounterList() {
    encounterList.innerHTML = ''; // Clear the list
    encounter.forEach(monster => {
        const li = document.createElement('li');
        li.textContent = `${monster.name} - Roll: ${monster.roll}`;
        encounterList.appendChild(li);
    });
}

// Function to view monster stats in a modal
function viewStats(monster) {
    document.getElementById('monster-hero-stats').textContent = `${monster.name} - ${monster.stats}`;
    document.getElementById('stats-modal').style.display = 'block';
}

// Close modal
document.querySelector('.close').onclick = function() {
    document.getElementById('stats-modal').style.display = 'none';
};
