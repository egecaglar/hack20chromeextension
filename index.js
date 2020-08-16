var categoryP = document.getElementById("categoryP");
var alternativesP = document.getElementById("alternativesP");
var categorySpan = document.getElementById("categorySpan");
var alternativesDiv = document.getElementById("alternativesDiv");
var modelAlternativeDiv = document.getElementsByClassName("alternativeDiv")[0];

modelAlternativeDiv.transitionMS = 1000;
transitionAlternatives.transitionMS = modelAlternativeDiv.transitionMS / 2;

setCategory("shoes");
adjustPage();
hardcodeparseArray();

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

function addAlternative(url, imageSource, title, description) {
	var alternativeDiv = getAlternativeDiv();
	var image = alternativeDiv.querySelectorAll(".alternativeImage")[0];
	var businessNameP = alternativeDiv.querySelectorAll(".alternativeBusinessNameP")[0];
	var descriptionP = alternativeDiv.querySelectorAll(".alternativeDescriptionP")[0];
	var anchor = alternativeDiv.querySelectorAll(".alternativeAnchor")[0];
	
	anchor.href = url;
	image.src = imageSource;
	businessNameP.innerHTML = title;
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
		alternativeDiv.style.background = "black";
		separator.style.background = "white";
	}
	
	alternativeDiv.onmouseleave = function() {
		businessNameP.style.color = "black";
		descriptionP.style.color = "black";
		alternativeDiv.style.background = "white";
		separator.style.background = "black";
	}
	
	return alternativeDiv;
}

//fetchData().then(arr => console.log(arr));
function parseArray() {
	fetch(url)
	.then((resp) => resp.json()) // Transform the data into json
	.then(function(data) {
		for (var i = 0; i < data.length; i++) {
			var obj = data[key];
			var im = alert(obj.image);
			var t = alert(obj.title);
			var d = alert(obj.description);
			addAlternative(im, t, d);
		}
	});
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
