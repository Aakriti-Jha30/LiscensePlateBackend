import mongoose from "mongoose";

const connecttoDb=async ()=>{

    try{
        const connectionInstance=await mongoose.connect(process.env.MONGO_DB_URI);
        console.log(`Connected to mongodb at host ${connectionInstance.connection.name}`)

    }catch(error){
        console.log("Error connecting to the database",error);

    }

}

export default connecttoDb;