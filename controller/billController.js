const asyncHandler = require("express-async-handler");
const billModel = require("../models/billModel");
const { get } = require("mongoose");


//ADD BILL API
const addBill = asyncHandler(async(req, res) => {
    const {amount,date,category} = req.body;
    if(!amount){
        res.status(400);
        throw new Error("Please enter the bill amount");
    }
    const bill = await billModel.create({
        user_id : req.user.id,
        amount,
        date,
        category
    });
    res.status(201).json({bill,message:"Bill added successfully ✅"});
});

//GET BILL API
const getBill = asyncHandler(async(req,res)=>{
    const bill =  await billModel.find({
        user_id : req.user.id
    });
    res.status(200).json({bill,message:"Bill retrieved successfully ✅"});
});

//UPDATE BILL API
const updateBill = asyncHandler(async(req,res)=>{
    const bill = await billModel.findById(req.params.id);
    if (!bill) {
        res.status(400);
        throw new Error("Bill not found ❌");
    }
    if (bill.user_id.toString() != req.user.id) {
        res.status(400);
        throw new Error("User does not have Authorization for this action ❌");
    }
    const updatewbill = await billModel.findByIdAndUpdate(
        req.params.id,
        req.body
    );
    res.status(200).json({bill,message : "Bill updated successfully ✅"});
});

//DELETE BILL API
const deleteBill = asyncHandler(async(req,res)=>{
    const bill  = await billModel.findById(req.params.id);
    if (!bill) {
        res.status(400);
        throw new Error("Bill not found ❌");
    }
    if (bill.user_id.toString() != req.user.id) {
        res.status(400);
        throw new Error("User does not have the Authorization for this action ❌");
    }
    await bill.deleteOne();
    res.json({bill,message : "Bill deleted successfully ✅"})
});

module.exports = {addBill,getBill,updateBill,deleteBill}