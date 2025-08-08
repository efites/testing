// Команда для ожидания загрузки товаров (без API-запроса)
Cypress.Commands.add('waitForProductsToLoad', () => {
    // Ждем появления списка товаров
    cy.get('.inventory_list').should('be.visible');
    cy.get('.inventory_item').should('have.length.greaterThan', 0);
});

// Команда для работы с localStorage
Cypress.Commands.add('getLocalStorage', (key) => {
    return cy.window().then((win) => {
        return win.localStorage.getItem(key);
    });
});

Cypress.Commands.add('setLocalStorage', (key, value) => {
    cy.window().then((win) => {
        win.localStorage.setItem(key, value);
    });
});

// Команда для перезагрузки страницы
Cypress.Commands.add('reloadPage', () => {
    cy.reload();
});

// Команда для проверки количества товаров в корзине
Cypress.Commands.add('verifyCartItemCount', (expectedCount) => {
    if (expectedCount > 0) {
        cy.get('.shopping_cart_badge').should('be.visible').and('contain', expectedCount);
    } else {
        cy.get('.shopping_cart_badge').should('not.exist');
    }
});
