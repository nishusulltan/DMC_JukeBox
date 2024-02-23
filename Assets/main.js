document.addEventListener('DOMContentLoaded', function() {
    //dropdown menu
    const toggleBtn = document.querySelector('.toggle_btn');
    const toggleIcon = document.querySelector('.toggle_btn i');
    const dropDownMenu = document.querySelector('.dropdown_menu');

    toggleBtn.onclick = function() {
        dropDownMenu.classList.toggle('open');
        const isOpen = dropDownMenu.classList.contains('open');

        toggleIcon.className = isOpen
            ? 'fa-solid fa-times'
            : 'fa-solid fa-bars';
    };
    
    //scroll for songs
    const recContainers = document.querySelectorAll('.rec');
    
    function handleScroll(e) {
        e.preventDefault();
        this.scrollLeft += e.deltaY * 5;        
        const maxScrollLeft = this.scrollWidth - this.clientWidth;
        scrollLeft = Math.max(0, Math.min(scrollLeft, maxScrollLeft));
        this.style.transform = `translateX(-${scrollLeft}px)`;
    }
    
    function enableScroll() {
        recContainers.forEach(recContainer => {
            recContainer.addEventListener('wheel', handleScroll); // Add scroll event
        });
    }

    function disableScroll() {
        recContainers.forEach(recContainer => {
            recContainer.removeEventListener('wheel', handleScroll); // Remove scroll event
        });
    }

    // Check device width
    function handleDeviceWidthChange() {
        const deviceWidth = window.innerWidth;
        if (deviceWidth <= 1111) {
            enableScroll(); // Enable scroll for rec classes
        } else {
            disableScroll(); // Disable scroll for rec classes
        }
    }

    handleDeviceWidthChange(); // Call the function to set scroll behavior initially
    
    window.addEventListener('resize', handleDeviceWidthChange); // Listen for screen width changes

    });
    //mute button
    /*const audio = document.getElementById('bgm');
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
    muteBtn.addEventListener('click', toggleMute);*/
    const audio = document.getElementById('bgm');
    const songNameElement = document.getElementById('songName');
    const songImageElement = document.getElementById('songImage');
    const playPauseBtn = document.getElementById("playPauseBtn");
    const playPauseIcon = document.getElementById('playPauseIcon');
    const muteBtn = document.getElementById("muteBtn");
    const muteIcon = document.getElementById('muteIcon');
    const progressContainer = document.getElementById("progressContainer");
    const loopBtn = document.getElementById('loopBtn');
    const songs = document.querySelectorAll(".song");

    function updateSongInfo(songName, songImageSrc) {
        songNameElement.textContent = songName;
        songImageElement.src = songImageSrc;
    }
    
    let isPlaying = false;
    let isMuted = false;
    let currentSong = null;
    let progressInterval;

    function playAudio(audio) {
        audio.play();
        isPlaying = true;
        currentSong = audio;
        progressInterval = setInterval(updateProgressBar, 1000);
        updateSongInfo(audio.parentElement.querySelector('.img-text').textContent, audio.parentElement.querySelector('.img').src);
    }

    function pauseAudio(audio) {
        audio.pause();
        isPlaying = false;
        clearInterval(progressInterval);
    }

    function togglePlayPause() {
        if (currentSong) {
            if (currentSong.paused) {
                playAudio(currentSong);
                playPauseIcon.className = "fa-solid fa-play"
            } else {
                pauseAudio(currentSong);
                playPauseIcon.className = "fa-solid fa-pause"
            }
        }
    }
    playPauseBtn.addEventListener("click", togglePlayPause);

    function toggleMuteUnmute() {
        if (currentSong) {
            if (isMuted) {
                currentSong.muted = false;
                isMuted = false;
                muteIcon.className = 'fa-solid fa-volume-high';
            } else {
                currentSong.muted = true;
                isMuted = true;
                muteIcon.className = 'fa-solid fa-volume-off';
            }
        }
    }
    muteBtn.addEventListener("click", toggleMuteUnmute);


    function updateProgressBar() {
        if (currentSong) {
            const progressBar = document.getElementById("progressBar");
            const currentTime = currentSong.currentTime;
            const duration = currentSong.duration;
            const progress = (currentTime / duration) * 100;
            progressBar.style.width = progress + "%";
        }
    }

    function setProgress(e) {
        if (currentSong) {
            const progressBar = document.getElementById("progressBar");
            const totalWidth = this.clientWidth;
            const clickX = e.offsetX;
            const duration = currentSong.duration;
            currentSong.currentTime = (clickX / totalWidth) * duration;
        }
    }
    progressContainer.addEventListener("click", setProgress);


    playAudio(songs[4].querySelector("audio")); // Auto play the 5th song in the list

    songs.forEach(song => {
        const audio = song.querySelector("audio");
        song.addEventListener("click", () => {
            if (currentSong && currentSong !== audio) {
                pauseAudio(currentSong);
            }
            currentSong = audio;
            playAudio(audio);
        });
    }); 
    songs.forEach(song => {
        song.addEventListener("click", () => {
            const audio = song.querySelector("audio");
    
            if (currentSong === audio) {
                // Restart the song from the beginning if it is the currently playing song
                audio.currentTime = 0;
            } else {
                if (currentSong) {
                    // Pause the currently playing song if a different song is clicked
                    pauseAudio(currentSong);
                }
                currentSong = audio;
                playAudio(audio);
            }
        });
    });

    //Search Function
    
    const searchBar = document.getElementById('searchBar');
    const searchList = document.getElementById('searchList');
    const searchResults = document.getElementById('searchResults');
    
    searchBar.addEventListener('input', function() {
        const searchQuery = searchBar.value.trim().toLowerCase();
        
        // Dynamically fetch the list of songs on the page
        const songs = document.querySelectorAll('.song');
        
        // Clear previous search results
        searchList.innerHTML = '';
        
        if (searchQuery) {
            const uniqueResults = new Set(); // Create a Set to store unique search results

            songs.forEach(song => {
                const songName = song.querySelector('.img-text').textContent.toLowerCase();
                if (songName.includes(searchQuery)) {
                    uniqueResults.add(songName); // Add only unique search results to the Set
                }
            });

            if (uniqueResults.size === 0) {
                searchList.innerHTML = '<li>No matching songs found</li>';
            } else {
                // Add unique search results to the search list
                uniqueResults.forEach(result => {
                    const listItem = document.createElement('li');
                    listItem.textContent = result;
                    listItem.addEventListener('click', () => {
                        const matchedSong = Array.from(songs).find(song => song.querySelector('.img-text').textContent.toLowerCase() === result);
                        if (matchedSong) {
                            const audio = matchedSong.querySelector('audio');
                            playAudio(audio);
                        }
                        searchBar.value = ''; // Clear the search bar
                        searchResults.style.display = 'none'; // Hide the dropdown menu
                    });
                    searchList.appendChild(listItem);
                });
            }

            searchResults.style.display = 'block'; // Show the dropdown menu
        } else {
            searchResults.style.display = 'none'; // Hide the dropdown menu if search bar is empty
        }
        
        // Function to position search results
        function positionSearchResults() {
            const searchBarRect = searchBar.getBoundingClientRect();
            searchResults.style.top = `${searchBarRect.bottom}px`;
            searchResults.style.left = `${searchBarRect.left}px`;
        }

        // Call the function to position search results
        positionSearchResults();

        // Re-position search results when the window is resized
        window.addEventListener('resize', positionSearchResults);
    
        // Function to toggle loop button

        function loopButtonFunction() {
        toggleLoop(); // Toggle the looping functionality
    
        // Change the color of the loop button based on the loop state
        loopBtn.style.backgroundColor = isLooping ? '#FF6347' : '#4CAF50';
        }
        
        loopBtn.addEventListener('click', loopButtonFunction);
    
});
// Add an event listener to each search result item to play the selected song and stop the previously playing song
uniqueResults.forEach(result => {
    const listItem = document.createElement('li');
    listItem.textContent = result;
    listItem.addEventListener('click', () => {
        console.log(`Selected song: ${result}`);
        // Clear the search bar value
        searchBar.value = '';

        // Get the matched song element
        const matchedSong = Array.from(songs).find(song => song.querySelector('.img-text').textContent.toLowerCase() === result);

        // Check if there is a matched song and it is not the currently playing song
        if (matchedSong && currentSong !== matchedSong.querySelector('audio')) {
            // Stop the previously playing song
            if (currentSong) {
                pauseAudio(currentSong);
                console.log(`Stopped previously playing song: ${currentSong.id}`);
            }

            // Play the selected song
            const selectedSongAudio = matchedSong.querySelector('audio');
            playAudio(selectedSongAudio);
            console.log(`Playing selected song: ${selectedSongAudio.src}`);
            currentSong = selectedSongAudio;
        }

        // Hide the search results dropdown menu
        searchResults.style.display = 'none';
    });
    searchList.appendChild(listItem);
});