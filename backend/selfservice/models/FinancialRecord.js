const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  type: {
    type: String,
    enum: ["CHARGE", "PAYMENT", "ADJUSTMENT", "FINANCIAL_AID"],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["PENDING", "COMPLETED", "FAILED", "CANCELLED"],
    default: "PENDING",
  },
  paymentMethod: {
    type: String,
    enum: ["CREDIT_CARD", "BANK_TRANSFER", "CHECK", "CASH", "OTHER"],
    required: function () {
      return this.type === "PAYMENT";
    },
  },
  referenceNumber: String,
});

const financialAidSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["GRANT", "LOAN", "SCHOLARSHIP", "WORK_STUDY"],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  academicYear: {
    type: String,
    required: true,
  },
  term: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["PENDING", "APPROVED", "DISBURSED", "CANCELLED"],
    default: "PENDING",
  },
  disbursementDate: Date,
});

const FinancialRecordSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    balance: {
      type: Number,
      default: 0,
    },
    transactions: [transactionSchema],
    financialAid: [financialAidSchema],
    paymentPlan: {
      isEnrolled: {
        type: Boolean,
        default: false,
      },
      installmentAmount: Number,
      frequency: {
        type: String,
        enum: ["MONTHLY", "QUARTERLY", "SEMESTER"],
      },
      nextDueDate: Date,
      remainingInstallments: Number,
    },
    billingAddress: {
      street: String,
      city: String,
      state: String,
      postalCode: String,
      country: String,
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for common queries
FinancialRecordSchema.index({ studentId: 1 });
FinancialRecordSchema.index({ "transactions.date": -1 });
FinancialRecordSchema.index({ "financialAid.academicYear": 1 });

// Virtual for calculating total financial aid
FinancialRecordSchema.virtual("totalFinancialAid").get(function () {
  return this.financialAid.reduce((total, aid) => {
    return total + (aid.status === "DISBURSED" ? aid.amount : 0);
  }, 0);
});

// Method to add a new transaction
FinancialRecordSchema.methods.addTransaction = function (transactionData) {
  this.transactions.push(transactionData);
  this.balance +=
    transactionData.type === "CHARGE"
      ? transactionData.amount
      : -transactionData.amount;
  return this.save();
};

// Method to generate statement
FinancialRecordSchema.methods.generateStatement = function (
  startDate,
  endDate
) {
  return this.transactions.filter(
    (transaction) =>
      transaction.date >= startDate && transaction.date <= endDate
  );
};

const FinancialRecord = mongoose.model(
  "FinancialRecord",
  FinancialRecordSchema
);

module.exports = FinancialRecord;
