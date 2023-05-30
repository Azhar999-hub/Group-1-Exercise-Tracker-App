import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config();


const conncectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI,{
      useNewUrlParser:true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log("Database connection successful");
    })
    .catch(() => {
      console.log("Error while connecting");
    });
};

export default conncectDB;
