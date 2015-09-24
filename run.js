function getMediumHTMLWithUsername(username) {
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "https://medium.com/@" + username, true);
	xhr.onreadystatechange = function() {
  		if (xhr.readyState == 4) {
  			if (xhr.status == 200) {
  				var profileHeaderCardMedium = $(document).find(".ProfileHeaderCard-medium");
  				if (profileHeaderCardMedium.html() === undefined) {
    				var res = xhr.responseText,
	    				parser = new DOMParser(),
    					doc = $.parseHTML(res),
    					insertingHTML = '<div class="ProfileHeaderCard-medium">',
    					seeTheirMediumText = "See their posts on Medium";

    				if (
    					($(doc).find(".blockGroup--mostRecommended").find(".graf--h1").html() === undefined) &&
    					($(doc).find(".blockGroup--mostRecommended").find(".graf--h2").html() === undefined) &&
    					($(doc).find(".blockGroup--mostRecommended").find(".graf--h3").html() === undefined)
    				) {
    					if ($(doc).find(".blockGroup--mostRecommended").find(".graf--last").html() === undefined) {
    						seeTheirMediumText = "See them on Medium";
    					}
    				}

    				insertingHTML += '<img class="Icon Icon--medium Icon--mediumlogo" src="' + chrome.extension.getURL('img/medium-small.png') + '" width="14" height="11"><span class="ProfileHeaderCard-medium" dir="ltr"><a class="u-textUserColor" target="_blank" rel="me nofollow" href="https://medium.com/@' + username + '" title="Medium Profile">' + seeTheirMediumText + '</a></span>';

    				var recommendedTtl = "";
    				var recommendedDesc = "";
    				var recommendedURL = "";
    				var recommendedCount = 0;
    				if (
    					($(doc).find(".blockGroup--mostRecommended").find(".graf--h1").html() === undefined) &&
    					($(doc).find(".blockGroup--mostRecommended").find(".graf--h2").html() === undefined) &&
    					($(doc).find(".blockGroup--mostRecommended").find(".graf--h3").html() === undefined)
    				) {
    				} else {
    					if ($(doc).find(".blockGroup--mostRecommended").find(".graf--h1").html() != undefined) {
	    					recommendedTtl = $(doc).find(".blockGroup--mostRecommended").find(".graf--h1").html();
    					} else if ($(doc).find(".blockGroup--mostRecommended").find(".graf--h2").html() != undefined) {
    						recommendedTtl = $(doc).find(".blockGroup--mostRecommended").find(".graf--h2").html();
    					} else {
    						recommendedTtl = $(doc).find(".blockGroup--mostRecommended").find(".graf--h3").html();
    					}
    				
    					var aTags = $(doc).find(".blockGroup--mostRecommended").find(".postArticle.postArticle--short").find("a");
    					var url = aTags[0];
    					recommendedDesc = $(doc).find(".blockGroup--mostRecommended").find(".graf--last").html();
    					recommendedURL = $(url).attr("href");
    					recommendedCount = $(doc).find(".blockGroup--mostRecommended").find(".button-label").html();

    					insertingHTML += '<div id="mostRecommended"><div id="medium-header"><img src="' + chrome.extension.getURL('img/Medium-logo-dark100.png') + '" /><span>Their Most Recommended</span></div>'

    					if (recommendedTtl != undefined) {
	    					insertingHTML += '<p class="medium-title">' + recommendedTtl + '</p>';
    					}

    					insertingHTML += '<p class="medium-desc">' + recommendedDesc + '</p>';
    					insertingHTML += '<p class="medium-footer"><a href="' + recommendedURL + '">Read more</a><span class="medium-counter-section"><span id="heart">&nbsp;</span><span class="medium-count">' + recommendedCount + '</span></span></p>';
    					insertingHTML += '</div>';
    				}

    				insertingHTML += "</div><div class='clearfix'></div>";
    				if ($(".ProfileMessagingActions").length > 0) {
	    				$(".ProfileMessagingActions").before(insertingHTML);
    				} else {
    					$(document).find(".ProfileHeaderCard").append(insertingHTML);
    				}
    			} else {
    				// console.log("Already exists");
    			}
    		}
  		}
	}
	xhr.send();
};

chrome.extension.onRequest.addListener(
  function(request, sender, sendResponse) {
    if (request.greeting == "requestMediumInfo") {
		  chrome.runtime.sendMessage({detail: "requestTwitterHandle"}, function(response) {
  			getMediumHTMLWithUsername(response.username);
		  });
    }
  }
);
