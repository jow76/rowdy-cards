"use strict"

const allDJPlayers = [];
const djPlayerForm = document.getElementById("playerForm");

checkLocalStorage();
initialisePlayers();

djPlayerForm.addEventListener("submit", function (event){
    event.preventDefault()
    const newDJPlayer = event.target.playerName.value;
    if(newDJPlayer == ""){
        alert("Please enter a name")
    }
    else{
        allDJPlayers.push(newDJPlayer)
        setLocalStorage()
        renderPlayers()
        djPlayerForm.reset()
    }
})



function setLocalStorage(){
    localStorage.setItem("djPlayers", JSON.stringify(allDJPlayers))
}

function checkLocalStorage(){
    const playerList = JSON.parse(localStorage.getItem("djPlayers"))
    if(playerList != null){
        for(let i=0; i < playerList.length; i++){
            allDJPlayers.push(playerList[i])
        }
    }
    else{}
}

function initialisePlayers(){
    const shownList = document.getElementById("djPlayersUl") 
    for(let i=0; i < allDJPlayers.length; i++){
        const li = document.createElement("li")
        li.textContent = allDJPlayers[i]
        shownList.appendChild(li)
    }
}

function renderPlayers(){
    const shownList = document.getElementById("djPlayersUl") 
    const li = document.createElement("li")
    li.textContent = allDJPlayers.slice(-1)
    shownList.appendChild(li)
}

function clearPlayers2(){
    allDJPlayers.length=0;
    setLocalStorage()
    location.reload()
    return allDJPlayers;
}