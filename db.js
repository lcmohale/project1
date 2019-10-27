const MongoClient = require('mongodb').MongoClient;

const CON_URI = "mongodb+srv://lcmohale:abutimmino1@cluster0-nvb4e.mongodb.net/test?retryWrites=true&w=majority";


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


