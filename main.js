var containerDiv = document.getElementsByClassName('container')[0];
var startBtn = document.getElementsByClassName('start')[0];
var timer = document.getElementsByClassName('countdown')[0];
var allLevels = document.getElementsByClassName('levels')[0];
var time = 5;
var icons =
["address-card","bath","envelope-open","grav","microchip","telegram","thermometer-full","window-close","wpexplorer","handshake-o","podcast","battery-full","building","arrows-v","crop","crosshairs","address-book","bandcamp","id-card-o","etsy","id-badge","linode","quora","snowflake-o","thermometer-empty", "user-circle", "bath", "eercast","free-code-camp", "meetup", "superpowers", "window-restore","address-card","bath","envelope-open","grav","microchip","telegram","thermometer-full","window-close","wpexplorer","handshake-o","podcast","battery-full","building","arrows-v","crop","crosshairs","address-book","bandcamp","id-card-o","etsy","id-badge","linode","quora","snowflake-o","thermometer-empty", "user-circle", "bath", "eercast","free-code-camp", "meetup", "superpowers", "window-restore"];
icons.sort();
var pushArray = [];
var matchArray = [];
var counter = 0;
var level = 0;
var allBoxes ="";
var loop = "";




//start igre

startBtn.addEventListener('click',startGame);

function startGame(){
  time=60;
  icons =
  ["address-card","bath","envelope-open","grav","microchip","telegram","thermometer-full","window-close","wpexplorer","handshake-o","podcast","battery-full","building","arrows-v","crop","crosshairs","address-book","bandcamp","id-card-o","etsy","id-badge","linode","quora","snowflake-o","thermometer-empty", "user-circle", "bath", "eercast","free-code-camp", "meetup", "superpowers", "window-restore","address-card","bath","envelope-open","grav","microchip","telegram","thermometer-full","window-close","wpexplorer","handshake-o","podcast","battery-full","building","arrows-v","crop","crosshairs","address-book","bandcamp","id-card-o","etsy","id-badge","linode","quora","snowflake-o","thermometer-empty", "user-circle", "bath", "eercast","free-code-camp", "meetup", "superpowers", "window-restore"];
  icons.sort();
  checkLevel();
  createTable();
  style();
  startTimer();
  startBtn.removeEventListener('click',startGame);
  startBtn.style.display = "none";
  allLevels.style.display = "none";
  for (var i = 0; i < allBoxes.length; i++) {
  allBoxes[i].style.display = "block";
}
timer.style.display = "block";

}

function createTable(){
  icons.length = level;
  console.log(icons);
  var text = "";
  for (var i = 0; i < level; i++) {
    var rand = icons.splice(Math.floor(Math.random()*icons.length),1);
    text += '<div class="box"><div class="front"></div><div class="back"><i class="fa fa-' + rand + '" aria-hidden="true"></i></div></div>';
  }
  containerDiv.innerHTML = text;
  allBoxes = document.getElementsByClassName('box');
  for (var i = 0; i < allBoxes.length; i++) {
    allBoxes[i].addEventListener('click',flip);
    allBoxes[i].style.display = "none";
    timer.style.display = "none";
  }
}

function flip(){

  this.removeEventListener('click',flip);
  counter++;
  var front = this.children[0];
  var back = this.children[1];
  pushArray.push(this);
  front.style.transform = "perspective(900px) rotateY(180deg)";
  back.style.transform = "perspective(900px) rotateY(0deg)";
  if (counter===2) {
    checkEqual();
  }
  endGame();
}

function checkEqual(){
  removeListener();
  var front1 = pushArray[0].children[0];
  var back1 = pushArray[0].children[1];
  var front2 = pushArray[1].children[0];
  var back2 = pushArray[1].children[1];
  if (back1.innerHTML === back2.innerHTML) {
    back1.style.background = "tomato";
    back2.style.background = "tomato";
    counter = 0;
    matchArray.push(pushArray[0]);
    matchArray.push(pushArray[1]);
    pushArray.length = 0;
    addListener();
    for (var i = 0; i < matchArray.length; i++) {
      matchArray[i].removeEventListener('click',flip);
    }
    time += 5;
  }else{
    setTimeout(function(){
      front1.style.transform = "perspective(900px) rotateY(0deg)";
      back1.style.transform = "perspective(900px) rotateY(180deg)";
      front2.style.transform = "perspective(900px) rotateY(0deg)";
      back2.style.transform = "perspective(900px) rotateY(180deg)";
      counter = 0;
      pushArray.length = 0;
      addListener();
      for (var i = 0; i < matchArray.length; i++) {
        matchArray[i].removeEventListener('click',flip);
      }
    },600);
  }
}

function addListener(){
  for (var i = 0; i < allBoxes.length; i++) {
    allBoxes[i].addEventListener('click',flip);
  }
}
function removeListener(){
  for (var i = 0; i < allBoxes.length; i++) {
    allBoxes[i].removeEventListener('click',flip);
  }
}

function startTimer(){
  timer.innerHTML = `${time} sec`;
  loop = setInterval(function(){
    time--;
    timer.innerHTML = `${time} sec`;
    if(time===0){
      clearInterval(loop);
      removeListener();
      alert("Kraj igre!\n Vase vreme je isteklo!");
      startBtn.style.display = "block";
      startBtn.addEventListener('click',startGame);
      allLevels.style.display = "block";
    };
  },1000);
}

function checkLevel(){
  if (allLevels.children[0].checked) {
    level = allLevels.children[0].defaultValue;
  }else if (allLevels.children[2].checked) {
    level = allLevels.children[2].defaultValue;
  }else if (allLevels.children[4].checked) {
    level = allLevels.children[4].defaultValue;
  }else if (allLevels.children[6].checked) {
    level = allLevels.children[6].defaultValue;
  }
}

function style(){
  if (allBoxes.length===4) {
    for (var i = 0; i < allBoxes.length; i++) {
      allBoxes[i].style.width = "200px";
      allBoxes[i].style.height = "200px";
      allBoxes[i].style.fontSize = "120px";
      allBoxes[i].style.lineHeight = "200px";
      allBoxes[i].children[0].style.width = "200px";
      allBoxes[i].children[0].style.height = "200px";
      allBoxes[i].children[1].style.width = "200px";
      allBoxes[i].children[1].style.height = "200px";

    }
  }else if (allBoxes.length===16) {
    for (var i = 0; i < allBoxes.length; i++) {
      allBoxes[i].style.width = "100px";
      allBoxes[i].style.height = "100px";
      allBoxes[i].style.fontSize = "60px";
      allBoxes[i].style.lineHeight = "100px";
      allBoxes[i].children[0].style.width = "100px";
      allBoxes[i].children[0].style.height = "100px";
      allBoxes[i].children[1].style.width = "100px";
      allBoxes[i].children[1].style.height = "100px";
    }
  }else if (allBoxes.length===36) {
    for (var i = 0; i < allBoxes.length; i++) {
      allBoxes[i].style.width = "66.5px";
      allBoxes[i].style.height = "66.5px";
      allBoxes[i].style.fontSize = "38.6px";
      allBoxes[i].style.lineHeight = "66.5px";
      allBoxes[i].children[0].style.width = "66.5px";
      allBoxes[i].children[0].style.height = "66.5px";
      allBoxes[i].children[1].style.width = "66.5px";
      allBoxes[i].children[1].style.height = "66.5px";
    }
  }
}

function endGame(){
      if (matchArray.length==level) {
        removeListener();
        clearInterval(loop);
        alert("Bravo! Otkrili ste sva polja!");
        startBtn.style.display = "block";
        allLevels.style.display = "block";
        startBtn.addEventListener('click',startGame);
        matchArray.length = 0;
      }
}
