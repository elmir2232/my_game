
$(document).ready(function() {
  
  const CubeCreator = () =>{ for(let i=0;i<cubes;i++ ){
  const color = ColorSelector()
  if (color==="white"){
    $(
      '<div>', {
        'class': "game-cube",
        'id': "game-cube"+i,
        'text':"+1",
        'style': "visibility: hidden; background-color:"+color
      }
    ).appendTo("#game-field")
  }
  else 
    $(
      '<div>', {
        'class': "game-cube",
        'id': "game-cube"+i,
        'style': "visibility:hidden; background-color:"+color
      }
    ).appendTo("#game-field")
    
    }
}
  CubeCreator();
  DrawResults();
  $("#game-field div").on('click',(function( event ) {
    if(event.target.style.backgroundColor === "white"){
      event.target.style.visibility = 'hidden';  
      GameStart(getRandomInt(3));
      counter++;
      currentTimeInt++;
      $('#current-result')[0].innerHTML = counter;
    }
    else if (event.target.style.backgroundColor === "black"){
      event.target.style.visibility = 'hidden';  
      currentTimeInt-=10;
    }
    else{
      event.target.style.visibility = 'hidden';  
      GameStart(getRandomInt(3));
      counter++;
      $('#current-result')[0].innerHTML = counter;
    }
    }))
});
const cubes = Math.pow(Math.round($("#game-field").outerHeight() / 28),2)
let counter = 0;
const GameStart = (n)=>{
  $('#current-result')[0].innerHTML = counter;
  for( let i =0; i<n;i++){
  $("#game-cube"+getRandomInt(324))[0].style.visibility = "visible"}
 [...$('#settings span')].forEach(element => element.style.display = "inline");
 $('#pause-button')[0].style.display = "inline";
 $("#start-button")[0].style.display = "none";
 $("#settings")[0].style.justifyContent = "space-between";
 

}
const getRandomInt = (n) => Math.floor(Math.random() * Math.floor(n));
let startTimeInt = 60;
let currentTimeInt = startTimeInt;
let interval = undefined;
const startTimer=() =>{
     if(!interval){
       $('#time')[0].innerHTML = currentTimeInt; 
       interval = setInterval(newNumber, 1000) 
       $("#pause-button")[0].style.display = "inline";
       $("#reset-button")[0].style.display = "inline";
       $("#unpause-button")[0].style.display = "none";
       $('#game-field')[0].style.pointerEvents='auto'
     }
}
function resetTimer(){
  currentTimeInt = startTimeInt;  
  document.getElementById('time').innerHTML = currentTimeInt;
  for( let i = 0;i<cubes;i++){
    $("#game-cube"+i)[0].style.visibility = "hidden"
  }
  counter = 0;
  startTimer();
  GameStart(15) 
  
}
const stopTimer=()=> {
     $("#pause-button")[0].style.display = "none";
     $("#unpause-button")[0].style.display = "inline";
     $('#game-field')[0].style.pointerEvents='none'
     clearInterval(interval)
     interval = undefined;
}
const newNumber=()=>{
     currentTimeInt--; 
    $('#time')[0].innerHTML = currentTimeInt; 
     if(currentTimeInt <= 0){
      $('#time')[0].innerHTML = 0;
      $("#staticBackdropLabel")[0].innerHTML= "Your result is: " + counter
      $('#staticBackdrop').modal('show');
       stopTimer();
     }
}

$('#hide').click(function () {
  $('#block').hide(parameters);
});
let resultObj = JSON.parse(localStorage.getItem("results"))
const SendResult =()=> {
  const name = $("#validationDefault03")[0].value
  if (resultObj===null) {
    resultObj = [
        {name,
        counter}
      ]
  }
  else
  resultObj = [
  ...resultObj,
    {name,
    counter}
  ]
 localStorage.setItem("results", JSON.stringify(resultObj))
}
const DrawResults = ()=>{
  if(resultObj!= null){
    sortByResult(resultObj);
  for (let user of resultObj) {
    if(user.name  != ''){
    let tr = document.createElement('tr');
    let td1 = document.createElement('td');
    td1.innerHTML = user.name;
    tr.appendChild(td1);
    let td2 = document.createElement('td');
    td2.innerHTML = user.counter;
    tr.appendChild(td2);   
    table.appendChild(tr);
      }
    }
  }
}
const ColorSelector = () => {
  const ColorsArray = ["white","blue","green","yellow","black"]
  const rnumber = getRandomInt(100); 
  switch(true){
    case rnumber>=0 && rnumber<10:  
      return ColorsArray[0] 
    case rnumber>=10 && rnumber<40:
        return ColorsArray[1]
    case rnumber>=40 && rnumber<70:
        return ColorsArray[2]
    case rnumber>=70 && rnumber<95:
        return ColorsArray[3]
    case rnumber>=95 && rnumber<=100:
        return ColorsArray[4]   
  }
}
const sortByResult = (arr) => {
  arr.sort((a, b) => a.counter > b.counter ? -1 : 1);
}