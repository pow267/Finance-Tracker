function data2024(){
    const expenseCategories = ['Ăn uống', 'Đi lại', 'Tiền trọ'];
    const incomeCategories = ['Tiền lương', 'Dự án'];
        
    const results = [];

    for(let month = 1; month <= 2; month++){
        const daysInMonth = new Date(2024, month, 0).getDate();

        for(let day = 1; day <= daysInMonth; day++){
            const transactionsPerDay = Math.floor(Math.random() * 3) + 1;

            for(let i = 0; i < transactionsPerDay; i++){
                
                const date = `2024-${String(month).padStart(2, '0')}-${String(day).padStart(2,'0')}`;
                const type = Math.random() < 0.7 ? 'expense' : 'income';
                const category = type === 'expense'
                    ? expenseCategories[Math.floor(Math.random() * expenseCategories.length)]
                    : incomeCategories[Math.floor(Math.random() * incomeCategories.length)];
                    
                results.push({
                    date,
                    title: `Test ${date} ${i}`,
                    amount: Math.floor(Math.random() * 900000) + 10000,
                    category,
                    type
                });
            }
        }

    }
    return results;
}
module.exports = { data2024 };