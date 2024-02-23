document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting by default

        const username = form.querySelector('input[type="text"]').value;
        const password = form.querySelector('input[type="password"]').value;

        if (username.trim() === '' || password.trim() === '') {
            alert('Please fill in both the username and password fields.'); // Show an alert if either field is empty
        } else {
            alert('Form submitted successfully!');
        }
    });
const inputBoxes = document.querySelectorAll('.input-box input');

inputBoxes.forEach((input) => {
    // Storing the initial placeholder value
    input.setAttribute('data-placeholder', input.getAttribute('placeholder'));
    let icon = input.parentElement.querySelector('i');

    // Check for existing input when the page loads to keep the icon position consistent
    if (input.value.trim() !== '') {
        icon.style.left = '-17px'; // Set the left position to -17px if there is existing input
        input.style.paddingLeft = '10px'; // Adjust the padding-left for consistency
    }

    // When the input is focused, move the icon to the left if input is empty
    input.addEventListener('focus', () => {
        if (input.value.trim() === '') {
            icon.style.left = '-17px';
            input.style.paddingLeft = '10px';
        }
    });

    // When the input loses focus, move the icon back and restore placeholder text if input is empty
    input.addEventListener('blur', () => {
        if (input.value.trim() === '') {
            icon.style.left = '20px';
            input.style.paddingLeft = '';
            input.setAttribute('placeholder', input.getAttribute('data-placeholder'));
        }
    });
});
    //mute button
    const audio = document.getElementById('bgm');
    const muteBtn = document.getElementById('muteBtn');
    const muteIcon = document.getElementById('muteIcon');


    function toggleMute() {

        if (audio.volume === 0) {
            audio.volume = 1;
            muteIcon.className = 'fa-solid fa-volume-high';
        } else {
            audio.volume = 0;
            muteIcon.className = 'fa-solid fa-volume-off';
        }
    }
    muteBtn.addEventListener('click', toggleMute);
});    
    
    
    
    
    