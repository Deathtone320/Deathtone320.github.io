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
