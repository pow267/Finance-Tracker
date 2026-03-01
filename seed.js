const { Transaction } = require('./models/Transaction');

module.exports = async function seed() {
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
};