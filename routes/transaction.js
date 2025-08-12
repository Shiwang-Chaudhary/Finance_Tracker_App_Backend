const express = require("express");
const router = express.Router();
const {addTrans,getTrans,updateTrans,deleteTrans} = require("../controller/transactionController");
const validateToken = require("../middleware/validateToken");


router.use(validateToken);
router.post("/add",addTrans);
router.post("/get",getTrans);
router.post("/update/:id",updateTrans);
router.post("/delete/:id",deleteTrans);

module.exports = router;