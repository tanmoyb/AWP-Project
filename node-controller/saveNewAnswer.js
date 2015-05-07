var saveAnswertoDatabase=require('../node-models/saveQuestionToMongo');
module.exports.addNewAnswer=function  (req, res) {
	console.log(req.body.Question + req.body.answer);
	//var saveAnswer= new saveAnswertoDatabase(req.body);
		saveAnswertoDatabase.findOneAndUpdate({ Question: req.body.Question }, {$push :{ Answers:{Answer:req.body.answer }}}, function(err, user) {
  			if (err) throw err;

  // we have the updated user returned to us
  			console.log(user);
  			//res.json({Answer:req.body.answer });
		});
	}
	//res.json({Question: req.body.Question});