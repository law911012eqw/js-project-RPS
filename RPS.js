'use script'
/* declared global variables used for later*/
let computerChoice; //input equals to string[items]
let roundResult; //round result as an input

/* declared score variables*/
let playerScore = 0;
let computerScore = 0;
let winningStreak = 0;

/* declared number of times - computer choose item */
let comTimes = 0;
let numUsrRock = 0;
let numUsrPaper = 0;
let numUsrScissors = 0;
let numRounds = 9;
let comStats = [{item : 'Rock', times: 0}, {item: 'Paper', times : 0}, {item: 'Scissors', times : 0}]

/* translating html elements into a object to access its programming aspect */
/* output */
const paraYou = document.getElementById('you');
const paraCom = document.getElementById('com');
const paraFinal = document.getElementById('finalResult');
const roundOutcome = document.querySelector('blockquote');
const endGameElement = document.getElementById('endGameElement');
const paraRounds = document.querySelector('.numRounds');
const gameContainer = document.getElementById('game-container');
/*custom buttons*/
const btnRPS = document.querySelectorAll('.btnRPS');
const minus = document.getElementById('minus');
const plus = document.getElementById('plus');
const minusR = document.getElementById('minusR');
const plusR = document.getElementById('plusR');

/* return elements used for statistical purposes */
const yourFav = document.getElementById('yourFav');
const winStreakCurrent = document.getElementById('winStreakCurrent');
//const comPerc = document.querySelectorAll('.com-stats');
const comRock = document.getElementById('comRock');
const comPaper = document.getElementById('comPaper');
const comScissors = document.getElementById('comScissors');

/* arrays used for random function and choosing function */
let chooseElement = ['rock', 'paper', 'scissors']

/* return random item function*/
let random = (number) => Math.floor(Math.random()* number);

/* percentage of each chosen items */
let percTimes = (choose)=> ((choose/comTimes)*100);

/* randomly chooses an object in an array*/
let computerPlay= ()=> chooseElement[random(chooseElement.length)];

/* Determines the highest chosen item(RPS) by user */
function clickHighest(){
    if(numUsrRock >= 3 || numUsrPaper >= 3 || numUsrScissors >= 3){    
        if(numUsrRock >= numUsrPaper && numUsrRock >= numUsrScissors){
            return `Rock`;
        }else if(numUsrPaper >= numUsrScissors && numUsrPaper >= numUsrRock){
            return `Paper`;
        }else if(numUsrScissors>=numUsrRock && numUsrScissors>=numUsrPaper){ 
            return `Scissors`;
        }
    }
    else {return `None`;}
}

/* mouse triggers toggle hover functions on buttons*/
function enableHover(btnID){    
    if(btnRock.disabled == true)
    {

    }else{document.getElementById(btnID).classList.add('btnHoverAni');}   
}
function disableHover(btnID){    
    document.getElementById(btnID).classList.remove('btnHoverAni');
}

/* disables existing specified class in an element when it is called */
function disableButton(){
    btnRPS.forEach(btn => btn.disabled = true);
}
/* creates a refresh button once the game is over */
const playAgain = document.createElement('button');
playAgain.textContent = `Play again`;
playAgain.setAttribute('style', `background: rgb(58, 61, 63); color: inherit;`);

/* creates new button element after game */
function createPlayAgain(){
    endGameElement.appendChild(playAgain);
    endGameElement.removeChild(roundOutcome);
}
function refreshPage(){ //refreshes page
    location.reload();
}
playAgain.onclick = function(){
    refreshPage();
}

/* statistical function that counts the number of each item that is chosen by the computer */
function numCom(){
    comTimes++;
    if (computerChoice === "rock"){
        comStats[0].times++;
    }else if(computerChoice === "paper"){
        comStats[1].times++;
    }else if(computerChoice === "scissors"){
        comStats[2].times++;
    }
    comRock.textContent = `${comStats[0].times} (${Math.round(percTimes(comStats[0].times))}%) :Com ${comStats[0].item.charAt(0)}`;
    comPaper.textContent = `${comStats[1].times} (${Math.round(percTimes(comStats[1].times))}%) :Com ${comStats[1].item.charAt(0)}`;
    comScissors.textContent = `${comStats[2].times} (${Math.round(percTimes(comStats[2].times))}%) :Com ${comStats[2].item.charAt(0)}`;
}  
/* Adjusts the number of rounds with a limit between 5 and 39 rounds */
minus.onclick = function() {
    if(numRounds>=5 && numRounds<= 39){
        numRounds-=2;
        paraRounds.textContent = `${numRounds}`;
        if (numRounds==5){
            minusR.style.visibility ="hidden";
            minus.style.visibility ="hidden";
        }else if (numRounds==37){
            plusR.style.visibility ="visible";
            plus.style.visibility ="visible";
        }
    }
}
plus.onclick = function() {
    if(numRounds >=5 && numRounds <= 39){
        numRounds+=2;
        paraRounds.textContent = `${numRounds}`;
        if (numRounds==39){
            plusR.style.visibility ="hidden";
            plus.style.visibility ="hidden";
        }else if (numRounds==7){
            minusR.style.visibility ="visible";
            minus.style.visibility ="visible";
        }
    }
}

//Disables round adjustment when rounds starts (only activates when either two -- scored '1')
function isStart(){
    if (playerScore != 0 || computerScore != 0){
        minusR.style.visibility ="hidden";
        minus.style.visibility ="hidden";
        plusR.style.visibility ="hidden";
        plus.style.visibility ="hidden";
    }
}
/* Determines the winner when the condition is met */
function victoryValidation(){
    if(playerScore >= (numRounds/2)){
        paraFinal.textContent = "You Won!";
        disableButton();
        gameContainer.setAttribute('style', 'box-shadow: inset 0 0 17px #00FF00;')
        createPlayAgain();
    }else if(computerScore >= (numRounds/2)){
        paraFinal.textContent = "You Lose!";
        disableButton();
        gameContainer.setAttribute('style', 'box-shadow: inset 0 0 17px #FF0000;')
        createPlayAgain();
    }
}

/* Sets a condition with 7 possible outcomes while playing a round */
function playRound(userChoice){ 
    computerChoice = computerPlay();
    if (userChoice==computerChoice){ 
        roundResult= `It's a tie!`;
        if(userChoice=='rock'){
            numUsrRock++;
        }else if(userChoice=='paper'){
            numUsrPaper++;
        }else{ numUsrScissors++; }
    }else if (userChoice=='rock' && (computerChoice !='rock')){//true, if user picks rock and COM chose differently
        computerChoice=='paper' ? roundResult="The computer defeated you with paper." : roundResult="You beat the computer with rock.";
        numUsrRock++;
    }else if (userChoice=='paper' && (computerChoice !='paper')){
        computerChoice=='scissors' ? roundResult="The computer defeated you with scissors." : roundResult="You beat the computer with paper.";
        numUsrPaper++;
    }else if (userChoice=='scissors' && (computerChoice !='scissors')){
        computerChoice=='rock' ?  roundResult="The computer defeated you with rock." :  roundResult="You beat the computer with scissors.";
        numUsrScissors++;
    }
    roundOutcome.textContent = `${roundResult}`; //Overwrites the existing text content
    numCom() //shows a statistical data regarding the written random gen formula for computer
    if (roundResult.includes("beat")){ //score +1 increment when the specific word is found 
        playerScore++;
        winningStreak++; //winning streak counter
    }else if (roundResult.includes("defeated")){
        computerScore++;
        winningStreak = 0;//a defeat resets to zero 
    }
    isStart() //It triggers when first time clicking -- to hide the round adjustment
    yourFav.textContent = clickHighest(); //outputs the current favorite item chosen by user
    paraYou.textContent = `${playerScore}`; //outputs current user score 
    paraCom.textContent = `${computerScore}`; //outputs current computer score
    victoryValidation();
    winStreakCurrent.textContent = winningStreak;
}
