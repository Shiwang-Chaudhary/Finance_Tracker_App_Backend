const asyncHandler = require("express-async-handler");
const Usermodel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//REGISTER API
const registerUser = asyncHandler(async(req,res,)=>{
    //make object for username,email and password
    console.log("Register API hit ✅");
    console.log(req.body);
    const {username,email,password} = req.body

    if (!username||!email||!password) {
        res.status(400);                       
        throw new Error("Please fill all the require attributes");
    }
    //CHECK IF USER ALREADY EXIST OR NOT
    const userAvailable = await Usermodel.findOne({email});
    if (userAvailable) {
        res.status(400);
        throw new Error("User already exist, Please login.");
    }
    // IF NOT, HASHED THE PASSWORD SO THAT IT CAN BE MORE SECURE
    const hashedPassword = await bcrypt.hash(password,10);
    console.log("Hashed Password",hashedPassword);
    //NOW CREATE THE USER WITH REQUIRED COMPONENTS
    const user = await Usermodel.create({
        username,
        email,
        password : hashedPassword
    });
    //CHECK WHTHER THE USER IF CREATED OR NOT, IF YES,
    if (user) {
        
        res.status(201).json({
            id : user.id,
            username : user.username,
            email : user.email
        });
    }else{
        res.status(400);
        throw new Error("Either email or password is incorrect");
    }
});


//LOGIN API
const loginUser = asyncHandler(async(req,res)=>{
    //make object for email and password
    const  {email,password} = req.body;
    if (!email||!password) {
        res.status(400);
        throw new Error("Please fill all the required attribute");
    }
    //find the user using email in database
    const user = await Usermodel.findOne({email});

    //const matchedPassword = await bcrypt.compare(password,user.password);--->
    //  we didnt use this because let say we put the wrong email then that (email that doesnt exit)'s password will be null, matchedpassword will try to access that null password and shows error, 
    // that why we put directly into the condition bracket, 
    // so even if user is null(email doesnt exist) then it will not even reached to && part
   
   
    //checks if user and password matches or not
    if (user && await bcrypt.compare(password,user.password)) {
        //create token for further use
        const token =  jwt.sign(
        {
            id : user.id
        },
        process.env.JWT_SECRET,
        {expiresIn : "7d"}
    );
    //pass token as response so that frotend can use it.
    console.log("CREATED TOKEN",token);
    res.status(200).json({Token:token,message:"Logged in successfully ✅",user});
    }else{
        res.status(400);
        throw new Error("Either email or password is incorrect");
    }
});

module.exports = {registerUser,loginUser};