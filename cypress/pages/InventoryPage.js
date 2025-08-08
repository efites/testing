class InventoryPage {
    constructor() {
        this.productContainer = '.inventory_item';
        this.productName = '.inventory_item_name';
        this.productPrice = '.inventory_item_price';
        this.addToCartButton = '[data-test^="add-to-cart"]';
        this.removeFromCartButton = '[data-test^="remove"]';
        this.cartBadge = '.shopping_cart_badge';
        this.cartLink = '.shopping_cart_link';
        this.sortDropdown = '[data-test="product-sort-container"]';
        this.productList = '.inventory_list';
    }

    // Методы для работы с товарами
    getProducts() {
        return cy.get(this.productContainer);
    }

    getProductNames() {
        return cy.get(this.productName);
    }

    getProductPrices() {
        return cy.get(this.productPrice);
    }

    // Методы для работы с корзиной
    addProductToCart(productIndex = 0) {
        cy.get(this.addToCartButton).eq(productIndex).click();
    }

    removeProductFromCart(productIndex = 0) {
        cy.get(this.removeFromCartButton).eq(productIndex).click();
    }

    getCartBadgeCount() {
        return cy.get(this.cartBadge);
    }

    clickCart() {
        cy.get(this.cartLink).click();
    }

    // Методы для фильтрации
    selectSortOption(option) {
        cy.get(this.sortDropdown).select(option);
    }

    // Методы для работы с localStorage
    saveCartState() {
        cy.window().then((win) => {
            const cartState = win.localStorage.getItem('cart-contents');
            cy.wrap(cartState).as('savedCartState');
        });
    }

    verifyCartState() {
        cy.get('@savedCartState').then((savedState) => {
            cy.window().then((win) => {
                const currentState = win.localStorage.getItem('cart-contents');
                expect(currentState).to.equal(savedState);
            });
        });
    }

    // Методы для проверки сортировки
    verifyPriceSorting() {
        cy.get(this.productPrice).then(($prices) => {
            const prices = Array.from($prices).map(el => {
                const priceText = el.textContent;
                return parseFloat(priceText.replace('$', ''));
            });
            
            // Проверяем, что цены отсортированы по возрастанию
            for (let i = 1; i < prices.length; i++) {
                expect(prices[i]).to.be.at.least(prices[i - 1]);
            }
        });
    }
}

export default InventoryPage;
