const asyncHandler = require("express-async-handler");
const TransModel = require("../models/transactionModel");

const addTrans = asyncHandler(async (req, res) => {
    const { amount, type, category, date, note } = req.body;
    if (!amount || !type || !category || !date) {
        res.status(400);
        throw new Error("Please fill all transaction fields (amount, type, category, date, note)");

    }
    const transaction = await TransModel.create({
        user_id: req.user.id,
        amount,
        type,
        category,
        date,
        note
    });
    res.status(201).json({ transaction, message: "Transaction added successfully ✅" });

});

const getTrans = asyncHandler(async (req, res) => {
    const transaction = await TransModel.find({
        user_id: req.user.id
    });
    res.status(200).json({ transaction, message: "Transactions retrived successfully ✅" });

});

const updateTrans = asyncHandler(async (req, res) => {
    const transaction = await TransModel.findById(req.params.id)
    if (!transaction) {
        req.status(400);
        throw new Error("transaction not found ❌");
    }
    if (transaction.user_id.toString() != req.user.id) {
        res.status(400);
        throw new Error("User don't have permission to update other user transactions")
    }
    const updateTrans = await TransModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
    res.status(200).json({ transaction, message: "Transactions updated successfully " })
});

const deleteTrans = asyncHandler(async (req, res) => {
    const transaction = await TransModel.findById(req.params.id);
    if (!transaction) {
        res.status(400);
        throw new Error("Transaction not found ❌");
    }
    if (transaction.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("You don't have permission to delete this transaction ❌");
    }

    await transaction.deleteOne();
    res.json({ transaction, message: "Transaction deleted successfully ✅" })
});

module.exports = { addTrans, getTrans, updateTrans, deleteTrans };