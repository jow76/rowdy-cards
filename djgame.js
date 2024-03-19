const allPlayers = []
let turn = 0;
let turnTotal=0;
let djRoll=0;
let djTarget=0;
let canRoll = false;
let score1=0;
let score2=0;
let playerNumber=1;
let busted=false;
let dicejack=false;
let difference = 0;
checkLocalStorage();

function checkLocalStorage(){
    const playerList = JSON.parse(localStorage.getItem("players"))
    for(let i=0; i < playerList.length; i++){
        allPlayers.push(playerList[i])
    }
}

const playerLoop = allPlayers.length - 2

function clear(parent){
    parent.firstElementChild.remove();
}

function updateList(){
    const shownList = document.getElementById("gamePlayers")
    const li1 = document.getElementById("currentPlayer1")
    const li2 = document.getElementById("currentPlayer2")
    li1.textContent=(allPlayers[turn]+": "+ score1)
    li2.textContent=(allPlayers[turn+1]+": "+score2)
    shownList.appendChild(li1)
}

function displayPlayers(){
    if(allPlayers.length < 2){
        alert("Please add at least 2 players on the previous page to play.")
    }
    else{
        const shownList = document.getElementById("gamePlayers")
            const li1 = document.getElementById("li")
            if(shownList.firstChildElement == null){
                updateList();
            }
            else{
                clear(shownList)
                updateList();
            }
    }
}

function initialRoll(){
    diceImage1.classList.add("spin")
    const diceRollA = Math.floor(Math.random()*6) + 1
    diceImage1.src=`dice/${diceRollA}.png`;
    diceImage1.offsetWidth;
    window.setTimeout(function() {
        diceImage1.classList.remove("spin")
    }, 500);
    diceImage2.classList.add("spin")
    const diceRollB = Math.floor(Math.random()*6) + 1
    diceImage2.src=`dice/${diceRollB}.png`;
    diceImage2.offsetWidth;
    window.setTimeout(function() {
        diceImage2.classList.remove("spin")
    }, 500);
    djRoll=(diceRollA+diceRollB)
    djTarget=(3*djRoll)
    targetRoll.textContent=(djTarget)
    canRoll=true;
}

function diceRoll(){
    if(canRoll == true){
        diceImage1.classList.add("spin")
        const diceRollA = Math.floor(Math.random()*6) + 1
        diceImage1.src=`dice/${diceRollA}.png`;
        diceImage1.offsetWidth;
        window.setTimeout(function() {
            diceImage1.classList.remove("spin")
        }, 500);
        diceImage2.classList.add("spin")
        const diceRollB = Math.floor(Math.random()*6) + 1
        diceImage2.src=`dice/${diceRollB}.png`;
        diceImage2.offsetWidth;
        window.setTimeout(function() {
            diceImage2.classList.remove("spin")
        }, 500);
        turnTotal=turnTotal+(diceRollA+diceRollB)
        if(turnTotal<djTarget){
            totalRoll.textContent=(turnTotal);
        }
        else if(turnTotal>djTarget){
            totalRoll.textContent=(turnTotal)
            busted=true
            canRoll=false
        }
        else{
            totalRoll.textContent=(turnTotal)
            dicejack=true
            canRoll=false
        }
    }
    else{
        alert("You cannot roll any higher!")
    }

}

function newGame(){
    score1=0
    score2=0
    turnTotal=0
    playerNumber=1
    totalRoll.textContent=(turnTotal)
    if(turn < playerLoop){
        turn++
    }
    else{
        turn = 0
    }
    displayPlayers()
    initialRoll()
}

function nextPlayer(){
    if(playerNumber==2){
        score2=turnTotal
        playerNumber=1
        canRoll=false
    }
    else{
        score1=turnTotal
        playerNumber=2
        turnTotal=0
        canRoll=true
    }
    updateList()
    displayPlayers()
    if(busted==true){
        if(score1 > djTarget){
            alert(allPlayers[turn]+" bust with "+score1+ " which means they drink "+(score1-djTarget)+"!")
        }
        else{
            alert(allPlayers[turn+1]+" bust with "+score2+ " which means they drink "+(score2-djTarget)+"!")
        }
        canRoll=false
        busted=false;
    }
    else if(dicejack==true){
        if(score1===djTarget){
            alert(allPlayers[turn]+" got Dicejack with "+score1+ " which means "+allPlayers[turn+1]+" drinks "+(djRoll)+"!")
        }
        else{
            alert(allPlayers[turn+1]+" got Dicejack with "+score2+ " which means "+allPlayers[turn]+" drinks "+(djRoll)+"!")
        }
        canRoll=false
        dicejack=false;
    }
    else if (canRoll==false){
        if(score1 > score2){
            difference = (score1-score2)
            alert(allPlayers[turn]+" scored " +difference+" more than "+allPlayers[turn+1]+" so "+allPlayers[turn+1]+" drinks "+difference+"!")
        }
        else if(score1 < score2){
            difference = (score2-score1)
            alert(allPlayers[turn+1]+" scored " +difference+" more than "+allPlayers[turn]+" so "+allPlayers[turn]+ " drinks "+difference+"!")
        }
        else if(score1 == score2){
            alert("Both players drew so they each drink "+(djTarget-score1)+"!")
        }
        else{
            alert("Something went wrong! Oh well, have a drink each and carry on!")
        }
        canRoll=false
    }
    else{}
    if(canRoll==false){
        newGame()
    }
}


displayPlayers()
initialRoll()
rollButton.addEventListener("click", diceRoll)
nextPlayerButton.addEventListener("click", nextPlayer)