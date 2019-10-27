
$(document).ready(function(){
	if (window.location.href.indexOf("?") >  -1){
		history.pushState("",document.title, window.location.pathname);
	}
	
	downlDoc = function (doc){
		const aj = new XMLHttpRequest();
		
		path = 'documents/'+ doc.substr(9)
		
		
		aj.open("post",'/download?path='+ path, true);
		aj.send();
		
		aj.onreadystatechange = function(){
				if (aj.readyState == 4 && aj.status == 200){
					return aj.response;
				}
		}
	}
	
	
	startExam = function(session){
		aj.open("post",'/exam?sess='+ session, true);
		aj.send();
		
		aj.onreadystatechange = function(){
				if (aj.readyState == 4 && aj.status == 200){
					return aj.response;
				}
		}
	}
});	
