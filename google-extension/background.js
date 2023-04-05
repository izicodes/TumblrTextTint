chrome.runtime.onInstalled.addListener((reason) => {
	if (reason.reason === "install") {
		chrome.tabs.create({ url: "onboarding/onboarding.html" });
	}
});
