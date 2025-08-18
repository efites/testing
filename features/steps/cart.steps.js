const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

async function ensureWorld() {
  if (!this.page && typeof this.init === 'function') {
    await this.init();
  }
}

Given('I am logged in as {string}', async function (username) {
  await ensureWorld.call(this);
  await this.page.goto('https://www.saucedemo.com/');
  await this.page.fill('#user-name', username);
  await this.page.fill('#password', 'secret_sauce');
  await this.page.click('#login-button');
  await expect(this.page).toHaveURL(/inventory\.html/);
});

When('I add the {string} to cart', async function (itemName) {
  await ensureWorld.call(this);
  const itemXPath = `//div[text()="${itemName}"]/ancestor::div[contains(@class,'inventory_item')]//button`;
  await this.page.click(itemXPath);
});

When('I remove the {string} from cart', async function (itemName) {
  await ensureWorld.call(this);
  const container = this.page.locator('.shopping_cart_link');
  await container.click();
  const itemXPath = `//div[text()="${itemName}"]/ancestor::div[contains(@class,'cart_item')]//button`;
  await this.page.click(itemXPath);
});

Then('the cart badge should show {string}', async function (count) {
  await ensureWorld.call(this);
  const badge = this.page.locator('.shopping_cart_badge');
  await expect(badge).toHaveText(count);
});

Then('the cart badge should be empty', async function () {
  await ensureWorld.call(this);
  const badge = this.page.locator('.shopping_cart_badge');
  await expect(badge).toHaveCount(0);
});

When('I proceed to checkout with:', async function (dataTable) {
  await ensureWorld.call(this);
  const data = dataTable.rowsHash();
  await this.page.locator('.shopping_cart_link').click();
  await this.page.locator('#checkout').click();
  await this.page.fill('#first-name', data['First Name']);
  await this.page.fill('#last-name', data['Last Name']);
  await this.page.fill('#postal-code', data['ZIP Code']);
  await this.page.click('#continue');
  await this.page.click('#finish');
});

Then('I should see order confirmation', async function () {
  await ensureWorld.call(this);
  await expect(this.page.locator('.complete-header_error')).toHaveText('Thank you for your order!');
});


