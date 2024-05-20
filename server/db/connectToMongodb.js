

import mongoose from "mongoose";

const connectToMongodb = async () =>{

   try{
    await mongoose.connect("mongodb+srv://nesrinnoufal999:0GavWjFr5k4vyPQc@cluster0.nskq8hz.mongodb.net/chat-app-db? ");
    console.log("connected to mongoDB");
   }
   catch (error){
    console.log(" error connecting to mongodb",error.message)
   }
   
   
     
}   

export default connectToMongodb;

