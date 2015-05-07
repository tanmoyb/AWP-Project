
var saveQuestiontoDatabase=require('../node-models/saveQuestionToMongo');
module.exports.createNewQuestion=function  (req, res) {
	console.log(req.body.Question);
	var saveQuestion= new saveQuestiontoDatabase(req.body);
	saveQuestion.save(function(err, result){
		res.json(result);

	});
}

module.exports.getAll=function(req, res){
	saveQuestiontoDatabase.find({}, function(err,results){
				res.json(results);
			///consloe.log(results);
			
	}).sort({date:-1});
}
