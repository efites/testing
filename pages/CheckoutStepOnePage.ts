import {Page, Locator} from '@playwright/test'

export class CheckoutStepOnePage {
	readonly page: Page
	readonly firstNameInput: Locator
	readonly lastNameInput: Locator
	readonly postalCodeInput: Locator
	readonly continueButton: Locator

	constructor(page: Page) {
		this.page = page
		this.firstNameInput = page.getByPlaceholder('First Name')
		this.lastNameInput = page.getByPlaceholder('Last Name')
		this.postalCodeInput = page.getByPlaceholder('Zip/Postal Code')
		this.continueButton = page.getByRole('button', {name: 'Continue'})
	}

	async fillInfo(firstName: string, lastName: string, postalCode: string) {
		await this.firstNameInput.fill(firstName)
		await this.lastNameInput.fill(lastName)
		await this.postalCodeInput.fill(postalCode)
	}

	async continue() {
		await this.continueButton.click()
	}
}
