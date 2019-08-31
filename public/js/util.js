
$(document).ready(function(){
	if (window.location.href.indexOf("?") >  -1){
		history.pushState("",document.title, window.location.pathname);
	}
	window.onload = function() {
		reduceFontSize();
	}
	moreEvents(false);
});

function supportTop10(id,type,likes){
	
	checkCookie(id,likes)
		.then(()=>{
			const aj = new XMLHttpRequest();
				aj.open("GET",'/support_top_10/?id='+id+'&top_10_type='+type, true);
				aj.send();
				
				$('#'+id).html('...support');
				
				aj.onreadystatechange = function(){
					if (aj.readyState == 4 && aj.status == 200){
						$('#'+id).html(aj.responseText +' Support');
						return;
					}
				}
		});
		
		$('#'+id).html((Number(likes) + 1 ) + ' Support');
		return;
}

function suggestTop10(area){
	const suggestion = document.getElementById('top_10_suggestion').value;
	const publisher_name = document.getElementById('top_10_publisher_name').value;
	const top_10_reason = document.getElementById('top_10_reason').value;
	const contact_no = document.getElementById('top_10_contact_no').value;
	
	
	const aj = new XMLHttpRequest();
	aj.open("POST",'/top_10_suggest/?area='+area+'&top_10_suggestion='+suggestion+'&publisher_name='+publisher_name+'&top_10_reason='+top_10_reason+
						'&contact_no='+contact_no, true);
	aj.send();
	
	aj.onreadystatechange = function(){
		if (aj.readyState == 4 && aj.status == 200){
			$('#allContent').hide();
			$('#monthContent').remove();
			$('#top_10b').remove();
			$(document.body).append("<div id='monthContent'></div>")
			$('#monthContent').append(aj.responseText);
		}
	}
	return;
}

function moreEvents(flag){
	if (flag === false){
		$('#scndEvents').hide();
	}else{
		$('#scndEvents').show();
		$('#firstEvents').hide();
	}
}

function addContact(){
		const contact_name = $('#contact_name').val();
		const contact_no = $('#contact_no').val();
		const contact_loc = $('#contact_loc').val();
		const area = $('#_area').val();
		
		//alert(contact_name);
		const aj = new XMLHttpRequest();
		aj.open("POST",'/add_contact/?contact_name='+contact_name+'&contact_no='+contact_no+'&contact_loc='+contact_loc+'&area='+area, true);
		aj.send();
	
		aj.onreadystatechange = function(){
			if (aj.readyState == 4 && aj.status == 200){
				$('#res').html('Contact Added!');
				$('#contact_name').hide();
				$('#contact_no').hide();
				$('#contact_loc').hide();
				$('#btnAddContact').hide();
				return;
			}
		}
		 
}

function getAds(area){
	
	const aj = new XMLHttpRequest();
	aj.open("GET",'/get_ads/?area='+area, true);
	aj.send();
	
	aj.onreadystatechange = function(){
		if (aj.readyState == 4 && aj.status == 200){
			
			var ads = JSON.parse(aj.responseText);
			var adspaces = getElementsByClass('adspace');
			
			for (i in ads){
				
				if(i >= adspaces.length){break;}
				if (ads.length < 1){break;}		
				
				adspaces[i].setAttribute("class", 'col-lg-12');
				adspaces[i].setAttribute("id", 'mainContentDiv');
				
				var newDiv = document.createElement("div");
					newDiv.setAttribute("id", 'divDinContent');
					newDiv.setAttribute("class", 'col-lg-12 container');
					
				var newDiv2 = document.createElement("div");
					newDiv2.setAttribute("id", 'adImg');
			
				newDiv.appendChild(newDiv2);
				
				var newDiv3 = document.createElement("div");
					newDiv3.setAttribute("id", 'postDetailOther');
			
				newDiv2.appendChild(newDiv3);
				
				var newH4 = document.createElement("h4");
					newH4.setAttribute("id", 'otherName');
					newH4.setAttribute("style", 'font-size:14pt;font-family:cursive;');
					newH4.innerText = ads[i].business_name; 
			
				newDiv3.appendChild(newH4);
				
				var newSpan= document.createElement("span");
					newSpan.setAttribute("style", 'color:#009977');
					newSpan.innerText = ' '+ ads[i].contact_no; 
			
				newH4.appendChild(newSpan);
				
				var newDiv4 = document.createElement("div");
					newDiv4.setAttribute("style", 'height:90%; width:100%');
					newDiv4.setAttribute("class", 'col-lg-12 otherImagee');
					
					newDiv3.appendChild(newDiv4);
					
				var newPara = document.createElement("p");
					newPara.setAttribute("id", 'otherText');
					newPara.setAttribute("style", 'padding-left:0%;text-wrap:suppress; word-break:break-word;font-size:14pt;');
					
				var icon = document.createElement("i");
					icon.setAttribute('class','fa fa-trophy')
					icon.setAttribute('style','color:rgb(0, 119, 119)')
					newPara.appendChild(icon);
					newDiv4.appendChild(newPara);
					
				var newSpan1 = document.createElement("span");
					newSpan1.setAttribute("style", 'padding-left:10px; padding-right:10px; color:rgb(0, 119, 119)');
					newSpan1.setAttribute("id",ads[i]._id);
					newSpan1.innerText = ads[i].recommendations + ' Recommendations'; 
	
					newPara.appendChild(newSpan1);
					
				var newImg = document.createElement("img");
					newImg.setAttribute("id", 'otherImg');
					newImg.setAttribute("src", ads[i].ad_picture);
					newImg.setAttribute("class", 'img-responsive');
				
					newDiv4.appendChild(newImg);
				
				var newDiv5 = document.createElement("div");
					newDiv5.setAttribute("id", ads[i]._id+'hide');
					newDiv5.setAttribute("style",'height:7%; width:100%');
		
					newDiv.appendChild(newDiv5);
					
				var newDiv6 = document.createElement("div");
					newDiv6.setAttribute("id", 'postDetail3OtherAd');
			
				newDiv5.appendChild(newDiv6);
				
				var newPara2 = document.createElement("p");
					newPara2.setAttribute("id", 'recP');
							
				var newAnchor = document.createElement("a");
					newAnchor.setAttribute("style", 'font-size:11pt; color:#f5f5f5; border:#f5f5f5; background:rgb(0, 119, 119);');
					newAnchor.setAttribute("onclick", 'recommendBusiness(\''+ads[i]._id+'\')');
					newAnchor.setAttribute("class", 'btn btn-success');
					newAnchor.innerText = 'Recommed Business';
					
				var newAnchor2 = document.createElement("a");
					newAnchor2.setAttribute("style", 'font-size:11pt; color:#f5f5f5; border:#f5f5f5; width:40% background:rgb(0, 119, 119);');
					newAnchor2.setAttribute("href", '/bizPage/?id='+ads[i]._id);
					newAnchor2.setAttribute("class", 'btn btn-info');
					newAnchor2.innerText = 'Talk abt\. Biz';
			
					newPara2.appendChild(newAnchor);
					newPara2.appendChild(newAnchor2);
					
				newDiv6.appendChild(newPara2);	
				adspaces[i].appendChild(newDiv);
			}
			
		}	
		
	}

}

function sendBizMsg(user, bizId){
	let bizMgs = $('#bizMsg2');
	let msg = bizMgs.val();
	var socket = io();

	socket.emit('new chat', user, msg, bizId)
	$('#bizMsg2').val('');
	
}

function joinDiscussion(bizId,area){
	let bizMgs = $('#bizMsg');
	let disLabel = $('#disLabel');
	const ajax = new XMLHttpRequest();	
	
	let con_no = bizMgs.val();
	
	if (con_no.length === 10){
		let contact_no = con_no;
		bizMgs.remove();
		disLabel.remove();
		$('#btnJoin').remove();
		
		ajax.open("POST",'/discuss/?number='+contact_no+'&bizId='+bizId+'&area='+area, true);
		ajax.send();
		
		ajax.onreadystatechange = function(){
			if (ajax.readyState == 4 && ajax.status == 200){
				
				if (ajax.responseText.indexOf('Enter Your Details') > -1){
					$('#disLabel2').hide();
					$('#btnJoin2').hide();
					$('#event_discuss').remove();
					$(document.body).append("<div id='monthContent'></div>");
					$('#monthContent').append(ajax.responseText);
					return;
				}else{
					$('#disLabel2').show();
					$('#bizMsg2').show();
					const user = getCookie('user');
					$('#btnJoin2').attr('onclick','sendBizMsg("'+user+'","'+bizId+'")');
					$('#btnJoin2').show();
					return;
				}	
			}
		}
		
	}else{
		disLabel.html('Enter Valid Contact No to Join Discussion');
		bizMgs.html('');
	}
		
	return;
	//check for user / register user
	
	/*var user = bizMgs.val();
	var socket = io();
	
	if (user.length != 0){
		let userc = "user=" + user;
		let u = getCookie('user');
		
		if (u){
			user = u;
		}else{
			document.cookie = userc;
		}
		
		$('#disLabel').html('<br/>Enter Message Below');
		$('#bizMsg').attr('maxlength','60');
		$('#btndiscus').html('Send Message');
		sendBizMsg(user, bizId);
	}*/
}

function attending(_id, no_att){	
	$(document).ready(function() {
		  
		checkCookie(_id,no_att).then(()=>{
			var aj = new XMLHttpRequest();
			
			$('#'+_id).html('....');
			$('#2'+_id).html('....');
			try{
				aj.open("GET",'/attending/?id='+_id, true);
				aj.send();
			
				aj.onreadystatechange = function(){
					if (aj.readyState == 4 && aj.status == 200){
						$('#'+_id).html('You and '+ (aj.responseText - 1)+' others');
						$('#2'+_id).html('You and '+ (aj.responseText - 1) +' others');
					}		
				} 
			}catch(Error){
				
				$('#'+_id).html('You and others');
				$('#2'+_id).html('You and others');
				//console.log('MMMMESSSAAA:   ' +Error.message);
				return;
			}
			
		});
			
	});	
}

function checkCookie(id,no_att){
	return new Promise((resolve, reject) => {
		  const idd = id.substring(3, 8);
		  const cookie = getCookie(idd);
		  
		  if(cookie){
				return;
		  }else{
				var attendingDictCookie = idd + " = " + no_att;
				document.cookie = attendingDictCookie;
				resolve()
		  }
	});	
}

function chkCookie(id,no_att){ 
	
	const idd = id.substring(3, 8);
	const cookie = getCookie(idd);
	if(cookie){
		$('#'+ id).html('You and '+ cookie +' others');
		$('#2'+ id).html('You and '+ cookie +' others');
		return;
	}else{
		$('#'+ id).html(no_att);
		$('#2'+ id).html(no_att);
	}
}

function givestar(_id, no_att){	
	$(document).ready(function() {
		const aj = new XMLHttpRequest();
		$('#'+_id).html('....');
		$('#1'+_id).html('....');
		
		aj.open("GET",'/attending/?id='+_id, true);
		aj.send();
		
		aj.onreadystatechange = function(){
			if (aj.readyState == 4 && aj.status == 200){
				$('#'+_id).html(aj.responseText + ' Stars');
				$('#1'+_id).html(aj.responseText + ' Stars');
			}		
		}	
	});
	
}

function getTop10(address){
	const aj = new XMLHttpRequest();
			
			aj.open("GET",address, true);
			aj.send();
			
			aj.onreadystatechange = function(){
				if (aj.readyState == 4 && aj.status == 200){
					$('#allContent').hide();
					$('#monthContent').remove();
					$('#top_10b').remove();
					$(document.body).append("<div id=\"monthContent\"></div>")
					$('#monthContent').append(aj.responseText);
				}
			}
			return;
}

function nominateForTop10(type){
	const nominator_name = document.getElementById('nominator_name').value;
	const nominator_contact_no = document.getElementById('nominator_contact_no').value;
	const nominee_name_surname = document.getElementById('nominee_name_surname').value;
	const area = document.getElementById('area').value;
	const top_10_type = document.getElementById('top_10_type').value;
	const nomination_picture = document.getElementById('nomination_picture').value;
	
	const aj = new XMLHttpRequest();
	aj.open("POST",'/top_10_nominate/?area='+area+'&nominator_name='+nominator_name+'&nominator_contact_no='+nominator_contact_no+'&nominee_name_surname='+nominee_name_surname+
						'&top_10_type='+top_10_type+'&nomination_picture='+nomination_picture, true);
	aj.send();
	
	aj.onreadystatechange = function(){
		if (aj.readyState == 4 && aj.status == 200){
			$('#allContent').hide();
			$('#monthContent').remove();
			$('#top_10b').remove();
			$(document.body).append("<div id='monthContent'></div>")
			$('#monthContent').append(aj.responseText);
		}
	}
	return;
}

function supportSuggest(id,likes){
	const aj = new XMLHttpRequest();
	$('#'+id).html('-');
	
	checkCookie(id,likes)
		.then(()=>{
			aj.open("GET",'/support_suggest/?id='+id, true);
			aj.send();
		
			aj.onreadystatechange = function(){
				if (aj.readyState == 4 && aj.status == 200){
						$('#'+id).html(aj.responseText);
						//$('#1'+_id).html(' Star('+ aj.responseText + ')');
						return;
				}		
			}
	});	
	$('#'+id).html(Number(likes) + 1);
	return;
}

function monthLookUp(area){
	$(document).ready(function(){
		const  months = $('#months');
		const selectedMonth = months.val();
		
		const events = getElementsByClass('event');
		const jobRequests = getElementsByClass('jobReq');
		const jobs = getElementsByClass('jobOffer');
		const statuses = getElementsByClass('status');
		const others = getElementsByClass('other');

		if (selectedMonth === '--'){
			$('#monthContent').remove();
			$('#top_10b').remove();
			$('#allContent').show();
			for (item in jobRequests){
				$('.jobReq').show();
			}
			for (item in events){
				$('.event').show();
			}
			for (item in jobs){
				$('.jobOffer').show();
			}
			for (item in statuses){
				$('.status').show();
			}for (item in others){
				$('.other').show();
			}
			return;
		}else if(selectedMonth === 'Jobs'){
			$('#allContent').show();
			$('#monthContent').remove();
			for (item in statuses){
				$('.jobReq').hide();
			}
			for (item in events){
				$('.event').hide();
			}
			for (item in statuses){
				$('.status').hide();
			}
			for (item in others){
				$('.other').hide();
			}
			for (item in jobs){
				$('.jobOffer').show();
			}
		}else if(selectedMonth === 'Job Requests'){
			$('#allContent').show();
			$('#monthContent').remove();
			for (item in statuses){
				$('.jobReq').show();
			}
			for (item in events){
				$('.event').hide();
			}
			for (item in statuses){
				$('.status').hide();
			}
			for (item in others){
				$('.other').hide();
			}
			for (item in jobs){
				$('.jobOffer').hide();
			}
		}else if(selectedMonth === 'Statuses'){
			$('#allContent').show();
			$('#monthContent').remove();
			for (item in statuses){
				$('.status').show();
			}
			for (item in events){
				$('.event').hide();
			}
			for (item in jobRequests){
				$('.jobReq').hide();
			}
			for (item in others){
				$('.other').hide();
			}
			for (item in jobs){
				$('.jobOffer').hide();
			}
		}else if(selectedMonth === 'Events'){
			$('#allContent').show();
			$('#monthContent').remove();
			for (item in statuses){
				$('.status').hide();
			}
			for (item in events){
				$('.event').show();
			}
			for (item in jobRequests){
				$('.jobReq').hide();
			}
			for (item in others){
				$('.other').hide();
			}
			for (item in jobs){
				$('.jobOffer').hide();
			}
		}else{
			
			const aj = new XMLHttpRequest();
			
			aj.open("GET",'/month_lookup/?type='+selectedMonth+'&area='+area, true);
			aj.send();
			
			aj.onreadystatechange = function(){
				if (aj.readyState == 4 && aj.status == 200){
					$('#allContent').hide();
					$('#monthContent').remove();
					$('#top_10b').remove();
					$(document.body).append("<div id=\"monthContent\" style='margin-top:10px'></div>")
					$('#monthContent').html(aj.responseText);
				}
			}
			return;
		}
		
		
	});
}

function getImg(id){
	$('#'+id+'hide').hide();
	$('#'+id+'img').append('<p id ="copyrighted" style="text-align:center; position:absolute;top:80%; left:20%;font-family:Courier New; font-size:10pt;color:gray">&copy;2019 dintsang.co.za</p>')
	
	domtoimage.toJpeg(document.getElementById(id+'img'), { quality: 0.95 })
    .then(function (dataUrl) {
        var link = document.createElement('a');
        link.download = 'my-image-name.jpeg';
        link.href = dataUrl;
        link.click();
		$('#'+id+'hide').show();
		$('#otherName').attr('style','background:transparent');
		$('#copyrighted').remove();
    });
	
}

function getImg2(id){
	$('#'+id+'hide2').hide();
	$('#'+id+'img2').append('<p id ="copyrighted" style="text-align:center;position:absolute;top:80%; left:30%;font-family:Courier New; font-size:10pt;color:gray">&copy;2019 dintsang.co.za</p>')
	
	domtoimage.toJpeg(document.getElementById(id+'img2'), { quality: 0.95 })
    .then(function (dataUrl) {
        var link = document.createElement('a');
        link.download = 'my-image-name.jpeg';
        link.href = dataUrl;
        link.click();
		$('#'+id+'hide2').show();
		$('#otherName').attr('style','background:transparent');
		$('#copyrighted').remove();
    });
	
}

function recommendBusiness(id){
	$(document).ready(function() {
		const aj = new XMLHttpRequest();
		
		$('#'+id).html('...recommending');
		$('#3'+id).html('...recommending');
		$('#'+id).css('background','transparent');
		//$('#3'+id).css('background','transparent');
			
			aj.open("GET",'/recommend_business/?id='+id, true);
			aj.send();
			
		aj.onreadystatechange = function(){
			if (aj.readyState == 4 && aj.status == 200){
				$('#'+id).html( aj.responseText + '  Recommendations');
				$('#3'+id).html( aj.responseText + '  Recommendations');
				$('#3'+id).css('background','#007777');
				$('#'+id).css('padding-left','2%');
			}
		}
	});	
}

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

function getElementsByClass(theClass){
	
	var elementArray = [];
	
	if (typeof document.all != "undefined"){
		elementArray = document.all;
	}else{
		elementArray = document.getElementsByTagName("*");
	}
	
	var matchedArray = [];
	var pattern = new RegExp("(^| )" + theClass + "( |$)");
	
	for (var i = 0; i < elementArray.length; i++){
			if (pattern.test(elementArray[i].className)){
				matchedArray[matchedArray.length] = elementArray[i];
		}
	}
	return matchedArray;
};

function reduceFontSize(){
	const textDetails = getElementsByClass('textDetails');
	var stunt = $('.textDetails');
	
	for (i in textDetails){
		if (stunt[i].innerText.length >= 10){
				stunt[i].setAttribute('style','font-size:13pt')		
		}
	}
}