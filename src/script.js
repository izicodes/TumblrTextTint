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
