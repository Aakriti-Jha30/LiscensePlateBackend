import mongoose, { mongo } from "mongoose";

const vehicleSchema=new mongoose.Schema({

    licensePlate:{
        type:String,
        required:true,
        unique:true,
    },
    ownerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Owner",
    },

},{timestamps:true})

const Vehicle=mongoose.model("Vehicle",vehicleSchema);
export default Vehicle;


// vehicleType:{
//     type:String,
//     required:true,
// },
// model:{
//     type:String,
//     required:true,
// },