const user = firebase.auth().currentUser;
if (user) {
    // Fetch and display saved heroes
    firebase.firestore().collection('users').doc(user.uid).collection('heroes').get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const hero = doc.data();
                // Add hero data to your HTML (e.g., dynamically generate a list)
                document.getElementById('heroes-list').innerHTML += `<li>${hero.name} - ${hero.race}</li>`;
            });
        });

    // Fetch and display saved monsters
    firebase.firestore().collection('users').doc(user.uid).collection('monsters').get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const monster = doc.data();
                // Add monster data to your HTML
                document.getElementById('monsters-list').innerHTML += `<li>${monster.name} - ${monster.type}</li>`;
            });
        });
}
