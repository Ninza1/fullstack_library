const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
    name:{type:String, required:true},
    biography:String, 
    dob: {type:Date}, 
    nationality:String,
    books:[{type:mongoose.Schema.Types.ObjectId, ref:"Book"}]
})

const AuthorModel = mongoose.model("Author", authorSchema);
module.exports = AuthorModel;
