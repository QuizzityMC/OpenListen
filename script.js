// script.js (No changes needed - using previous version)
document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById('audio');
    const songCover = document.getElementById('song-cover');
    const songTitle = document.getElementById('song-title');
    const artistName = document.getElementById('artist-name');
    const playButton = document.getElementById('play');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const shuffleButton = document.getElementById('shuffle');
    const volumeControl = document.getElementById('volume');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const queueList = document.getElementById('queue-list');
    const seekBar = document.getElementById('seek-bar');
    const categoryList = document.getElementById('category-list'); // Added Category List

    // Song Data
    const songs = [
        {
            title: "Journey to the Promise",
            artist: "David Fesilyan",
            cover: "img/journeytothepromise-d.fesliyan.png",
            src: "music/journeytothepromise-d.fesliyan.mp3",
            category: "Epic"
        },
        {
            title: "Powerful",
            artist: "David Fesilyan",
            cover: "img/powerful-d.fesliyan.png",
            src: "music/powerful-d.fesliyan.mp3",
            category: "Epic"
        },
        {
            title: "Villainous",
            artist: "David Fesilyan",
            cover: "img/villainous-d.fesliyan.png",
            src: "music/villainous-d.fesliyan.mp3",
            category: "Epic"
        },
         {
            title: "Aristocracy",
            artist: "PineappleMusic",
            cover: "img/aristocracy-pineapplemusic.webp",
            src: "music/aristocracy-pineapplemusic.mp3",
            category: "Classic"
        },
        {
            title: "Chariots of Fire",
            artist: "Vangelis",
            cover: "img/chariotsoffire-vangelis.png",
            src: "music/chariotsoffire-vangelis.mp3",
            category: "Film Music"
        },
        {
            title: "The True Panda God",
            artist: "QuizzityMC",
            cover: "img/thetruepandagod-quizzitymc.jpeg",
            src: "music/thetruepandagod-quizzitymc.mp3",
            category: "Religious"
        },
        {
            title: "The Book Of Rana",
            artist: "QuizzityMC",
            cover: "img/bookofrana-quizzitymc.jpeg",
            src: "music/bookofrana-quizzitymc.mp3",
            category: "Religious"
        }
    ];

    let songIndex = 0;
    let isPlaying = false;
    let currentQueue = [...songs];

    // Get unique categories
     const categories = [...new Set(songs.map(song => song.category))];

     // Function to populate the sidebar with categories
     function populateCategories() {
         categoryList.innerHTML = '';
         categories.forEach(category => {
             const listItem = document.createElement('li');
             listItem.textContent = category;
             listItem.addEventListener('click', () => {
                 // Filter songs by category
                 currentQueue = songs.filter(song => song.category === category);
                 songIndex = 0;
                 loadSong(songIndex);
                 updateQueueDisplay();
                 if (isPlaying) {
                     audio.play();
                 }
             });
             categoryList.appendChild(listItem);
         });
     }

    // Function to load the current song
    function loadSong(index) {
        const song = currentQueue[index];
        songCover.src = song.cover;
        songTitle.textContent = song.title;
        artistName.textContent = song.artist;
        audio.src = song.src;
    }

    // Function to toggle play/pause
    function togglePlayPause() {
        if (isPlaying) {
            audio.pause();
            playButton.innerHTML = '<i class="fas fa-play"></i>';
        } else {
            audio.play();
            playButton.innerHTML = '<i class="fas fa-pause"></i>';
        }
        isPlaying = !isPlaying;
    }

    // Function to play the next song
    function nextSong() {
        songIndex = (songIndex + 1) % currentQueue.length;
        loadSong(songIndex);
        if (isPlaying) {
            audio.play();
        }
    }

    // Function to play the previous song
    function prevSong() {
        songIndex = (songIndex - 1 + currentQueue.length) % currentQueue.length;
        loadSong(songIndex);
        if (isPlaying) {
            audio.play();
        }
    }

    // Function to shuffle the queue
    function shuffleQueue() {
        currentQueue = [...songs];
        for (let i = currentQueue.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [currentQueue[i], currentQueue[j]] = [currentQueue[j], currentQueue[i]];
        }
        songIndex = 0;
        loadSong(songIndex);
        updateQueueDisplay();
        if (isPlaying) {
            audio.play();
        }
    }

    // Function to update the queue display
    function updateQueueDisplay() {
        queueList.innerHTML = '';
        currentQueue.forEach((song, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = `${song.title} - ${song.artist} (${song.category})`;
            listItem.addEventListener('click', () => {
                songIndex = index;
                loadSong(songIndex);
                if (isPlaying) {
                    audio.play();
                }
            });
            queueList.appendChild(listItem);
        });
    }

    // Function to handle search
    function handleSearch() {
        const searchTerm = searchInput.value.toLowerCase();
        currentQueue = songs.filter(song =>
            song.title.toLowerCase().includes(searchTerm) ||
            song.artist.toLowerCase().includes(searchTerm) ||
            song.category.toLowerCase().includes(searchTerm)
        );
        songIndex = 0;
        loadSong(songIndex);
        updateQueueDisplay();
        if(isPlaying) {
            audio.play();
        }
    }

    // Event listeners
    playButton.addEventListener('click', togglePlayPause);
    nextButton.addEventListener('click', nextSong);
    prevButton.addEventListener('click', prevSong);
    shuffleButton.addEventListener('click', shuffleQueue);
    searchButton.addEventListener('click', handleSearch);
    searchInput.addEventListener('keypress', function(event) {
        if (event.key === "Enter") {
            handleSearch();
        }
    });

    audio.addEventListener('ended', nextSong);

    audio.addEventListener('play', () => {
        isPlaying = true;
        playButton.innerHTML = '<i class="fas fa-pause"></i>';
    });

    audio.addEventListener('pause', () => {
         isPlaying = false;
         playButton.innerHTML = '<i class="fas fa-play"></i>';
    });

    volumeControl.addEventListener('input', function() {
        audio.volume = this.value / 100;
    });

    // Update seek bar
    audio.addEventListener('timeupdate', () => {
        const percentage = (audio.currentTime / audio.duration) * 100;
        seekBar.value = percentage;
    });

    // Seek functionality
    seekBar.addEventListener('input', () => {
        const time = (seekBar.value / 100) * audio.duration;
        audio.currentTime = time;
    });

    // Initial load
    loadSong(songIndex);
    updateQueueDisplay();
    populateCategories(); // Initial Category Loading
});