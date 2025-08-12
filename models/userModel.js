const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required : [true,"Please enter the username"]
    },
    email : {
        type:String,
        required : [true,"Please enther the email address"]
    },
    password : {
        type:String,
        required : [true,"Please enther the email address"]
    }
},{
    timestamps : true
}
);

module.exports = mongoose.model("User",userSchema);