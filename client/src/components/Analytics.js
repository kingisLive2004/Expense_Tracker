import React from "react";
import { Progress } from "antd";

const Analytics = ({ allTransaction }) => {
  const categories = ["salary", "tip", "project", "food"];

  const totalTransactions = allTransaction.length;
  const incomeTransactions = allTransaction.filter((t) => t.type === "income");
  const expenseTransactions = allTransaction.filter((t) => t.type === "expense");

  const incomePercent = (incomeTransactions.length / totalTransactions) * 100;
  const expensePercent = (expenseTransactions.length / totalTransactions) * 100;

  const totalTurnover = allTransaction.reduce((acc, t) => acc + t.amount, 0);
  const incomeTurnover = incomeTransactions.reduce((acc, t) => acc + t.amount, 0);
  const expenseTurnover = expenseTransactions.reduce((acc, t) => acc + t.amount, 0);

  const incomeTurnoverPercent = (incomeTurnover / totalTurnover) * 100;
  const expenseTurnoverPercent = (expenseTurnover / totalTurnover) * 100;

  return (
    <>
      <div className="row m-3">
        {/* Transaction Count */}
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">Total Transactions: {totalTransactions}</div>
            <div className="card-body">
              <h5 className="text-success">Income: {incomeTransactions.length}</h5>
              <h5 className="text-danger">Expense: {expenseTransactions.length}</h5>
              <div>
                <Progress
                  type="circle"
                  strokeColor="green"
                  className="mx-2"
                  percent={incomePercent.toFixed(0)}
                />
                <Progress
                  type="circle"
                  strokeColor="red"
                  className="mx-2"
                  percent={expensePercent.toFixed(0)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Turnover */}
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">Total Turnover: ₹{totalTurnover}</div>
            <div className="card-body">
              <h5 className="text-success">Income: ₹{incomeTurnover}</h5>
              <h5 className="text-danger">Expense: ₹{expenseTurnover}</h5>
              <div>
                <Progress
                  type="circle"
                  strokeColor="green"
                  className="mx-2"
                  percent={incomeTurnoverPercent.toFixed(0)}
                />
                <Progress
                  type="circle"
                  strokeColor="red"
                  className="mx-2"
                  percent={expenseTurnoverPercent.toFixed(0)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category-wise Income */}
      <div className="row m-3">
        <div className="col-md-4">
          <h4>Category-wise Income</h4>
          {categories.map((category) => {
            const amount = allTransaction
              .filter(
                (transaction) =>
                  transaction.type === "income" &&
                  transaction.category === category
              )
              .reduce((acc, transaction) => acc + transaction.amount, 0);

            return (
              amount > 0 && (
                <div className="card mb-2" key={`income-${category}`}>
                  <div className="card-body">
                    <h5>{category}</h5>
                    <Progress
                      percent={((amount / incomeTurnover) * 100).toFixed(0)}
                      strokeColor="green"
                    />
                  </div>
                </div>
              )
            );
          })}
        </div>

        {/* Category-wise Expense */}
        <div className="col-md-4">
          <h4>Category-wise Expense</h4>
          {categories.map((category) => {
            const amount = allTransaction
              .filter(
                (transaction) =>
                  transaction.type === "expense" &&
                  transaction.category === category
              )
              .reduce((acc, transaction) => acc + transaction.amount, 0);

            return (
              amount > 0 && (
                <div className="card mb-2" key={`expense-${category}`}>
                  <div className="card-body">
                    <h5>{category}</h5>
                    <Progress
                      percent={((amount / expenseTurnover) * 100).toFixed(0)}
                      strokeColor="red"
                    />
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Analytics;
