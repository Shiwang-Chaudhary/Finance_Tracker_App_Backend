const mongoose = require("mongoose");

const billSchema = mongoose.Schema({
    user_id:{
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "User"
    },
    category: {
        type: String,
        required: true
      },
    amount: {
        type: Number,
        required: [true, "Please enter the wallet amount"]
    },
    date : {
        type: String,
        required : true
    },
    
},
{
    timestamps: true
}); 


module.exports = mongoose.model("Bill",billSchema);