const express = require("express");
const router = express.Router();
const {addBudget,getBudget,getallBudget,updateBudget,deleteBudget} = require("../controller/budgetController");
const { get } = require("mongoose");
const validateToken = require("../middleware/validateToken");

router.use(validateToken);
router.post("/add",addBudget);
router.post("/get",getBudget);
router.post("/getall",getallBudget);
router.post("/update/:id",updateBudget);
router.post("/delete/:id",deleteBudget);

module.exports = router;