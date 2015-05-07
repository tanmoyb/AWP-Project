var saveUserToDatabase=require('../node-models/saveUserToMongo');
module.exports.addUser=function  (req, res) {
	console.log(req.body.Question);
	var saveUser= new saveUserToDatabase(req.body);
	saveUser.save(function(err, result){
		res.json(result);

	});
}