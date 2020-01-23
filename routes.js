'use strict';
const multer = require('multer');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extended:true});
const ObjectId = require('mongodb').ObjectID;
const crypto = require('crypto');
const path = require('path');
const nodemailer = require('nodemailer');
const { check, validationResult } = require('express-validator');
//var upload = multer({ dest: 'documents/' })

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './documents/')
  },
  filename: function (req, file, cb) {
		cb(null, file.fieldname + file.originalname.split(".")[0]+ '-' + Date.now() + '.' + file.originalname.split(".")[1])
  }
})
var upload = multer({ storage: storage })

module.exports = function(app,dbs){
	app.get('/setadmin',function(req,res){
		res.sendFile(path.join(__dirname+'/views/System/setadmin.html'));
	})
	
	app.post('/setadmin',urlencodedParser, function(req,res){
		const new_admin ={
			name:req.body.fname,
			surname:req.body.s_name,
			email:req.body.email,
			password:req.body.password,
			role:'admin'
		}
		
		dbs.collection('users').find({email: new_admin.email})
				.toArray((err,user)=>{
					if (err){
						console.log('User Not Found!');
						return;
					}else{
						if(user.length >= 1){
							res.redirect('/login');
						}else{
							dbs.collection('users').insertOne(new_admin);
							res.redirect('/login');
						}
					}
		});
	})
	
	app.get('/',function(req,res){
		res.sendFile(path.join(__dirname+'/views/System/index.html'));
	})

	app.get('/admin',function(req,res){
		if (req.query.t === '5ad5mc50ci9955e480f78b61fe8admin'){
			res.render('System/admin');
			
		}else if (req.query.students === 'registered'){
			
			dbs.collection('users').find({role:'student'}).sort({date_registered:-1})
				.toArray(function(err,students){
						if(err){
							res.render('err',{'area':req.body.area,'msg':'System experiencing tech difficulties, please check later :('});	
						}else{
							if (students.length > 0){
								const _students = [];
							
								for(var a in students){
									students[a].date_registered =  students[a].date_registered.toDateString();
									_students.push(students[a]);
								}
								
								res.render('System/students',{'students':_students});
								
							}else{
								const students = {};
								const reg_students = []
								reg_students.push(students);
								res.render('System/students',{'students':reg_students});
							}
					}
				});
				
		}else if (req.query.exams === 'update'){
			res.render('System/exams');
		}else{
			res.sendFile(path.join(__dirname+'/views/System/login.html'));
		}
	})

	app.get('/download',function(req,res){
		const id = req.query.id;
		
		dbs.collection('users').find({_id:ObjectId(id)})
			.toArray(function(err,student){
					if(err){
						res.render('err',{'area':req.body.area,'msg':'System experiencing tech difficulties, please check later :('});	
					}else{
						if (student.length > 0){
							res.render('System/download',{'name':student[0].name,'surname':student[0].s_name, 'documents':student[0].documents});
						}else{
							console.log('Student not Found');
							returnd
						}
					}
			});
	})
	
	app.post('/download',function(req,res){
		const path = req.query.path;
		
		res.download( path, (err) => {
			if (err) {
				res.send(err);
				return
			} else {
				console.log('File Downloaded')
			}
		})
	});
	
	app.get('/getdoc',function(req,res){
		const doc_ = req.query.doc;
		
		res.download(doc_, (err) => {
			if (err) {
				res.send(err);
				return
			} else {
				console.log('File Downloaded')
			}
		})	
	})
	
	app.get('/about',function(req,res){
		res.sendFile(path.join(__dirname+'/views/System/about.html'));
	})

	app.get('/contact',function(req,res){
		res.sendFile(path.join(__dirname+'/views/System/contact.html'));
	})

	app.get('/news',function(req,res){
		res.sendFile(path.join(__dirname+'/views/System/news.html'));
	})

	app.get('/course',function(req,res){
		const name = req.query.s_name;
		const date_registered = req.query.date_registered;
		const course = req.query.course;
		
		const context = {
			'name':name,
			'date_registered':date_registered,
			'course':course
		}
		console.log("Student "+ name +" "+date_registered + " "+ course);
		res.render('System/course',context);
	})

	app.get('/exam',function(req,res){
		res.render('System/exam');
	})
	
	app.post('/exam',function(req,res){
		const exam = req.body.exam;
		//Find Proper Exam and render the session.
		
		res.render('exam_session');
	})

	app.get('/register',function(req,res){
		res.sendFile(path.join(__dirname+'/views/System/register.html'));
	})

	app.post('/register', upload.fields([{'name':'qualification_docs'}]), function(req, res, next){
		
		const filePaths = [];
		const qualification_docs = req.files.qualification_docs;
		
		for (let i in qualification_docs){
			filePaths.push(qualification_docs[i].path)
		}
		 
		const new_student = {
			date_registered : new Date(),
			name :req.body.fname,
			s_name :req.body.s_name,
			contact_no : req.body.contact_no,
			email : req.body.email,
			id_no : req.body.id_no,
			password : req.body.password,
			confirm_pass : req.body.confirm_pass,
			highest_qualification : req.body.highest_qualification,
			course : req.body.course,
			course_duration : req.body.course_duration,
			documents : filePaths,
			role:'student'
		}		
		//Register Student.
		dbs.collection('users').insertOne(new_student)
		res.redirect('/login')
	})
	
	app.get('/signin',function(req,res){
		res.render('signin')
	})

	app.get('/learn',function(req,res){
		res.sendFile(path.join(__dirname+'/views/System/learn.html'));
	})

	app.get('/login',function(req,res){
		res.sendFile(path.join(__dirname+'/views/System/login.html'));
	})
	
	app.get('/reset',function(req,res){
		res.sendFile(path.join(__dirname+'/views/System/reset.html'));
	})
	
	app.post('/reset',urlencodedParser,function(req,res){
		const email_address = req.body.email;
		//console.log("Email: "+email_address);
		//Send email reset link with specific user details
		
		res.sendFile(path.join(__dirname+'/views/System/reset.html'));
	})

	app.post('/login',urlencodedParser,function(req,res){
		const email = req.body.email;
		const password = req.body.password;
		
		dbs.collection('users').find({email: email, password:password})
				.toArray((err,user)=>{
					if (err){
						console.log('User Not Found!');
						return;
					}else{
						if(user.length >= 1){
							for (var doc in user[0].documents){
								user[0].documents[doc] =  user[0].documents[doc].substr(28);
							}
							
							if (user[0].role == 'student'){
								res.render('System/student',{'student':user[0]})
							}else if (user[0].role == 'admin'){
								res.redirect('/admin?t=5ad5mc50ci9955e480f78b61fe8admin')
							}
						}else{
							res.redirect('/login')
						}
					}
		});
		

	})

	app.get('/events',function(req,res){
		res.render('events')
	})

	app.get('/student',function(req,res){
		if (req.query.t === 'stu5sd5tc50ci9955e480f78b61fe8ad'){
			res.render('System/student')
		}else{
			res.sendFile(path.join(__dirname+'/views/System/login.html'));
		}
		
	})

	return app;
}