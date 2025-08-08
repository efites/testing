class LoginPage {
	constructor() {
		this.usernameInput = '#user-name';
		this.passwordInput = '#password';
		this.loginButton = '#login-button';
		this.errorMessage = '[data-test="error"]';
	}

	visit() {
		cy.visit('https://www.saucedemo.com/');
	}

	login(username, password) {
		cy.get(this.usernameInput).type(username);
		cy.get(this.passwordInput).type(password);
		cy.get(this.loginButton).click();
	}

	getErrorMessage() {
		return cy.get(this.errorMessage);
	}
}

export default LoginPage;
