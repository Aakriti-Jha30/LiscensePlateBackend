import mongoose from "mongoose";

const ownerSchema=new mongoose.Schema({

    name:{
        type:String,
        required:true,
    },
    phoneNumber:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },

},{timestamps:true});

const Owner=mongoose.model("Owner",ownerSchema);
export default Owner;
