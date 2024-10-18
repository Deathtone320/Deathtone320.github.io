document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get the form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Log form values to ensure they're correctly retrieved
    console.log("Form Values:", { name, email, message });

    // Send the email using EmailJS
    if (name && email && message) {
        emailjs.send(
            'service_z7ywxbv',  // Your EmailJS service ID
            'template_e6cnynh', // Your EmailJS template ID
            {
                from_name: name,
                from_email: email,
                message: message
            }
        )
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            // Show success message to the user
            document.getElementById('success-message').style.display = 'block';
            document.getElementById('error-message').style.display = 'none';
            document.getElementById('contact-form').reset(); // Reset the form fields
        }, function(error) {
            console.log('FAILED...', error);
            // Show error message to the user
            document.getElementById('error-message').style.display = 'block';
            document.getElementById('success-message').style.display = 'none';
        });
    } else {
        console.log("Error: Some form values are missing");
    }
});


// Array to store selected monsters/heroes
let selectedMonsters = [];

// Function to add the clicked monster/hero to the list
function addToList(monster) {
    // Generate a random number between 1 and 20
    const roll = Math.floor(Math.random() * 20) + 1;
    
    // Add the monster/hero along with the rolled number to the list
    selectedMonsters.push({ name: monster, roll: roll });
    
    // Sort the array by the roll in descending order
    selectedMonsters.sort((a, b) => b.roll - a.roll);
    
    // Update the displayed list
    updateList();
}

// Function to update the displayed list of selected monsters/heroes
function updateList() {
    const listElement = document.getElementById('selected-list');
    listElement.innerHTML = ''; // Clear the list

    // Iterate through the selected monsters array
    selectedMonsters.forEach(monster => {
        const listItem = document.createElement('div');
        listItem.textContent = `${monster.name} - Roll: ${monster.roll}`;
        listElement.appendChild(listItem);
    });
}

// Event listener for the 'Show Rolls' radio button
document.getElementById('show-rolls').addEventListener('change', function () {
    updateList(); // Update the list when the checkbox is toggled
});


