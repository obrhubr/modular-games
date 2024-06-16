function onKeyPress(e) {
	e.preventDefault();

	// Check if gameEnded to prevent modification
	if (gameState.ended == true) {
		return;
	};

	// Check if key is letter
	if ("abcdefghijklmnopqrstuvwxyzäöü".indexOf(e.key) < 0) {
		return;
	};

	let tileNumber = e.target.attributes.tilenumber.value;
	let word = getWord(tileNumber, gameState.selectOrientation);
	let alreadyFilled = document.getElementById("tileLetter" + tileNumber.toString()).value != "";

	// Set input value to key
	e.target.value = e.key;

	moveTextInput(tileNumber, word, 0, true, alreadyFilled);

	// save to localstorage
	saveLetters();

	// Check if game is complete
	let outcome = checkInputs();
	if (outcome) {
		return;
	};
};

function onTileInput(event) {
	let tileNumber = gameState.previousSelected;
	let word = getWord(tileNumber, gameState.selectOrientation);

	switch(event.key) {
		case 'Tab':
			event.preventDefault();
			forward();
			break;
		case 'Enter':
			event.preventDefault();
			forward();
			break;
		case '.':
			event.preventDefault();
			forward();
			break;
		case 'Backspace':
			event.preventDefault();
			
			// prevent modifying puzzle after game has ended
			if (gameState.ended == true) return;

			let tile = document.getElementById("tileLetter" + tileNumber.toString());
			tile.value = "";
			saveLetters();
			moveTile(tileNumber, word, false);		
			break;
		case 'ArrowUp':
			if (gameState.selectOrientation == "vertical") {
				moveTile(tileNumber, word, false);
			} else {
				onTileClick({
					target: document.getElementById("tileLetter" + tileNumber.toString())
				});
			};
			break;
		case 'ArrowDown':
			if (gameState.selectOrientation == "vertical") {
				moveTile(tileNumber, word, true);
			} else {
				onTileClick({
					target: document.getElementById("tileLetter" + tileNumber.toString())
				});
			};
			break;
		case 'ArrowLeft':
			if (gameState.selectOrientation == "horizontal") {
				moveTile(tileNumber, word, false);
			} else {
				onTileClick({
					target: document.getElementById("tileLetter" + tileNumber.toString())
				});
			};
			break;
		case 'ArrowRight':
			if (gameState.selectOrientation == "horizontal") {
				moveTile(tileNumber, word, true);
			} else {
				onTileClick({
					target: document.getElementById("tileLetter" + tileNumber.toString())
				});
			};
			break;
		default:
			onKeyPress(event);
	};
};