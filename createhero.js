document.addEventListener('DOMContentLoaded', function () {
    // Path to Trait Mapping
    const pathTraits = {
        "Berserker": "Once per Quest, you may activate your anger using it as a weapon. Add one die to your movement and 1d3 to your damage for all attacks for the next 5 turns or until combat is over.",
        "Blacksmith": "Once per Quest you may discard two or more equipment cards to search the equipment deck to find an item less than or equal to the total gold of the two discarded items. If the gold value is equal to or more than 1000 gold you...",
        "Blademaster": "Defeating an enemy with a weapon-visible miniature earns 1 skill Mark. Use 1 Mark to modify a skill for free...",
        "Bladeward": "Once per quest, choose a weapon as your Sacred Weapon...",
        "Commander": "Three times per quest, order a target to gain +3 Movement and an extra attack...",
        "Druid": "Once per quest, summon a Giant Wolf within 3 spaces of the Druid...",
        "Engineer": "Roll a die on unsearched furniture or disarmed traps...",
        "Hunter": "When the Hunter kills an enemy or completes a quest, roll a combat die...",
        "Mage": "Three charges per quest: Spend 1 charge for a free modification to a spell...",
        "Merchant": "When the merchant is in the party, reveal 3 extra items at any shop...",
        "Researcher": "Exclusively use spells When the researcher finds gold from a treasure card...",
        "Rogue": "Three times per quest, hide in darkness to conceal yourself...",
        "Shaman": "Twice per quest, you may place a totem when casting a spell...",
        "Stonewall": "If the Stonewall blocks all damage from an attack, gain a Defender Mark...",
        "Thief": "Finding gold grants a Thieves Mark. Spend 3 marks to gain an extra treasure card while searching anything..."
        // Add more paths and traits here
    };

    // Add event listener for path selection and update the trait
    document.getElementById('hero-path').addEventListener('change', function() {
        const selectedPath = this.value;
        const traitField = document.getElementById('trait');
        traitField.value = pathTraits[selectedPath] || ''; // Update trait field based on selected path
    });

    // Form submit handler
    document.getElementById('hero-form').addEventListener('submit', function (e) {
        e.preventDefault();

        const hero = {
            name: document.getElementById('hero-name').value,
            race: document.getElementById('hero-race').value,
            path: document.getElementById('hero-path').value,
            stats: {
                attack: document.getElementById('hero-attack').value,
                defend: document.getElementById('hero-defend').value,
                body: document.getElementById('hero-body').value,
                mind: document.getElementById('hero-mind').value
            },
            disciplines: {
                mental: document.getElementById('mental').value,
                acrobatics: document.getElementById('acrobatics').value,
                brawn: document.getElementById('brawn').value,
                luck: document.getElementById('luck').value,
                faith: document.getElementById('faith').value,
                ritual: document.getElementById('ritual').value
            },
            equipment: document.getElementById('equipment').value,
            spells: document.getElementById('spells').value,
            skills: document.getElementById('skills').value
        };

        const user = firebase.auth().currentUser;
        if (user) {
            firebase.firestore().collection('users').doc(user.uid).collection('heroes').add(hero)
                .then(() => {
                    alert('Hero saved successfully!');
                    window.location.href = 'homeforge.html';
                })
                .catch((error) => {
                    console.error('Error saving hero:', error);
                });
        } else {
            alert('You must be logged in to save a hero.');
        }
    });
});
