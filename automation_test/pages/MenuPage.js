class MenuPage{
    constructor(page){
        this.page = page;

        this.form = page.locator('form[action="/add"]');

        this.dateIn = page.locator('#dateIn');
        this.textIn = page.locator('input[placeholder="Nội dung..."]');
        this.amountIn = page.locator('input[placeholder="Số tiền"]');
        this.categorySelect = this.form.locator('select[name="category"]');
        this.typeSelect = this.form.locator('select[name="type"]');
        this.saveButton = page.getByRole('button', { name: 'GHI LẠI'});
        this.expTrend = page.locator('#expTrend');
    }

    async goto(){
        await this.page.goto("/");
    }

    async fill(data){
        await this.dateIn.fill(data.date);
        await this.textIn.fill(data.title)
        await this.amountIn.fill(String(data.amount));
        await this.categorySelect.selectOption({ label: data.category });
        await this.typeSelect.selectOption(data.type);
    }

    async save(){
        await this.saveButton.click();
        await this.page.waitForLoadState('networkidle');
    }
}
module.exports = { MenuPage };