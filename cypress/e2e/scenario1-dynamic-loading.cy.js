import LoginPage from '../pages/LoginPage.js';
import InventoryPage from '../pages/InventoryPage.js';

describe('Сценарий 1: Динамическая загрузка товаров с фильтрацией', () => {
    const loginPage = new LoginPage();
    const inventoryPage = new InventoryPage();

    beforeEach(() => {
        // Очищаем localStorage перед каждым тестом
        cy.clearLocalStorage();
    });

    it('Должен авторизоваться, дождаться загрузки товаров и применить фильтр по цене', () => {
        // Шаг 1: Авторизация как standard_user
        loginPage.visit();
        loginPage.login('standard_user', 'secret_sauce');

        // Проверяем, что мы успешно авторизовались
        cy.url().should('include', '/inventory.html');
        cy.get('.title').should('contain', 'Products');

        // Шаг 2: Дожидаемся загрузки списка товаров
        cy.waitForProductsToLoad();
        inventoryPage.waitForProductsToLoad();

        // Проверяем, что товары загружены
        inventoryPage.getProducts().should('have.length.greaterThan', 0);

        // Шаг 3: Применяем фильтр "Price (low to high)"
        inventoryPage.selectSortOption('lohi');

        // Шаг 4: Проверяем, что товары отсортированы по возрастанию цены
        inventoryPage.verifyPriceSorting();

        // Дополнительная проверка: убеждаемся, что сортировка действительно применилась
        cy.get('[data-test="product_sort_container"]').should('have.value', 'lohi');
    });

    it('Должен проверить корректность сортировки товаров по цене', () => {
        // Авторизация
        loginPage.visit();
        loginPage.login('standard_user', 'secret_sauce');

        // Ждем загрузки товаров
        cy.waitForProductsToLoad();
        inventoryPage.waitForProductsToLoad();

        // Получаем количество товаров до сортировки
        let productCount = 0;
        inventoryPage.getProducts().then(($products) => {
            productCount = $products.length;
        });

        // Применяем сортировку
        inventoryPage.selectSortOption('lohi');

        // Проверяем, что цены отсортированы по возрастанию
        inventoryPage.verifyPriceSorting();

        // Проверяем, что количество товаров не изменилось
        inventoryPage.getProducts().should('have.length', productCount);
    });
});