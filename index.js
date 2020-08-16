var categoryP = document.getElementById("categoryP");
var alternativesP = document.getElementById("alternativesP");
var categorySpan = document.getElementById("categorySpan");
var alternativesDiv = document.getElementById("alternativesDiv");

var modelAlternativeDiv = document.getElementsByClassName("alternativeDiv")[0];

modelAlternativeDiv.transitionMS = 1000;
transitionAlternatives.transitionMS = modelAlternativeDiv.transitionMS / 2;

setCategory("shoes");
adjustPage();
testAddAlternative();
hardcodeparseArray();

function testAddAlternative() {
	var numAlternatives = 10;
	
	for(var i = 0; i < numAlternatives; i++) {
		addAlternative("images/testImage.jpg", "Title " + i + 1, "description " + i + 1);
	}
	
	transitionAlternatives();
	
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
	categorySpan.innerHTML = hardcodeparseArray();
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

function addAlternative(imageSource, title, description) {
	var alternativeDiv = getAlternativeDiv();
	var image = alternativeDiv.querySelectorAll(".")[0];
	var titleP = alternativeDiv.querySelectorAll(".")[0];
	var descriptionP = alternativeDiv.querySelectorAll(".")[0];
	
	image.src = imageSource;
	titleP.innerHTML = title;
	descriptionP.innerHTML = description;
	
	alternativesDiv.appendChild(alternativeDiv);
}

function getAlternativeDiv() {
	var alternativeDiv = modelAlternativeDiv.cloneNode(true);
	
	return alternativeDiv;
}
 



fetchData().then(arr => console.log(arr));
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

var json = [{"businessName": "Sephora", "title": "mascara", "image": "sample"},
{"businessName": "QFC", "title": "chicken", "image": "sample3"},
{"businessName": "Payless Shoesource", "title": "shoes", "image": "sample2"}];

    /* for(var key in json) {
    var obj = json[index];
    var n = alert(obj.businessName);
    var t = alert(obj.title);
    var im = alert(obj.image);
    addAlternative(im, n, t);
    alert(json[key].businessName);
    } */ 
 for (var i = 0; i < json.length; i++) { // Less complicated for loop-- works properly! 
                         // TO-DO: debug this loop/ addAlternative so that 
                         // the loop does not exit early
      //if (json.hasOwnProperty(key)) {
          alert(json[i].businessName);
          //(json[key].title);
          var obj = json[i];
          var n = obj.businessName;
          var t = obj.title;
          var im = obj.image;
          addAlternative(im, n, t);
         
     //}
 }

postData('https://example.com/answer', { answer: 42 })
  .then(data => {
    console.log(data); // JSON data parsed by `data.json()` call
  });

}