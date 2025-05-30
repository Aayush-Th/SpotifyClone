console.log(`Let's write JavaScript`);
let currentSong = new Audio();
let currFolder;
let songs = [];

function secondsToMinutesSeconds(seconds) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

async function getSongs(music) {
  currFolder = music;
  try {
    let a = await fetch('./music/');
    let response = await a.text();
    console.log(response);
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");
    let songList = [];
    for (let index = 0; index < as.length; index++) {
      const element = as[index];
      if (element.href.endsWith(".mp3")) {
        songList.push(element.href.split("/music/")[1]);
      }
    }
    return songList;
  } catch (err) {
    console.error("Failed to fetch songs:", err);
    return [];
  }
}

const playMusic = (track) => {
  currentSong.src = `./music/${track}`;
  currentSong.play();
  play.src = "pause.svg";
  document.querySelector(".songinfo").innerHTML = decodeURI(track);
  document.querySelector(".songtime").innerHTML = "00:00 / 00:00";
};

async function main() {
  songs = await getSongs("/music/");
  console.log(songs);

  let songUl = document.querySelector(".songlist").getElementsByTagName("ul")[0];
  for (const song of songs) {
    let displayName = song
      .replace("ytmp3free.cc_", "")
      .replace("-youtubemp3free.org.mp3", "")
      .replace("-video-feat-sultaan-ghost-intense-raj-ranjodh", "")
      .replace("-prod-by-stunnah-beatz-official-music-video", "")
      .replace("-official-music-video", "")
      .replace("-hindi-full-video-song-vikrant-rona-kichcha-sudeep-jacqueline-anup-bhandari", "")
      .replace("-a-tribute-to-rapperiya-baalam-rajneesh-jaipuri-honey-trouper", "")
      .replace("-a-tribute-to-rapperiya-baalam-ft-jagirdar-rv-i-album-thar-coast", "")
      .replace("-original-video-gulshan-kumar-hariharan-full-hd", "")
      .replace(".mp3", "")
      .trim();

    songUl.innerHTML += `
      <li>
        <img class="invert" src="https://raw.githubusercontent.com/CodeWithHarry/Sigma-Web-Dev-Course/b0acb01fa88ae0753ef903b8fc45fadb5efe1c2b/Video%2084%20-%20Project%202%20-%20Spotify%20Clone/img/music.svg" alt="music">
        <div class="info">
          <div>${displayName}</div>
          <div>songArtist</div>
        </div>
        <div class="playnow">
          <span>Play Now</span>
          <img src="https://raw.githubusercontent.com/CodeWithHarry/Sigma-Web-Dev-Course/b0acb01fa88ae0753ef903b8fc45fadb5efe1c2b/Video%2084%20-%20Project%202%20-%20Spotify%20Clone/img/play.svg" alt="play" class="invert">
        </div>
      </li>`;
  }

  // Add click listeners
  Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach((e, index) => {
    e.addEventListener("click", () => {
      playMusic(songs[index]);
    });
  });

  play.addEventListener("click", () => {
    if (currentSong.paused) {
      currentSong.play();
      play.src = "pause.svg";
    } else {
      currentSong.pause();
      play.src = "play.svg";
    }
  });

  currentSong.addEventListener("timeupdate", () => {
    document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)} / ${secondsToMinutesSeconds(currentSong.duration)}`;
    document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
  });

  document.querySelector(".seekbar").addEventListener("click", e => {
    let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
    document.querySelector(".circle").style.left = percent + "%";
    currentSong.currentTime = (currentSong.duration * percent) / 100;
  });

  document.querySelector(".hamburger").addEventListener("click", () => {
    document.querySelector(".left").style.left = "0";
  });

  document.querySelector(".close").addEventListener("click", () => {
    document.querySelector(".left").style.left = "-120%";
  });

  previous.addEventListener("click", () => {
    let index = songs.indexOf(currentSong.src.split("/").pop());
    if (index > 0) {
      playMusic(songs[index - 1]);
    }
  });

  next.addEventListener("click", () => {
    let index = songs.indexOf(currentSong.src.split("/").pop());
    if (index < songs.length - 1) {
      playMusic(songs[index + 1]);
    }
  });

  document.querySelector(".range input").addEventListener("change", (e) => {
    currentSong.volume = parseInt(e.target.value) / 100;
  });
}

main();