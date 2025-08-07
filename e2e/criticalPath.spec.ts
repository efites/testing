import {test, expect} from '@playwright/test'
import {LoginPage} from '../pages/LoginPage'
import {InventoryPage} from '../pages/InventoryPage'
import {BusketPage} from '../pages/BusketPage'
// import {CheckoutStepOnePage} from '../pages/CheckoutStepOnePage'
// import {CheckoutStepTwoPage} from '../pages/CheckoutStepTwoPage'
// import {CheckoutCompletePage} from '../pages/CheckoutCompletePage'


test('Login', async ({page}) => {
	const loginPage = new LoginPage(page)
	const inventoryPage = new InventoryPage(page);
	const busketPage = new BusketPage(page);

	await loginPage.goto()
	await loginPage.login('standard_user', 'secret_sauce')
	await expect(inventoryPage.title).toBeVisible()

	await inventoryPage.addItemToCart('Sauce Labs Backpack')

	await busketPage.openBusketPage()
	await expect(busketPage.busketTitle).toHaveText('Your Cart')

	// await checkoutStepOnePage.fillInfo('Ivan', 'Ivanov', '123456')
	// await checkoutStepOnePage.continue()

	// await expect(checkoutStepTwoPage.summaryTitle).toBeVisible()
	// await checkoutStepTwoPage.finish()

	// await expect(checkoutCompletePage.completeHeader).toHaveText('Thank you for your order!')
	// await expect(checkoutCompletePage.backHomeButton).toBeVisible()
})








/* test('Critical path: покупка товара', async ({page}) => {
	const loginPage = new LoginPage(page)
	const inventoryPage = new InventoryPage(page)
	const cartPage = new CartPage(page)
	const checkoutStepOnePage = new CheckoutStepOnePage(page)
	const checkoutStepTwoPage = new CheckoutStepTwoPage(page)
	const checkoutCompletePage = new CheckoutCompletePage(page)

	await loginPage.goto()
	await loginPage.login('standard_user', 'secret_sauce')
	await expect(inventoryPage.title).toBeVisible()

	await inventoryPage.addItemToCart('Sauce Labs Backpack')
	await inventoryPage.goToCart()

	await expect(cartPage.cartTitle).toBeVisible()
	await cartPage.checkout()

	await checkoutStepOnePage.fillInfo('Ivan', 'Ivanov', '123456')
	await checkoutStepOnePage.continue()

	await expect(checkoutStepTwoPage.summaryTitle).toBeVisible()
	await checkoutStepTwoPage.finish()

	await expect(checkoutCompletePage.completeHeader).toHaveText('Thank you for your order!')
	await expect(checkoutCompletePage.backHomeButton).toBeVisible()
}) */