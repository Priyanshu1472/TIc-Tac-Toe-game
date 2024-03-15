const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statustext");
const restartbtn = document.querySelector("#restart");
const winnings = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
let options = ["","","","","","","","",""];
let currentplayer= "X";
let running = false;

initializegame();
function initializegame(){
    cells.forEach(cell => cell.addEventListener("click", cellchecked));
    restartbtn.addEventListener("click", restart);
    statusText.textContent = (`${currentplayer}'s Turn`);
    running = true;
}
function cellchecked(){
    const cellindex = this.getAttribute("cellindex");

    if(options[cellindex]!= "" || !running){
        return;
    }
    updatecell(this, cellindex);
    displaywin();
}
function updatecell(cell,index){
    options[index] = currentplayer;
    cell.textContent = currentplayer;
}
function changeplayer(){
    currentplayer = (currentplayer == "X") ? "O":"X";
    statusText.textContent = `${currentplayer}'s turn`
}
function displaywin(){
    let roundwon = false;
    for(let i = 0; i<winnings.length; i++){
        const condition = winnings[i];
        const cellA = options[condition[0]]
        const cellB = options[condition[1]]
        const cellC = options[condition[2]]
        
        if(cellA =="" || cellB=="" || cellC == ""){
            continue;
        }
        if(cellA == cellB && cellB == cellC){
            roundwon = true;
            break;
        }
    }
    if(roundwon){
        statusText.textContent = `${currentplayer} wins!!!`
        running = false; 
    }
    else if(!options.includes("")){
        statusText.textContent = 'Draw!!!';
        running = false
    }
    else{
        changeplayer();
    }
}
function restart(){
    currentplayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentplayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    running = true
}