const express = require('express');
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

app.get('/about',function(req,res){
	res.sendFile(path.join(__dirname+'/views/System/about.html'));
})

app.get('/contact',function(req,res){
	res.sendFile(path.join(__dirname+'/views/System/contact.html'));
})

app.get('/news',function(req,res){
	res.sendFile(path.join(__dirname+'/views/System/news.html'));
})

app.get('/courses',function(req,res){
	res.sendFile(path.join(__dirname+'/views/System/courses.html'));
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

app.get('/events',function(req,res){
	res.render('events')
})

app.get('/user',function(req,res){
	res.render('user')
})


const port = process.env.PORT || 3000;
app.listen(port);