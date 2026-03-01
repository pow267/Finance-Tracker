const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { Transaction, Setting } = require('./models/Transaction');

const app = express();
const PORT = 3000;

// =======================
// MONGO CONNECTION
// =======================
const MONGO_URL =
  process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/finance_demo';

mongoose.connect(MONGO_URL)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('Mongo Error:', err));

// =======================
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// =======================
// HOME
// =======================
app.get('/', async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ date: -1 });

    let budget = await Setting.findOne({ key: 'budget_limit' });
    if (!budget) {
      budget = await Setting.create({
        key: 'budget_limit',
        value: 10000000
      });
    }

    if (transactions.length === 0) {
      return res.render('index', {
        transactions: [],
        totalIncome: 0,
        totalExpense: 0,
        balance: 0,
        selectedYear: new Date().getFullYear(),
        budgetLimit: budget.value
      });
    }

    const latestYear = new Date(transactions[0].date).getFullYear();

    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach(t => {
      const year = new Date(t.date).getFullYear();
      if (year === latestYear) {
        if (t.type === 'income') totalIncome += t.amount;
        else totalExpense += t.amount;
      }
    });

    res.render('index', {
      transactions,
      totalIncome,
      totalExpense,
      balance: totalIncome - totalExpense,
      selectedYear: latestYear,
      budgetLimit: budget.value
    });

  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// =======================
app.post('/add', async (req, res) => {
  const { title, amount, category, type, date } = req.body;

  await Transaction.create({
    title,
    amount,
    category,
    type,
    date: date ? new Date(date) : new Date()
  });

  res.redirect('/');
});

app.post('/edit/:id', async (req, res) => {
  const { title, amount, category, type } = req.body;
  await Transaction.findByIdAndUpdate(req.params.id, {
    title,
    amount,
    category,
    type
  });
  res.redirect('/');
});

app.post('/delete/:id', async (req, res) => {
  await Transaction.findByIdAndDelete(req.params.id);
  res.redirect('/');
});

app.post('/update-budget', async (req, res) => {
  const { newLimit } = req.body;
  await Setting.findOneAndUpdate(
    { key: 'budget_limit' },
    { value: newLimit }
  );
  res.json({ success: true });
});

app.get('/api/chart-data', async (req, res) => {
  const data = await Transaction.find().sort({ date: 1 });
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`🚀 Server: http://localhost:${PORT}`);
});