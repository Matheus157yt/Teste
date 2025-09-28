const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({name:{type:String,required:true},email:{type:String,required:true,unique:true},password:{type:String,required:true},phone:String,cpf:String,avatar:String,progress:[{courseId:{type:mongoose.Schema.Types.ObjectId,ref:'Course'},moduleIndex:{type:Number,default:0},updatedAt:{type:Date,default:Date.now}}]}, {timestamps:true});
module.exports = mongoose.model('User', UserSchema);
