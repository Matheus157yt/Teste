const mongoose = require('mongoose');
const ModuleSchema = new mongoose.Schema({title:String,content:String});
const CourseSchema = new mongoose.Schema({title:{type:String,required:true},description:String,cover:String,modules:[ModuleSchema]}, {timestamps:true});
module.exports = mongoose.model('Course', CourseSchema);
