var mongoose=require('mongoose');
var Schema = mongoose.Schema;
var blogSchema = new Schema({
	date:Date,
 	Question:String,
	Answers: [{ Answer: String}],
});

module.exports=mongoose.model('QAndA', blogSchema);