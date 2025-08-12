const mongoose = require("mongoose");

const budgetSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    
    budgetName: {
        type: String,
        required: true
    },

    amount: {
        type: Number,
        required: true
    },

    month: {
        type: String,
        enum: [
            "January", "February", "March", "April",
            "May", "June", "July", "August",
            "September", "October", "November", "December"
        ],
        required: true
    },
    note: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Budget", budgetSchema);
