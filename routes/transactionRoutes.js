const express = require("express");
const {
  addTransaction,
  getAllTransactions,
  editTransaction,
  deleteTransaction,
} = require("../controllers/transactionController");

//router object
const router = express.Router();

//routes
//add transaction  POST method
router.post("/add-transaction", addTransaction);
//edit transaction  POST method
router.post("/edit-transaction", editTransaction);
//delete transaction  POST method
router.post("/delete-transaction", deleteTransaction);

//get Transaction
router.post("/get-transaction", getAllTransactions);

module.exports = router;
