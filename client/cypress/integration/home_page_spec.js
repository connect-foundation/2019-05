/// <reference types="Cypress" />

describe('the home page', () => {
  it('successfully redirect to home when logo is clicked', () => {
    cy.visit('/');
    cy.get('.header__left a')
      .click()
      .url()
      .should('equal', 'http://localhost:3000/');
  });
});
