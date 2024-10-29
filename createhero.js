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

    const pathTraits = {
    "Berserker": "Once per Quest, you may activate your anger using it as a weapon.  Add one die to your movement and 1d3 to your damage for all attacks for the next 5 turns or until combat is over.",
    "Blacksmith": "Once per Quest you may discard two or more equipment cards to search the equipment deck to find an item less than or equal to the total gold of the two discarded items. If the gold value is equal to or more than 1000 gold you...text seems to be cut off",
    "Blademaster": "Defeating an enemy with a weapon-visible miniature earns 1 skill Mark. Use 1 Mark to modify a skill for free. Spend 3 Marks to heal +1 Health or gain stackable Temporary Health (max 10). With 10+ Marks, disarm the target (reduce attack by 2) and draw an equipment card.",
    "Bladeward": "Once per quest, choose a weapon as your Sacred Weapon (only one allowed). Completing a quest with it grants +1 attack, up to three times. Switching weapons removes bonuses. After three quests, search the artifact deck for a new Sacred Weapon, discard the old one.",
    "Commander": "Three times per quest, order a target to gain +3 Movement and an extra attack, or force them to skip their next turn. If used on an enemy, both roll for Mind; the highest shields win, ties favor the commander. If the commander loses, the ability is used without effect.",
    "Druid": "Once per quest, summon a Giant Wolf within 3 spaces of the Druid. Mount it with an action to add +1 movement, and +1 Attack. While mounted, damage taken by the Druid is taken by the Giant Wolf instead. Use an action to dismount. If the Giant Wolf dies, the Druid's Health drops to 1 and the Giant...text seems to be cut off",
    "Engineer": "Roll a die on unsearched furniture or disarmed traps. If you roll a shield and it’s a trap, treat it as a spell, discarding after use. If it is furniture, convert into a Salvage Token.
Once per quest, spend three salvage tokens to summon a mechanical Golem. Salvage the Golem when destroyed to regain 1 salvage token. Engineers always have a Tool Kit.",
    "Hunter": "When the Hunter kills an enemy or completes a quest, roll a combat die. On a shield, gain a Trophy; bosses always give one. Spend 10 Trophies in a village or city to discard equipment and draw from the artifact deck, use 1 Trophy to reduce a target's Mind by 2 and Defend by 1 (stacks up to three times), or sell Trophies for 100 gold each at merchants.",
    "Mage": "Three charges per quest: Spend 1 charge for a free modification to a spell. Using all three charges on one spell adds +1 die to all rolls for spell. While active, lose 1 mana each turn; use an action to end this effect. If mana reaches 0, the Mage loses health instead.",
    "Merchant": "When the merchant is in the party, reveal 3 extra items at any shop. When they find gold from a treasure card, gain a Merchant Mark. Spend 3 marks to either double an item's selling price or halve its buying price.",
    "Researcher": "Exclusively use spells When the researcher finds gold from a treasure card, you may swap a known spell with a new one, shuffling the old one into the deck. After casting a spell ten times, learn it permanently. Once learned, no more swapping; modify it once per quest/day for free.",
    "Rogue": "Three times per quest, hide in darkness to conceal yourself. While active, double the damage of your next attack, skill, or spell. This effect ends after attacking and may only be activated outside of combat.",
    "Shaman": "Twice per quest, you may place a totem when casting a spell, granting it the spell's ability. The totem starts with 2 mana, plus 1 per spell modification. It vanishes when out of mana. Totems cast spells only on the shaman's turn and have 2 Health with the shaman's Mind stat.",
    "Stonewall": "If the Stonewall blocks all damage from an attack, gain a Defender Mark. Spend 3 Marks to add the Stonewall’s Defend stat to an ally within line of sight until the end of the current turn. May also spend 3 Marks to give all allies within 3 spaces +1 Defend for X turns where X = Mind.",
    "Thief": "Finding gold grants a Thieves Mark. Spend 3 marks to gain an extra treasure card while searching anything. Spend 10 marks to purchase an item without spending gold at any market or merchant."
    // Add more paths and their traits
};

document.getElementById('path').addEventListener('change', function() {
    const selectedPath = this.value;
    const traitField = document.getElementById('trait');
    traitField.value = pathTraits[selectedPath] || '';
});
});
