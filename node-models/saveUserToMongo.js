var mongoose=require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new Schema({
	userName:String,
	password:String,
	fname:String,
	lname:String,
	email:String

});

module.exports=mongoose.model('Users', userSchema);