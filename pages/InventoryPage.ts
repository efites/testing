import {Page, Locator} from '@playwright/test'

export class InventoryPage {
	readonly page: Page
	readonly title: Locator
	readonly cartButton: Locator

	constructor(page: Page) {
		this.page = page
		this.title = page.getByTestId('title')
		this.cartButton = page.getByRole('button', {name: /Add to cart/i})
	}

	async addItemToCart(itemName: string) {
		await this.page
			.getByText(itemName, {exact: true})
			.locator('../../..')
			.getByRole('button', {name: /Add to cart/i})
			.click()
	}

	async goToCart() {
		await this.cartButton.click()
	}
}
