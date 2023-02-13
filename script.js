const boxes = document.querySelectorAll(".box");
const info = document.getElementById("info");
const restartBtn = document.getElementById("restart");
let playerA = "<span><b>A</b></span>";
let playerB = "<span><b>B</b></span>";

//created an winning position array
const winpositions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// created an empty strings array for all 9 positions available;
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = playerA;
let player = "A";

function init() {
  boxes.forEach((box) => box.addEventListener("click", playerClick));
  restartBtn.addEventListener("click", restart);
  alert(`You are ready to go`);
  info.textContent = `${player}'s Turn..`;
}

function playerClick() {
  const index = this.dataset.id;
  if (options[index] != "") {
    return;
  }
  updateBoxInfo(this, index);
  checkResult();
}

function updateBoxInfo(box, index) {
  options[index] = player;
  box.innerHTML = currentPlayer;
}

function changePlayer() {
  player = (player == "A") ? "B" : "A";
  currentPlayer = currentPlayer == playerA ? playerB : playerA;
  info.textContent = `${player}'s Turn..`;
}

function checkResult() {
  let isWon = false;
  for (let i = 0; i < winpositions.length; i++) {
    const condition = winpositions[i];
    const box1 = options[condition[0]];
    const box2 = options[condition[1]];
    const box3 = options[condition[2]];
    if (box1 == "" || box2 == "" || box3 == "") {
      continue;
    }
    if(box1==box2 && box2==box3){
        isWon=true;
      }
  }
  
  if(isWon){
    info.textContent=`${player} Won..`;
    setTimeout(() => {
        alert(`${player} won the game
            Please click on restart to play again`);
    }, 2000);
  }else if(!options.includes("")){
    info.textContent=`Game Draw..!`;
  }else{
    changePlayer();
  }
}

function restart(){
    options=["","","","","","","","",""];
    currentPlayer = playerA;
    player="A";
    info.textContent = `${player}'s Turn`;

    boxes.forEach((box) => {
        box.innerHTML = "";
    })
}
