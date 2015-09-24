chrome.tabs.onUpdated.addListener(function(request, sender, callback) {
	if (sender.status == "complete") {
		chrome.tabs.getSelected(null, function(tab) {
          chrome.tabs.sendRequest(tab.id, {greeting: "requestMediumInfo"}, function(response) {
          });
      });
	}
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.detail == "requestTwitterHandle") {
		sendResponse({username: sender.tab.url.split("https://twitter.com/")[1]});
    }
  });

