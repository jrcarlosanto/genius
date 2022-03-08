let order = [];
let score = 0;
let totalScore = 0;
let start = false;

//0 - verde
//1 - vermelho
//2 - amarelo
//3 - azul

const blue = document.querySelector('.blue');
const red = document.querySelector('.red');
const green = document.querySelector('.green');
const yellow = document.querySelector('.yellow');

//sons
var somDisparo=document.getElementById("somDisparo");
var somScore=document.getElementById("somScore");
var somGameOver=document.getElementById("somGameOver");

document.getElementById("correntScore").innerHTML = 0;//pontuação
document.getElementById("totalScore").innerHTML = 0;//recorde do jogador

let buttonActive = document.querySelector("button");

//acender cor
const lightUp = (elementColor) => {
    elementColor.classList.add('selected');
    somDisparo.play();
}

//apagar cor
function lightOff(elementColor) {
    elementColor.classList.remove('selected');
}

//cria ordem aletoria de cores
let shuffleOrder = () => {
    let colorOrder = Math.floor(Math.random() * 4);
    order[order.length] = colorOrder;
    setTimeout(() => { //tempo para inicio
        const blink = async () => {
            for(let i in order) {
                let elementColor = createColorElement(order[i]);
                await new Promise((cooldown) => setTimeout(cooldown, 1000)) //tempo ligado blink
                .then(new Promise((r) => lightUp(elementColor,r)))
                new Promise((reso) => lightOff(elementColor,reso));
                await new Promise((cooldown1) => setTimeout(cooldown1, 1000))
            }
        }
        blink();
    }, 500);
}

//checa se os botoes clicados são os mesmos da ordem gerada no jogo
let checkOrder = (color) => {
        if(color != order[clickCount]) {
            somGameOver.play();
            gameOver();
        } else{
            clickCount++;
        }
    if(clickCount == order.length && start) {
        setTimeout(() => {
            somScore.play();
            nextLevel(); 
        }, 1000);
    }
}  

//funcao para o clique do usuario
let click = (color) => {
    if (start && clickCount <= order.length){
        clickedOrder[clickedOrder.length] = color;
        createColorElement(color).classList.add('selected');
        somDisparo.play();
        setTimeout(() => {
            createColorElement(color).classList.remove('selected');
            checkOrder(color, clickCount);
        },250);
    }
}

//funcao que retorna a cor
let createColorElement = (color) =>{
    switch(color){
        case 0:
            return green;
        case 1:
            return red;
        case 2:
            return yellow;
        default:
            return blue;
            
    }
}

//funcao para proximo nivel do jogo
let nextLevel = () => {
    document.getElementById("correntScore").innerHTML = score;
    if(score>totalScore){
        totalScore=score;
        document.getElementById("totalScore").innerHTML = totalScore;
    }
    score++;
    clickCount = 0;
    shuffleOrder();
}

//funcao para game over
let gameOver = () => {
    buttonActive.removeAttribute("disabled", "disabled");
    start = false;
    score = 0;
    document.getElementById("correntScore").innerHTML = score;
    
}

//funcao de inicio do jogo
let playGame = () => {
    document.getElementById("correntScore").innerHTML = score;    
    buttonActive.setAttribute("disabled", "disabled");
    start = true;
    order = [];
    clickedOrder = [];
    nextLevel();
}

//eventos de clique para as cores
green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);