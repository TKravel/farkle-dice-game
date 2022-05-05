const diceArr = [];
const playerData = [
	{
		name: 'Player1',
		score: 0,
	},
	{
		name: 'Player2',
		score: 0,
	},
];
const gameData = {
	gameActive: false,
	currentTurn: 'Player1',
};

// Todo
// create initial game and player states to reset game

const initializeDice = () => {
	for (let i = 0; i < 6; i++) {
		diceArr[i] = {};
		diceArr[i].id = `die${i + 1}`;
		diceArr[i].value = i + 1;
		diceArr[i].clicked = 0;
	}
	console.log(diceArr);
};

/*Rolling dice values*/
const rollDice = () => {
	for (let i = 0; i < 6; i++) {
		if (diceArr[i].clicked === 0) {
			diceArr[i].value = Math.floor(Math.random() * 6 + 1);
		}
	}
	updateDiceImg();
	// check for farkle after roll, change player turn if so
	if (checkForFarkle()) {
		if (gameData.currentTurn === 'player1') {
			gameData.currentTurn = 'player2';
		} else {
			gameData.currentTurn = 'player1';
		}
	}
};

/*Updating images of dice given values of rollDice*/
const updateDiceImg = () => {
	let diceImage;
	for (let i = 0; i < 6; i++) {
		diceImage = 'images/' + diceArr[i].value + '.png';
		document.getElementById(diceArr[i].id).setAttribute('src', diceImage);
	}
};

const diceClick = (img) => {
	selectedDie = img.getAttribute('data-number');
	console.log(selectedDie, img);
	console.log(diceArr[selectedDie]);

	img.classList.toggle('transparent');
	if (diceArr[selectedDie].clicked === 0) {
		diceArr[selectedDie].clicked = 1;
	} else {
		diceArr[selectedDie].clicked = 0;
	}
	displayCurrentRollTotal(calculateScore(trackDiceValues()));
};

// track dice values for scoring and farkle calculations
const trackDiceValues = () => {
	selectedDice = document.getElementsByClassName('transparent');
	const clickedDice = {
		1: 0,
		2: 0,
		3: 0,
		4: 0,
		5: 0,
		6: 0,
	};
	// track clicked dice by value
	for (let die of selectedDice) {
		const dieValue = diceArr[die.dataset.number].value;
		clickedDice[dieValue] = clickedDice[dieValue] + 1;
	}
	return clickedDice;
};

// calculate score of selected dice
const calculateScore = (clickedDice) => {
	let score = 0;
	// loop over value totals and create score
	for (const diceNumber in clickedDice) {
		console.log(diceNumber);
		if (clickedDice[diceNumber] >= 3) {
			if (diceNumber === '1') {
				score += (clickedDice[diceNumber] % 3) * 100;
				score += 1000;
				clickedDice[diceNumber] = 0;
			} else if (diceNumber === '5') {
				score += (clickedDice[diceNumber] % 3) * 50;
				score += 500;
				clickedDice[diceNumber] = 0;
			} else {
				score += clickedDice[diceNumber] * 100;
			}
		}
		if (diceNumber === '1') {
			score += clickedDice[diceNumber] * 100;
		} else if (diceNumber === '5') {
			console.log('five');
			score += clickedDice[diceNumber] * 50;
		}
	}

	// return score
	return score;
};

const turnScore = document.getElementById('turn-score');
const bankScore = () => {
	// take current turn score and add to current players total score
	// check for a total for 10k to start last round
	// change current player
};

// display current players roll score from selected dice
const displayCurrentRollTotal = (total) => {
	turnScore.innerText = total;
};

// check for farkle
const checkForFarkle = (clickedDice) => {
	let isFarkle;

	for (const diceNumber in clickedDice) {
		console.log(diceNumber);
		if (diceNumber === '1' || diceNumber === '5') {
			isFarkle = false;
		} else if (clickedDice[diceNumber] >= 3) {
			isFarkle = false;
		} else {
			isFarkle = true;
		}
	}

	return isFarkle;
};

const startButton = document.getElementById('start-button');
const currentPlayerDisplay = document.getElementById('current-player');

// start game
const startGame = () => {
	// Todo: set starting states
	startButton.setAttribute('disabled', true);
	gameData.gameActive = true;
};

// game loop to keep game active until status === false
while (gameData.gameActive) {
	currentPlayerDisplay.innerText = gameData.currentTurn;
}
