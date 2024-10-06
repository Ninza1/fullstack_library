const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{type:String, required:true},
    password:{type:String},
    role:{type:String, enum:["Admin", "Member"], default:"Member"},
    name:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    borroweBooks:{type:mongoose.Schema.Types.ObjectId, ref:"Book"}
})

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;
