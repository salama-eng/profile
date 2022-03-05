const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const social_shema=new Schema({
 
    social_title:{ type:String,required:true},
    social_value:{ type:String,required:true},
    img:{type:String}
});

const social=mongoose.model("social",social_shema);
module.exports=social;