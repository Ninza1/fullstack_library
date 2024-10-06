const mongoose = require("mongoose");

const borrowingtSchema = new mongoose.Schema({
    book:{type:mongoose.Schema.Types.ObjectId, ref:"Book", required:true},
    member:{type:mongoose.Schema.Types.ObjectId, ref:"User", required:true},
    borrowDate:{type:Date, default: Date.now},
    returnDate:{type:Date},
    status:{type:String, enum:['Borrowed', 'Regurned'], default:"Borrowed"}
})