import LoginPage from '../pages/LoginPage.js';
import InventoryPage from '../pages/InventoryPage.js';

describe('Сценарий 2: Тестирование корзины с сохранением состояния', () => {
    const loginPage = new LoginPage();
    const inventoryPage = new InventoryPage();

    beforeEach(() => {
        // Очищаем localStorage перед каждым тестом
        cy.clearLocalStorage();
    });

    it('Должен добавить товары в корзину, сохранить состояние и проверить после перезагрузки', () => {
        // Шаг 1: Авторизация
        loginPage.visit();
        loginPage.login('standard_user', 'secret_sauce');

        // Ждем загрузки товаров
        cy.waitForProductsToLoad();
        inventoryPage.waitForProductsToLoad();

        // Шаг 2: Добавляем 2 товара в корзину
        inventoryPage.addProductToCart(0); // Первый товар
        cy.verifyCartItemCount(1);

        inventoryPage.addProductToCart(1); // Второй товар
        cy.verifyCartItemCount(2);

        // Проверяем, что кнопки изменились на "Remove"
        cy.get('[data-test="remove-sauce-labs-backpack"]').should('be.visible');
        cy.get('[data-test="remove-sauce-labs-bike-light"]').should('be.visible');

        // Шаг 3: Сохраняем состояние корзины в localStorage
        inventoryPage.saveCartState();

        // Проверяем, что состояние сохранено в localStorage
        cy.getLocalStorage('cart-contents').then((cartState) => {
            expect(cartState).to.not.be.null;
            expect(cartState).to.not.be.undefined;
        });

        // Шаг 4: Перезагружаем страницу
        cy.reloadPage();

        // Ждем загрузки страницы после перезагрузки
        cy.url().should('include', '/inventory.html');
        inventoryPage.waitForProductsToLoad();

        // Шаг 5: Проверяем, что товары остались в корзине
        cy.verifyCartItemCount(2);

        // Проверяем, что кнопки остались в состоянии "Remove"
        cy.get('[data-test="remove-sauce-labs-backpack"]').should('be.visible');
        cy.get('[data-test="remove-sauce-labs-bike-light"]').should('be.visible');

        // Проверяем состояние localStorage после перезагрузки
        inventoryPage.verifyCartState();
    });

    it('Должен проверить сохранение состояния корзины при перезагрузке', () => {
        // Авторизация
        loginPage.visit();
        loginPage.login('standard_user', 'secret_sauce');

        // Ждем загрузки товаров
        cy.waitForProductsToLoad();
        inventoryPage.waitForProductsToLoad();

        // Добавляем товары в корзину
        inventoryPage.addProductToCart(0);
        inventoryPage.addProductToCart(2);

        // Получаем имена добавленных товаров
        let firstProductName, thirdProductName;
        inventoryPage.getProductNames().eq(0).then(($name) => {
            firstProductName = $name.text();
        });
        inventoryPage.getProductNames().eq(2).then(($name) => {
            thirdProductName = $name.text();
        });

        // Сохраняем состояние корзины
        inventoryPage.saveCartState();

        // Перезагружаем страницу
        cy.reloadPage();

        // Ждем загрузки страницы
        cy.url().should('include', '/inventory.html');
        inventoryPage.waitForProductsToLoad();

        // Проверяем, что товары остались в корзине
        cy.verifyCartItemCount(2);

        // Проверяем, что правильные товары остались в корзине
        cy.get('[data-test="remove-sauce-labs-backpack"]').should('be.visible');
        cy.get('[data-test="remove-sauce-labs-bolt-t-shirt"]').should('be.visible');

        // Проверяем состояние localStorage
        inventoryPage.verifyCartState();
    });

    it('Должен проверить возможность удаления товаров из корзины после перезагрузки', () => {
        // Авторизация
        loginPage.visit();
        loginPage.login('standard_user', 'secret_sauce');

        // Ждем загрузки товаров
        cy.waitForProductsToLoad();
        inventoryPage.waitForProductsToLoad();

        // Добавляем товары в корзину
        inventoryPage.addProductToCart(0);
        inventoryPage.addProductToCart(1);

        // Перезагружаем страницу
        cy.reloadPage();

        // Ждем загрузки страницы
        cy.url().should('include', '/inventory.html');
        inventoryPage.waitForProductsToLoad();

        // Проверяем, что товары в корзине
        cy.verifyCartItemCount(2);

        // Удаляем первый товар из корзины
        inventoryPage.removeProductFromCart(0);
        cy.verifyCartItemCount(1);

        // Удаляем второй товар из корзины
        inventoryPage.removeProductFromCart(0);
        cy.verifyCartItemCount(0);

        // Проверяем, что кнопки изменились обратно на "Add to cart"
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').should('be.visible');
        cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').should('be.visible');
    });
});