console.log(`lets write javascript`);
let currentSong = new Audio();
//let songs;
let currFolder;

 async function getSongs(music){
   currFolder = music
    let a = await fetch(`./music/`)
 let response = await a.text();
  console.log(response)
  let div = document.createElement("div")
  div.innerHTML = response;
   let as = div.getElementsByTagName("a")
    let songs = []
   for(let index = 0; index < as.length; index++){
    const element = as[index];
    if(element.href.endsWith(".mp3")){
        songs.push(element.href.split("/music/")[1])
    }
   }
   return songs
}

const playMusic = (track)=>{
   //let audio = new Audio("/music/" + track)
   currentSong.src = "/music/" + track
   currentSong.play()
   play.src = "pause.svg"
   document.querySelector(".songinfo").innerHTML = track
   document.querySelector(".songtime").innerHTML = "00:00/00:00"
   }



async function main(){

//let currentSong = new Audio();

let songs = await getSongs("/music/")
console.log(songs)

let songUl = document.querySelector(".songlist").getElementsByTagName("ul")[0]
 for(const song of songs){
    songUl.innerHTML = songUl.innerHTML + `<li>
                    <img class="invert" src="https://raw.githubusercontent.com/CodeWithHarry/Sigma-Web-Dev-Course/b0acb01fa88ae0753ef903b8fc45fadb5efe1c2b/Video%2084%20-%20Project%202%20-%20Spotify%20Clone/img/music.svg" alt="music">
                    <div class="info">
                        <div>Songname</div>
                    <div>songArtist</div>
                    </div>
                    <div class="playnow">
                        <span>Play Now</span>
                    <img src="https://raw.githubusercontent.com/CodeWithHarry/Sigma-Web-Dev-Course/b0acb01fa88ae0753ef903b8fc45fadb5efe1c2b/Video%2084%20-%20Project%202%20-%20Spotify%20Clone/img/play.svg" alt="play" class="invert">
                    </div></li>';
             
    
    
    
    ${song.replace("ytmp3free.cc_"," ").replace("-youtubemp3free.org.mp3"," ").replace("-video-feat-sultaan-ghost-intense-raj-ranjodh"," ").replace("-prod-by-stunnah-beatz-official-music-video"," ").replace("-official-music-video"," ").replace("-hindi-full-video-song-vikrant-rona-kichcha-sudeep-jacqueline-anup-bhandari"," ").replace("-a-tribute-to-rapperiya-baalam-rajneesh-jaipuri-honey-trouper"," ").replace("-a-tribute-to-rapperiya-baalam-ft-jagirdar-rv-i-album-thar-coast"," ").replace("-original-video-gulshan-kumar-hariharan-full-hd"," ")} </li>`;
 }


 // attach an event listner to each song
 Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e=>{
  e.addEventListener("click",element=>{
   console.log(e.querySelector(".info").firstElementChild.innerHTML)
   playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
  })
})




play.addEventListener("click",()=>{
   if(currentSong.paused){
      currentSong.play()
       play.src = "pause.svg"
   }else{
      currentSong.pause()
      play.src = "play.svg"
   }
})


}




main()
