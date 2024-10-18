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


let selectedItems = [];

function addToList(item) {
    let roll = Math.floor(Math.random() * 20) + 1; // Roll between 1 and 20
    selectedItems.push({ name: item, roll: roll });
    sortAndDisplayList();
}

function sortAndDisplayList() {
    // Sort the list by the roll value (highest to lowest)
    selectedItems.sort((a, b) => b.roll - a.roll);

    const listElement = document.getElementById('selected-items');
    listElement.innerHTML = ''; // Clear current list

    // Display the sorted list
    selectedItems.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item.name;
        listElement.appendChild(li);
    });

    toggleRolls();
}

function toggleRolls() {
    const showRolls = document.getElementById('show-rolls').checked;
    const listElement = document.getElementById('selected-items');
    listElement.innerHTML = ''; // Clear current list

    // Display the sorted list with or without rolls
    selectedItems.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item.name + (showRolls ? ` (Roll: ${item.roll})` : '');
        listElement.appendChild(li);
    });
}

