const MongoClient = require('mongodb').MongoClient;


const CON_URI = 'mongodb://sisizathu:v1N4VZ8QaoXez1hVmXC13GKUfEDMTMjhUZ2rzWubTHn1DsIGZsYpqWK6nZ3pxNwHaXORFyPuNOYcs8EOoS6VcQ==@sisizathu.documents.azure.com:10255/?ssl=true'; 
//"mongodb+srv://heroku_lwb31399:abutimmino1@ds23958.mlab.com:39858/heroku_lwb31399";



function connectToDB(url){
	return MongoClient.connect(url,{useNewUrlParser:true})
		.then(client =>{
			return	client.db('Sisizathu');
	})
}

module.exports = async function(){
	let database = await connectToDB(CON_URI);
	return database;
}


