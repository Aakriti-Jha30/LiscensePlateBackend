import mongoose from "mongoose";

const violationSchema=new mongoose.Schema({

    vehicleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vehicle", // Reference to Vehicle
        index: true,
    },
    violationType:{
        type:String,
        required:true,
    },
    fineAmount:{
        type:Number,
        required:true,
    },
    violationImage:{
        type:String,

    },
    //timestamp
    //location


},{timestamps:true})

const Violation=mongoose.model("Violation",violationSchema);
export default Violation;