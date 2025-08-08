const {defineConfig} = require('cypress');

const TIMEOUT = 10000

module.exports = defineConfig({
	e2e: {
		baseUrl: 'https://www.saucedemo.com',
		viewportWidth: 1280,
		viewportHeight: 720,
		video: true,
		screenshotOnRunFailure: true,
		defaultCommandTimeout: TIMEOUT,
		requestTimeout: TIMEOUT,
		responseTimeout: TIMEOUT,
		supportFile: 'cypress/support/e2e.js',
		setupNodeEvents(on, config) {
			// implement node event listeners here
		},
	},
});
