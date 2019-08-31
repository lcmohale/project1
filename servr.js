const express = require('express');
const path = require('path');

const app = express();
app.set('view engine','jade');
app.set('views', path.join(__dirname,'views'));

//Configure Middleware
//app.use(express.favicon(path.join(__dirname,'public/favicon.ico')))
app.use(express.static(path.join(__dirname,'/public')));



app.get('/',function(req,res){
	res.render('index')
})

app.get('/about',function(req,res){
	res.render('about')
})

app.get('/contact',function(req,res){
	res.render('contact')
})

app.get('/register',function(req,res){
	res.render('register')
})

app.get('/signin',function(req,res){
	res.render('signin')
})

app.get('/learn',function(req,res){
	res.render('learn')
})

app.get('/events',function(req,res){
	res.render('events')
})

app.get('/user',function(req,res){
	res.render('user')
})



const port = process.env.PORT || 3000;
app.listen(port);
