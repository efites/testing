import {Page, Locator} from '@playwright/test'

export class CheckoutCompletePage {
	readonly page: Page
	readonly completeHeader: Locator
	readonly backHomeButton: Locator

	constructor(page: Page) {
		this.page = page
		this.completeHeader = page.getByText('Thank you for your order!', {exact: true})
		this.backHomeButton = page.getByRole('button', {name: 'Back Home'})
	}
}
