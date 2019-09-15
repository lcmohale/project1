const express = require('express');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extended:true});
const path = require('path');

const app = express();
app.set('view engine','jade');
app.set('views', path.join(__dirname,'views'));

//Configure Middleware
//app.use(express.favicon(path.join(__dirname,'public/favicon.ico')))
app.use(express.static(path.join(__dirname,'public')));

app.get('/',function(req,res){
	res.sendFile(path.join(__dirname+'/views/System/index.html'));
})

app.get('/admin',function(req,res){
	if (req.query.t === '5ad5mc50ci9955e480f78b61fe8admin'){
		res.render('System/admin');
	}else if (req.query.students === 'registered'){
		res.render('System/students');
	}else if (req.query.exams === 'update'){
		res.render('System/exams');
	}else{
		res.sendFile(path.join(__dirname+'/views/System/login.html'));
	}
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
	res.render('System/course');
})

app.get('/exam',function(req,res){
	res.render('System/exam');
})

app.get('/register',function(req,res){
	res.sendFile(path.join(__dirname+'/views/System/register.html'));
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

app.post('/login',urlencodedParser,function(req,res){
	const email = req.body.email;
	const password = req.body.password
	
	if (email === 'admin@sisizathu' && password === 'admin'){
		res.redirect('/admin?t=5ad5mc50ci9955e480f78b61fe8admin')
	}
	if (email === 'student@sisizathu' && password === 'student'){
		res.redirect('/student?t=stu5sd5tc50ci9955e480f78b61fe8ad')
	}
	res.redirect('login')
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

const port = process.env.PORT || 3000;
app.listen(port,()=>{
	//console.log('Running on port'+ port)
});