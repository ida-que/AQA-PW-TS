// Task 2. Develop a test with the following steps:
// 1. Go to https://anatoly-karpovich.github.io/demo-shopping-cart/
// 2. Add products 2, 4, 6, 8, 10 to the cart
// 3. Validate the badge with the amount of products added
// 4. Open checkout
// 5. Validate all the products and total amount
// 6. Add all 7 promocodes
// 7. Validate the total amount after redeeming promocodes
// 6. Checkout the cart
// 7. Validate the total amount one more time


// Promo codes found on the page:

// JAVA-FOR-BOOMERS 7%
// NO-PYTHON 8%
// HOT-COURSE 10%
// 5-PERCENT-FOR-UTILS 5%
// 15-PERCENT-FOR-CSS 15% 
// HelloThere 20%
// 10-PERCENT-FOR-REDEEM 10%

import { test, expect, Page } from '@playwright/test';

const promocodes = [
    { 
        name: 'JAVA-FOR-BOOMERS',
        discount: 7 
    },
    { 
        name: 'NO-PYTHON',
        discount: 8 
    },
    { 
        name: 'HOT-COURSE',
        discount: 10 
    },
    { 
        name: '5-PERCENT-FOR-UTILS',
        discount: 5 
    },
    { 
        name: '15-PERCENT-FOR-CSS',
        discount: 15 
    },
    { 
        name: 'HelloThere',
        discount: 20 
    },
    { 
        name: '10-PERCENT-FOR-REDEEM',
        discount: 10
    },
];


test.describe('[UI] [Demo Shopping Cart] [Checkout E2E]', () => {
    test('Successful checkout with 5 products and all promocodes', async ({ page }) => {
        await page.goto('https://anatoly-karpovich.github.io/demo-shopping-cart/');
        // Add products
        const products = ['Product 2', 'Product 4', 'Product 6', 'Product 8', 'Product 10'];
        for (const product of products) {
            await getAddToCartButton(product, page).click();
        }
        const [price2, price4, price6, price8, price10] = await Promise.all([
            getProductPrice('Product 2', page),
            getProductPrice('Product 4', page),
            getProductPrice('Product 6', page),
            getProductPrice('Product 8', page),
            getProductPrice('Product 10', page),
        ]);
        // Validate the badge
        await expect(page.locator('#badge-number')).toHaveText(`${products.length}`);
        // Open checkout
        await page.getByRole('button', { name: 'Shopping cart' }).click();
        await expect (page.getByRole('heading', { name: 'Your cart' })).toBeVisible();
        // Validate all the products in the cart
        await Promise.all([
            expect (page.getByText('Product 2')).toBeVisible(),
            expect (page.getByText('Product 4')).toBeVisible(),
            expect (page.getByText('Product 6')).toBeVisible(),
            expect (page.getByText('Product 8')).toBeVisible(),
            expect (page.getByText('Product 10')).toBeVisible(),
        ]);
        // Validate the total price in the cart
        const totalPriceWithoutPromocodes = price2 + price4 + price6 + price8 + price10;
        await expect(page.locator('#total-price')).toHaveText(`$${totalPriceWithoutPromocodes}.00`);
        // Add promocodes
            for (const promocode of promocodes) {
                await fillPromocode(promocode.name, page);
              }
        // Validate the total price after redeeming promocodes
        const totalPriceWithPromocodes = getTotalPriceWithPromocodes(totalPriceWithoutPromocodes, promocodes);
        await expect(page.locator('#total-price')).toHaveText(`$${totalPriceWithPromocodes.toFixed(2)} (-$${(totalPriceWithoutPromocodes - totalPriceWithPromocodes).toFixed(1)})` );
        // Checkout the cart
        await page.getByRole('button', { name: 'Checkout' }).click();
        // Validate the total price one more time
        await expect(page.locator('.text-muted')).toHaveText(`$${totalPriceWithPromocodes.toFixed(2)}` );
    });
});

function getAddToCartButton(productName: string, page: Page) {
    return page
    .locator('div.card-body')
    .filter({
        has: page.getByText(productName, { exact: true }),
    })
    .getByRole('button', { name: 'Add to card' });
}

function getProductPriceSpan(productName: string, page: Page) {
    return page
    .locator('div.card-body')
    .filter({
        has: page.getByText(productName, { exact: true }),
    })
    .locator('span');
}

async function getProductPrice(productName: string, page: Page): Promise<number> {
    const productPriceSpan = getProductPriceSpan(productName, page);
    const priceText = await productPriceSpan.innerText();
    const price = priceText.replace('$', '');
    return +price;
}

function getTotalPriceWithPromocodes(totalPriceWithoutPromocodes: number, promocodes: {name: string, discount: number}[]): number {
    const totalDiscount = promocodes.reduce((acc, promocode) => {
        const discountAmt = totalPriceWithoutPromocodes * promocode.discount / 100;
        return acc + discountAmt;
    }, 0);
    const totalPriceWithPromocodes = totalPriceWithoutPromocodes - totalDiscount;
    return +totalPriceWithPromocodes.toFixed(2);
}

async function fillPromocode(promocodeName: string, page: Page) {
    await page.getByPlaceholder('Promo code').fill(promocodeName);
    await page.getByRole('button', { name: 'Redeem' }).click();
    await page.locator('#spinner-border').waitFor({ state: 'hidden'});
    await page.waitForTimeout(3000);
    }




