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
    const categoryList = document.getElementById('category-list');

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
            artist: "Church of Panditu",
            cover: "img/thetruepandagod-quizzitymc.jpeg",
            src: "music/thetruepandagod-quizzitymc.mp3",
            category: "Religious"
        },
        {
            title: "The Book Of Rana",
            artist: "Church of Panditu",
            cover: "img/bookofrana-quizzitymc.jpeg",
            src: "music/bookofrana-quizzitymc.mp3",
            category: "Religious"
        },
         {
            title: "Everybody Wants To Rule The World",
            artist: "Tears For Fears",
            cover: "img/aristocracy-pineapplemusic.webp",
            src: "music/Everybody Wants To Rule The World 4.mp3",
            category: "Pop"
        },
        {
            title: "Ode to the Panda Land",
            artist: "The Thalizar Empire",
            cover: "img/thetruepandagod-quizzitymc.jpeg",
            src: "music/Ode to the Panda Land.mp3",
            category: "Religious"
        },
        {
            title: "Spear of Justice",
            artist: "Toby Fox",
            cover: "img/thetruepandagod-quizzitymc.jpeg",
            src: "music/Spear_of_Justice_music.ogg",
            category: "VideoGame"
        },
        {
            title: "I Am a Poor Wayfaring Stranger",
            artist: "Jos Slovick",
            cover: "img/EveryBodyWantsToRuleTheWorld-TearsForFears.png",
            src: "music/Jos Slovick - I Am a Poor Wayfaring Stranger (from 1917) - Official Audio [A Cappella] 4.mp3",
            category: "Spiritual"
        },
        {
            title: "A Sky Full Of Stars",
            artist: "Coldplay",
            cover: "img/aristocracy-pineapplemusic.webp",
            src: "music/Coldplay - A Sky Full Of Stars (Official audio) 4.mp3",
            category: "Pop"
        },
        {
            title: "Clocks",
            artist: "Coldplay",
            cover: "img/thetruepandagod-quizzitymc.jpeg",
            src: "music/Clocks 4.mp3",
            category: "Pop"
        },
        {
            title: "Anthem Of Thalizar",
            artist: "The Thalizar Empire",
            cover: "img/winterwalk-purrplecat.jpeg",
            src: "music/anthem-of-thalizar.mp3",
            category: "Thalizar"
        },
        {
            title: "Sempurna",
            artist: "Andra And The Backbone",
            cover: "https://i.ytimg.com/vi/jStNaVCW838/sddefault.jpg",
            src: "music/Andra And The Backbone - Sempurna (Official Music Video) 4.mp3",
            category: "Rock"
        },
        {
            title: "104 Credits",
            artist: "Antimo & Welles",
            cover: "https://i.ytimg.com/vi/4pDfwXrQgXM/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDEqH5T8xkifOFwKE2gC435VFdTuA",
            src: "music/104 Credits [Minecraft_ Story Mode 104 OST] 4.mp3",
            category: "VideoGame"
        },
        {
              title: "Aria: Zu Tanze, zu Sprunge",
              artist: "J.S. Bach",
              cover: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Johann_Sebastian_Bach.jpg/250px-Johann_Sebastian_Bach.jpg",
              src: "music/J.S. Bach - BWV 201 (7_15) - Aria_ _Zu Tanze, zu Sprunge so wackelt das Herz_ 4.mp3",
              category: "Classical"
          }
    ];

    let songIndex = 0;
    let isPlaying = false;
    let currentQueue = [...songs];

    const categories = [...new Set(songs.map(song => song.category))];

     function populateCategories() {
         categoryList.innerHTML = '';
         categories.forEach(category => {
             const listItem = document.createElement('li');
             listItem.textContent = category;
             listItem.addEventListener('click', () => {
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

    function loadSong(index) {
        const song = currentQueue[index];
        songCover.src = song.cover;
        songTitle.textContent = song.title;
        artistName.textContent = song.artist;
        audio.src = song.src;
    }

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

    function nextSong() {
        songIndex = (songIndex + 1) % currentQueue.length;
        loadSong(songIndex);
        if (isPlaying) {
            audio.play();
        }
    }

    function prevSong() {
        songIndex = (songIndex - 1 + currentQueue.length) % currentQueue.length;
        loadSong(songIndex);
        if (isPlaying) {
            audio.play();
        }
    }

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
        updateSeekBarFill();
    });

    audio.addEventListener('pause', () => {
         isPlaying = false;
         playButton.innerHTML = '<i class="fas fa-play"></i>';
    });

    volumeControl.addEventListener('input', function() {
        audio.volume = this.value / 100;
    });

    audio.addEventListener('timeupdate', () => {
        const percentage = (audio.currentTime / audio.duration) * 100;
        seekBar.value = percentage;
        updateSeekBarFill();
    });

    seekBar.addEventListener('input', () => {
        const time = (seekBar.value / 100) * audio.duration;
        audio.currentTime = time;
    });

    function updateSeekBarFill() {
        const percentage = (audio.currentTime / audio.duration) * 100;
        seekBar.style.setProperty('--seek-before-width', `${percentage}%`);
    }

    loadSong(songIndex);
    updateQueueDisplay();
    populateCategories();

    const popup = document.querySelector('.startup-popup');
    const popupBackdrop = document.querySelector('.popup-backdrop');
    const closeButton = document.querySelector('.startup-popup .close-button');
    let popupTimeout;

    function showPopup() {
        popup.classList.add('active');
        popupBackdrop.classList.add('active');
    }

    function closePopup() {
        popup.classList.remove('active');
        popupBackdrop.classList.remove('active');
        clearTimeout(popupTimeout); 
    }

    setTimeout(() => {
        showPopup();
        popupTimeout = setTimeout(closePopup, 11000); 
    }, 1000);


    closeButton.addEventListener('click', closePopup);

    popupBackdrop.addEventListener('click', closePopup);
});
