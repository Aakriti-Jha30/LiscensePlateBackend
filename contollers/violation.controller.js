import Owner from "../models/owner.model.js"
import Violation from "../models/violation.model.js"
import Vehicle from "../models/vehicle.model.js"

import { uploadOnCloudinary } from "../utils/cloudinary.js";

//Random functions for owner information

const dummyNames=[
    "Aakriti Arora","Aakriti Jha","Madhur Mishra","Anmol Jaiswal","Tanishq Singh","Ananya Singh", "Rahul Sharma", "Priya Verma", "Amit Khanna", "Neha Joshi",
    "Rohan Mehta", "Simran Kaur", "Aditya Rao", "Pooja Patel", "Vikram Nair","Adnan Kaur","Simran Kaur","Vicky Patel","James Doe","Johnny Kapoor"
];

const dummyAddresses = [
    "Bandra, Mumbai", "Salt Lake, Kolkata", "Connaught Place, Delhi", 
    "Indiranagar, Bangalore", "Banjara Hills, Hyderabad", 
    "Sector 17, Chandigarh", "Koregaon Park, Pune", "Anna Nagar, Chennai",
    "Dwarka Selhi","Panchkula Secotr 13","Patel Nagar","Sarojini Nagar, Delhi"
];

//generate a dummy owner and send it

const generateDummyOwner=()=>{
    return{
        name:dummyNames[Math.floor(Math.random() * dummyNames.length)],
        phoneNumber: `+91${Math.floor(100000000 + Math.random() * 900000000)}`, 
        address:dummyAddresses[Math.floor(Math.random() * dummyAddresses.length)],
    }
}

export const  storeViolation=async (req,res)=>{
    try{
    const {licensePlate, violationType}=req.body;

    if(!licensePlate || !violationType){
       return res.status(400).json({message:"Liscense Plate and Violation Type required"})
    }



    let vehicle=await Vehicle.findOne({licensePlate}).populate("ownerId");
    //vehicle details aagyi

    //First entry
    if(!vehicle){
        const dummyOwner=new Owner(generateDummyOwner());
        if (!dummyOwner) {
            return res.status(500).json({ message: "Could not create dummy owner" });
        }
        

        await dummyOwner.save().catch((err)=>{
            console.log("Error saving the dummy owner");
            return res.status(500).json({message:"Error saving dummy Owner"});
        })

        vehicle=new Vehicle({
            licensePlate,
            ownerId:dummyOwner._id,
        })
        
        await vehicle.save();

    }
    //Now I have registered the vehicle

    //Uploading files

    console.log("Uploaded files",req.files);
    const violationImagePath=req.files?.violationImage?.[0]?.path;

    if(!violationImagePath){
        return res.status(400).json({message:"Error uploading file on multer"});
    }

    const violationUrl=await uploadOnCloudinary(violationImagePath);

    if(!violationUrl){
        return res.status(400).json({message:"Error uploading file on cloudinary"});
    }


    //New entry for violation
    const fineAmt={
        "Signal-Jumping":500,
        "Over-Speeding":1000,
        "Overloading Vehicle":600,
        "No Helmet":800,
    }

    const fine=fineAmt[violationType]||500;

    const violation=new Violation({
        vehicleId:vehicle._id,
        violationType,
        fineAmount:fine, //dummy 
        violationImage:violationUrl.url,//to be handled later
    });

    await violation.save();

    res.status(200).json(
        {
            message:"Violation recorded successfully!",
            violation,
        }
    )
}catch(error){
    console.log("Error posting the violation",error);
    return res.status(500).json("Internal server error");

}
}

