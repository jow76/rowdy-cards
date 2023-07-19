const beep = new Audio("./sounds/beep.mp3")
beep.volume=0.7;
const cork = new Audio("./sounds/cork.mp3")
cork.volume=1;
let timer = null
let audioOn = false;

document.getElementById("audioButton").onclick=function(){
    audioOn = true;
    beep.play()
}

document.getElementById("muteButton").onclick=function(){
    audioOn = false;
}

document.getElementById('timerStart').onclick=function(){
    const setDate = new Date().getTime() + 1000 * 60 * 60;
    timer = setInterval(()=>{
        const currentTime= new Date().getTime()
        const difference = setDate - currentTime;
        const minutes = difference % (1000*60*60)/(1000*60);
        const seconds = difference % (1000 * 60) / 1000;
        const minsA = Math.floor(minutes/10)
        const minsB = Math.floor(minutes%10)
        const secsA = Math.floor(seconds/10)
        const secsB = Math.floor(seconds%10)
        const minsAContainer = document.getElementById("minsA")
        const minsBContainer = document.getElementById("minsB")
        const secsAContainer = document.getElementById("secsA")
        const secsBContainer = document.getElementById("secsB")
        minsAContainer.innerHTML = minsA
        minsBContainer.innerHTML = minsB
        secsAContainer.innerHTML = secsA
        secsBContainer.innerHTML = secsB
        
        if(audioOn==true){
            if(secsA==0){
                if(secsB == 3 || secsB == 2 || secsB == 1){
                    console.log("Beep")
                    beep.play();
                }
                else if(secsB == 0){
                    console.log("DRINK")
                    cork.play();
                }
                else{}
            }
        }
        else{}
        if(difference < 0){
            document.getElementById("endMsg").innerHTML = "The hour is up! Go be Rowdy :)"
            minsAContainer.innerHTML=0
            minsBContainer.innerHTML=0
            secsAContainer.innerHTML=0
            secsBContainer.innerHTML=0
            clearInterval(timer)
        }
    },1000)
};

document.getElementById("timerStop").onclick=function(){
    location.reload()
}