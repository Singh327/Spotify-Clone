console.log('Writing javascript')
let currentSong = new Audio();
let songs;
function secondToMinuteSeconds(seconds){
  if(isNaN(seconds)|| seconds<0){
    return "Invalid input";
  }
  const minutes = Math.floor(seconds/60);
  const remainingSeconds = Math.floor(seconds%60);

  const formattedMinutes = String(minutes).padStart(2,'0');
  const formattedSeconds = String(remainingSeconds).padStart(2,'0');
  return `${formattedMinutes}:${formattedSeconds}`;
}

async function getsongs(){

let a = await fetch("http://127.0.0.1:3000/songs/OldIsGold")
let response = await a.text();
console.log(response)
let div = document.createElement('div');
div.innerHTML = response
let as =  div.getElementsByTagName('a');
let songs = [];

for (let i = 0; i < as.length; i++) {
    const element = as[i];
    if(element.href.endsWith(".mp3")){
        songs.push(element.href.split("OldIsGold/")[1]);    
    }
    
}
console.log(songs[0]);
 return songs
}

const playMusic = (track,pause=false)=>{
    let audio = new Audio("/songs/OldIsGold/"+track);
    console.log(audio);
    currentSong.src = "/songs/OldIsGold/"+track;
    if(!pause){
    currentSong.play();
    play.src = "/img/pause.svg"
    }
    
    document.querySelector(".songinfo").innerHTML = decodeURI(track);
    document.querySelector(".songtime").innerHTML = "00:00/00:00";
}
async function main(){
 
    // get the list of all the songs
songs = await getsongs();
console.log(songs)
playMusic(songs[0],true)
 

// show all the songs in the playlist
let songUL = document.querySelector(".songList").getElementsByTagName('ul')[0]

for (const song of songs) {
     songUL.innerHTML = songUL.innerHTML + `<li><img class="invert" src="/img/music.svg" alt="">
            <div class="info">
             <div>${song.replaceAll("%20"," ")} </div>
             <div>Harry</div>
            </div>
            <div class="playnow">
              <span>Play Now</span>
              <img class="invert" src="/img/play.svg" alt="">
            </div>
            
          </li>`;
}
console.log(songUL)

// Attach an event listener to each song

Array.from(document.querySelector(".songList").getElementsByTagName('li')).forEach(e=>{
   e.addEventListener("click",element=>{
    console.log(e.querySelector(".info").firstElementChild.innerHTML);
    playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
    
    // document.querySelector(".songinfo").style.color = 'white';
   
   })
     

})

// Attach an eventListener to play,next and previous
 play.addEventListener("click",()=>{
      if(currentSong.paused){
        currentSong.play();
        play.src = "/img/pause.svg"
      }
      else{
        currentSong.pause();
          play.src = "/img/play.svg"
      }
 })

 // Listen for time update events
 currentSong.addEventListener("timeupdate",()=>{
   let currentdur = secondToMinuteSeconds(currentSong.currentTime);
   let totalduration= secondToMinuteSeconds(currentSong.duration)
   document.querySelector(".songtime").innerHTML = `${currentdur} / ${totalduration}`;
   document.querySelector(".circle").style.left = (currentSong.currentTime/currentSong.duration)*100  + "%"
 })

 // Add an event listener to seekbar
 document.querySelector(".seekbar").addEventListener("click",(e)=>{
  console.log(e.target)
  console.log(e.target.getBoundingClientRect().width,e.offsetX)
  let percent=(e.offsetX/e.target.getBoundingClientRect().width) * 100
  e.target.firstElementChild.style.left = percent + "%";
  currentSong.currentTime = currentSong.duration*percent/100;
  console.log(currentSong.currentTime)
 })


 //  Add an event listener for hamburger
 document.querySelector(".hamburger").addEventListener("click",e=>{
   document.querySelector(".left").style.left= 0 + "%";
 })

 //  Add an event listener for close button
 document.querySelector(".close").addEventListener("click",e=>{
  document.querySelector(".left").style.left= "-120%";
 })

 // Add an event listener to previous and next
 previous.addEventListener("click",()=>{
     console.log("previous clicked")
     console.log(currentSong.src.split("/").slice(-1)[0]);
     console.log(songs)
     let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
     if((index-1)>=0){
     playMusic(songs[index-1]);
     }
 })

 next.addEventListener("click",()=>{
     console.log("next clicked");
     console.log(currentSong.src.split("/").slice(-1)[0]);
     console.log(songs)
     let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
    
     if((index+1) > length){
     playMusic(songs[index+1]);
     }
 })
}
  
main();  
