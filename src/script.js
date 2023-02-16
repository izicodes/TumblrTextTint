// Variables
var hexChoice = document.querySelector("#hex-code-choice");
var hexSection = document.querySelector("#hex-code-section");
var colourChoice = document.querySelector("#colour-picker-choice");
var colourSection = document.querySelector("#colour-picker-section");
var generateBtn = document.querySelector("#generate-btn");
var errorMsg = document.querySelector("#error-message");
var colourPickerInput = document.querySelector("#colour-picker");
var hexCodeInput = document.querySelector("#hex-code");
var userInput = document.querySelector("#user-input");
var textarea = document.querySelector("#final-code-textarea");
var copyBtn = document.querySelector("#copy-btn");
var copyMsg = document.querySelector("#copy-message");

// ---------------------------------------------------------------- //

// If HEX Code choice is selected
hexChoice.addEventListener("click", function () {
	if (!colourSection.classList.contains("hide")) {
		colourSection.classList.add("hide");
		if (textarea.value !== null) {
			textarea.value = "";
		}
	}
	hexSection.classList.remove("hide");
});
// If colour picker choice is selected
colourChoice.addEventListener("click", function () {
	if (!hexSection.classList.contains("hide")) {
		hexSection.classList.add("hide");
		if (textarea.value !== null) {
			textarea.value = "";
		}
	}
	colourSection.classList.remove("hide");
});
// Handling the copy button
copyBtn.addEventListener("click", function () {
	// If the textarea is NOT empty, the button works
	if (textarea.value !== "") {
		// Selects the text inside the textarea and copies the text to the clipboard
		textarea.select();
		textarea.setSelectionRange(0, 99999); // For mobile devices
		navigator.clipboard.writeText(textarea.value);

		// Deselects the textarea's text
		textarea.selectionStart = textarea.selectionEnd;

		// Make the copy message pop up
		showMessage("Code copied!", copyMsg);
	} else {
		return;
	}
});

// When the user clicks the button
generateBtn.addEventListener("click", function () {
	var text = userInput.value;
	var colorValue = colourPickerInput.value;
	var hexValue = hexCodeInput.value;

	if (userInput.value == "") {
		createErrorMessage("Oh no! Empty first box!");
	} else if (colourSection.classList.contains("hide") && hexSection.classList.contains("hide")) {
		// User didn't pick any colour choices
		createErrorMessage("Oh no! You didn't choose a colour!");
	} else if (hexCodeInput.value == "" && colourSection.classList.contains("hide")) {
		// Empty HEX code box
		createErrorMessage("Oh no! HEX code box is empty!");
	} else {
		errorMsg.classList.add("hide");
		// Getting value from colour picker
		if (!colourSection.classList.contains("hide") && userInput.value !== null && hexSection.classList.contains("hide")) {
			textarea.value = generateCode(text, colorValue);
		}
		if (!hexSection.classList.contains("hide") && userInput.value !== null && colourSection.classList.contains("hide")) {
			checkHEXCode(text, hexValue);
		}
	}
});

// FUNCTIONS
// Generate the code for the textarea
function generateCode(text, colour) {
	if (colour.charAt(0) !== "#") {
		colour = "#" + colour;
	}
	var finalCode = '<span style="color: ' + colour + ';">' + text + "</span>";
	return finalCode;
}
function createErrorMessage(message) {
	errorMsg.textContent = message;
	errorMsg.classList.remove("hide");
}
function checkHEXCode(text, colour) {
	// Checks if the HEX code has only letters, numbers and the '#' symbol
	if (/^[a-zA-Z0-9#]+$/.test(colour)) {
		// Checks if the HEX code has the '#' symbol
		if (colour.includes("#")) {
			// Checks if the '#' symbol is in the front
			if (colour.charAt(0) == "#") {
				textarea.value = generateCode(text, colour);
			} else {
				createErrorMessage("'#' has to be in the front");
				textarea.value = "";
				return;
			}
		} else {
			// Checks if the HEX code without the '#' symbol is 6 chars long
			if (colour.trim().length === 6) {
				colour = "#" + colour;
				textarea.value = generateCode(text, colour);
				return;
			} else {
				createErrorMessage("Format the HEX code correctly please!");
				textarea.value = "";
				return;
			}
		}
	} else {
		createErrorMessage("Only # is allowed!");
		textarea.value = "";
		return;
	}
}
function showMessage(text, input) {
	if (input == copyMsg) {
		copyMsg.classList.add("copyStyle");
	}
	input.textContent = text;
	setTimeout(() => {
		input.textContent = "";
		if (input == copyMsg) {
			copyMsg.classList.remove("copyStyle");
		}
	}, 1700);
}
