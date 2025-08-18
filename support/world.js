const {setWorldConstructor, setDefaultTimeout} = require('@cucumber/cucumber');
const {chromium} = require('playwright');

class CustomWorld {
	async init() {
		this.browser = await chromium.launch({headless: true});
		this.context = await this.browser.newContext();
		this.page = await this.context.newPage();
	}
}

setDefaultTimeout(60 * 1000);
setWorldConstructor(CustomWorld);


