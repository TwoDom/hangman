/* prepare list of words */
var myList = ['aeroplan', 'bookshelf', 'business', 'suitcase', 'childhood', 'company', 'country', 'fiction', 'family', 'government', 'group', 'hand', 'homesick', 'adolescence', 'money', 'month', 'mother', 'night', 'number', 'party', 'people', 'place', 'point', 'problem', 'program', 'question', 'right', 'bedroom', 'school', 'state', 'history', 'student', 'study', 'system', 'thing', 'timestamp', 'water', 'weekend', 'woman', 'world', 'year','window', 'zebra']

var current, letters, chances, gaps;
var win = 0;
var totalScore = 0;

function showGrayPanel(result){
  document.getElementById('newGame-wrapper').setAttribute('class','active');
  let text = document.getElementById('newGame');
  let comment = document.querySelector('#newGame-wrapper h4');
  if (result === "fail"){
    comment.textContent = "Ups!";
    text.textContent = "try again";
  } else {
    comment.textContent = "Great job!";
    text.textContent = "one more";
  }
}

function closeGrayPanel(){
  let panel = document.getElementById('newGame-wrapper');
  if(panel.classList.contains('active')){
    panel.classList.remove('active');
  }
}

function clearGameFields(){
  let fields = document.querySelectorAll('.letter');
  Array.from(fields).forEach(function(field){
    field.remove();
  })
  let tries = document.querySelectorAll('#alphabet span');
  Array.from(tries).forEach(function(item){
    item.classList.remove('tried');
  })
}

function chooseRandomWord(){
  x = Math.floor((Math.random() * myList.length));
  current = myList[x];
  letters = current.split("");
  chances = letters.length;
  gaps = letters.length;
}

function prepareGame(){
  closeGrayPanel();
  clearGameFields();
  chooseRandomWord();

  /* set page for new game */
  document.getElementById("chances").textContent = chances;

  /* prepare letter fields */
  letters.forEach(function(letter){
    let span = document.createElement("span");
    span.setAttribute('class', 'letter');
    let element = document.getElementById("letters");
    element.appendChild(span);
  })
}

function tryLetter(guess){
  let trueGuess = 0;

  for(var i=0; i < letters.length; i++){
    if(letters[i] == guess){
      var ses = document.getElementsByClassName('letter');
      ses[i].innerHTML = guess;
      ses[i].classList.add('up');
      trueGuess += 1;
      gaps -= 1;
    }
  }

  /* update chances left */
  if (trueGuess == 0 ){
    chances -= 1
    document.getElementById("chances").textContent = chances;
  }

  /* set loss / win conditions */
  if (chances == 0 ){
    showGrayPanel("fail");
  } else if (gaps == 0 ) {
    win += 1;
    totalScore += chances;
    document.getElementById("win").textContent = win;
    document.getElementById("total").textContent = totalScore;
    document.getElementById('letters').setAttribute('class','victory');
    showGrayPanel("success");
  }
}

document.addEventListener('DOMContentLoaded', function() {
  prepareGame();
}, false);

document.getElementById('alphabet').addEventListener('click', function(e){
  let check = e.target;
  let content = e.target.textContent;
  if (check.classList.length === 0 && content.length === 1 ){
    check.setAttribute('class', 'tried');
    tryLetter(content);
  }
})


// /* remove used word from the list */
// // myList.splice(x, 1);
// // console.log(current, myList);
