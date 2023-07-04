"use strict"

const allPlayers = [];
const playerForm = document.getElementById("playerForm");

checkLocalStorage();
initialisePlayers();

playerForm.addEventListener("submit", function (event){
    event.preventDefault()
    const newPlayer = event.target.playerName.value;
    if(newPlayer == ""){
        alert("Please enter a name")
    }
    else{
        allPlayers.push(newPlayer)
        setLocalStorage()
        renderPlayers()
        playerForm.reset()
    }
})



function setLocalStorage(){
    localStorage.setItem("players", JSON.stringify(allPlayers))
}

function checkLocalStorage(){
    const playerList = JSON.parse(localStorage.getItem("players"))
    if(playerList != null){
        for(let i=0; i < playerList.length; i++){
            allPlayers.push(playerList[i])
        }
    }
    else{}
}

function initialisePlayers(){
    const shownList = document.getElementById("playersUl") 
    for(let i=0; i < allPlayers.length; i++){
        const li = document.createElement("li")
        li.textContent = allPlayers[i]
        shownList.appendChild(li)
    }
}

function renderPlayers(){
    const shownList = document.getElementById("playersUl") 
    const li = document.createElement("li")
    li.textContent = allPlayers.slice(-1)
    shownList.appendChild(li)
}

function clearPlayers(){
    allPlayers.length=0;
    setLocalStorage()
    location.reload()
    return allPlayers;
}