$(document).ready(function(){
		$('.invalid').css("border-color", "red");
		$('#error').css("color", "red");
	
		$('#jobReqForm').validate({
			rules:{
				surname:{
					required:true,
				},
				publisher_name:{
					required:true,
				},
				age:{
					required:true,
					number:true,
				},
				job_title:{
					required:true,
				},
				contact_no:{
					required:true,
					number:true,
				}
			},
			messages:{
				publisher_name:{
					required:'Enter Your Name',
				},
				surname:{
					required:'Enter Your Surname',
				},
				age:{
					required:'Enter Your Age',
				},
				job_title:{
					required:'Enter the Job Title',
				},
				contact_no:{
					required:'Enter your Contact No',
				}
			}
		});
		
		$('#top10SuggestForm').validate({
			rules:{
				top_10_suggestion:{required:true},
				top_10_publisher_name:{required:true},
				top_10_contact_no:{required:true},
				
			},
			messages:{
				top_10_suggestion:{required:'Enter Suggestion'},
				top_10_publisher_name:{required:'Enter Name & Surname'},
				top_10_contact_no:{required:'Enter Your Contact No'},
			}
		});
		
		
		
		$('#jobAppForm').validate({
			rules:{
				cv:{required:true},	
			},
			messages:{
				cv:{required:'Upload your CV'},
			}
		});
		
		$('#condolenceForm').validate({
			rules:{
				sender_name_surname :{
					required:true,
				},
				message:{
					required:true,
				},
				contact_no:{
					required:true,
					number:true
				}
			},
			messages:{
				sender_name_surname :{
					required:'Enter your Name and Surname',
				},
				contact_no:{
					required:'Enter your Contact No',
				},
				message:{
					required:'Enter Your Message.'
				}
			}
		});
		
		$('#placeAdForm').validate({
			rules:{
				business_name:{
					required:true,
				},
				contact_no:{
					required:true,
				},
				ad_picture:{
					required:true,
				}
			},
			messages:{
				business_name:{
					required:'Enter Business Name',
				},
				contact_no:{
					required:'Enter Biz/Your Contact No',
				},
				ad_picture:{
					required:'Upload Your AD Picture'
				}
			}
		})
		
		$('#placeStatusForm').validate({
			rules:{
				publisher_name:{
					required:true,
				},
				status:{
					required:true,
				},
				contact_no:{
					required:true,
				},
				status_img:{
					required:true,
				}
			},
			messages:{
				status:{
					required:'A Status should say something!',
				},
				publisher_name:{
					required:'Enter your Name & Surname',
				},
				contact_no:{
					required:'Enter Biz/Your Contact No',
				},
				status_img:{
					required:'A status must have a supporting image!'
				}
			}
		})
			
		$('#sharePostForm').validate({
			rules:{
				share_no1:{
					required:true,
				},
				publisher_name_surname:{
					required:true,
				},
				contact_no:{
					required:true,
				},
			},
			messages:{
				publisher_name_surname:{
					required:'Enter Your Name and Surname',
				},
				contact_no:{
					required:'Enter your Contact No',
				},
				share_no1:{
					required:'Enter at least one No in the First Textbox',
				}
			}
		});
		
		$('#consToHireForm').validate({
			rules:{
				location:{
					required:true,
				},
				publisher_name:{
					required:true,
				},
				interview_details:{
					required:true,
				},
				contact_no:{
					required:true,
					number:true,
				},
			},
			messages:{
				location:{
					required:'Enter location',
				},
				publisher_name:{
					required:'Enter your/biz name',
				},
				interview_details:{
					required:'Enter Interview Details',
				},
				contact_no:{
					required:'Enter Contact No',
				},
			}
		});
		
		$('#postOtherForm').validate({
			rules:{
				contact_no:{
					required:true,
					number:true,
				},
				post_detail:{
					required:true,
				},
				publisher_name:{
					required:true,
				},
				surname:{
					required:true,
				},
				location:{
					required:true,
				},
				attachment:{
					required:true,
				}
			},
			
			messages:{
				surname:{
					required:'Enter Surname',
				},
				attachment:{
					required:'Supply Image',
				},
				post_detail:{
					required:'Enter event detail',
				},
				contact_no:{
					required:'Enter Contact No',
				},
				publisher_name:{
					required:'Enter Your Name',
				},
				surname:{
					required:'Enter Surname',
				},
				location:{
					required:'Enter location',
				}
			}
		});
		
		$('#jobOfferForm').validate({
			rules:{
				email:{
					required:true,
					email:true,
				},
				contact_no:{
					required:true,
					number:true,
				},
				job_title:{
					required:true,
				},
				publisher_name:{
					required:true,
				},
				salary:{
					required:true,
				},
				closing_date:{
					required:true,
				},
				no_of_candidates:{
					required:true,
					number:true,
				},
			},
			
			messages:{
				email:{
					required:'Enter Your/Biz Email',
					email:'Enter a valid Email',
				},
				job_title:{
					required:'Enter Job Title',
				},
				publisher_name:{
					required:'Enter Your/Biz Name',
				},
				contact_no:{
					required:'Enter Your/Biz Contact No',
				},
				salary:{
					required:'Please provide the Salary',
				},
				closing_date:{
					required:'Enter Closing Date',
				},
				no_of_candidates:{
					required:'Enter No of People required',
				},
			}
		});
		
		$('#postEventForm').validate({
			rules:{
				location:{
					required:true,
				},
				start_time:{
					required:true,
				},
				end_time:{
					required:true,
				},
				publisher_name:{
					required:true,
				},
				surname:{
					required:true,
				},
				contact_no:{
					required:true,
				},
				post_detail:{
					required:true,
				},
				contact_no:{
					required:true,
					number:true,
				},
				day:{
					required:true,
					date:true,
				}	
			},

			messages:{
				location:{
					required:'Enter event location',
				},
				start_time:{
					required:'Enter event start-time',
				},
				end_time:{
					required:'Enter event end-time',
				},
				publisher_name:{
					required:'Enter Your Name',
				},
				surname:{
					required:'Enter Surname',
				},
				post_detail:{
					required:'Enter event detail',
				},
				contact_no:{
					required:'Enter Contact No',
				},
				day:{
					required:'Enter event day',
				}	
			}
		});

});
