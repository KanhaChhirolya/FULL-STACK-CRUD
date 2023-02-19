const mongoose=require("mongoose");
const noteschema=mongoose.Schema({
    title:String,
    content:String,
    author:String 
},{
    versionKey:false
})
const notemodel=mongoose.model("note",noteschema);
module.exports={
    notemodel
}