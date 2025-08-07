const {Builder, By, Key, until} = require('selenium-webdriver');
const path = require('path');

(async function registrationForm() {
	let driver = await new Builder().forBrowser('firefox').build();
	const SPEEP_TIME = 500

	try {
		// 1. Открыть страницу
		await driver.get('https://demoqa.com/automation-practice-form');
		await driver.sleep(SPEEP_TIME)

		// 2. Заполнить основные поля
		await driver.findElement(By.id('firstName')).sendKeys('Ivan');
		await driver.findElement(By.id('lastName')).sendKeys('Ivanov');
		await driver.findElement(By.id('userEmail')).sendKeys('ivan.ivanov@example.com');
		await driver.findElement(By.id('userNumber')).sendKeys('1234567890');
		await driver.findElement(By.css('label[for="gender-radio-2"]')).click(); // Мужской
		await driver.sleep(SPEEP_TIME)
		

		// 3. Дата рождения
		await driver.findElement(By.id('dateOfBirthInput')).click();
		await driver.findElement(By.className('react-datepicker__month-select')).sendKeys('October');
		await driver.findElement(By.className('react-datepicker__year-select')).sendKeys('1995');
		await driver.findElement(By.css('body')).sendKeys(Key.ESCAPE);
		await driver.sleep(SPEEP_TIME)

		// 4. Subjects (мультиселект)
		let subjectsInput = await driver.findElement(By.id('subjectsInput'));
		await subjectsInput.sendKeys('Maths', Key.ENTER);
		await subjectsInput.sendKeys('Arts', Key.ENTER);
		await driver.sleep(SPEEP_TIME)

		// 5. Hobbies (чекбоксы)
		await driver.findElement(By.css('label[for="hobbies-checkbox-1"]')).click(); // Sports
		await driver.sleep(SPEEP_TIME)
		await driver.findElement(By.css('label[for="hobbies-checkbox-3"]')).click(); // Music

		// 6. Загрузка аватара
		const filePath = path.resolve(__dirname, 'avatar.jpg'); // Убедитесь, что файл существует
		await driver.findElement(By.id('uploadPicture')).sendKeys(filePath);
		await driver.sleep(SPEEP_TIME)

		// 7. Адрес
		await driver.findElement(By.id('currentAddress')).sendKeys('г. Москва, ул. Пушкина, д. 1');
		await driver.findElement(By.id('state')).click();
		await driver.findElement(By.xpath("//div[contains(@id,'react-select-3-option-0')]")).click(); // NCR
		await driver.findElement(By.id('city')).click();
		await driver.findElement(By.xpath("//div[contains(@id,'react-select-4-option-0')]")).click(); // Delhi
		await driver.sleep(SPEEP_TIME)

		// 8. Переключиться в iframe с картой (если есть)
		// На demoqa.com карты нет, но если бы была:
		// await driver.switchTo().frame(driver.findElement(By.css('iframe')));
		// await driver.findElement(By.id('map'));

		// 9. Submit формы
		await driver.findElement(By.id('submit')).click();

		// 10. Проверка модального окна
		await driver.wait(until.elementLocated(By.id('example-modal-sizes-title-lg')), 5000);
		let modalTitle = await driver.findElement(By.id('example-modal-sizes-title-lg')).getText();
		if (modalTitle !== 'Thanks for submitting the form') throw new Error('Modal title mismatch');

		// Проверка Student Name
		let studentName = await driver.findElement(By.xpath("//td[text()='Student Name']/following-sibling::td")).getText();
		if (studentName !== 'Ivan Ivanov') throw new Error('Student Name mismatch');

		console.log('Тест успешно выполнен!');
	} finally {
		// await driver.quit();
	}
})();