'use script'
/* declared global variables used for later*/
let computerChoice;
let roundResult;

/* score variables*/
let playerScore = 0;
let computerScore = 0;

/* arrays used for random function and choosing function */
let chooseElement = ['rock', 'paper', 'scissors']

/* random function*/
let random = (number) => Math.floor(Math.random()* number);

/* when called randomly chooses an object in array*/
let computerPlay= ()=> chooseElement[random(chooseElement.length)];

/* blocks of document-related code - I don't know the rightful description for this*/
let paraYou = document.getElementById('you');
let paraCom = document.getElementById('com');
let paraFinal = document.getElementById('finalResult');
let roundOutcome = document.querySelector('blockquote').innerHTML;

/* text nodes section */
let scoreYou = document.createTextNode(playerScore);
let scoreCom = document.createTextNode(computerScore);
let content = document.createTextNode('#');

/*Observing the balance consistency with an ideal average of 1/3 mark regarding the number of times the computer had chosen between the three */
let comRock = document.getElementById('comRock');
let comPaper = document.getElementById('comPaper');
let comScissors = document.getElementById('comScissors');


function numTimesByCom(){
    if (computerChoice == "rock")
    {
        comRock.appendChild(content);
    }else if(computerChoice == "paper"){
        comPaper.appendChild(content);
    }else {
        comScissors.appendChild(content);
    }
}

    /* Sets a condition with 7 outcomes */
function playRound(userChoice){ 
    if (userChoice==computerChoice){
        
        document.querySelector('blockquote').innerHTML= "The two parties have clashed!";
        }else if (userChoice=='rock' && (computerChoice !='rock')){
            computerChoice=='paper' ? roundResult="The computer defeated you with paper." : roundResult="You beat the computer with rock.";
        }else if (userChoice=='paper' && (computerChoice !='paper')){
            computerChoice=='scissors' ? roundResult="The computer defeated you with scissors." : roundResult="You beat the computer with paper.";
        }else if (userChoice=='scissors' && (computerChoice !='scissors')){
            computerChoice=='rock' ?  roundResult="The computer defeated you with rock." :  roundResult="You beat the computer with scissors.";
        }
}
/* Determines the winner */
function game(userChoice){
    let winner;

    for(let r=0;r <=5; r++){
        if(playerScore === 3){
            winner = 1;
            break;
        }else if(computerScore === 3){
            winner = 0;
            break;
        }
        computerChoice = computerPlay();
        numTimesByCom();
        playRound(userChoice);
        alert(userChoice + computerChoice);
        document.querySelector('blockquote').innerHTML = roundResult;
        roundResult.search("beat") = true ? playerScore+= 1 : computerScore+1;
        paraYou.appendChild(scoreYou);
        paraCom.appendChild(scoreCom);
    }

    winner=true ? console.log(paraFinal.value("You Win!")) : console.log(paraFinal.value("You Lose!"));
}
