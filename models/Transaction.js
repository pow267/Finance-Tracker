const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    type: { type: String, enum: ['income', 'expense'], required: true },
    date: { type: Date, default: Date.now }
});

const settingSchema = new mongoose.Schema({
    key: { type: String, default: 'budget_limit' },
    value: { type: Number, default: 10000000 }
});

const Transaction = mongoose.model('Transaction', transactionSchema);
const Setting = mongoose.model('Setting', settingSchema);

module.exports = { Transaction, Setting };