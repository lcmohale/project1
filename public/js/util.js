
$(document).ready(function(){
	if (window.location.href.indexOf("?") >  -1){
		history.pushState("",document.title, window.location.pathname);
	}
	
	alert('Hola Majozisto');
});
