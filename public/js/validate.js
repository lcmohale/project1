$(document).ready(function(){
		$('.invalid').css("border-color", "red");
		$('.error').css("color", "red");
	
		$('#regForm').validate({
			rules:{
				fname:{
					required:true,
				},
				s_name:{
					required:true,
				},
				email:{
					required:true,
					email:true,
				},
				contact_no:{
					required:true,
					number:true,
				},
				id_no:{
					required:true,
					number:true,
				},
				qualification_docs:{
					required:true,
				}
			},
			messages:{
				fname:{
					required:'Enter Your Name',
				},
				s_name:{
					required:'Enter Your Surname',
				},
				email:{
					required:'Enter correct email',
				},
				id_no:{
					required:'Enter your ID no.',
				},
				contact_no:{
					required:'Enter your Contact No',
				},
				qualification_docs:{
					required:'Upload Your Qualification documents',
				}
			}
		});
			
});
