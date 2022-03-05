const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const page_schema=new Schema({
    name:{ type:String},
   value:{ type:String},
   img:{ type:String}
   /* about_img:{ type:String},
    hello_img:{ type:String},
    conact_img:{ type:String},*/
    
});

const pagecontent=mongoose.model("page_content",page_schema);
module.exports=pagecontent;