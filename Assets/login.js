const inputBoxes = document.querySelectorAll('.input-box input');

    inputBoxes.forEach((input) => {
        // Storing the initial placeholder value
        input.setAttribute('data-placeholder', input.getAttribute('placeholder'));

        // When the input is focused, move the icon to the left
        input.addEventListener('focus', () => {
            const icon = input.parentElement.querySelector('i');
            icon.style.left = '-17px'; // Set the left position to -17px

            input.style.paddingLeft = '10px'; // Adjust the padding-left to 10px when the input is active
        });

        // When the input loses focus, move the icon back to its new position and restore placeholder text if input is empty
        input.addEventListener('blur', () => {
            const icon = input.parentElement.querySelector('i');
            icon.style.left = '20px'; // Set the left position to 20px
            input.style.paddingLeft = ''; // Reset padding-left to its default
            if (input.value.trim() === '') {
                input.setAttribute('placeholder', input.getAttribute('data-placeholder')); // Restore placeholder text only if input is empty
            }
        });
    });
    document.addEventListener('DOMContentLoaded', function() {
        const form = document.querySelector('form');

        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent the form from submitting by default

            const username = form.querySelector('input[type="text"]').value;
            const password = form.querySelector('input[type="password"]').value;

            if (username.trim() === '' || password.trim() === '') {
                alert('Please fill in both the username and password fields.'); // Show an alert if either field is empty
            } else {
                // Form is valid, you can proceed with form submission or any other action
                alert('Form submitted successfully!');
                // Add any further actions here, such as sending data to a server, etc.
            }
        });
    });