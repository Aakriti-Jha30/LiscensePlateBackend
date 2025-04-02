import Violation from "../models/violation.model.js";


export const getViolations=async(req,res)=>{

    try{
        const violations=await Violation.find()
        .populate({
            path:"vehicleId",
            populate:{ path:"ownerId" }
        });

        res.status(200).json({
            message:"Violations retrieved successfully",
            violations,
        });

    }catch(error){
        console.log("Error fetching violations",error);
        return res.status(500).json({mesaage:"Internal Server Error"});
    }

}