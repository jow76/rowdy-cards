const cardContainer = document.getElementById("drawButton")
const prevContainer = document.getElementById("prevButton")
const nextContainer = document.getElementById("nextButton")
const cardNums = ["001","002","003","004","005"]
const allCards = []
const image1 = document.getElementById("image1")
let diceImage = document.getElementById("diceImage")
const rollButton = document.getElementById("diceButton")
const graveyard = []
const drawn = []
let prev = graveyard.length
let backCount = 1;
let xVal=0
let yVal=0
let zVal=0
let delY = 0;
const allPlayers = []
let turn = -1;
let rolled = [];
countCards();
checkLocalStorage();

function checkLocalStorage(){
    const playerList = JSON.parse(localStorage.getItem("players"))
    for(let i=0; i < playerList.length; i++){
        allPlayers.push(playerList[i])
    }
}

const playerLoop = allPlayers.length - 1

function clear(parent){
    parent.firstElementChild.remove();
}

function updateList(){
    const shownList = document.getElementById("gamePlayers")
    const li = document.getElementById("currentPlayer")
    li.textContent=allPlayers[turn]
    shownList.appendChild(li)
}

function Card(number, src){
    this.number = number;
    this.src = src;
    allCards.push(this)
}

function DeadCard(number, src){
    this.number = number;
    this.src = src;
    graveyard.push(this)
}

generateDeck()

function handleClick(event){
    if(allPlayers.length == 0){
        alert("Please add at least 1 player on the Home page to play.")
    }
    else{
        let card = randNum()
        while(drawn.includes(card)){
            card = randNum()
        }
        if(delY === 1){
            yVal = 0;
            xyz()
        }
        else{}
        card++
        if(card == "218" || card == "219" || card == "220" || card == "221" || card == "" || card == "222" || card == "223" || card == "224" || card == "225" || card == "226" || card == "227"){
            yVal+=2;
            xyz()
        }
        else if(card == "228" || card == "229" || card == "230" || card == "231" || card == "232"){
            yVal++;
            xyz()
        }
        else if(card == "233" || card == "234"){
            yVal*=2;
            xyz()
        }
        else if(card == "235" || card == "236" || card == "237"){
            delY = 1;
        }
        else if(card == "238" || card == "239" || card == "240" || card == "241" || card == "242" || card == "243" || card == "244" || card == "245" || card == "246" || card == "247"){
            xVal++;
            xyz()
        }
        else if(card=="248" || card == "249"){
            xVal*=2;
            xyz()
        }
        else{}
        card--;
        if(drawn.length === allCards.length){
            image1.src = ""
            image1.alt = "Out of cards! Refresh to keep playing!"
        }
        else{
            image1.src = allCards[card].src;
            image1.alt = allCards[card].number;
            new DeadCard(image1.alt, image1.src)
            countCards();
            backCount=1;
            drawn.push(card)
            if(turn < playerLoop){
                turn++
            }
            else{
                turn = 0
            }
            const shownList = document.getElementById("gamePlayers")
            const li = document.getElementById("li")
            if(shownList.firstChildElement == null){
                updateList();
            }
            else{
                clear(shownList)
                updateList();
            }
        }
    }
}

function randNum(){
    return Math.floor(Math.random() * allCards.length)
}

function generateDeck(){
    for(let i = 0; i < cardNums.length; i++){
    new Card(cardNums[i], `cards/${cardNums[i]}.jpg`)
    }
}

cardContainer.addEventListener("click",handleClick)

function countCards(){
    const p = document.getElementById("graveyardCount")
    const div = document.getElementById("discarded")
    p.textContent=graveyard.length;
    div.appendChild(p);
}

function displayPrevious(){
    if(backCount === graveyard.length){
        alert("No more previous cards!")
    }
    else{
        backCount +=1;
        let i = graveyard.length;
        i-=backCount;
        image1.src=graveyard[i].src;
        image1.alt=graveyard[i].number;
    }

}

prevContainer.addEventListener("click",displayPrevious)

function displayNext(){
    let i = graveyard.length;
    backCount-=1;
    i-=backCount;
    if (graveyard[i]===undefined){
        handleClick(event)
    }
    else{
        if(image1.src === graveyard[i].src){
        handleClick(event)
    }
        else{
            image1.src=graveyard[i].src;
            image1.alt=graveyard[i].number;
        }
    }
}

function xyz(){
    let xp = document.getElementById("xp")
    xp.textContent=`X = ${xVal}`
    let yp = document.getElementById("yp")
    yp.textContent=`Y = ${yVal}`
    delY = 0;
}

function diceRoll(){
    diceImage.style.animation = "roll 0.2s"
    rolled = []
    const diceRoll = Math.floor(Math.random()*6) + 1
    diceImage.src=`dice/${diceRoll}.png`;
}

xyz();

nextContainer.addEventListener("click", displayNext)
rollButton.addEventListener("click", diceRoll)