document.addEventListener("DOMContentLoaded", function() {
    const bestiaryData = [
        { name: "Goblin", description: "A small, green, and pesky creature." },
        { name: "Orc", description: "A large and brutish warrior." },
        { name: "Troll", description: "A giant monster with powerful regeneration." },
        { name: "Knight", description: "A valiant hero with strong defense." },
        { name: "Wizard", description: "A master of arcane magic." }
    ];

    const bestiaryList = document.getElementById('bestiary-list');

    // Function to load bestiary items
    function loadBestiaryItems() {
        bestiaryData.forEach(item => {
            const bestiaryItemDiv = document.createElement('div');
            bestiaryItemDiv.classList.add('bestiary-item');
            bestiaryItemDiv.innerHTML = `
                <h3>${item.name}</h3>
                <p>${item.description}</p>
            `;
            bestiaryList.appendChild(bestiaryItemDiv);
        });
    }

    loadBestiaryItems();
});
