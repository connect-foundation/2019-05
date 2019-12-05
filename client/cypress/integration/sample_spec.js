/// <reference types="Cypress" />

describe('My First Test', function() {
  it('Visits the Kitchen Sink', function() {
    cy.visit('https://google.com');

    cy.pause();

    cy.get('.gLFyf')
      // .clear()
      .type('bigrsnboy@naver.com')
      .clear()
      .type('김웅기{enter}');
  });
});
