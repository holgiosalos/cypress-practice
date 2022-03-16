const { faker } = require('@faker-js/faker');

let catName;
describe('Given I want to register my cat', () => {
    before(() => {
        // Arrange
        catName = faker.name.firstName();
        cy.visit('https://animal-shelter-ui.herokuapp.com/');
        cy.get('[href="/animal/register"]').click();
        cy.get('#pet-name').type(catName);
        cy.get('#demo-simple-select').click();
        cy.contains('Criollo').click();
        cy.get('[value=Male]').click();
        cy.get('#terms-and-condition').click();

        // Act
        cy.contains('Guardar').click();
    })

    it ('The cat should be visible in the list of animals', () => {
        //Assert
        cy.get(`[data-testid=${catName}-container]`).should('exist');
    })

    it ('The cat icon should display that is not vaccinated', () => {
        //Assert
        cy.get(`[data-testid=${catName}-container]`)
            .get('[name=is-vaccinated-cat]')
            .get('[name=unhealthy-icon]').should('exist');
    })

    after(() => {
        cy.request(
            'DELETE',
            `https://animal-shelter-back.herokuapp.com/animals/${catName}`);
    })
})