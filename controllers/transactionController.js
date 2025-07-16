const transactionModel = require("../models/transactionModel");
const moment = require("moment");

// Get all transactions
const getAllTransactions = async (req, res) => {
  try {
    const { frequency, selectedDate, type, userid } = req.body;

    const transactions = await transactionModel.find({
      userid,
      ...(type !== "all" && { type }),
      ...(frequency !== "custom"
        ? {
            date: {
              $gt: moment().subtract(Number(frequency), "d").toDate(),
            },
          }
        : {
            date: {
              $gte: new Date(selectedDate[0]),
              $lte: new Date(selectedDate[1]),
            },
          }),
    });

    res.status(200).json(transactions);
  } catch (error) {
    console.log("getAllTransactions error:", error);
    res.status(500).json(error);
  }
};

// Add transaction
const addTransaction = async (req, res) => {
  try {
    const newTransaction = new transactionModel(req.body);
    await newTransaction.save();
    res.status(201).send("Transaction created");
  } catch (error) {
    console.log("addTransaction error:", error);
    res.status(500).json(error);
  }
};

// Edit transaction
const editTransaction = async (req, res) => {
  try {
    await transactionModel.findByIdAndUpdate(
      req.body.transactionId,
      req.body.payload
    );
    res.status(200).send("Edit successfully");
  } catch (error) {
    console.log("editTransaction error:", error);
    res.status(500).json(error);
  }
};

// ✅ Corrected delete transaction
const deleteTransaction = async (req, res) => {
  try {
    await transactionModel.findByIdAndDelete(req.body.transactionId);
    res.status(200).send("Transaction deleted successfully");
  } catch (error) {
    console.log("deleteTransaction error:", error);
    res.status(500).json(error);
  }
};

module.exports = {
  getAllTransactions,
  addTransaction,
  editTransaction,
  deleteTransaction,
};
