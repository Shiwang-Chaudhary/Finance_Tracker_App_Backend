const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config(); 
const user = require("./routes/user");
const transaction = require("./routes/transaction");
const budget = require("./routes/budget");
const bill = require("./routes/bill");
const connectDB = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler")
const port = 4000;

connectDB();

app.use(cors());
app.use(express.json());
app.use("/api/users",user);
app.use("/api/transactions",transaction);
app.use("/api/budgets",budget);
app.use("/api/bills",bill);
app.use(errorHandler);

app.get("/", (req, res) => {
    res.send("</h1>Working</h1>");
});

app.listen(port,() => {
    console.log(`Server is running on port: ${port}`);
})