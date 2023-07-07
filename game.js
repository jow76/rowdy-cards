const cardContainer = document.getElementById("drawButton")
const prevContainer = document.getElementById("prevButton")
const nextContainer = document.getElementById("nextButton")
const cardNums = ["001","002","003","004","005","006","007","008","009","010","011","012","013","014","015","016","017","018","019","020","021","022","023","024","025","026","027","028","029","030","031","032","033","034","035","036","037","038","039","040","041","042","043","044","045","046","047","048","049","050","051","052","053","054","055","056","057","058","059","060","061","062","063","064","065","066","067","068","069","070","071","072","073","074","075","076","077","078","079","080","081","082","083","084","085","086","087","088","089","090","091","092","093","094","095","096","097","098","099","100","101","102","103","104","105","106","107","108","109","110","111","112","113","114","115","116","117","118","119","120","121","122","123","124","125","126","127","128","129","130","131","132","133","134","135","136","137","138","139","140","141","142","143","144","145","146","147","148","149","150","151","152","153","154","155","156","157","158","159","160","161","162","163","164","165","166","167","168","169","170","171","172","173","174","175","176","177","178","179","180","181","182","183","184","185","186","187","188","189","190","191","192","193","194","195","196","197","198","199","200","201","202","203","204","205","206","207","208","209","210","211","212","213","214","215","216","217","218","219","220","221","222","223","224","225","226","227","228","229","230","231","232","233","234","235","236","237","238","239","240","241","242","243","244","245","246"]
const allCards = []
const image1 = document.getElementById("image1")
let diceImage = document.getElementById("diceImage")
let coinImage = document.getElementById("coinImage")
const rollButton = document.getElementById("rollButton")
const flipButton = document.getElementById("flipButton")
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
        if(drawn.length === allCards.length){
            image1.src = ""
            image1.alt = "Out of cards! Refresh to keep playing!"
        }
        else{
            image1.classList.add("next")
            let card = randNum()
            while(drawn.includes(card)){
                card = randNum()
            }
            window.setTimeout(function() {
                image1.classList.remove("next")
            }, 500)
            if(delY === 1){
                yVal = 0;
                xyz()
            }
            else{}
            card++
            window.setTimeout(function(){
                if(card == "203" || card == "204" || card == "205" || card == "206" || card == "207" || card == "208" || card == "209" || card == "210" || card == "202" || card == "201"){
                    yVal+=2;
                    xyz()
                }
                else if(card == "212" || card == "214" || card == "215" || card == "213" || card == "211"){
                    yVal++;
                    xyz()
                }
                else if(card == "217" || card == "216"){
                    yVal*=2;
                    xyz()
                }
                else if(card == "220" || card == "219" || card == "218"){
                    delY = 1;
                }
                else if(card == "221" || card == "223" || card == "224" || card == "225" || card == "226" || card == "227" || card == "228" || card == "229" || card == "230" || card == "222"){
                    xVal++;
                    xyz()
                }
                else if(card=="232" || card == "231"){
                    xVal*=2;
                    xyz()
                }
                else{}
            },500)
            card--;
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
    new Card(cardNums[i], `cards/${cardNums[i]}.png`)
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
        image1.classList.add("prev")
        backCount +=1;
        let i = graveyard.length;
        i-=backCount;
        window.setTimeout(function() {
            image1.src=graveyard[i].src;
            image1.alt=graveyard[i].number;
        }, 250)
        window.setTimeout(function() {
            image1.classList.remove("prev")
        }, 500)
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
            image1.classList.add("next")
            window.setTimeout(function() {
                image1.src=graveyard[i].src;
                image1.alt=graveyard[i].number;
            }, 250)
            window.setTimeout(function() {
                image1.classList.remove("next")
            }, 500)
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
    diceImage.classList.add("spin")
    const diceRoll = Math.floor(Math.random()*6) + 1
    diceImage.src=`dice/${diceRoll}.png`;
    diceImage.offsetWidth;
    window.setTimeout(function() {
        diceImage.classList.remove("spin")
    }, 500);
}

function coinFlip(){
    coinImage.classList.add("spin")
    const coinFlip = Math.floor(Math.random()*2)
    if(coinFlip == 0){
        coinImage.src="images/heads.png";
        coinImage.alt="heads";
    }
    else{
        coinImage.src="images/tails.png";
        coinImage.alt="tails"
    }
    window.setTimeout(function() {
        coinImage.classList.remove("spin")
    }, 500);
}

xyz();

nextContainer.addEventListener("click", displayNext)
rollButton.addEventListener("click", diceRoll)
flipButton.addEventListener("click",coinFlip)