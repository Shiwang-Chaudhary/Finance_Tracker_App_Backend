const express = require("express");
const router = express.Router();
const { addBill, getBill, updateBill, deleteBill } = require("../controller/billController");
const validateToken = require("../middleware/validateToken");


router.use(validateToken);
router.post("/add", addBill);
router.post("/get", getBill);
router.post("/update/:id", updateBill);
router.post("/delete/:id", deleteBill);

module.exports = router;

