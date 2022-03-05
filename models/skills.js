const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const skills_schema=new Schema({
 
    skill_title:{ type:String,required:true},
    img:{type:String}
});

const skills=mongoose.model("skill",skills_schema);
module.exports=skills;