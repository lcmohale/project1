const MongoClient = require('mongodb').MongoClient;

const CON_URI = process.env.DB_CONNECT;


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


