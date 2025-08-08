import './commands';


Cypress.on('uncaught:exception', (err, runnable) => {
    // Возвращаем false, чтобы Cypress не падал на ошибках JavaScript
    return false;
});
