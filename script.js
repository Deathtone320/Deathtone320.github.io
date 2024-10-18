const bestiary = [
    { name: 'Goblin', img: '/images/goblin.png', stats: 'HP: 20, Attack: 5' },
    { name: 'Orc', img: '/images/orc.png', stats: 'HP: 40, Attack: 10' },
    { name: 'Zombie', img: '/images/orc.png', stats: 'HP: 40, Attack: 10' },
    { name: 'Mummy', img: '/images/orc.png', stats: 'HP: 40, Attack: 10' },
    { name: 'Dread Warrior', img: '/images/orc.png', stats: 'HP: 40, Attack: 10' },
    { name: 'Gargoyle', img: '/images/orc.png', stats: 'HP: 40, Attack: 10' },
    { name: 'Skeleton', img: '/images/orc.png', stats: 'HP: 40, Attack: 10' },
    { name: 'Zombie', img: '/images/orc.png', stats: 'HP: 40, Attack: 10' },
    { name: 'Abomination', img: '/images/orc.png', stats: 'HP: 40, Attack: 10' },
    { name: 'Dark Wizard', img: '/images/orc.png', stats: 'HP: 40, Attack: 10' },
    // Add more monsters/heroes...
];


const encounter = [];
const encounterList = document.getElementById('encounter-list');

// Populate bestiary
const bestiarySection = document.getElementById('bestiary');
bestiary.forEach((monster, index) => {
    const card = document.createElement('div');
    card.classList.add('monster-card');
    card.innerHTML = `<img src="${monster.img}" alt="${monster.name}">
                      <p>${monster.name}</p>`;
    card.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        showContextMenu(monster, index, e);
    });
    bestiarySection.appendChild(card);
});

// Right-click context menu
function showContextMenu(monster, index, e) {
    const choice = confirm(`Add ${monster.name} to Encounter? Click 'Cancel' to View.`);
    if (choice) {
        addToEncounter(monster);
    } else {
        viewStats(monster);
    }
}

function addToEncounter(monster) {
    const roll = Math.floor(Math.random() * 20) + 1;
    encounter.push({ ...monster, roll });
    encounter.sort((a, b) => b.roll - a.roll); // Sort by highest roll
    updateEncounterList();
}

function updateEncounterList() {
    encounterList.innerHTML = '';
    encounter.forEach(monster => {
        const li = document.createElement('li');
        li.textContent = `${monster.name} - Roll: ${monster.roll}`;
        encounterList.appendChild(li);
    });
}

function viewStats(monster) {
    document.getElementById('monster-hero-stats').textContent = `${monster.name} - ${monster.stats}`;
    document.getElementById('stats-modal').style.display = 'block';
}

// Modal close function
document.querySelector('.close').onclick = function() {
    document.getElementById('stats-modal').style.display = 'none';
};
