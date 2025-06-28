require("dotenv").config();
const express= require('express'); // this is the express module
const app=express();
const connectToDB=require("./database/db");
const userRoutes=require("./routes/user-routes"); // importing the user routes
const cors = require('cors'); // this is used to enable CORS in the application
app.use(cors()); // enabling CORS for all routes


const port=process.env.PORT || 3000;


connectToDB(); // calling the connectToDB function to connect to the database



app.use(express.json()); // this is used to parse the json data from the request body
app.use("/api/auth", userRoutes); // using the user routes for the /api/users endpoint



app.listen(port, ()=>{
    console.log(" server is running in the port",port) //THIS IS THE PORT WHERE THE SERVER IS RUNNING

})







// app.get('/',(req,res)=>{
// res.send("home pagev")
// })
