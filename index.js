var categoryP = document.getElementById("categoryP");
var alternativesP = document.getElementById("alternativesP");
var categorySpan = document.getElementById("categorySpan");
var alternativesDiv = document.getElementById("alternativesDiv");
var modelAlternativeDiv = document.getElementsByClassName("alternativeDiv")[0];

modelAlternativeDiv.transitionMS = 1000;
transitionAlternatives.transitionMS = modelAlternativeDiv.transitionMS / 2;

adjustPage();
monitorActiveTab();

loadingIntervalFunction.count = 0;
function loadingIntervalFunction() {
	(loadingIntervalFunction.count)++;
	var numDots = (loadingIntervalFunction.count % 4);
	var loadingText = "";
	
	for(var i = 0; i < numDots; i++)
		loadingText += ".";
	
	categorySpan.innerHTML = loadingText;
}

var loadingInterval = setInterval(loadingIntervalFunction, 250);

var checkActiveTab = function(tab) {
    var tabUrl = tab.url;
	if(tabUrl === checkActiveTab.previousTabUrl)
		return;
    var amazonSearchPattern = "%amazon.com/%/dp/%";
    var isSearchingAmazon = patternMatch(amazonSearchPattern, tabUrl);
    
    if(isSearchingAmazon)
        addAlternatives(tabUrl);
	
	checkActiveTab.previousTabUrl = tabUrl;
}

function monitorActiveTab() {
    var intervalMS = 1000;
    
    var interval = setInterval(function() {
        chrome.tabs.getSelected(null, checkActiveTab);
    }, intervalMS);
}

function transitionAlternatives() {
	var alternativeDivs = alternativesDiv.querySelectorAll(".alternativeDiv");
	var numAlternatives = alternativeDivs.length;
	var alternativeDivIndex = 0;
	
	var transitionInterval = setInterval(function() {
		var alternativeDiv = alternativeDivs[alternativeDivIndex++];
		
		alternativeDiv.style.opacity = 1;
		
		if(alternativeDivIndex == numAlternatives)
			clearInterval(transitionInterval);
	}, transitionAlternatives.transitionMS);
	
}

function setCategory(category) {	
	clearInterval(loadingInterval);	
	loadingIntervalFunction.count = 0;
	categorySpan.innerHTML = category;
}

function adjustPage() {
	verticalAlign(categoryP);
	verticalAlign(alternativesP);
}

function verticalAlign(p) {
	var pHeight = window.getComputedStyle(p).getPropertyValue("height");
	
	p.style.lineHeight = pHeight;
}

function removePx(text) {
	var value = +text.split("px")[0];
	
	return value;
}

function addAlternative(url, imageSource, businessName, description) {
	var alternativeDiv = getAlternativeDiv();
	var image = alternativeDiv.querySelectorAll(".alternativeImage")[0];
	var businessNameP = alternativeDiv.querySelectorAll(".alternativeBusinessNameP")[0];
	var descriptionP = alternativeDiv.querySelectorAll(".alternativeDescriptionP")[0];
	var anchor = alternativeDiv.querySelectorAll(".alternativeAnchor")[0];
	
	anchor.href = url;
	image.src = imageSource;
	businessNameP.innerHTML = businessName;
	descriptionP.innerHTML = description;
	
	alternativesDiv.appendChild(alternativeDiv);
	verticalAlign(businessNameP);
}

function getAlternativeDiv() {
	var alternativeDiv = modelAlternativeDiv.cloneNode(true);
	var businessNameP = alternativeDiv.querySelectorAll(".alternativeBusinessNameP")[0];
	var descriptionP = alternativeDiv.querySelectorAll(".alternativeDescriptionP")[0];
	var separator = alternativeDiv.querySelectorAll(".separator")[0];
	
	alternativeDiv.style.visibility = "visible";
	alternativeDiv.style.position = "static";
	
	alternativeDiv.onmouseenter = function() {
		businessNameP.style.color = "white";
		descriptionP.style.color = "white";
		alternativeDiv.style.background = "linear-gradient(90deg, rgba(58,114,180,1) 0%, rgba(81,167,155,1) 50%, rgba(252,176,69,1) 100%)";
		separator.style.background = "white";
		
	}
	
	alternativeDiv.onmouseleave = function() {
		businessNameP.style.color = "white";
		descriptionP.style.color = "white";
		alternativeDiv.style.background = "linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)";
		separator.style.background = "black";
	}
	
	return alternativeDiv;
}

//fetchData().then(arr => console.log(arr));
function addAlternatives(amazonUrl) {
    var baseUrl = "https://jw2wgnn6xh.execute-api.us-west-2.amazonaws.com/test/businesses?url=";
    var url = baseUrl + amazonUrl;
  
	fetch(url)
	.then(	(resp) => resp.json()) // Transform the data into json
	.then(function(data) {
		var alternatives = data;
		var categoryBuilder = "";
		var numAlternatives = alternatives.length;
	    for(var i = 0; i < numAlternatives; i++) {
    		var alternative = alternatives[i];
			alternative = JSON.parse(alternative);
    		var item = alternative.Item;
    		var category = item.category;
			
			categoryBuilder += category + ((i < numAlternatives - 1) ? ", " : "");
    		addAlternative(item.url, item.imageUrl, item.businessName, item.description);
	    }
	
		setCategory(categoryBuilder);
	    transitionAlternatives();
	});
}

function getCurrentTab() {
    var currentTab;
    
    chrome.tabs.getCurrent(function(tab) {
        currentTab = tab.url;
    });
    
    return currentTab;
}


function patternMatch(pattern, string) {
	var matches = true;
	var stringLen = string.length;
	var betweens = pattern.split("%");
	var previousIndex;
	var currentIndex;
	var numBetweens = betweens.length;

	previousIndex = -1;
	for(var i = 0; i < numBetweens && matches; i++) {
		var between = betweens[i];
		if(between != "") {
			currentIndex = string.indexOf(between);
			if(currentIndex <= previousIndex)
				matches = false;
		}
		previousIndex = currentIndex;
	}



	return matches;
}

function hardcodeparseArray() {

	var alternatives = [{"url": "https://www.snailmail.band/", "imageUrl": "https://images1.miaminewtimes.com/imager/u/745xauto/9417877/music1-1-1b7621cc28cde0e7.jpg", "businessName": "Sephora", "description": "mascara"},
	{"url": "https://www.snailmail.band/", "imageUrl": "https://images1.miaminewtimes.com/imager/u/745xauto/9417877/music1-1-1b7621cc28cde0e7.jpg", "businessName": "QFC", "description": "chicken"},
	{"url": "https://www.snailmail.band/", "imageUrl": "https://images1.miaminewtimes.com/imager/u/745xauto/9417877/music1-1-1b7621cc28cde0e7.jpg", "businessName": "Payless Shoesource", "description": "shoes"}];
	var numAlternatives = alternatives.length;

	for(var i = 0; i < numAlternatives; i++) {
		var alternative = alternatives[i];
		
		addAlternative(alternative.url, alternative.imageUrl, alternative.businessName, alternative.description);
	}
	
	transitionAlternatives();


	/*postData('https://example.com/answer', { answer: 42 })
		.then(data => {
		console.log(data); // JSON data parsed by `data.json()` call
	});*/

}
