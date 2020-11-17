'use script'
/* declared global variables used for later*/
let computerChoice; //input equals to string[items]
let roundResult; //round result as an input

/* declared score variables*/
let playerScore = 0;
let computerScore = 0;

/* declared number of times - computer choose item */
let numComRock = 0;
let numComPaper = 0;
let numComScissors = 0;
let comTimes = 0;
let numUsrRock = 0;
let numUsrPaper = 0;
let numUsrScissors = 0;
let numRounds = 9;

/* translating html elements into a variable to access its programming aspect */
/* output */
const paraYou = document.getElementById('you');
const paraCom = document.getElementById('com');
const paraFinal = document.getElementById('finalResult');
const roundOutcome = document.querySelector('blockquote');
const paraRounds = document.querySelector('.numRounds');

/*custom buttons*/
const btnRock = document.getElementById('btnRock');
const btnPaper = document.getElementById('btnPaper');
const btnScissors= document.getElementById('btnScissors');
const minus = document.getElementById('minus');
const plus = document.getElementById('plus');
const minusR = document.getElementById('minusR');
const plusR = document.getElementById('plusR');

/* return elements used for statistical purposes */
const yourFav = document.getElementById('yourFav');
const winStreakCurrent = document.getElementById('winStreakCurrent');

/* Observing the balance consistency with an ideal average of 1/3 mark regarding the number of times the computer had chosen between the three
just in case there's a math formula change needed if it is unbalanced */
const comRock = document.getElementById('comRock');
const comPaper = document.getElementById('comPaper');
const comScissors = document.getElementById('comScissors');

/* arrays used for random function and choosing function */
let chooseElement = ['rock', 'paper', 'scissors']

/* return random item function*/
let random = (number) => Math.floor(Math.random()* number)

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

/* Includes a local variable that resets to zero when conditions are met */
function winHighest(userScore, comScore){
    let strScore, tempUserScore, tempComScore;
    tempUserScore = userScore;
    tempComScore = comScore;
    strScore++;
    if (strScore != (tempUserScore + tempComScore)){
        strScore = 0;
        tempUserScore = 0;
        tempComScore = 0;
        return strScore;
    }
    else {
        return strScore;
    }
}
/* mouse triggers toggle hover functions on buttons*/
function enableHover(btnID){    
    if(btnRock.disabled == true)
    {

    }else{document.getElementById(btnID).classList.add('rpsButton');}   
}
function disableHover(btnID){    
    document.getElementById(btnID).classList.remove('rpsButton');
}

/* disables existing specified class in an element when it is called */
function disableButton(){
    btnRock.disabled = true;
    btnPaper.disabled = true;
    btnScissors.disabled = true;
    btnRock.classList.add('disabled');
    btnPaper.classList.add('disabled');
    btnScissors.classList.add('disabled');
}

/* creates new button element after game 
function createPlayAgain(){
    const playAgain = document.createElement('div');
    playAgain.textContent = `Play again`;
    playAgain.classList.add('button');
}
function refreshPage(){
    location.reload();
}
function aniAfterGame(){
    paraFinal.addEventListener('animationstart');
} */
/* statistical function that counts the number of each item that is chosen by the computer */
function numCom(){
    comTimes++;
    if (computerChoice === "rock"){
        numComRock++;
        comRock.textContent = `${numComRock} (${Math.round(percTimes(numComRock))}%) :Com R`;
        comPaper.textContent = `${numComPaper} (${Math.round(percTimes(numComPaper))}%) :Com P`;
        comScissors.textContent = `${numComScissors} (${Math.round(percTimes(numComScissors))}%) :Com S`;
    }else if(computerChoice === "paper"){
        numComPaper++;
        comRock.textContent = `${numComRock} (${Math.round(percTimes(numComRock))}%) :Com R`;
        comPaper.textContent = `${numComPaper} (${Math.round(percTimes(numComPaper))}%) :Com P`;
        comScissors.textContent = `${numComScissors} (${Math.round(percTimes(numComScissors))}%) :Com S`;
    }else if(computerChoice === "scissors"){
        numComScissors++;
        comRock.textContent = `${numComRock} (${Math.round(percTimes(numComRock))}%) :Com R`;
        comPaper.textContent = `${numComPaper} (${Math.round(percTimes(numComPaper))}%) :Com P`;
        comScissors.textContent = `${numComScissors} (${Math.round(percTimes(numComScissors))}%) :Com S`;
    }
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
        let winner;
    if(playerScore >= (numRounds/2)){
        winner = 1;
        winner==true ? paraFinal.textContent = "You Won!" : paraFinal.textContent = "You Lost!";
        disableButton()
        //createPlayAgain();
    }else if(computerScore >= (numRounds/2)){
        winner = 0;
        winner==false ? paraFinal.textContent = "You Lose!" : paraFinal.textContent = "You Win!";
        disableButton()
        //createPlayAgain();
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
    }else if (roundResult.includes("defeated")){
        computerScore++;
    }
    isStart() //It triggers when first time clicking -- to hide the round adjustment
    yourFav.textContent = clickHighest(); //outputs the current favorite item chosen by user
    paraYou.textContent = `${playerScore}`; //outputs current user score 
    paraCom.textContent = `${computerScore}`; //outputs current computer score
    victoryValidation()
}
