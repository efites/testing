import {Page, Locator} from '@playwright/test'

export class CheckoutStepTwoPage {
	readonly page: Page
	readonly summaryTitle: Locator
	readonly finishButton: Locator

	constructor(page: Page) {
		this.page = page
		this.summaryTitle = page.getByText('Checkout: Overview', {exact: true})
		this.finishButton = page.getByRole('button', {name: 'Finish'})
	}

	async finish() {
		await this.finishButton.click()
	}
}
