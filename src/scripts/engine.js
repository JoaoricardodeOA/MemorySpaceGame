const state = {
    view:{
        timeLeft: document.querySelector(".timer")
    },
    values:{
        countTimerDown: setInterval(timer,1000),
        currentTime:120
    }
}
const emojis = [
    "👾",
    "👾",
    "👽",
    "👽",
    "🤖",
    "🤖",
    "🚀",
    "🚀",
    "🛸",
    "🛸",
    "🌅",
    "🌅",
    "🌎",
    "🌎",
    "🌕",
    "🌕"

]
let openCards = []


let shuffleEmojis = emojis.sort(()=>(Math.random()>0.5)? 2:-1)

for (const emojis of shuffleEmojis) {
    let box = document.createElement("div")
    box.innerHTML = emojis
    box.className ="item"
    box.onclick = handleclick
    document.querySelector(".game").appendChild(box)
}

function handleclick(){
    if(openCards.length<2 && (!this.classList.contains("boxOpen"))){
        this.classList.add("boxOpen")
        openCards.push(this)
    }

    if (openCards.length == 2) {
        setTimeout(checkMatch, 500);
      }
    
      console.log(openCards);
}
    
function checkMatch() {
    if (openCards[0].innerHTML === openCards[1].innerHTML) {
        openCards[0].classList.add("boxMatch");
        openCards[1].classList.add("boxMatch");
    } else {
        openCards[0].classList.remove("boxOpen");
        openCards[1].classList.remove("boxOpen");
    }
    
    openCards = [];
    
    if (document.querySelectorAll(".boxMatch").length === emojis.length) {
        playSound();
        alert("Você venceu !");
    }
}

function timer(){
    state.view.timeLeft.textContent = "TIMER: " + state.values.currentTime
    state.values.currentTime--
    if(state.values.currentTime<0){
        alert(`Game Over`)
        clearInterval(state.values.countTimerDown);
        window.location.reload()
    }
}

function playSound(){
    let audio = new Audio(`./src/audios/src_audios_hit.m4a`)
    audio.play()
}