var songsCollection=[]
var songContainer=document.getElementsByClassName('playSong');
var playingIndex=0;
let helper={}
for (let i = 0; i<songContainer.length;i++) {
  let entry = songContainer[i].getAttribute('data-name')
  if(!(entry in helper)){
    helper[entry]=true;
    songsCollection.push(entry)
  }
}


// Code to Handle Play Button Clicking

var pbutton=document.getElementById('pbutton')
var play=true
pbutton.addEventListener('click',playing)
function playing() {

  if(play==true) {
    pbutton.innerHTML='<i class="fa-solid fa-play"></i>';
    play=false;
    if(ele.getAttribute('src')!=="") {
      ele.pause();
    }
  }
  else {
    pbutton.innerHTML='<i class="fa-solid fa-pause"></i>'
    play=true;
    if(ele.getAttribute('src')!=="") {
      ele.play();
    }
  }
}

//Code to Handle liking of buttons

var likeIcon = document.getElementsByClassName('like')
for(let obj of likeIcon) {
  obj.style.transform="scale(1.2)"
  obj.addEventListener('click',liking)
}
function liking() {

  if(this.style.color=='white') {
    this.style.color='red';
  }
  else if(this.style.color=='red'){
    this.style.color='white';
  }

}

//Code to handle music playing. Handles click on <div> except
//favourite and also checks if a new song is played or current is 
//being continued to fiddled with. Calls Playing() to adjust songbar
//data-* attributes used heavily

var playing_name=document.getElementById('songName');
var playing_duration=document.getElementById('songDuration');
var ele=document.getElementById('audiotag')
var pauseSong=true;

var playing_pic=document.getElementById('playing-pic');
var same=null;

for(let obj of songContainer) {
  obj.addEventListener('click',playSong)

}



function playSong() {

  var name=this.getAttribute('data-name')
  for(let i = 0; i<songsCollection.length; i++) {
    if(name==songsCollection[i]){
      playingIndex=i;
    }
  }

  if(same!=name) {
    var path = "songs/"+name+".mp3"
    ele.setAttribute('src',path);
    playing_duration.innerHTML=this.getAttribute('data-time');
    playing_name.innerHTML=this.getAttribute('data-name');
    var logo_path=`url(${this.getAttribute('data-pic')})`;
    playing_pic.style.backgroundImage=logo_path;
    same=name;
    play=false
    playing();
    pauseSong=false;
  
  }
  else {
    if(pauseSong) {
      play=false
      playing();
      pauseSong=false;
    
    }
    else if(!pauseSong){
      play=true;
      playing();
      pauseSong=true;
      
    }
  }
  

}
//Code to handle forward and backward buttons
document.getElementById('step-back').addEventListener('click',goBack);
document.getElementById('step-ahead').addEventListener('click',goAhead);

function goBack() {
  
  if(playingIndex==0) {
    playingIndex=songsCollection.length-1;
  }
  else{
    playingIndex--;
  }
  let songName = songsCollection[playingIndex];
  ele.setAttribute('src',"songs/"+songName+".mp3");

  let element = null
  for(let i of songContainer){
    if(i.getAttribute('data-name')==songName){
      element=i
    }
  }
  playing_duration.innerHTML=element.getAttribute('data-time');
  playing_name.innerHTML=element.getAttribute('data-name');
  let logo_path=`url(${element.getAttribute('data-pic')})`;
  playing_pic.style.backgroundImage=logo_path;
  same=songName;
  play=false
  playing();
  pauseSong=false;
}

function goAhead() {
  if(playingIndex==songsCollection.length-1) {
    playingIndex=0;
  }
  else {
    playingIndex++;
  }
  let songName = songsCollection[playingIndex];
  ele.setAttribute('src',"songs/"+songName+".mp3");

  let element = null
  for(let i of songContainer){
    if(i.getAttribute('data-name')==songName){
      element=i
    }
  }
  playing_duration.innerHTML=element.getAttribute('data-time');
  playing_name.innerHTML=element.getAttribute('data-name');
  let logo_path=`url(${element.getAttribute('data-pic')})`;
  playing_pic.style.backgroundImage=logo_path;
  same=songName;
  play=false
  playing();
  pauseSong=false;

}

//Progress Bar update

var pbar=document.getElementsByClassName('progress-bar')[0]
function changeProgress() {
  let length=this.duration
  let runTime=this.currentTime
  var breadth=(runTime/length)*100
  pbar.style.width=`${breadth}%`
  if(runTime>=length) {
    pbutton.innerHTML='<i class="fa-solid fa-play"></i>';
    play=false;
  }
}
ele.addEventListener('timeupdate',changeProgress)
document.getElementsByClassName('progress')[0].addEventListener('click',skipToTime)

function skipToTime(event) {
 
  let length = ele.duration;
  let point=event.offsetX
  ele.currentTime=(length/parseFloat(this.clientWidth))*point
  changeProgress();
}
 
var volumeBar = document.getElementsByClassName('volume')[0]
initialiseVolume();
function initialiseVolume() {
  let a = ele.volume;
  volumeBar.style.width = `${a*100}%`
}
document.getElementsByClassName('vbar-son')[0].addEventListener('click',changeVolume);
function changeVolume(event) {
  let point=event.offsetX;
  let b = eval(point/this.clientWidth)
  ele.volume=b;
  initialiseVolume();
}

