const mongoose = require('mongoose');
const { Transaction } = require('./models/Transaction');

const MONGO_URL =
  process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/finance_demo';

mongoose.connect(MONGO_URL)
  .then(() => console.log('✅ MongoDB connected (seed)'))
  .catch(err => console.error(err));

async function seed() {
  await Transaction.deleteMany({});
  const data = [];

  [2025, 2026].forEach(year => {
    for (let month = 0; month < 12; month++) {
      data.push({
        title: `Lương tháng ${month + 1}/${year}`,
        amount: 15000000 + Math.floor(Math.random() * 5000000),
        category: 'Tiền lương',
        type: 'income',
        date: new Date(year, month, 5)
      });

      data.push({
        title: `Tiền nhà tháng ${month + 1}`,
        amount: 3500000,
        category: 'Tiền trọ',
        type: 'expense',
        date: new Date(year, month, 10)
      });

      data.push({
        title: `Ăn uống & sinh hoạt`,
        amount: 4000000 + Math.floor(Math.random() * 2000000),
        category: 'Ăn uống',
        type: 'expense',
        date: new Date(year, month, 20)
      });
    }
  });

  await Transaction.insertMany(data);
  console.log('✅ Đã nạp dữ liệu mẫu 24 tháng (2025-2026)!');
  process.exit();
}

seed();