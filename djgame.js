const allPlayers = []
let turn = 0;
let turn2 = 1;
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
let is2Player = false;
let isKing = false;
let oddOrder = true;
let player1 = ("");
let player2 = ("");
let prevWinner = 0;
let isDraw=false;
let combo = false;

checkLocalStorage();

function checkLocalStorage(){
    const playerList = JSON.parse(localStorage.getItem("djPlayers"))
    for(let i=0; i < playerList.length; i++){
        allPlayers.push(playerList[i])
    }
}

const playerLoop = allPlayers.length - 1

function clear(parent){
    parent.firstElementChild.remove();
}

function updateList(){
    if(allPlayers.length == 2){
        is2Player = true
    }
    else if(allPlayers.length > 2){
        isKing = true
    }
    else{
        alert("Please add at least 2 players for the game to work properly.")
    }
    const shownList = document.getElementById("gamePlayers")
    const li1 = document.getElementById("currentPlayer1")
    const li2 = document.getElementById("currentPlayer2")
    if(is2Player == true){
        if(oddOrder == true){
            player1=allPlayers[turn]
            player2 = allPlayers[turn+1]
            li1.textContent=(player1+": "+ score1)
            li2.textContent=(player2+": "+score2)
            oddOrder=false
        }
        else{
            player1=allPlayers[turn+1]
            player2 = allPlayers[turn]
            li1.textContent=(player1+": "+ score1)
            li2.textContent=(player2+": "+score2)
            oddOrder=true
        }
    }
    else if(isKing == true){
        if(isDraw==true){
            player1=allPlayers[turn]
            player2=allPlayers[turn2]
            if(player1==player2){
                player2=allPlayers[turn2+1]
            }
            li1.textContent=(player1+": "+ score1)
            li2.textContent=(player2+": "+score2)
            isDraw=false
        }
        else{
            if(combo==false){
                player1=allPlayers[prevWinner]
            }
            player2=allPlayers[turn2]
            if(player1==player2){
                player2=allPlayers[turn2+1]
            }
            li1.textContent=(player1+": "+ score1)
            li2.textContent=(player2+": "+score2)
        }
    }
    else{
        alert("Something went wrong selecting players.")
    }
    shownList.appendChild(li1)
}

function displayPlayers(){
    const shownList = document.getElementById("gamePlayers")
    if(shownList.firstChildElement == null){
        updateList();
    }
    else{
        clear(shownList)
        updateList();
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
    if(turn2 < playerLoop){
        turn2++
    }
    else{
        turn2=0;
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
            alert(player1+" bust with "+score1+ " which means they drink "+(score1-djTarget)+"!")
            if(isKing == true){
                prevWinner=(turn2)
                combo = false
            }
        }
        else{
            alert(player2+" bust with "+score2+ " which means they drink "+(score2-djTarget)+"!")
            if(isKing == true && combo == false){
                prevWinner=(turn)
                combo = true
            }
        }
        canRoll=false
        busted=false;
    }
    else if(dicejack==true){
        if(score1==djTarget){
            alert(player1+" got Dicejack with "+score1+ " which means "+player2+" drinks "+(djRoll)+"!")
            if(isKing == true && combo == false){
                prevWinner=(turn)
                combo = true
            }
        }
        else{
            alert(player2+" got Dicejack with "+score2+ " which means "+player1+" drinks "+(djRoll)+"!")
            if(isKing == true){
                prevWinner=(turn2)
                combo = false
            }
        }
        canRoll=false
        dicejack=false;
    }
    else if (canRoll==false){
        if(score1 > score2){
            difference = (score1-score2)
            alert(player1+" scored " +difference+" more than "+player2+" so "+player2+" drinks "+difference+"!")
            if(isKing == true && combo == false){
                prevWinner=(turn)
                combo = true
            }
        }
        else if(score1 < score2){
            difference = (score2-score1)
            alert(player2+" scored " +difference+" more than "+player1+" so "+player1+ " drinks "+difference+"!")
            if(isKing == true){
                prevWinner=(turn2)
                combo = false
            }
        }
        else if(score1 == score2){
            alert("Both players drew so they each drink "+(djTarget-score1)+"!")
            isDraw=true
            combo=false
        }
        else{
            alert("Something went wrong! Oh well, have a drink each and carry on!")
            isDraw=true
            combo = false
            if(turn < playerLoop){
                turn++
            }
            else{
                turn = 0
            }
            if(turn2 < playerLoop){
                turn2++
            }
            else{
                turn2=0;
            }
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