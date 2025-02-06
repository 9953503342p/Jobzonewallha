const mongoose = require('mongoose');

// Define the schema for ResumeHeadline
const postCourseScheme = new mongoose.Schema({
    coursetitle:{type:String,required:true},
    courseprice:{type:String,required:true},
    courseduration:{type:String,required:true},
    courseimage:{type:String,required:true},
    coursedescription:{type:String,required:true},
    courseseat:{type:String,required:true},
    placementprice:{type:String,required:true},
}, { timestamps: true });

const PostCourses = mongoose.model('Courses', postCourseScheme);

module.exports = PostCourses;
