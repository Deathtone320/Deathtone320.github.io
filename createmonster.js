// Initialize Firebase Firestore
const db = firebase.firestore();
const auth = firebase.auth();

// Function to handle monster form submission
document.getElementById('monster-form').addEventListener('submit', function (e) {
    e.preventDefault();

    // Get monster information from the form
    const monster = {
        name: document.getElementById('monster-name').value,
        type: document.getElementById('monster-type').value,
        stats: {
            attack: document.getElementById('monster-attack').value,
            defend: document.getElementById('monster-defend').value,
            body: document.getElementById('monster-body').value,
            mind: document.getElementById('monster-mind').value
        },
        disciplines: {
            mental: document.getElementById('mental').value,
            acrobatics: document.getElementById('acrobatics').value,
            brawn: document.getElementById('brawn').value,
            luck: document.getElementById('luck').value,
            faith: document.getElementById('faith').value,
            ritual: document.getElementById('ritual').value
        },
        abilities: document.getElementById('abilities').value,
        actionRollTable: {
            1: document.getElementById('action-roll').value.split('\n')[0],
            2: document.getElementById('action-roll').value.split('\n')[1],
            3: document.getElementById('action-roll').value.split('\n')[2],
            4: document.getElementById('action-roll').value.split('\n')[3],
            5: document.getElementById('action-roll').value.split('\n')[4],
            6: document.getElementById('action-roll').value.split('\n')[5]
        },
        extraActionRollTable: {
            1: document.getElementById('extra-action-roll').value.split('\n')[0],
            2: document.getElementById('extra-action-roll').value.split('\n')[1],
            3: document.getElementById('extra-action-roll').value.split('\n')[2],
            4: document.getElementById('extra-action-roll').value.split('\n')[3],
            5: document.getElementById('extra-action-roll').value.split('\n')[4],
            6: document.getElementById('extra-action-roll').value.split('\n')[5]
        },
        movementRollTable: {
            1: document.getElementById('movement').value.split('\n')[0],
            2: document.getElementById('movement').value.split('\n')[1],
            3: document.getElementById('movement').value.split('\n')[2],
            4: document.getElementById('movement').value.split('\n')[3],
            5: document.getElementById('movement').value.split('\n')[4],
            6: document.getElementById('movement').value.split('\n')[5]
        }
    };

    // Check if the user is logged in
    const user = auth.currentUser;
    if (user) {
        // Save the monster under the user's Firestore profile
        db.collection('users').doc(user.uid).collection('monsters').add(monster)
            .then(() => {
                alert('Monster saved successfully!');
                window.location.href = 'homeforge.html'; // Redirect back to Homeforge
            })
            .catch((error) => {
                console.error('Error saving monster:', error);
                alert('There was an error saving your monster. Please try again.');
            });
    } else {
        alert('You must be logged in to save a monster.');
    }
});
