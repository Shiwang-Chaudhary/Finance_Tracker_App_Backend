const asyncHandler = require("express-async-handler");
const Budget = require("../models/budgetModel");

const addBudget = asyncHandler(async(req,res)=>{
    const{budgetName,amount,month,note} = req.body;
    console.log(req.body)
    if (!budgetName||!amount||!month) {
        res.status(400);
        throw new Error("Please fill all budget fields (budgetName,amount, month, note) ⭐️");

    }
    const existingBudget = await Budget.findOne({ user_id: req.user.id, month });

  if (existingBudget) {
    res.status(400);
    throw new Error(`Budget already exists for ${month} ❌ but you can edit budget`);
  }
    const budget = await Budget.create({
        user_id : req.user.id,
        budgetName,
        amount,
        month,
        note
    });

    res.json({budget,message:"BUDGET added successfully ✅✅"});
});

const getBudget = asyncHandler(async(req,res)=>{
    const {month} = req.body;
    const budget = await Budget.find({user_id : req.user.id, month});
    if (!budget|| budget.length === 0) {
        res.status(400);
        throw new Error("Budget not found for this month");
    }else{
        res.json({budget,message:`BUDGET retreived for ${month} successfully ✅✅`});
    }

});

const getallBudget = asyncHandler(async(req,res)=>{
    
    const budget = await Budget.find({user_id : req.user.id });
   
    res.json({budget,message:`All BUDGET retreived successfully ✅✅`});

});

const updateBudget = asyncHandler(async(req,res)=>{
    const budget = await Budget.findById(req.params.id);
    if (!budget) {
        res.status(400);
        throw new Error("Budget does not exist ❌❌");
    }
    if (budget.user_id.toString() !== req.user.id) {
        res.status(401);
        throw new Error("Unauthorized.");
      }
    const updatedBudget = await Budget.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new : true}
    );
    res.json({updatedBudget,message:"BUDGET updated successfully ✅✅"});
});

const deleteBudget = asyncHandler(async(req,res)=>{
    const budget = await Budget.findById(req.params.id);
    if (!budget) {
        res.status(400);
        throw new Error("Budget does not exist ❌❌");
    }
    if (budget.user_id.toString() !== req.user.id) {
        res.status(401);
        throw new Error("Unauthorized.");
    }
    await budget.deleteOne();
    res.json({budget,message:"BUDGET deleted successfully ✅✅"});
});

module.exports = {addBudget,getBudget,getallBudget,updateBudget,deleteBudget};