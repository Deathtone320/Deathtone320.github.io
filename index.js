// Load the header and nav from the external file
fetch('header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('header-container').innerHTML = data;
    })
    .catch(error => console.error('Error loading header:', error));

// Add any additional JS below
console.log("Welcome to DeathForge Games!");
