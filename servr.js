const express = require('express');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extended:true});
const path = require('path');
const routes = require('./routes');
const ObjectId = require('mongodb').ObjectID;
const initDintsangDB = require('./db');

const app = express();
app.set('view engine','jade');
app.set('views', path.join(__dirname,'views'));

//Configure Middleware
//app.use(express.favicon(path.join(__dirname,'public/favicon.ico')))
app.use(express.static(path.join(__dirname,'public')));

initDintsangDB().then((dbs) =>{
	
	const app2 = routes(app,dbs)
	const serve = require('http').Server(app2);
	const port = process.env.PORT || 8080;
	
	serve.listen(port, function(){
		console.log('Express Server is listening on port: ' + port)
	})

}).catch(err =>{
	console.log('Failed to Connect To Database :' + err);
	process.exit(1);
});