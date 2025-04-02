import 'dotenv/config'
import express from "express"
import cors from "cors";
import connecttoDb from "./database/connectMongodb.js";
import violationRoute  from "./routes/violation.route.js"




const app=express();

const port=process.env.PORT||5000;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true })); 



app.use("/api/violation",violationRoute);



const startServer=async()=>{
   try{
      await connecttoDb();
      app.listen(port,()=>{
         console.log("App has started listening on port",port);
      });
   }catch(error){
     console.log("Some error occured while trying to connect to database",error);
   }
}

startServer();



// console.log("Cloudinary Config Check:", process.env.CLOUDINARY_CLOUD_NAMEE);