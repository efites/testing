import {Page, Locator} from '@playwright/test'

export class BusketPage {
	readonly page: Page
	readonly busketButton: Locator
	readonly busketTitle: Locator

	constructor(page: Page) {
		this.page = page
		this.busketButton = page.getByTestId('shopping-cart-link')
		this.busketTitle = page.getByTestId('title')
	}

	async openBusketPage() {
		this.busketButton.click()
	}
}
