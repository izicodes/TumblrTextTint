// Variables
var hexChoice = document.querySelector("#hex-code-choice");
var hexSection = document.querySelector("#hex-code-section");
var colourChoice = document.querySelector("#colour-picker-choice");
var colourSection = document.querySelector("#colour-picker-section");
var generateBtn = document.querySelector("#generate-btn");
var errorMsg = document.querySelector("#error-message");
var colourPickerInput = document.querySelector("#colour-picker");

// Add the disabled styling to the first button + disabling the button entirely
generateBtn.setAttribute("class", "disabled-btn");
generateBtn.disabled = true;

// If HEX Code choice is selected
hexChoice.addEventListener("click", function () {
	if (!colourSection.classList.contains("hide")) {
		colourSection.classList.add("hide");
	}
	hexSection.classList.remove("hide");
});
// If colour picker choice is selected
colourChoice.addEventListener("click", function () {
	if (!hexSection.classList.contains("hide")) {
		hexSection.classList.add("hide");
	}
	colourSection.classList.remove("hide");
});

// Getting the value from the colour picker
function rgbToHex(rgb) {
	const [r, g, b] = rgb.match(/\d+/g);
	return `#${Number(r).toString(16)}${Number(g).toString(16)}${Number(b).toString(16)}`;
}

var colorValue = colourPickerInput.value;
var hexValue = rgbToHex(colorValue);

// User can not delete the first character of the HEX code input
function preventDeleteFirstChar(event, input) {
	const key = event.key;
	if (key === "Backspace" || key === "Delete") {
		// User is trying to delete with backspace or delete key
		if (input.selectionStart === 1 && input.selectionEnd === 1) {
			// User is trying to delete the first character
			return false;
		}
	}
	return true;
}
