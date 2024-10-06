const express = require("express");
const connection = require("./config/db");
const dotenv = require("dotenv");
const userRouter = require("./routes/user.route");
dotenv.config()

const app = express();
const PORT = process.env.PORT || 8080;
app.use(express.json());
app.use("/api/auth", userRouter);


app.listen(PORT, async() =>{
    try{
        await connection;
        console.log(`Server is running on port:${PORT} && DB connected successfully!`)
    }catch(err){
        console.log(`Internal err or Err occured while connecting to DB ${err}`)
    }
})