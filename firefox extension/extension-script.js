// Variables
var hexSection = document.querySelector("#hex-code-section");
var generateBtn = document.querySelector("#generate-btn");
var errorMsg = document.querySelector("#error-message");
var hexCodeInput = document.querySelector("#hex-code");
var userInput = document.querySelector("#user-input");
var textarea = document.querySelector("#final-code-textarea");
var copyBtn = document.querySelector("#copy-btn");
var copyMsg = document.querySelector("#copy-message");
var resetBtn = document.querySelector("#reset-btn");
var topSection = document.querySelector("#top-section");
var bottomSection = document.querySelector("#bottom-section");

// ---------------------------------------------------------------- //

textarea.value = "";

// When the user clicks the button
generateBtn.addEventListener("click", function () {
  var text = userInput.value;
  var hexValue = hexCodeInput.value;

  if (userInput.value == "") {
    createErrorMessage("Oh no! Empty first box!");
  } else if (hexCodeInput.value == "") {
    // Empty HEX code box
    createErrorMessage("Oh no! HEX code box is empty!");
  } else {
    errorMsg.classList.add("lowopacity");
    // Getting value from colour picker
    checkHEXCode(text, hexValue);
  }
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

// Handles the reset button
resetBtn.addEventListener("click", function () {
  userInput.value = "";
  textarea.value = "";
  hexCodeInput.value = "";

  bottomSection.classList.add("hide");
  topSection.classList.remove("hide");
});

// ---------------------------------------------------------------- //

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
  errorMsg.classList.remove("lowopacity");
}
function checkHEXCode(text, colour) {
  // Checks if the HEX code has only letters, numbers and the '#' symbol
  if (/^[a-zA-Z0-9#]+$/.test(colour)) {
    // Checks if the HEX code has the '#' symbol
    if (colour.includes("#")) {
      // Checks if the '#' symbol is in the front
      if (colour.charAt(0) == "#") {
        textarea.value = generateCode(text, colour);
        topSection.className = "hide";
        bottomSection.classList.remove("hide");
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
        topSection.className = "hide";
        bottomSection.classList.remove("hide");
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

// ---------------------------------------------------------------- //
// >> When installed, direct user to the onboarding page

browser.runtime.onInstalled.addListener(async ({ reason, temporary }) => {
  if (temporary) return; // skip during development
  switch (reason) {
    case "install":
      {
        const url = browser.runtime.getURL("installed-page/installed.html");
        await browser.tabs.create({ url });
      }
      break;
    // see below
  }
});
