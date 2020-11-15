'use script'
/* declared global variables used for later*/
let computerChoice;
let roundResult;

/* declared score variables*/
let playerScore = 0;
let computerScore = 0;

/* declared number of times - computer choose item */
let numComRock = 0;
let numComPaper = 0;
let numComScissors = 0;
let numUsrRock = 0;
let numUsrPaper = 0;
let numUsrScissors = 0;
let comTimes = 0;
let numRounds = 9;
let favUsrChoice;

/* arrays used for random function and choosing function */
let chooseElement = ['rock', 'paper', 'scissors']

/* random function*/
let random = (number) => Math.floor(Math.random()* number);

/* percentage of each chosen items */
let percTimes = (choose)=> ((choose/comTimes)*100);

/* randomly chooses an object in an array*/
let computerPlay= ()=> chooseElement[random(chooseElement.length)];

/* Determines the highest chosen item(RPS) by user */
rpsButtons.onclick = function(){
    if(numUsrRock >= numUsrPaper && numUsrRock >= numUsrScissors){
        return `Rock`;
    }else if(numUsrPaper >= numUsScissors && numUsrPaper >= numUsrRock){
        return `Paper`;
    }else{ 
        return `Scissors`;
    }
}

const playAgain =document.createElement('div');
playAgain.textContent = `Play again`;
playAgain.classList.add('button', 'refresh');

/* translating html elements into a variable to access its programming aspect */
/* output */
const paraYou = document.getElementById('you');
const paraCom = document.getElementById('com');
const paraFinal = document.getElementById('finalResult');
const roundOutcome = document.querySelector('blockquote');
const paraRounds = document.querySelector('.numRounds');

/*custom buttons*/
const minus = document.getElementById('minus');
const plus = document.getElementById('plus');
const minusR = document.getElementById('minusR');
const plusR = document.getElementById('plusR');
const rpsButtons = document.querySelector('.rpsButton');

/* return elements used for statistical purposes */
const yourFav = document.getElementById('yourFav');

/* contents of returned elements */
const yourFavContent = document.createTextNode(favUsrChoice);
/* Observing the balance consistency with an ideal average of 1/3 mark regarding the number of times the computer had chosen between the three */
const comRock = document.getElementById('comRock');
const comPaper = document.getElementById('comPaper');
const comScissors = document.getElementById('comScissors');

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
/* function numCom(eitherChoice, numRock, numPaper, numScissors, eitherRock, eitherPaper, eitherScissors, eitherTimes){
    eitherTimes++;
    if (eitherChoice === "rock"){
        numRock++;
        eitherRock.textContent = `${numRock} (${Math.round(percTimes(numRock))}%) :Com R`;
        eitherPaper.textContent = `${numPaper} (${Math.round(percTimes(numPaper))}%) :Com P`;
        eitherScissors.textContent = `${numScissors} (${Math.round(percTimes(numScissors))}%) :Com S`
        return numRock;
    }else if(eitherChoice === "paper"){
        numPaper++;
        eitherRock.textContent = `${numRock} (${Math.round(percTimes(numRock))}%) :Com R`;
        eitherPaper.textContent = `${numPaper} (${Math.round(percTimes(numPaper))}%) :Com P`;
        eitherScissors.textContent = `${numScissors} (${Math.round(percTimes(numScissors))}%) :Com S`;
    }else if(eitherChoice === "scissors"){
        numScissors++;
        eitherRock.textContent = `${numRock} (${Math.round(percTimes(numRock))}%) :Com R`;
        eitherPaper.textContent = `${numPaper} (${Math.round(percTimes(numPaper))}%) :Com P`;
        eitherScissors.textContent = `${numScissors} (${Math.round(percTimes(numScissors))}%) :Com S`;
    }
} */
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
        paraFinal.addEventListener("input", playagain);
    }else if(computerScore >= (numRounds/2)){
        winner = 0;
        winner==false ? paraFinal.textContent = "You Lose!" : paraFinal.textContent = "You Win!";
        document.querySelector('.rpsButtons') = true;
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
        }else{ numUsrScissors; }
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
    numCom(); //shows a statistical data regarding the written random gen formula for computer
    if (roundResult.includes("beat")){
        playerScore++;
    }else if (roundResult.includes("defeated")){
        computerScore++;
    }
    isStart();
    yourFavContent.nodeValue = favUsrChoice;
    paraYou.textContent = `${playerScore}`; 
    paraCom.textContent = `${computerScore}`; 
    victoryValidation();
}
yourFav.appendChild(yourFavContent);

