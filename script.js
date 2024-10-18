document.addEventListener("DOMContentLoaded", function() {
    // Ensure the contact form works as expected
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
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
    }

    // Ensure buttons for monsters/heroes function correctly
    const monsterHeroButtons = document.querySelectorAll('.monster-hero-buttons button');
    if (monsterHeroButtons.length > 0) {
        monsterHeroButtons.forEach(button => {
            button.addEventListener('click', function() {
                addToList(this);
            });
        });
    }

document.addEventListener("DOMContentLoaded", function() {
    // Ensure buttons for monsters/heroes function correctly
    const monsterHeroButtons = document.querySelectorAll('.monster-hero-buttons button');
    
    // Debugging: Log the buttons found to ensure they are detected
    console.log("Monster/Hero buttons:", monsterHeroButtons);

    if (monsterHeroButtons.length > 0) {
        monsterHeroButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Debugging: Log the button click to check if the click event is fired
                console.log("Button clicked:", this.textContent);
                addToList(this.textContent);
            });
        });
    }

    // Initialize an empty array for monsters/heroes
    let selectedMonstersHeroes = [];

    // Function to roll a number between 1 and 20
    function rollDice() {
        return Math.floor(Math.random() * 20) + 1;
    }

    // Function to add a clicked monster/hero to the list
    function addToList(name) {
        const roll = rollDice();
        console.log("Adding to list:", name, "with roll:", roll); // Debugging

        // Add the monster/hero along with their roll to the list
        selectedMonstersHeroes.push({ name: name, roll: roll });

        // Sort the list by roll number
        selectedMonstersHeroes.sort((a, b) => b.roll - a.roll);

        // Update the displayed list
        updateList();
    }

    // Function to update the displayed list on the right panel
    function updateList() {
        const list = document.getElementById('selected-items');
        list.innerHTML = ''; // Clear the existing list

        selectedMonstersHeroes.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = `${item.name}: ${item.roll}`;
            list.appendChild(listItem);
        });

        console.log("Updated list:", selectedMonstersHeroes); // Debugging
    }

    // Function to show/hide rolls based on checkbox
    document.getElementById('show-rolls').addEventListener('change', function() {
        toggleRolls();
    });

    function toggleRolls() {
        const isChecked = document.getElementById('show-rolls').checked;
        const listItems = document.querySelectorAll('#selected-items li');

        listItems.forEach((item, index) => {
            if (isChecked) {
                item.textContent = `${selectedMonstersHeroes[index].name}: ${selectedMonstersHeroes[index].roll}`;
            } else {
                item.textContent = selectedMonstersHeroes[index].name;
            }
        });

