(function(window,Math){
	var windowWidth = window.innerWidth,
	trueWidth = windowWidth >= 750? 750 : windowWidth;

	if(document.querySelector('html'))
	document.querySelector('html').style.fontSize = trueWidth / 6.25 + "px";
	else {
		var style = document.createElement('style');
		style.type = "text/css";
		style.innerHTML = "html{font-size:"+trueWidth / 6.25 +"px;}";
		document.querySelector('head').appendChild(style);
	}
})(window,Math);
