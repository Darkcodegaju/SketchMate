import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import userRouter from "./routes/user.js"
import tourRouter from "./routes/tour.js";
import dotenv from "dotenv";



const port =  process.env.PORT || 5000;
// process.env.MONGODB_URL 
// const URL = "mongodb+srv://root:root@cluster0.ufex2xq.mongodb.net/?retryWrites=true&w=majority"
dotenv.config();


const app = express();
app.use(morgan("dev"));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.get('/',(req,res)=>
{
    res.send("hello express");
})
 
app.use("/users", userRouter); // http://localhost:5000/users/signu
app.use("/tour", tourRouter);


mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch((error) => console.log(`${error} did not connect`));