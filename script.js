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
    const homeButton = document.getElementById('home-button');
    const libraryButton = document.getElementById('library-button');
    const queueSection = document.getElementById('queue-section');
    const favoritesSection = document.getElementById('favorites-section');
    const favoritesList = document.getElementById('favorites-list');
    const addToFavoritesButton = document.getElementById('add-to-favorites');
    const startupPopup = document.querySelector('.startup-popup');
    const popupBackdrop = document.querySelector('.popup-backdrop');
    const closeButton = document.querySelector('.startup-popup .close-button');
    const currentTimeDisplay = document.getElementById('current-time');
    const durationDisplay = document.getElementById('duration');
    const muteButton = document.getElementById('mute-button');
    const visualizerCanvas = document.getElementById('visualizer');
    const visualizerContext = visualizerCanvas.getContext('2d');
         const musicPlayer = document.querySelector('.music-player');

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
            category: "Classical"
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
            title: "Gran Vals",
            artist: "Francisco Tárrega",
            cover: "img/francescotarrega.png",
            src: "music/gran_vals.ogg",
            category: "Classical"
        },
         {
            title: "Everybody Wants To Rule The World",
            artist: "Tears For Fears",
            cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7AtsSsVznbBTN_1d50nS3Z4H9vLGE__UX2Q&s",
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
            cover: "https://slm-assets.secondlife.com/assets/12554358/lightbox/Undyne_512.jpg?1444906219",
            src: "music/Spear_of_Justice_music.ogg",
            category: "VideoGame"
        },
        {
            title: "I Am a Poor Wayfaring Stranger",
            artist: "Jos Slovick",
            cover: "https://i1.sndcdn.com/artworks-Mo8M5YnvfxCzK9fi-r0EVfw-t500x500.png",
            src: "music/Jos Slovick - I Am a Poor Wayfaring Stranger (from 1917) - Official Audio [A Cappella] 4.mp3",
            category: "Spiritual"
        },
        {
            title: "A Sky Full Of Stars",
            artist: "Coldplay",
            cover: "img/askyfullofstars.jpeg",
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
            src: "music/thalizarnationalanthem.mp3",
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
          },
        {
            title: "Because Of Me",
            artist: "Seether",
            cover: "img/Karma And Effect.jpg",
            src: "music/Seether - Because Of Me.mp3",
            category: "Rock"
        },
        {
            title: "Bitter Taste",
            artist: "Three Days Grace",
            cover: "img/Life Starts Now.jpg",
            src: "music/Three Days Grace - Bitter Taste.mp3",
            category: "Rock"
        },
        {
            title: "Possession",
            artist: "Whitechapel",
            cover: "img/This Is Exile.jpg",
            src: "music/Whitechapel - Possession.mp3",
            category: "Deathcore"
        },
        {
            title: "Slow Life",
            artist: "Benjamin Lazarus",
            cover: "img/slowlife.webp",
            src: "music/slowlife.mp3",
            category: "Epic"
        },
        {
            title: "Bad Friend",
            artist: "Bad Wolves",
            cover: "img/Bad Friend.jpg",
            src: "music/Bad Wolves - Bad Friend.mp3",
            category: "Metal"
        },
        {
            title: "He's a Pirate - Pirates of the Carribean",
            artist: "Hanz Zimmer",
            cover: "img/hesapirate-h.zimmer.png",
            src: "music/hesapirate-h.zimmer.mp3",
            category: "Film Music"
        },
        {
            title: "James Bond theme",
            artist: "Monty Norman / John Barry",
            cover: "img/jamesbondtheme.jpeg",
            src: "music/jamesbondtheme.mp3",
            category: "Film Music"
        },
        {
            title: "Indiana Jones theme",
            artist: "John Williams",
            cover: "img/indianajonestheme.jpeg",
            src: "music/indianajonestheme.mp3",
            category: "Film Music"
        },
        {
            title: "Figure.09",
            artist: "Linkin Park",
            cover: "img/Meteora.jpg",
            src: "music/Linkin Park - Figure.09.mp3",
            category: "Rock"
        }
    ];

    let songIndex = 0;
    let isPlaying = false;
    let currentQueue = [...songs];

    const categories = [...new Set(songs.map(song => song.category))];

    const sortableList = document.getElementById('queue-list');
        Sortable.create(sortableList, {
            onEnd: function (evt) {
                let tempQueue = [];
                Array.from(sortableList.children).forEach(item => {
                    const songIndex = item.dataset.index;
                    tempQueue.push(songs[songIndex]);
                });
                currentQueue = tempQueue;
            }
        });
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
                  isPlaying = false;
                 playButton.innerHTML = '<i class="fas fa-play"></i>';
                  visualizerContext.clearRect(0, 0, visualizerCanvas.width, visualizerCanvas.height);
                  audio.pause();
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
            listItem.dataset.index = index;
            listItem.draggable = true;
             // Automatically play the song
            listItem.addEventListener('click', () => {
                songIndex = index;
                loadSong(songIndex);
                  if (audio.paused) {
                    togglePlayPause();
                }
                visualizerContext.clearRect(0, 0, visualizerCanvas.width, visualizerCanvas.height);
                 drawVisualizer();
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
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

        function saveFavorites() {
            localStorage.setItem('favorites', JSON.stringify(favorites));
        }

        function loadFavorites() {
        favoritesList.innerHTML = '';
        favorites.forEach(song => {
            const listItem = document.createElement('li');
            listItem.textContent = `${song.title} - ${song.artist} (${song.category})`;
             listItem.addEventListener('click', () => {
                const index = songs.findIndex(s => s.title === song.title && s.artist === song.artist);
                if (index !== -1) {
                    songIndex = index;
                    currentQueue = songs;
                    loadSong(songIndex);
                    updateQueueDisplay();
                     if (isPlaying) {
                        audio.play();
                        }
                     
                }

            });
            favoritesList.appendChild(listItem);
        });
    }


    function addToFavorites() {
        const currentSong = currentQueue[songIndex];
    
        const isFavorite = favorites.some(song => 
            song.title === currentSong.title && song.artist === currentSong.artist
        );
    
        if (!isFavorite) {
            favorites.push(currentSong);
            saveFavorites();
            loadFavorites();
            alert(`${currentSong.title} added to Your Library!`);
        } else {
            alert(`${currentSong.title} is already in Your Library!`);
        }
    }

    function showSection(sectionId) {
        queueSection.style.display = 'none';
        favoritesSection.style.display = 'none';

        const section = document.getElementById(sectionId);
        if(section) {
            section.style.display = 'block';
        }
    }

    let isMuted = false;

    function toggleMute() {
        isMuted = !isMuted;
        if (isMuted) {
            audio.muted = true;
            volumeControl.value = 0;
            muteButton.innerHTML = '<i class="fas fa-volume-mute"></i>';
        } else {
            audio.muted = false;
            volumeControl.value = audio.volume * 100;
            muteButton.innerHTML = '<i class="fas fa-volume-up"></i>';
        }
    }

function formatTime(time) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time - minutes * 60);
        return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    }

    let audioContext;
    let analyser;
    let bufferLength;
    let dataArray;


    function initVisualizer() {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        analyser = audioContext.createAnalyser();
        analyser.fftSize = 256;
        bufferLength = analyser.frequencyBinCount;
        dataArray = new Uint8Array(bufferLength);

        const source = audioContext.createMediaElementSource(audio);
        source.connect(analyser);
        analyser.connect(audioContext.destination);

        visualizerCanvas.width = musicPlayer.offsetWidth;
        visualizerCanvas.height = 50;
    }
    function drawVisualizer() {
         if (!analyser) return;

        requestAnimationFrame(drawVisualizer);
        analyser.getByteFrequencyData(dataArray);

        visualizerContext.fillStyle = '#121212';
        visualizerContext.fillRect(0, 0, visualizerCanvas.width, visualizerCanvas.height);

        const barWidth = (visualizerCanvas.width / bufferLength) * 2.5;
        let barHeight;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
            barHeight = dataArray[i];

            visualizerContext.fillStyle = '#1DB954';
            visualizerContext.fillRect(x, visualizerCanvas.height - barHeight/2, barWidth, barHeight/2);
            x += barWidth + 1;
        }
    }

    playButton.addEventListener('click', togglePlayPause);
    nextButton.addEventListener('click', nextSong);
    prevButton.addEventListener('click', prevSong);
    shuffleButton.addEventListener('click', shuffleQueue);
    searchButton.addEventListener('click', handleSearch);
    addToFavoritesButton.addEventListener('click', addToFavorites);
    homeButton.addEventListener('click', function() {
        showSection('queue-section');
    });
    libraryButton.addEventListener('click', function() {
        showSection('favorites-section');
    });

    searchInput.addEventListener('keypress', function(event) {
        if (event.key === "Enter") {
            handleSearch();
        }
    });

    volumeControl.addEventListener('input', function() {
        audio.volume = this.value / 100;
    });

      muteButton.addEventListener('click', toggleMute);

    audio.addEventListener('ended', nextSong);

  audio.addEventListener('play', () => {
        isPlaying = true;
        playButton.innerHTML = '<i class="fas fa-pause"></i>';
        updateSeekBarFill();
        if (audioContext.state === 'suspended') {
            audioContext.resume();
        }
        drawVisualizer();
    });

     audio.addEventListener('pause', () => {
         isPlaying = false;
         playButton.innerHTML = '<i class="fas fa-play"></i>';
    });
       audio.addEventListener('timeupdate', () => {
       const currentTime = audio.currentTime;
        const duration = audio.duration;

        currentTimeDisplay.textContent = formatTime(currentTime);
        durationDisplay.textContent = formatTime(duration);

        const percentage = (currentTime / duration) * 100;
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

    startupPopup.classList.add('active');
    popupBackdrop.classList.add('active');

    setTimeout(() => {
        startupPopup.classList.remove('active');
        popupBackdrop.classList.remove('active');
    }, 2000);

    closeButton.addEventListener('click', () => {
        startupPopup.classList.remove('active');
        popupBackdrop.classList.remove('active');
    });
       visualizerCanvas.width = musicPlayer.offsetWidth;
       visualizerCanvas.height = 50;

    loadSong(songIndex);
    updateQueueDisplay();
    populateCategories();
    loadFavorites();
    showSection('queue-section');
    initVisualizer();
    drawVisualizer();
    audio.addEventListener('ended', nextSong);
});
