const rock = document.querySelector('#rock');
const paper = document.querySelector('#paper');
const scissors = document.querySelector('#scissors');

let roundCounter = 1;
let userScore = 0;
let computerScore = 0;

rock.addEventListener('click', () => playRound('rock'));
paper.addEventListener('click', () => playRound('paper'));
scissors.addEventListener('click', () => playRound('scissors'));

function playRound(playerSelection) {
    const computerSelection = getComputerChoice();

    document.getElementById('userSelect').innerHTML = "User: " + playerSelection.charAt(0).toUpperCase() + playerSelection.slice(1);
    document.querySelector('.computerSelect').innerHTML = "Computer: "+computerSelection.charAt(0).toUpperCase() + computerSelection.slice(1);

    const winner = determineWinner(playerSelection, computerSelection);
    document.getElementById('Winner').innerHTML = winner;

    updateScores(winner);
    updateRoundCounter();

    if (userScore === 5 || computerScore === 5) {
        declareWinner();
    }
}

function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors']; 
    const randomIndex = Math.floor(Math.random() * choices.length);
    const computerSelection = choices[randomIndex];

    highlightComputerChoice(computerSelection);

    return computerSelection;
}

function highlightComputerChoice(choice) {
    const buttons = document.querySelectorAll('.computer button');
    buttons.forEach(button => {
        button.style.backgroundColor = '';
    });

    document.querySelector(`#computer_${choice}`).style.backgroundColor = 'rgb(16, 239, 255)';
}

function determineWinner(playerSelection, computerSelection) {
    playerSelection = playerSelection.toLowerCase();
    computerSelection = computerSelection.toLowerCase();

    if (
        (playerSelection === 'rock' && computerSelection === 'scissors') ||
        (playerSelection === 'paper' && computerSelection === 'rock') ||
        (playerSelection === 'scissors' && computerSelection === 'paper')
    ) {
        userScore++;
        return "You Win! " + playerSelection + " beats " + computerSelection;
    } else if (
        (playerSelection === 'rock' && computerSelection === 'paper') ||
        (playerSelection === 'paper' && computerSelection === 'scissors') ||
        (playerSelection === 'scissors' && computerSelection === 'rock')
    ) {
        computerScore++;
        return "Computer Wins! " + computerSelection + " beats " + playerSelection;
    } else {
        return "It's a tie!";
    }
}

function updateScores(winner) {
    document.getElementById('userScore').innerHTML = "Your Score: " + userScore;
    document.getElementById('computerScore').innerHTML = "Computer Score: " + computerScore;
}

function updateRoundCounter() {
    document.getElementById('roundCounter').innerHTML = "Round: " + roundCounter;
    roundCounter++;
}

function declareWinner() {
    if (userScore === 5) {
        const congrats =document.querySelector('#congrats');
        congrats.style.display = 'block'
    } else {
        const computer_wins = document.querySelector('#computer_wins');
        computer_wins.style.display = 'block'
    }

    roundCounter = 1;
    userScore = 0;
    computerScore = 0;
    updateScores();
    updateRoundCounter();
}
