const mongoose = require("mongoose");

const transactionSchema = mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "User"
    },
    amount:{
        type : Number,
        required : [true,"Please enter the amount"]
    },
    type : {
        type : String,
        enum: ["income", "expense"],
        required : [true,"Please select either income or expense"]
    },
    category: {
        type: String,
        required: true
      },
      date: {
        type: Date,
        default: Date.now
      },
      note: {
        type: String,
      },
},
{
    timestamps : true
}
);

module.exports = mongoose.model("Transactions",transactionSchema);