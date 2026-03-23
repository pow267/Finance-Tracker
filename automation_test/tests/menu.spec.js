const { test, expect } = require('@playwright/test');
const { MenuPage } = require('../pages/MenuPage');
const { data2024 } = require('../data/data');
const { connectDB } = require('../utils/db');

test.describe('Kiểm tra menu ghi nhận', () => {
    
    test('TC01 - Điền dữ liệu vào menu và ghi nhận lại', async ({page}) => {
        const menuPage = new MenuPage(page);
        const dataList = data2024().slice(0, 10);
        
        await menuPage.goto();

        for(const data of dataList){
            await menuPage.fill(data);
            await menuPage.save();
        }

        await expect(menuPage.expTrend).toBeVisible();

        const db = await connectDB();

        for(const data of dataList){
            const record = await db.collection("transactions").findOne({
                title: data.title,
                
            });

            expect(record).toBeTruthy();
        }

    });
});