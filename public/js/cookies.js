var now = new Date();
var expDate = new Date(now.getTime() + 14 *24 * 60 *60 *1000);
	  
	  
function makeCookie(){
   var attendingDict = {};
   //document.cookie = "password = " + document.form1.password.value + ";expires = "+expDate.toGMTString();
   document.cookie = attendingDict;
}

function updateDict(id){
   attendingDict.id = id;
}
	   
module.exports.makeCookie = makeCookie;   
module.exports.updateDict = updateDict;   

/*	   
	   function getCookie(val){
	       var cookie = null;
		   var findVal = val + "=";
		   var dc = document.cookie;
		   
		   if (dc.length > 0){
		       var start = dc.indexOf(findVal);
			   if (start >= 0){
			       start += findVal.length;
				   lastVal = dc.indexOf(";",start);
				   
				   if (lastVal == -1){
				       lastVal = dc.length;
				   }
				   cookie = (dc.substring(start,lastVal));
			       }else{
			           return cookie;
			       }
		   }
		    return cookie;
	   }
	   
	   function enterValues(){
	       username = getCookie("username");
		   surname = getCookie("surname");
		   password = getCookie("password");
		 
		   if (username == null || surname == null || password == null ){
		      return;
		   }
		   document.form1.username.value = username;
		   document.form1.surname.value = surname;
		   document.form1.password.value = password;
	   }
	   
//	</script>*/